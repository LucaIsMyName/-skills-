# API design and REST

## Scope:

Applies to **HTTP APIs you own**—resources, verbs, status codes, payloads, versioning, pagination, errors. Not GraphQL-specific design, not internal RPC, not authentication protocol design. Pair with [`security-for-web-apps.md`](security-for-web-apps.md), [`error-handling-and-logging.md`](error-handling-and-logging.md), [`language-models-in-code.md`](language-models-in-code.md), and [`performance-and-web-vitals.md`](performance-and-web-vitals.md).

## Excerpt

- **Resources over actions**: model nouns; verbs come from HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- **Status codes are contracts**—use the right one; do not return `200` for errors.
- **Consistent payloads**: a single error shape, a single list shape, stable field names.
- **Version intentionally** (`/v1/…` or a header); plan the deprecation path.
- **Paginate lists**, **filter explicitly**, **rate-limit** with clear headers.
- Full rules, codes, examples, and anti-patterns below.

## Before you design

Before sketching endpoints, clarify **what the API is for** and **who uses it**.

### Concrete

- **Consumers**: your own frontend, internal services, third parties?
- **Data model**: what are the durable entities and relationships?
- **Read vs write ratio**—shapes caching and indexes.
- **Security model**: public, session-auth, token-auth, scoped tokens?
- **Compatibility**: can you afford breaking changes, or are clients in the wild?

### Meta

- Design the **happy path** _and_ the **failure modes**—errors are part of the API.
- Once an endpoint is in production, it is a **promise**. Version or deprecate; do not silently change.
- Consistency beats cleverness: predictable APIs are easier to integrate and easier to replace.

---

## Purpose

Build HTTP APIs that are **predictable, secure, and stable to integrate against**—so clients can be written once and evolved without breaking.

---

## 1. Resources and URLs

Model nouns, not actions.

### Bad: resources and urls

```
POST /createUser
POST /getUserById
POST /deleteOldPosts
```

### Good: resources and urls

```
POST   /users              # create
GET    /users/{id}         # read
PATCH  /users/{id}         # partial update
DELETE /users/{id}         # delete
GET    /users?status=active&limit=25
```

Rules:

- **Plural** nouns for collections (`/users`, `/invoices`).
- **Kebab-case** for multi-word paths (`/donor-emails`).
- No verbs unless it is a real action ("transitions") that does not map to CRUD: `POST /invoices/{id}/send`.

## 2. Verbs and idempotency

- `GET` — read; **safe** and **idempotent**; never has side effects.
- `POST` — create; **not** idempotent (repeats create duplicates).
- `PUT` — replace whole resource; idempotent.
- `PATCH` — partial update; should be idempotent for the same body.
- `DELETE` — delete; idempotent.

For write endpoints exposed to unreliable networks, support an `Idempotency-Key` header so retries do not duplicate side effects.

## 3. Status codes

Use them deliberately.

- **2xx** — success
  - `200 OK` — success with body
  - `201 Created` — resource created (include `Location` header)
  - `202 Accepted` — async work queued
  - `204 No Content` — success, no body (e.g. `DELETE`)
- **3xx** — redirection (rare in APIs)
- **4xx** — client error
  - `400 Bad Request` — malformed request
  - `401 Unauthorized` — no/invalid credentials
  - `403 Forbidden` — authenticated but not allowed
  - `404 Not Found` — resource does not exist
  - `409 Conflict` — state conflict (duplicate, version mismatch)
  - `422 Unprocessable Entity` — validation failed
  - `429 Too Many Requests` — rate-limited (include `Retry-After`)
- **5xx** — server error
  - `500 Internal Server Error` — unexpected
  - `503 Service Unavailable` — temporary outage (include `Retry-After`)

## 4. Error shape

One error shape, everywhere.

### Good: error shape

```json
{
  "error": {
    "code": "email_already_registered",
    "message": "An account with this email already exists.",
    "details": [{ "field": "email", "issue": "duplicate" }],
    "request_id": "req_01J8Q..."
  }
}
```

Rules:

- Stable machine-readable `code` (snake_case).
- Human-readable `message` safe to show to a user when appropriate.
- `details` for field-level issues.
- `request_id` so users can reference a log.

## 5. Payloads and field names

- **Consistent casing** (pick `snake_case` **or** `camelCase`, don't mix).
- **ISO 8601** timestamps (`2025-03-15T10:22:31Z`)—always UTC on the wire.
- **Money** as `{ "amount": 2500, "currency": "EUR" }`—integer minor units, not floats.
- **Enumerations** as strings, not numbers (`"status": "active"` beats `"status": 1`).
- **Booleans** for flags, not 0/1.

Never send secrets, tokens, or hashed passwords in responses. Ever.

## 6. Collections, pagination, filtering

### Good: collections, pagination, filtering

```
GET /invoices?status=unpaid&created_after=2025-01-01&limit=25&cursor=abc123
```

Response:

```json
{
  "data": [ { ... }, { ... } ],
  "page": {
    "limit": 25,
    "next_cursor": "def456",
    "has_more": true
  }
}
```

Rules:

- **Cursor-based** pagination for large / live data; offset pagination only for small, stable sets.
- **Explicit filters**; do not let clients send arbitrary SQL-ish queries.
- **Sort** via a documented parameter: `sort=created_at:desc`.
- Default `limit` small (25–50); cap at 200.

## 7. Versioning and deprecation

- Version at the URL (`/v1/…`) or via an `Accept` header—**pick one**.
- Never change the meaning of a field in `v1`; add new fields in a backwards-compatible way.
- Announce deprecations with `Deprecation` and `Sunset` headers and a written notice.
- Keep `v1` live while `v2` is stable; do not force clients to migrate overnight.

## 8. Authentication and authorization

- **TLS everywhere**. Never accept credentials over plain HTTP.
- **Tokens** with the smallest scopes that work.
- **401** for no/invalid credentials, **403** for valid credentials without the required scope.
- Short-lived access tokens, longer refresh tokens, rotation on use.
- See [`security-for-web-apps.md`](security-for-web-apps.md).

## 9. Rate limiting and quotas

- Protect every write and every expensive read.
- Return:
  - `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
  - `429 Too Many Requests` with `Retry-After`
- Document limits publicly; they are part of the API contract.

## 10. What not to do

- Use `200 OK` for errors ("check the `success` field").
- Rename a field "just for consistency" in a live version.
- Expose internal primary keys / database IDs—prefer opaque external IDs.
- Invent HTTP verbs (`GETPOST`, `QUERY`)—clients and proxies will misbehave.
- Ship an API without docs; the API **is** the docs.

---

## Core idea

An HTTP API is a **public promise**: stable URLs, honest status codes, predictable payloads, and a versioning plan. Boring is good. Surprises cost customers.

## Further reading

- [Zalando RESTful API Guidelines](https://opensource.zalando.com/restful-api-guidelines/) — comprehensive style guide with rationale
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines) — versioning, pagination, errors
- [Stripe API reference](https://docs.stripe.com/api) — a widely studied example of consistent design
- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) — authoritative reference for methods and status codes

---

German version: [`api-design-und-rest.md`](../../de/coding/api-design-und-rest.md)
