# Security for web apps

## Scope:

Applies to **day-to-day application security** for web products—auth, input handling, dependencies, secrets, headers, logging. Not full infosec programs, not cryptographic protocol design, not pentesting. Pair with [`api-design-and-rest.md`](api-design-and-rest.md), [`error-handling-and-logging.md`](error-handling-and-logging.md), [`gdpr-basics.md`](../ethics-&-legal/gdpr-basics.md), and [`structured-output-and-tool-use.md`](../ai-&-prompting/structured-output-and-tool-use.md).

## Excerpt

- **Default-deny** everywhere: auth, authorization, network, CORS, CSP.
- **Validate** inputs at the boundary; **encode** outputs at the sink (HTML, SQL, shell).
- **Secrets live in environment / secret managers**—never in code, never in logs.
- **Dependencies** are supply chain: lock, audit, update.
- **Rate limits + headers + logging** catch most of what you will see in production.
- Checklist, common vulnerabilities, and anti-patterns below.

## Before you ship

### Concrete

- What is the **sensitivity** of the data—public, internal, PII, financial, health?
- What is the **threat model**—script kiddies, credential stuffing, targeted attackers, insiders?
- Which **compliance** frames apply (GDPR, accessibility, sector rules)?
- Do you have **logs**, **alerts**, and a **response plan** for incidents?

### Meta

- Security is **risk management**, not perfection. Fix the things likely to hurt first.
- **Defense in depth**: assume every layer will eventually fail.
- Most breaches are **mundane**—old deps, weak passwords, leaked keys—not novel exploits.

---

## Purpose

Ship a web app that protects users' data and your organisation's reputation **by default**, with visible controls that you can explain in a review.

---

## 1. Authentication

- Use a **known-good library** (Auth.js, Devise, Django auth, Passport)—do not hand-roll.
- Store passwords with **Argon2id** or **bcrypt** (current parameters); never plain or "encrypted".
- **MFA** for staff; offer it for users with sensitive data.
- **Lock out** after N failed attempts; use CAPTCHAs for credential stuffing patterns.
- **Short-lived sessions**, rotate on privilege change, invalidate on password change.
- **Logout** must kill the server-side session, not just a cookie.

## 2. Authorization

- **Check on every request**; never rely on the UI to "hide" actions.
- Store permissions on the **user**, verify on the **resource**.
- Use the least-privilege principle for service accounts.

### Bad: authorization

```ts
if (user.isAdmin) {
  /* show button */
}
// server accepts the action regardless
```

### Good: authorization

```ts
router.post("/invoices/:id/void", requireAuth, async (req, res) => {
  const invoice = await db.invoice.findById(req.params.id);
  if (!canVoid(req.user, invoice)) return res.status(403).end();
  // ...
});
```

## 3. Input handling

- **Validate** on the server (types, ranges, lengths). Never trust clients.
- **Parse, don't patch**: convert input to a typed model, reject what doesn't fit.
- **Encode at the sink**:
  - HTML → auto-escaping templates.
  - SQL → **parameterised queries**; no string concatenation.
  - Shell → use argument arrays, never `shell=true` with interpolation.
  - URLs → `encodeURIComponent`; do not concatenate query strings.

## 4. Output handling

- Set a **Content Security Policy** (CSP) to limit script sources.
- Mark cookies `Secure`, `HttpOnly`, `SameSite=Lax` (or `Strict` for sensitive ones).
- Set common security headers:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` to shrink the API surface

## 5. Common vulnerabilities

See the [OWASP Top 10](https://owasp.org/www-project-top-ten/) for the current list. The usual suspects:

- **Broken access control** — missing authorization checks.
- **Injection** — SQL, command, template, header.
- **XSS** — unescaped output in HTML.
- **CSRF** — state-changing requests without a token or `SameSite` cookies.
- **SSRF** — server fetches URLs that users supply.
- **Insecure deserialisation** — untrusted data into a binary parser.
- **Open redirects** — `next=` parameters that go anywhere.
- **Mass assignment** — `UPDATE users SET * FROM req.body`.

## 6. Secrets and configuration

- **No secrets in code**, ever. No commit, no merged PR, no branch.
- **Environment variables** for local dev; **secret manager** for production (AWS SM, GCP SM, 1Password, HashiCorp Vault).
- **Rotate** if a secret is ever in a commit, screenshot, chat, or log—even "private" ones.
- **Least privilege** on tokens: one per service, one per environment.

## 7. Dependencies

- **Lockfiles** (`package-lock.json`, `pnpm-lock.yaml`, `poetry.lock`) committed.
- **Automated scanning** (GitHub Dependabot, Snyk, `npm audit`, `pip-audit`).
- **Update cadence**: weekly security, monthly minor; larger majors planned.
- Vet new deps: maintenance, downloads, recent activity, author reputation.
- Prefer **fewer, larger** trusted deps to **many small** packages from unknown maintainers.

## 8. Logging, monitoring, response

- Log **auth events** (login success/failure, lockouts, password changes, 2FA).
- Log **authorization failures** (403s with URL + user id).
- **Never log** passwords, tokens, full card numbers, full PII.
- Alert on unusual **burst patterns**: brute-force, scraping, spike in 500s.
- Have a documented **incident response** plan: who to call, who to tell, when to notify users.

See [`error-handling-and-logging.md`](error-handling-and-logging.md).

## 9. Cloud and infrastructure

- **TLS everywhere** (auto-renew via ACME/Let's Encrypt).
- **Network segmentation**: databases not on the public internet.
- **Backup** what matters; **test restore** at least quarterly.
- **Principle of least privilege** for IAM roles; no wildcard `*` actions.

## 10. What not to do

- Roll your own crypto.
- Trust the client ("they'll never open DevTools").
- Ship a debug endpoint to production "temporarily".
- Assume "internal tools" are safe—insiders and compromised laptops are real.
- Delay security fixes because they are "boring" or "not user-facing".

---

## Core idea

Most web-app breaches are **boring**: missing auth check, old dependency, leaked key, log dump. Defend the boring: **default-deny**, parameterise everything, rotate secrets, update deps, log the right things, and have a plan for when something fails.

## Further reading

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — canonical list of common web vulnerabilities
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/) — concrete patterns for auth, sessions, input handling, CSP
- [Mozilla Observatory](https://observatory.mozilla.org/) — security header checks with explanations
- [NCSC — Secure development](https://www.ncsc.gov.uk/collection/developers-collection) — UK national guidance for development teams

---

German version: [`sicherheit-fuer-webapps.md`](../../de/coding/sicherheit-fuer-webapps.md)
