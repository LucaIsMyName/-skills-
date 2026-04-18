# API-Design und REST

**Scope:** Gilt für **eigene HTTP-APIs**—Ressourcen, Verben, Statuscodes, Payloads, Versionierung, Pagination, Fehler. Kein GraphQL-Design, kein internes RPC, kein Auth-Protokoll-Design. Kombiniere mit [`sicherheit-fuer-webapps.md`](sicherheit-fuer-webapps.md), [`fehlerbehandlung-und-logging.md`](fehlerbehandlung-und-logging.md), [`llms-im-code-nutzen.md`](llms-im-code-nutzen.md) und [`performance-und-web-vitals.md`](performance-und-web-vitals.md).

## Excerpt

- **Ressourcen statt Aktionen**: Nomen modellieren; Verben kommen von HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- **Statuscodes sind Verträge**—richtig setzen; kein `200` für Fehler.
- **Konsistente Payloads**: ein Fehler-Shape, ein List-Shape, stabile Feldnamen.
- **Bewusst versionieren** (`/v1/…` oder Header); Deprecation planen.
- **Listen paginieren**, **explizite Filter**, **Rate-Limits** mit klaren Headern.
- Regeln, Codes, Beispiele, Anti-Muster unten.

## Vor dem Design

### Konkret

- **Konsument\*innen**: eigenes Frontend, interne Services, Dritte?
- **Datenmodell**: dauerhafte Entitäten und Beziehungen?
- **Read/Write-Verhältnis**—beeinflusst Caching/Indizes.
- **Sicherheitsmodell**: öffentlich, Session, Token, Scopes?
- **Kompatibilität**: Breaking Changes erlaubt oder sind Clients "in the wild"?

### Meta

- **Happy Path** *und* **Failure Modes** designen—Fehler sind Teil der API.
- Produktive Endpoints sind **Versprechen**. Versionieren/deprecaten, nicht stillschweigend ändern.
- Konsistenz schlägt Cleverness.

---

## Zweck

HTTP-APIs bauen, die **vorhersagbar, sicher, stabil** zu integrieren sind.

---

## 1. Ressourcen und URLs

Nomen, keine Aktionen.

### Schlecht

```
POST /createUser
POST /getUserById
POST /deleteOldPosts
```

### Gut

```
POST   /users
GET    /users/{id}
PATCH  /users/{id}
DELETE /users/{id}
GET    /users?status=active&limit=25
```

Regeln:

- **Plural**-Nomen für Collections (`/users`, `/invoices`).
- **kebab-case** bei mehrteiligen Pfaden (`/donor-emails`).
- Keine Verben, außer echte Transitionen: `POST /invoices/{id}/send`.

## 2. Verben und Idempotenz

- `GET` — lesen; **safe** und **idempotent**.
- `POST` — erzeugen; **nicht** idempotent.
- `PUT` — ganze Ressource ersetzen; idempotent.
- `PATCH` — teilweise; idempotent bei gleichem Body.
- `DELETE` — löschen; idempotent.

Für Writes über unzuverlässige Netze: `Idempotency-Key`-Header.

## 3. Statuscodes

- **2xx** — Erfolg
  - `200 OK`, `201 Created` (mit `Location`), `202 Accepted`, `204 No Content`.
- **4xx** — Client-Fehler
  - `400`, `401`, `403`, `404`, `409`, `422`, `429 Too Many Requests` (mit `Retry-After`).
- **5xx** — Server-Fehler
  - `500`, `503` (mit `Retry-After`).

## 4. Fehler-Shape

Ein Shape, überall.

### Gut

```json
{
  "error": {
    "code": "email_already_registered",
    "message": "Ein Konto mit dieser E-Mail existiert bereits.",
    "details": [
      { "field": "email", "issue": "duplicate" }
    ],
    "request_id": "req_01J8Q..."
  }
}
```

- Stabiler, maschinenlesbarer `code` (snake_case).
- User-taugliche `message`.
- `details` für Feldfehler.
- `request_id` für Logs.

## 5. Payloads und Feldnamen

- **Konsistente Schreibweise** (`snake_case` **oder** `camelCase`, nicht mischen).
- **ISO 8601**-Zeitstempel, UTC.
- **Geld**: `{ "amount": 2500, "currency": "EUR" }` (Minor-Units, keine Floats).
- **Enums** als Strings.
- **Booleans** für Flags.

Keine Secrets/Tokens/Passwort-Hashes in Antworten.

## 6. Collections, Pagination, Filter

### Gut

```
GET /invoices?status=unpaid&created_after=2025-01-01&limit=25&cursor=abc123
```

```json
{
  "data": [ { ... } ],
  "page": { "limit": 25, "next_cursor": "def456", "has_more": true }
}
```

- **Cursor-basiert** für große/lebendige Daten.
- **Explizite Filter**.
- **Sort** dokumentiert: `sort=created_at:desc`.
- Default-Limit klein (25–50), max 200.

## 7. Versionierung und Deprecation

- URL (`/v1/…`) oder `Accept`-Header—**eins** wählen.
- Bedeutung bestehender Felder nicht ändern; neue additiv.
- `Deprecation`/`Sunset`-Header + schriftliche Ankündigung.
- `v1` leben lassen, solange `v2` stabil wird.

## 8. Auth

- **TLS überall**.
- **Tokens** mit kleinsten sinnvollen Scopes.
- **401** fehlend/ungültig; **403** ohne passenden Scope.
- Kurze Access-Tokens, längere Refresh-Tokens, Rotation.
- Siehe [`sicherheit-fuer-webapps.md`](sicherheit-fuer-webapps.md).

## 9. Rate-Limits

- Writes und teure Reads schützen.
- Header: `X-RateLimit-Limit`, `-Remaining`, `-Reset`; `429` mit `Retry-After`.
- Limits dokumentieren—sind Teil des Vertrags.

## 10. Was nicht tun

- `200 OK` für Fehler ("check success field").
- Feldnamen in laufender Version umbenennen.
- Interne DB-IDs exponieren—lieber opaque externe IDs.
- HTTP-Verben erfinden.
- Ohne Docs shippen—Docs **sind** die API.

---

## Core idea

Eine HTTP-API ist ein **öffentliches Versprechen**: stabile URLs, ehrliche Statuscodes, berechenbare Payloads, Versionsplan. Langweilig ist gut.

## Further reading

- [Zalando RESTful API Guidelines](https://opensource.zalando.com/restful-api-guidelines/)
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)
- [Stripe API reference](https://docs.stripe.com/api)
- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)

---

Englische Version: [`api-design-and-rest.md`](../../en/coding/api-design-and-rest.md)
