# Accessibility as legal requirement

## Scope:

Applies to **legal obligations around digital accessibility**—WCAG/EN 301 549, EAA (EU), Equality Act (UK), ADA (US), public-sector rules, statements, remediation. Not a full WCAG training, not country-exhaustive. Pair with [`accessibility-in-code.md`](../coding/accessibility-in-code.md), [`content-design-and-microcopy.md`](../design/content-design-and-microcopy.md), [`gdpr-basics.md`](gdpr-basics.md), and [`empty-and-error-states.md`](../design/empty-and-error-states.md).

## Excerpt

- **Accessibility is law, not courtesy**—in EU/UK/US/many other jurisdictions.
- **WCAG 2.2 AA** is the common minimum; public sector and regulated industries often exceed it.
- **Accessibility statement** required in many regimes; keep it truthful and current.
- **Procurement responsibility**: you are liable for third-party components and vendors too.
- **Remediation plan** is what regulators want to see when things aren't perfect.
- Summary of regimes, checklist, and anti-patterns below.

## Before you ship

### Concrete

- **Which law applies** to your product (country, sector, audience)?
- Is there a **deadline** you are approaching (EAA 28 June 2025 for EU)?
- Do you have an **accessibility statement**, and is it **accurate**?
- Do third-party components you use have **conformance reports** (VPAT/EN 301 549)?

### Meta

- Legal teams care about **process and documentation**; disabled users care about **the actual product**. Do both.
- Accessibility lapses are **public reputational risk**, not just fines.

---

## Purpose

Ship products that disabled people can use, and meet the **written legal duty** in the markets you serve—with documentation to show.

---

## 1. Why this is law, not etiquette

Digital accessibility is enforceable in many places:

- **EU — European Accessibility Act (EAA)**: wide range of private-sector services (banking, e-commerce, transport, e-books, telecoms) from 28 June 2025.
- **EU — Web Accessibility Directive**: public-sector websites and apps.
- **UK — Equality Act 2010**: duty to make reasonable adjustments; public sector regs mirror the EU WAD.
- **US — ADA & Section 508**: private businesses and federal agencies; case law increasingly covers websites.
- **Germany — BFSG**: Barrierefreiheitsstärkungsgesetz implements EAA in DE.
- **Many other jurisdictions**: Canada (ACA), Australia (DDA), Ireland, Norway, Japan, etc.

Rules differ, but **WCAG 2.x** is the common technical reference.

## 2. WCAG in one page

**WCAG 2.2 AA** is the baseline most laws demand. It has four principles: **POUR**.

- **Perceivable** — text alternatives, captions, contrast, resizable text.
- **Operable** — keyboard operation, enough time, no seizures, clear navigation, focus visible.
- **Understandable** — readable language, predictable behaviour, input help, error recovery.
- **Robust** — clean HTML, ARIA used correctly, works with assistive tech.

Pair with [`accessibility-in-code.md`](../coding/accessibility-in-code.md).

## 3. Accessibility statements

Most regimes require a public statement. It should include:

- **Conformance level claimed** (e.g. WCAG 2.2 AA) and **scope** (which URLs, which apps).
- **Known non-conformance** and **reasons** (with dates to fix).
- **Feedback mechanism** and expected response time.
- **Alternative** way to get the same service while a barrier exists.
- **Date prepared and reviewed**.
- **Enforcement contact** (national body).

Do not copy a template and leave "Lorem ipsum" or old dates. Regulators have sued over out-of-date statements.

## 4. Scope: what the law covers

- **Websites**, including campaigns and microsites.
- **Mobile apps**, iOS and Android.
- **Self-service terminals**, ATMs, ticket machines.
- **Documents**: PDFs, Word docs, presentations shared with users.
- **Third-party widgets** embedded on your site.
- **E-commerce** flows end to end (search → checkout → confirmation email).

"Just a landing page" still counts.

## 5. Procurement and third parties

- Require **VPAT / EN 301 549** conformance reports from vendors.
- Treat accessibility like security: in the contract, in reviews, in acceptance tests.
- If a component fails, you are on the hook—keep a remediation register.
- Avoid "auto-overlay" accessibility widgets; they often **do not** fix underlying issues and have been subject to lawsuits.

## 6. Content: not just code

- **PDFs**: tagged, readable with screen readers, not scanned images of text.
- **Videos**: captions for recorded, live captions where required, transcripts.
- **Images**: alt text, no text-in-image without alternative.
- **Language**: plain, with locale declared.
- **Forms**: labels, error messages, logical tab order.
- See [`content-design-and-microcopy.md`](../design/content-design-and-microcopy.md).

## 7. Testing

- **Automated tools** (axe, Lighthouse, Pa11y) catch ~30–40% of issues—necessary, not sufficient.
- **Manual keyboard walk-throughs**.
- **Screen reader testing** (NVDA + Chrome, VoiceOver + Safari, TalkBack + Chrome).
- **Disabled users as testers**—pay them, listen to them.
- Include **a11y regression tests** in CI for core flows.

## 8. Remediation plans

When something isn't conformant:

- Identify the **criterion** (e.g. 1.4.3 Contrast).
- Record **severity** and **who is affected**.
- Fix **critical** (blocks use) quickly; **serious** within a short window; plan the rest.
- Track in a public-facing **roadmap** linked from the statement where required.

## 9. Enforcement and complaints

- Regulators usually expect **direct complaint handling** first (within the stated response time).
- **Escalation** goes to the relevant body (UK: EHRC, DE: federal Monitoring Agency, US: DOJ).
- Keep **records** of complaints and your responses—regulators ask for the log, not the outcome.

## 10. What not to do

- Ship without a **plan** for accessibility, saying you'll "do it in v2".
- Rely on an **overlay widget** to claim conformance.
- Write an accessibility statement that **overstates** conformance.
- Consider accessibility the **QA team's** job alone; it is the whole team's.
- Treat a **complaint** as a PR problem; treat it as a product bug and a legal duty.

---

## Core idea

Accessibility is **written law and sustained practice**. Ship to WCAG 2.2 AA, include it in procurement and CI, keep an honest statement, respond quickly to complaints, and fix the hard cases. The legal safety you buy is the same safety that makes the product usable for everyone.

## Further reading

- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/) — technical standard
- [European Commission — Accessibility](https://ec.europa.eu/social/main.jsp?catId=1202) — EAA and WAD overview
- [UK GOV.UK — Accessibility requirements](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps) — statement template
- [W3C — Accessibility laws overview](https://www.w3.org/WAI/policies/) — country-by-country laws

---

German version: [`barrierefreiheit-als-rechtspflicht.md`](../../de/ethik-&-recht/barrierefreiheit-als-rechtspflicht.md)
