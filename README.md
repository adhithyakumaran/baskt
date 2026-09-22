# Baskt — Quick-Commerce Shopping Intelligence Layer

A modern, public product showcase and concept demonstration website for **Baskt**, an AI-powered shopping intelligence platform built for India's quick-commerce ecosystem.

---

## 1. Product Concept

Today, a quick-commerce shopper in India must manually check multiple apps—**Zepto, Blinkit, Swiggy Instamart, BigBasket (BB Now), and Amazon Fresh**—to discover which store offers the best overall basket price, availability, and delivery ETA. 

**Baskt** sits as an intelligent layer between the user's shopping list and India's quick-commerce dark stores. It takes:
1. **User Location** (Hyperlocal street geofence & pincode)
2. **Shopping List** (Natural language grocery essentials)

It normalizes cross-platform SKUs, checks micro-fulfillment inventory, calculates dynamic handling and surge surcharges, and delivers a transparent, deterministic basket comparison.

> **"We compare the basket, not just the product."**

---

## 2. Design System & Visual Direction

Inspired by bold, high-contrast editorial tech layouts (e.g. the reference design language):
* **Color-Blocked Storytelling**: Deep forest green (`#162C0B`), vibrant olive (`#5B8418`), warm linen cream (`#F7F8F1`), and crisp dark modes.
* **Controlled Accent Palette**: Adhering strictly to the directive to use warm amber/orange sparingly—reserved exclusively for subtle status badges, best-value indicators, and focus highlights.
* **Pastel-Tinted Modular Cards**: Soft lavender, sage mint, gentle blush, and periwinkle cards inspired by editorial crypto/deep-tech layouts.
* **Commerce Flywheel**: Interactive cyclical engine illustrating aggregated consumer intent, multi-store indexing, optimal basket routing, compounded consumer savings, and platform efficiency.
* **Component-Decoupled Architecture**: Clean separation between raw mock data (`js/data.js`), master design tokens (`css/styles.css`), and dynamic reactive UI components (`js/app.js`).

---

## 3. Website Sections Breakdown

1. **Section 1 — Hero**: 
   * Headline: *"One basket. Every store. Better decisions."*
   * Interactive pipeline centerpiece connecting *Shopping List → Baskt Intelligence Layer → 4 Normalized Stores (Zepto ₹708, Blinkit ₹741, Instamart ₹700 [Best Value], BigBasket ₹729)*.
2. **Section 2 — The Problem**:
   * Headline: *"Shopping shouldn't require checking five apps."*
   * 7-step visual frustration journey depicting the tedious cycle of app-hopping, repeat searching, and hidden cart minimums.
3. **Section 3 — The Idea (Architecture)**:
   * 5-layer conceptual architecture stack: *User Shopping List → Product Understanding (SKU normalization) → Location Awareness (Geofenced Pods) → Inventory Intelligence (Stock parity) → Basket Comparison Engine*.
4. **Section 4 — How It Works**:
   * 4 numbered stages with preview tags:
     * `01` Tell us what you need
     * `02` Tell us where you are
     * `03` We compare the basket
     * `04` You choose where to buy
5. **Section 5 — Live Concept Demo (Interactive Simulator)**:
   * Interactive demonstration with live location switcher (Chennai Adyar, Bengaluru Koramangala, Mumbai Bandra, Delhi NCR Gurugram).
   * 6 sample essentials: Milk (2x), Eggs (12x), Bread, Bananas (1kg), Basmati Rice (5kg), Toothpaste.
   * Dynamic radar scan recalculation with itemized unit pricing, SKU confidence scores, handling fees, and delivery surcharges.
6. **Section 6 — Why Location Matters**:
   * Highlights hyperlocal dark store variance: *"Same product. Different location. Different store. Different inventory. Different price."*
   * Step-by-step pipeline from Chennai delivery geofence to micro-depot inventory and dynamic landing costs.
7. **Section 7 — The Intelligence**:
   * 7 core intelligence dimensions: Product matching, Pack size normalization, Real-time availability, Hyperlocal location, Dark store inventory, Platform fees, and Basket-level pricing.
   * Central axiom banner: *"We compare the basket, not just the product."*
8. **Section 8 — Future Experience (Roadmap)**:
   * 4-phase user flow: Compare → Choose a store → Prepare your basket → Continue to checkout.
   * Three-tiered roadmap (Present Unified Engine → In-Development Autonomous Sync → Future Agentic Checkout).
9. **Section 9 — Vision & The Commerce Flywheel**:
   * Headline: *"Commerce is fragmented. Your shopping shouldn't be."*
   * 5-stage orbital commerce flywheel diagram.
10. **Section 10 — Final CTA & Waitlist**:
    * Headline: *"Your basket. Every option. One clear view."*
    * Functional modal form with role selector (Consumer, Investor, Commerce Partner, Engineer).

---

## 4. File Structure

```
├── index.html          # Semantic, accessible HTML5 structure
├── css/
│   └── styles.css      # Design tokens, typography, color-blocked sections, animations
├── js/
│   ├── data.js         # Decoupled mock database (stores, SKUs, locations, roadmap)
│   └── app.js          # Interactive simulator, location switcher, modal & scroll handlers
├── artifacts/
│   └── planner/
│       └── task.md     # Development task tracker
└── README.md           # Product documentation and architecture overview
```
