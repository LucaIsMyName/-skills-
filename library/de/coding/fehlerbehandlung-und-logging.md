# Fehlerbehandlung und Logging

## Geltungsbereich:

Gilt für **wie Code auf Fehler reagiert** und **was ihr aufzeichnet**—Exceptions, Retries, Timeouts, User-Meldungen, strukturierte Logs, Metriken, Traces, Alerts. Keine komplette SRE-Praxis, kein Security-Audit. Kombiniere mit [`api-design-und-rest.md`](api-design-und-rest.md), [`sicherheit-fuer-webapps.md`](sicherheit-fuer-webapps.md), [`leere-und-fehlerzustaende.md`](../design/leere-und-fehlerzustaende.md) und [`statusberichte-und-reporting.md`](../projekt-&-operationen/statusberichte-und-reporting.md).

## Exzerpt

- **Fail fast** am Rand; **nie** Exceptions stillschweigend schlucken.
- **Zwei Zielgruppen**: **User** (freundlich, konkret, Aktion) und **Dev** (strukturiert, durchsuchbar).
- **Struktur statt Prosa**: JSON mit `level`, `message`, `context`.
- **Retry** nur idempotent; exponentielles Backoff mit Jitter.
- **Alerten** auf sichtbare Symptome, nicht auf jeden Error.
- Muster und Anti-Muster unten.

## Vor der Fehlerbehandlung

### Konkret

- Was kann hier **wirklich** schiefgehen?
- Worst Case bei **stillem Versagen**?
- Meldung für **User, Dev, On-Call**?
- Ist die Operation **idempotent**?

### Meta

- Fehler sind **Produktfeatures**—sie sagen, was zu tun ist.
- Zu breite `try/catch` versteckt Bugs; zu enge crasht, wo man hätte auffangen können.

---

## Zweck

Fehler in **nützliche Signale und erholbare Zustände** verwandeln.

---

## 1. Fehlerarten

- **Validierung** — falscher Input. Feld + Problem zurückgeben.
- **Authentifizierung** — `401`.
- **Autorisierung** — `403`.
- **Not found** — `404` (vorsicht: keine Privat-Ressourcen leaken).
- **Konflikt** — `409` / `422`.
- **Rate-Limit** — `429` mit `Retry-After`.
- **Dependency** — Third-Party down/langsam.
- **Unbekannt** — Bug.

## 2. Werfen, nicht schlucken

### Schlecht: werfen, nicht schlucken

```ts
try {
  await sendEmail(user);
} catch (e) {
  console.log(e);
}
```

### Gut: werfen, nicht schlucken

```ts
try {
  await sendEmail(user);
} catch (err) {
  logger.error("email_send_failed", {
    user_id: user.id,
    template: "welcome",
    err: serialiseError(err),
  });
  enqueueForRetry({ type: "email.send", user_id: user.id });
  throw new EmailDeliveryError("welcome", { cause: err });
}
```

## 3. User-Meldungen

- **Konkret** was schiefging.
- **Nächster Schritt** für Nutzende.
- **Nicht beschuldigen**.
- **Keine** Stacktraces/IDs exponieren.

### Schlecht: user-meldungen

```
Fehler 500. Bitte erneut versuchen.
```

### Gut: user-meldungen

```
Wir konnten Ihre Änderungen nicht speichern: Die E-Mail wird bereits verwendet.
Melden Sie sich an oder nutzen Sie eine andere Adresse. Referenz: req_01J8Q...
```

## 4. Strukturierte Logs

### Gut: strukturierte logs

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

- **Correlation-ID** immer (`request_id`/`trace_id`).
- **Levels**: `debug`, `info`, `warn`, `error`, `fatal`.
- **Nie** Secrets/Karten/Passwörter/PII loggen.

## 5. Retries, Timeouts, Backoff

- **Timeouts** auf allen I/O-Calls.
- **Retry** nur **idempotent**.
- **Exponentielles Backoff + Jitter**.
- **Cap** 3–5 Retries.
- **Circuit Breaker** bei Dauer-Flakern.

## 6. Distributed Tracing

- **Trace-ID** vom Edge durch alle Services.
- Ein Request → ein Trace → viele Spans.
- OpenTelemetry oder Vendor.
- Sinnvoll sampeln (z. B. 10% + 100% Errors).

## 7. Metriken

**RED** pro Service:

- **Rate** (Requests/s).
- **Errors** (Error-Rate).
- **Duration** (p50, p95, p99).

User-facing: Conversion auf kritischen Flows; Core Web Vitals ([`performance-und-web-vitals.md`](performance-und-web-vitals.md)).

## 8. Alerting

Auf **Nutzer-sichtbare Symptome**.

- "Checkout-Fehlerrate >2% für 5 Min" — Alert.
- "Ein Server hat Stacktrace geloggt" — loggen, nicht alerten.
- **Runbooks** verlinken.
- **Alert-Fatigue** regelmäßig kürzen.

## 9. Post-Incident

- Kurzer **Incident-Report**: Timeline, Impact, Ursache, Hilfreiches, Actions.
- **Blameless**.
- **Actions** zu Ende bringen—sonst queued der nächste Incident.

## 10. Was nicht tun

- `try/catch` als Normalfluss.
- Loggen und weitermachen.
- Third-Party-Errors roh zeigen.
- Nicht-idempotente Operationen retry'en.
- `debug`-Level in Prod.

---

## Kerngedanke

Fehler sind **erstklassige Information**. Mit Blick auf den nächsten Schritt des Users und die Suche des Operators behandeln: strukturierte Logs, Correlation-IDs, ehrliche Statuscodes, maßvolle Retries, sinnvolle Alerts.

## Weiterführend

- [Google SRE Book — Monitoring](https://sre.google/sre-book/monitoring-distributed-systems/)
- [OpenTelemetry](https://opentelemetry.io/docs/)
- [Postmortem culture — Google SRE](https://sre.google/sre-book/postmortem-culture/)
- [AWS — Exponential backoff and jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)

---

Englische Version: [`error-handling-and-logging.md`](../../en/coding/error-handling-and-logging.md)
