# Error handling and logging

**Scope:** Applies to **how code reacts to failure** and **what you record**—exceptions, retries, timeouts, user-facing messages, structured logs, metrics, traces, alerts. Not full SRE/incident practice, not full security auditing. Pair with [`api-design-and-rest.md`](api-design-and-rest.md), [`security-for-web-apps.md`](security-for-web-apps.md), [`empty-and-error-states.md`](../design/empty-and-error-states.md), and [`status-updates-and-reporting.md`](../project-&-operations/status-updates-and-reporting.md).

## Excerpt
- **Fail fast** at boundaries; **never swallow** exceptions silently.
- **Two audiences**: a **user** (kind, concrete, action) and a **developer** (structured, searchable).
- **Log structure, not prose**: JSON with `level`, `message`, `context`.
- **Retry** only idempotent operations; use exponential backoff with jitter.
- **Alert** on user-visible symptoms, not on every error.
- Patterns, examples, and anti-patterns below.

## Before writing error handling

### Concrete

- What can **realistically fail** here (network, validation, auth, third-party)?
- What is the **worst case** if it silently fails?
- Who is the **message for**—user, developer, on-call?
- Is the operation **safe to retry**?

### Meta

- Errors are **product features**. They tell users what to do and tell operators what to fix.
- Over-broad `try/catch` hides bugs; under-narrow `try/catch` crashes in places you could have recovered.

---

## Purpose

Turn failures into **useful signals and recoverable states**—so users are unstuck, operators know what happened, and nothing important disappears.

---

## 1. Types of failure

- **Validation** — bad input. Return a clear error with the field and issue.
- **Authentication** — missing/invalid credentials. `401`.
- **Authorization** — authenticated but not allowed. `403`.
- **Not found** — `404`; be careful not to leak existence of private resources.
- **Conflict** — `409` (duplicate) or `422` (business rule failed).
- **Rate limit** — `429` with `Retry-After`.
- **Dependency** — third-party down / slow.
- **Unknown** — bug.

Design messages and handling per type, not one generic catch-all.

## 2. Raise, don't swallow

### Bad: raise, don't swallow

```ts
try {
  await sendEmail(user)
} catch (e) {
  console.log(e)
}
// code continues as if mail was sent
```

### Good: raise, don't swallow

```ts
try {
  await sendEmail(user)
} catch (err) {
  logger.error('email_send_failed', {
    user_id: user.id,
    template: 'welcome',
    err: serialiseError(err),
  })
  enqueueForRetry({ type: 'email.send', user_id: user.id })
  throw new EmailDeliveryError('welcome', { cause: err })
}
```

Rules:

- **Log** with context.
- **Retry** if safe (idempotent, transient).
- **Re-throw** so the caller knows it failed.
- Never log and return as if nothing happened.

## 3. User-facing error messages

- **Be specific** about what went wrong.
- **Tell the user** what they can do.
- **Do not** blame the user with "invalid input".
- **Do not** expose stack traces or internal ids to end users.

### Bad: user-facing error messages

```
Error 500. Please try again.
```

### Good: user-facing error messages

```
We couldn't save your changes because your email is already in use.
Try signing in, or use a different address. Reference: req_01J8Q...
```

Pair with [`empty-and-error-states.md`](../design/empty-and-error-states.md).

## 4. Structured logs

Emit JSON. Humans can grep it; machines can index it.

### Good: structured logs

```json
{
  "ts": "2025-03-15T10:22:31Z",
  "level": "error",
  "msg": "payment_failed",
  "request_id": "req_01J8Q...",
  "user_id": "usr_123",
  "amount_cents": 2500,
  "currency": "EUR",
  "provider": "stripe",
  "error_code": "card_declined"
}
```

Rules:

- Always include a **correlation id** (`request_id`, `trace_id`).
- **Levels**: `debug` (local), `info` (lifecycle), `warn` (recoverable anomaly), `error` (real problem), `fatal` (service cannot continue).
- **Never log** secrets, full card numbers, passwords, raw PII. Redact at the logger.

## 5. Retries, timeouts, and backoff

- **Timeouts** on every I/O call—default, not optional. Long enough to succeed on a slow day, short enough to fail before users leave.
- **Retry** only **idempotent** operations (`GET`, most `PUT`/`DELETE`, operations with idempotency keys).
- **Exponential backoff with jitter**: 100ms → 200ms → 400ms + random 0–100ms.
- **Cap** retries (3–5); after that, queue or surface to the user.
- Consider **circuit breakers** for dependencies that routinely misbehave.

## 6. Distributed tracing

- Propagate a **trace id** from the edge through every service and log line.
- One request → one trace → many spans (HTTP, DB, queue, external API).
- Use OpenTelemetry or a vendor-specific lib.
- Sample sensibly (e.g. 10% of traffic + 100% of errors).

## 7. Metrics that matter

Start with **RED** metrics per service:

- **Rate** — requests per second.
- **Errors** — error rate.
- **Duration** — latency distribution (p50, p95, p99).

For user-facing:

- Conversion on critical flows (sign-up, checkout, donation).
- Core Web Vitals ([`performance-and-web-vitals.md`](performance-and-web-vitals.md)).

## 8. Alerting (and silencing)

Alert on **user-visible symptoms**, not every internal error.

- "Checkout error rate >2% for 5 min" — alert.
- "One server logged a stack trace" — log, do not alert.
- **Runbooks** link from alerts: what does this mean, what to check, who to call.
- **Alert fatigue** kills on-call. Review monthly; delete or tune noisy alerts.

## 9. Post-incident

- Write a short **incident note**: timeline, impact, what broke, what helped, what to change.
- **Blameless**: the goal is systemic improvement.
- Track **action items** to completion; if they slip, your next incident is queued.

## 10. What not to do

- Use `try/catch` to control normal flow (expected cases are not exceptions).
- Log errors and continue as if everything worked.
- Show users the raw error body from a third-party API.
- Retry non-idempotent operations (sends money twice, sends emails twice).
- Keep log levels at `debug` in production—noise ratio explodes, real errors disappear.

---

## Core idea

Errors are **first-class information**. Handle them with the user's next step in mind and the operator's search in mind: structured logs, correlation ids, honest status codes, measured retries, and alerts that mean something when they fire.

## Further reading

- [Google SRE Book — Monitoring distributed systems](https://sre.google/sre-book/monitoring-distributed-systems/) — signals that matter
- [OpenTelemetry docs](https://opentelemetry.io/docs/) — tracing, metrics, logs standard
- [Postmortem culture — Google SRE](https://sre.google/sre-book/postmortem-culture/) — blameless review
- [Backoff algorithms — AWS Architecture blog](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/) — retry pattern rationale

---

German version: [`fehlerbehandlung-und-logging.md`](../../de/coding/fehlerbehandlung-und-logging.md)
