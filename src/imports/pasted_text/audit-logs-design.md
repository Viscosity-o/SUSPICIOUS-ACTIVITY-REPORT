**Prompt for Figma AI – Add “Audit Logs” Section in Left Sidebar (Enterprise Fintech Style + Backend Compatible)**

You are a **senior UI/UX designer specializing in enterprise fintech and compliance platforms used by banks**. Your task is to **add a new “Audit Logs” section to the existing SAR Generator interface** while **strictly preserving the current UI design system**.

⚠️ **Critical Constraints**

* **Do NOT change existing layout, spacing, colors, or typography.**
* **Do NOT redesign the sidebar or modify existing pages.**
* **Do NOT remove or rename existing navigation items.**
* Only **add the Audit Logs feature** so that it looks like it was **always part of the system**.
* The design must feel like a **serious enterprise compliance tool used in banking environments**.
* Ensure the layout is **frontend-ready and compatible with backend API integration (Axios / Fetch)**.

---

# 1. Sidebar Navigation Update

Add a new item in the **left sidebar menu**.

Navigation order should be:

Home
Generate SAR
SAR History
Client Data Audit
**Audit Logs**
Analytics & ROI

Design requirements:

* Use the **same sidebar component style** already used in the UI.
* Same **font size, spacing, hover states, and active indicator**.
* Use a **minimal compliance/activity icon** similar to monitoring logs or system events.
* Maintain **visual consistency with the existing design language**.

The goal is that **Audit Logs feels native to the current UI**.

---

# 2. Audit Logs Page Layout

Follow the same page structure used by **Client Data**.

Page header:

Title:
Audit Logs

Subtitle:
Monitor system activity and user actions for compliance tracking.

Under the header, include **search and filtering tools**, followed by the **audit log table**.

---

# 3. Search and Filter Section

Directly under the title area, add a **horizontal filter bar**.

Components:

Search field placeholder:

“Search logs by user, SAR ID, action, or module…”

Filter dropdowns:

User
Action Type
Module
Date Range

All controls must match the **existing input and dropdown styles used in the interface**.

---

# 4. Audit Log Table

Design a **clean enterprise-grade data table**.

Columns:

Timestamp
User
Role
Action
Module
Target Object
Status

Example row data:

2026-03-18 10:21:34
analyst_01
Investigator
Generated SAR
Generate SAR
SAR-1023
Success

Design requirements:

* Minimal table borders
* Soft row separators
* Subtle hover highlight
* Consistent padding with the rest of the system
* No colorful UI elements

This table should resemble **professional financial monitoring dashboards**.

---

# 5. Status Indicators

Include **small status tags**:

Success
Failed
Approved
Edited

Tags must be **minimal and consistent with the existing color palette**.

Do NOT introduce new colors.

---

# 6. Expandable Row Details (Optional but Recommended)

Clicking a row can reveal additional details such as:

Event ID
IP Address
Description of Action
Linked SAR ID

This should appear as a **row expansion panel**, not a modal.

---

# 7. Backend Integration Compatibility

The UI must be designed in a way that is **ready for backend API integration using Axios or Fetch**.

Design the table so that it supports **dynamic data loading**.

Expected backend API example:

GET /api/audit-logs

Example JSON response structure:

{
"timestamp": "2026-03-18T10:21:34Z",
"user": "analyst_01",
"role": "Investigator",
"action": "Generated SAR",
"module": "Generate SAR",
"target": "SAR-1023",
"status": "Success"
}

Frontend should be able to **map this response directly into the table rows**.

Pagination support should also be considered.

Example:

GET /api/audit-logs?page=1&limit=10

---

# 8. Overall Visual Tone

The Audit Logs feature must feel like:

• a **banking compliance monitoring tool**
• a **financial crime investigation platform**
• a **secure enterprise fintech system**

Avoid:

* playful UI
* heavy animations
* card-heavy layouts

Prefer **structured tables, subtle interactions, and a professional monitoring dashboard aesthetic**.

---

# Final Goal

Add an **Audit Logs section in the left sidebar and main interface** that integrates seamlessly with the SAR Generator UI while also being **ready for backend integration via Axios or Fetch-based APIs**.

The final result should look like a **professional fintech compliance system used by banks and financial institutions**.
