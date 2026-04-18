# Sicherheit für Webapps

**Scope:** Gilt für **alltägliche App-Security** in Webprodukten—Auth, Input, Dependencies, Secrets, Header, Logging. Kein komplettes Infosec-Programm, keine Kryptoprotokoll-Entwicklung, kein Pentest. Kombiniere mit [`api-design-und-rest.md`](api-design-und-rest.md), [`fehlerbehandlung-und-logging.md`](fehlerbehandlung-und-logging.md), [`dsgvo-grundlagen.md`](../ethik-&-recht/dsgvo-grundlagen.md) und [`strukturierte-ausgabe-und-tools.md`](../ki-&-prompting/strukturierte-ausgabe-und-tools.md).

## Excerpt

- **Default-deny** überall: Auth, Autorisierung, Netz, CORS, CSP.
- **Validieren** am Rand; **Escapen** am Sink (HTML, SQL, Shell).
- **Secrets** in Env/Secret-Manager—nie im Code, nie im Log.
- **Dependencies** sind Supply-Chain: Lockfile, Audit, Updates.
- **Rate-Limits + Header + Logging** fangen das meiste.
- Checkliste, Schwachstellen, Anti-Muster unten.

## Vor dem Release

### Konkret

- **Sensitivität** der Daten—öffentlich, intern, PII, Finanzen, Gesundheit?
- **Bedrohungsmodell**—Script-Kiddies, Credential Stuffing, gezielt, Insider?
- **Compliance** (DSGVO, Barrierefreiheit, Branche)?
- **Logs**, **Alerts**, **Incident-Plan**?

### Meta

- Security ist **Risikomanagement**, keine Perfektion.
- **Defense in Depth**: jede Schicht darf mal versagen.
- Die meisten Breaches sind **banal**—alte Deps, schwache Passwörter, geleakte Keys.

---

## Zweck

Webapp bauen, die Nutzerdaten und Reputation **by default** schützt—mit sichtbaren Kontrollen.

---

## 1. Authentifizierung

- **Bewährte Lib** nutzen (Auth.js, Devise, Django, Passport)—nichts selbst stricken.
- Passwörter mit **Argon2id** oder **bcrypt** (aktuelle Parameter).
- **MFA** für Staff; Nutzer bei sensiblen Daten.
- **Lockout** nach N Fehlversuchen; CAPTCHAs gegen Stuffing.
- **Kurze Sessions**, rotieren bei Privilegien/Passwortwechsel.
- **Logout** serverseitig killen.

## 2. Autorisierung

- **Jeden Request** prüfen; UI ist kein Schutz.
- Rechte am **User**, Prüfung an der **Ressource**.
- Service-Accounts: Least Privilege.

### Schlecht

```ts
if (user.isAdmin) { /* Button zeigen */ }
// Server akzeptiert ohne weitere Prüfung
```

### Gut

```ts
router.post('/invoices/:id/void', requireAuth, async (req, res) => {
  const invoice = await db.invoice.findById(req.params.id)
  if (!canVoid(req.user, invoice)) return res.status(403).end()
})
```

## 3. Inputs

- **Serverseitig validieren** (Typen, Längen, Ranges).
- **Parse, don't patch**: in typisiertes Modell konvertieren, Rest ablehnen.
- **Am Sink escapen**:
  - HTML → Templates mit Auto-Escape.
  - SQL → **parametrisierte Queries**, kein Stringbau.
  - Shell → Argument-Arrays, kein `shell=true` mit Interpolation.
  - URLs → `encodeURIComponent`.

## 4. Outputs

- **CSP** setzen.
- Cookies `Secure`, `HttpOnly`, `SameSite=Lax` (oder `Strict`).
- Security-Header:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`

## 5. Häufige Schwachstellen

Siehe [OWASP Top 10](https://owasp.org/www-project-top-ten/).

- **Broken Access Control**, **Injection**, **XSS**, **CSRF**, **SSRF**, **Insecure Deserialisation**, **Open Redirect**, **Mass Assignment**.

## 6. Secrets

- **Nie im Code**. Kein Commit, kein gemergter PR, kein Branch.
- **Env-Variablen** lokal; **Secret-Manager** in Prod.
- **Rotieren**, sobald ein Secret irgendwo auftaucht.
- **Least Privilege** auf Tokens: einer pro Service pro Env.

## 7. Dependencies

- **Lockfiles** im Repo.
- **Automatische Scans** (Dependabot, Snyk, `npm audit`, `pip-audit`).
- **Update-Kadenz**: Security wöchentlich, Minor monatlich.
- Neue Deps prüfen: Wartung, Downloads, Aktivität, Autor.

## 8. Logging, Monitoring, Response

- **Auth-Events** loggen (Login, Lockout, Passwortwechsel, 2FA).
- **Autorisierungsfehler** loggen (403s).
- **Nie** Passwörter/Tokens/volle Kartennummern/PII loggen.
- Alerts auf **Burst-Muster**.
- **Incident-Response-Plan**: wer, wann, Kommunikation.

Siehe [`fehlerbehandlung-und-logging.md`](fehlerbehandlung-und-logging.md).

## 9. Cloud/Infra

- **TLS überall**.
- **Netzwerksegmentierung**: DBs nicht öffentlich.
- **Backups** testen (Restore quartalsweise).
- **Least Privilege** in IAM; keine `*`-Wildcards.

## 10. Was nicht tun

- Eigene Krypto.
- Client vertrauen.
- Debug-Endpoint "kurz" in Prod.
- "Interne Tools" für sicher halten.
- Security-Fixes aufschieben, weil "boring".

---

## Core idea

Die meisten Breaches sind **banal**. Das Banale verteidigen: **Default-deny**, parametrisieren, Secrets rotieren, Deps updaten, richtig loggen, Plan für Versagen.

## Further reading

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [BSI — Secure development](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Software-Entwicklung/software-entwicklung_node.html)

---

Englische Version: [`security-for-web-apps.md`](../../en/coding/security-for-web-apps.md)
