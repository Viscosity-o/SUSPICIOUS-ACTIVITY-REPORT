Update ONLY the **Visualization tab** of the dashboard. Do not modify the SAR Narrative tab, Approval tab, sidebar, or global navigation.

Design the Visualization tab as a **clean, minimal financial investigation dashboard similar to modern banking interfaces**.

The UI should be structured so it can later be implemented using:

* Plotly Dash for dashboard layout
* Plotly charts for interactive graphs
* Cytoscape.js for transaction network visualization
* LangChain + Llama 3.1 for AI-driven analysis

These frameworks do NOT need to be implemented in the design, but the layout should include **clear placeholders for these components**.

### Design Style

Minimal financial UI:

* White or light grey background
* Blue primary color
* Yellow warning indicators
* Red suspicious indicators
* Clean spacing and grid alignment

### Visualization Tab Layout

1. **AI Prompt Analysis Section**
   At the top of the tab create a prompt input bar.

Components:

* Input field
* “Analyze Data” button
* Small helper text

This section represents the AI prompt system that dynamically updates visualizations.

---

2. **Case Summary Row**
   Display four summary cards:

* Total Transaction Amount
* Number of Transactions
* Time Window
* Destination Risk

Minimal cards with icons and large numeric values.

---

3. **Transaction Network Graph Area**
   Create a large visualization section titled:

"Transaction Network Flow"

Design it as a node-based graph showing:

Source Accounts → Target Account → Offshore Destination

This represents a Cytoscape.js network graph.

---

4. **Transaction Pattern Charts**
   Add two side-by-side chart areas:

Left:
"Transaction Amount Over Time" (line chart placeholder)

Right:
"Top Sending Accounts" (bar chart placeholder)

Design these to resemble interactive Plotly charts.

---

5. **Transaction Timeline**
   Below the charts create a chronological event timeline showing:

Date
Account ID
Transaction amount
Destination account

Use color indicators:
Green = normal
Yellow = warning
Red = suspicious

---

6. **AI Analysis Panel**
   Add a panel titled:

"AI Investigation Summary"

Display bullet-point explanations of suspicious patterns.

---

### Layout Order

Prompt Input
Case Summary
Transaction Network Graph
Charts
Timeline
AI Analysis Panel

---

Important:
Only modify the Visualization tab.
Keep the rest of the dashboard unchanged.
Maintain a professional banking dashboard appearance.
