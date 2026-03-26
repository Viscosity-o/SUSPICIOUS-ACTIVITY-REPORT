**Prompt for Figma AI – Refine SAR Generation Animation (Do NOT Change Existing Layout, Colors, or Fonts)**

You are a **senior enterprise UI/UX designer specializing in financial compliance software used by global banks**. Your task is to **redesign only the animation and micro-interaction of the SAR report generation process** so it looks **professional, serious, and enterprise-grade**, suitable for a **banking compliance environment like Barclays**.

⚠️ **Critical constraints you must follow:**

* **Do NOT modify any existing layout, spacing, components, buttons, icons, or navigation.**
* **Do NOT change any colors, typography, or fonts already used in the design.**
* **Do NOT remove or add new product features.**
* **Only improve the animation and loading behavior for the SAR report generation process.**
* Maintain **pixel-perfect compatibility with the current Figma design system.**

---

### Context

The user uploads a file containing **transaction or alert data**, and the system uses an **LLM to generate a Suspicious Activity Report (SAR)**.

The current animation looks **too playful and childish**, which is inappropriate for a **financial crime investigation tool**. The new animation should feel **calm, professional, analytical, and trustworthy**, similar to **enterprise compliance platforms used by banks**.

---

# Animation Design Goals

The generation process must feel:

• Professional
• Serious
• Analytical
• Minimal
• Quietly powerful
• Enterprise-grade
• Suitable for financial crime investigation tools

Avoid anything that looks like:

* playful loaders
* cartoonish typing effects
* bouncing dots
* exaggerated progress bars
* colorful playful motion

---

# Proposed Animation Concept: “Secure Intelligence Processing”

When the user uploads a file and generation starts, display a **calm, structured processing state** that visually communicates **data analysis and report construction**.

### Animation Behavior

**Phase 1 – Secure Intake (0–1.5s)**

* After upload, show a subtle **data ingestion indicator**.
* A thin **horizontal progress trace line** appears beneath the generation area.
* The line softly pulses to indicate system activity.
* Motion is **very subtle (low amplitude easing)**.

**Phase 2 – Analytical Processing (1.5–4s)**

* Instead of playful typing animation, display **structured text blocks appearing progressively**.
* Sections fade in sequentially like:

  * “Transaction Pattern Analysis”
  * “Risk Indicator Detection”
  * “Narrative Construction”
* Each section appears with **200–300ms fade + slight upward motion (4–6px)**.
* This should resemble **a professional analytical system assembling a report**, not typing.

**Phase 3 – Intelligence Compilation**

* Show a **minimal vertical progress marker** or **status indicator** that moves through stages:

  * Data parsing
  * Pattern evaluation
  * Risk scoring
  * SAR narrative generation

Use **small neutral indicators**, not colorful progress bars.

**Phase 4 – Report Ready**

* When complete, show a **very subtle confirmation transition**:

  * Generation panel stabilizes
  * Final report fades in smoothly
  * A small professional status text appears:

“Report generation complete. Ready for review.”

No confetti, checkmark explosions, or playful visuals.

---

# Motion Principles

Follow **enterprise motion design rules**:

Animation Duration

* 200–350ms transitions
* 600–900ms system processing loops

Easing

* Use **ease-out cubic curves**
* No bouncy or elastic easing

Movement

* Max motion distance: **4–8px**

Opacity

* Fade transitions preferred over movement

---

# Visual Tone

The animation should feel like:

• A **financial intelligence system analyzing data**
• A **compliance investigation workflow**
• A **secure internal banking tool**

Think of the tone used in:

* enterprise analytics dashboards
* regulatory reporting systems
* financial crime
