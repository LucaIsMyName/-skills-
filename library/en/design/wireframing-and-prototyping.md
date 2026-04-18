# Wireframing and prototyping

**Scope:** Applies to **sketches, wireframes, and clickable prototypes** for digital products—what to produce at which fidelity, how to test, how to hand off. Not full UX research, not front-end engineering. Pair with [`designing-good-interfaces.md`](designing-good-interfaces.md), [`information-architecture.md`](information-architecture.md), [`empty-and-error-states.md`](empty-and-error-states.md), and [`content-design-and-microcopy.md`](content-design-and-microcopy.md).

## Excerpt
- **Lowest fidelity that answers the question**—paper for flows, wireframes for layout, prototypes for flow validation, mockups for polish.
- **Structure before colour**. Test hierarchy, content, and navigation before visual design.
- **Content-first**: use real words and real data early; lorem ipsum lies.
- **Prototypes are throwaway**—assume you will redo them after testing.
- **Annotate** handoffs: behaviour, states, constraints, accessibility requirements.
- Fidelity ladder, pitfalls, and handoff checklist below.

## Before wireframing

### Concrete

- What **decision** does this artefact need to unlock (navigation, layout, flow, copy, visual)?
- Who is the **audience** (teammates, user testers, stakeholders)?
- What **content** is real—headlines, labels, error messages, numbers?
- Which **constraints** are non-negotiable (brand, accessibility, device, performance)?

### Meta

- Fidelity signals **confidence**. Too polished too early locks reviewers into cosmetics.
- A wireframe that needs explaining is not finished; explain it in the wireframe.

---

## Purpose

Make design **cheap to change** early and **clear to build** late—so you catch problems when a pencil can fix them, and you ship a product the engineers can implement without guesswork.

---

## 1. The fidelity ladder

- **Sketches** (paper/whiteboard): flows, concepts, decisions among options.
- **Wireframes** (grey boxes, real copy): layout, hierarchy, navigation.
- **Prototypes** (clickable): flow validation, micro-interactions, form behaviour.
- **Mockups** (visual design applied): brand, typography, imagery, states.
- **Redlines / specs** (handoff): measurements, tokens, interaction details.

Rule: **the lowest fidelity that answers the question**. Go up one rung when you need the next answer.

## 2. Sketches — flows and decisions

Before opening a design tool:

- Draw the **user's path** across screens on a single page.
- Note entry points, decisions, success/failure branches.
- Identify **the one critical screen** that makes or breaks the flow.

### Good (sketch output)

```
[Home] → [Search] → [Results list] → [Detail] → [Book]
                                      ↑
                                  (empty / error)
```

Decisions to make at this step, not later:

- Is search a page or an overlay?
- Do we show 1 result per row or a grid?
- Where does "no results" live?

## 3. Wireframes — layout and hierarchy

Wireframes test **structure** before visuals.

Rules:

- **Real content**, not lorem ipsum, especially for headlines and CTAs.
- **Consistent grid**; align items; use spacing tokens if you have them.
- **Greyscale** only—colour draws attention and misleads review.
- One screen per file/frame; label with the flow step.
- Mark **states**: empty, loading, error, one-of-many, many (see [`empty-and-error-states.md`](empty-and-error-states.md)).

### Bad: wireframes — layout and hierarchy

A coloured wireframe with lorem ipsum that everyone then argues about as if it were the real product.

### Good: wireframes — layout and hierarchy

Greyscale layout with real headline ("Your next payment: £24 on 12 May"), real button copy ("Confirm payment"), and noted states.

## 4. Prototypes — flow validation

A prototype tests the **flow**, not the pixel.

- Click-through in Figma, Framer, or code.
- **Include the sad paths**: error, empty, offline, unsaved changes, timeout.
- **Test with 5 people**, not 50—most issues show up in 3–5 sessions.
- Write **tasks**, not leading questions: "Pay your invoice" beats "How would you use the payment screen?"
- Record obstacles; fix the three biggest before the next round.

## 5. Mockups — visual design

Apply brand when structure is settled.

- Use **design tokens** (colours, spacing, typography) consistent with the system.
- Mock the **hardest** screen first (dense data, longest copy, worst case)—pretty onboarding screens are the easy part.
- Include **all states**: focus, hover, active, disabled, loading, error, empty.
- Check **accessibility** contrast and readable font sizes in the mockup.

## 6. Content-first design

Real content changes the design. Make space for it.

- Longest likely copy in each slot (German translations are often 30% longer than English).
- Real numbers with real separators ("£1,234.56" vs "$123").
- Real user names, not "John Doe".
- Error messages from [`empty-and-error-states.md`](empty-and-error-states.md).
- Dates in the user's locale and timezone.

## 7. Accessibility in wireframes and prototypes

- Mark **tab order** and **keyboard shortcuts**.
- Specify **focus styles**.
- Check **contrast** on mockups (WCAG 2.2 AA at minimum).
- Annotate **screen reader** text for icons, images, decorative content.
- Pair with [`accessibility-in-code.md`](../coding/accessibility-in-code.md).

## 8. Reviews and critique

- Ask reviewers for **specific** feedback: "does the hierarchy match the task?" beats "what do you think?".
- **Silent review** first, then discussion, to reduce groupthink.
- Separate **usability** feedback from **personal taste**.
- Come with **options**, not just one design—"two wireframes" is a better starting point than "the wireframe".

## 9. Handoff

A good handoff is what an engineer can build from without asking you.

- **Final screens** at real viewport sizes.
- **Annotations**: states, behaviour, edge cases, a11y requirements.
- **Assets**: icons, images, exported in the right formats.
- **Tokens**: colours, spacing, radii from the design system.
- **Copy**: every word in the UI, including error messages.

Use tools like Figma's Dev Mode, Zeplin, or a shared Storybook—but the **annotations** are what save time.

## 10. What not to do

- Start in **high fidelity** for a flow that is not decided.
- **Lorem ipsum** on anything that will be reviewed by a stakeholder.
- Skip **empty and error states**; these are where real products fail.
- Prototype only the **happy path**.
- Hand off without answering: what happens on **mobile**, **with no data**, **when offline**, **when it's slow**?

---

## Core idea

Design cheap when ideas are cheap; hand off precise when building is expensive. Wireframes and prototypes are **decision-making tools**, not deliverables—their goal is to make the next decision obvious.

## Further reading

- [Nielsen Norman Group — Paper prototyping](https://www.nngroup.com/articles/paper-prototyping/) — why low fidelity works
- [Figma — Prototyping](https://help.figma.com/hc/en-us/categories/360002051613-Prototype) — features and patterns
- [Smashing Magazine — UX prototyping](https://www.smashingmagazine.com/category/ux/) — deep-dive articles
- [IDEO — Methods](https://www.ideo.com/methods) — generative research and prototyping cards

---

German version: [`wireframes-und-prototyping.md`](../../de/design/wireframes-und-prototyping.md)
