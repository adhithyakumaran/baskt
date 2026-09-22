/**
 * Baskt — Quick Commerce Intelligence Layer
 * Interactive Application & Simulation Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.BASKT_DATA;
  if (!data) {
    console.error("Baskt data layer not initialized.");
    return;
  }

  // State Management
  let activeItems = JSON.parse(JSON.stringify(data.initialItems));
  let currentPlatformId = "instamart";
  let currentLocationId = "chennai-adyar";

  /* ------------------------------------------------------------------------
     1. Header Scroll Shadow & Mobile Menu
     ------------------------------------------------------------------------ */
  const header = document.querySelector(".site-header");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mobileDrawer = document.querySelector("#mobile-nav-drawer");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });
    mobileDrawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => mobileDrawer.classList.remove("open"));
    });
  }

  /* ------------------------------------------------------------------------
     2. Location Selector
     ------------------------------------------------------------------------ */
  const locationSelect = document.getElementById("sim-location-select");
  function setupLocations() {
    if (!locationSelect) return;
    locationSelect.innerHTML = "";

    data.locations.forEach(loc => {
      const opt = document.createElement("option");
      opt.value = loc.id;
      opt.textContent = `${loc.city} — ${loc.locality} (${loc.pincode})`;
      if (loc.id === currentLocationId) opt.selected = true;
      locationSelect.appendChild(opt);
    });

    locationSelect.addEventListener("change", (e) => {
      currentLocationId = e.target.value;
      simulateBasketCalculation();
    });
  }

  /* ------------------------------------------------------------------------
     4. Dynamic Basket Calculations Across Platforms
     ------------------------------------------------------------------------ */
  function calculatePlatformTotals() {
    return data.platforms.map(plat => {
      let itemSubtotal = 0;
      const breakdownItems = activeItems.map(item => {
        const unitPrice = item.prices[plat.id] || 35;
        const lineTotal = unitPrice * item.qty;
        itemSubtotal += lineTotal;
        return {
          id: item.id,
          name: `${item.name} (${item.subtitle})`,
          qty: item.qty,
          unit: item.unit,
          unitPrice,
          lineTotal
        };
      });

      const deliveryFee = itemSubtotal >= plat.deliveryThreshold ? 0 : plat.baseDeliveryFee;
      const grandTotal = itemSubtotal + deliveryFee + plat.handlingFee + plat.surgeFee;

      return {
        ...plat,
        itemSubtotal,
        deliveryFee,
        grandTotal,
        breakdownItems
      };
    }).sort((a, b) => a.grandTotal - b.grandTotal);
  }

  /* ------------------------------------------------------------------------
     5. Render Items List with Quantity Controls (+ / -)
     ------------------------------------------------------------------------ */
  const itemsContainer = document.getElementById("sim-items-container");
  const itemCountBadge = document.getElementById("sim-item-count-badge");
  const quickChipsContainer = document.getElementById("quick-catalog-chips");

  function renderQuickChips() {
    if (!quickChipsContainer) return;
    quickChipsContainer.innerHTML = "";

    data.quickAddCatalog.forEach(item => {
      const alreadyIn = activeItems.some(ai => ai.id === item.id);
      if (alreadyIn) return;

      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip-btn";
      chip.innerHTML = `+ ${item.name}`;
      chip.addEventListener("click", () => {
        activeItems.push(JSON.parse(JSON.stringify(item)));
        renderItemList();
        renderQuickChips();
        updateAllCalculations();
      });
      quickChipsContainer.appendChild(chip);
    });
  }

  function renderItemList() {
    if (!itemsContainer) return;
    itemsContainer.innerHTML = "";

    if (itemCountBadge) {
      itemCountBadge.textContent = `${activeItems.length} ITEMS`;
    }

    activeItems.forEach(item => {
      const row = document.createElement("div");
      row.className = "sim-item-row";
      row.innerHTML = `
        <div class="sim-item-info">
          <span class="sim-item-icon">${item.icon}</span>
          <div>
            <div class="sim-item-title">${item.name}</div>
            <div class="sim-item-qty">${item.subtitle}</div>
          </div>
        </div>
        <div class="qty-counter-ctrl">
          <button type="button" class="qty-btn btn-minus" aria-label="Decrease quantity">−</button>
          <span class="qty-num">${item.qty}</span>
          <button type="button" class="qty-btn btn-plus" aria-label="Increase quantity">+</button>
        </div>
      `;

      row.querySelector(".btn-minus").addEventListener("click", () => {
        if (item.qty > 1) {
          item.qty--;
        } else {
          if (activeItems.length > 1) {
            activeItems = activeItems.filter(i => i.id !== item.id);
          }
        }
        renderItemList();
        renderQuickChips();
        updateAllCalculations();
      });

      row.querySelector(".btn-plus").addEventListener("click", () => {
        item.qty++;
        renderItemList();
        updateAllCalculations();
      });

      itemsContainer.appendChild(row);
    });
  }

  /* ------------------------------------------------------------------------
     6. Render Platform Cards, Savings Ribbon, Graph & Table
     ------------------------------------------------------------------------ */
  const platformsContainer = document.getElementById("platforms-cards-grid");
  const breakdownTbody = document.getElementById("breakdown-tbody");
  const breakdownSelectedTitle = document.getElementById("breakdown-platform-title");
  const breakdownMeta = document.getElementById("breakdown-summary-meta");
  const savingsTextDesc = document.getElementById("savings-text-desc");
  const savingsBadgeVal = document.getElementById("savings-badge-val");
  const relGraphBarsContainer = document.getElementById("rel-graph-bars-container");

  function updateAllCalculations() {
    const calculatedPlatforms = calculatePlatformTotals();
    const winner = calculatedPlatforms[0];
    const secondBest = calculatedPlatforms[1] || calculatedPlatforms[0];
    const diff = secondBest.grandTotal - winner.grandTotal;
    const pct = ((diff / secondBest.grandTotal) * 100).toFixed(1);

    // Update savings ribbon
    if (savingsTextDesc && savingsBadgeVal) {
      if (diff > 0) {
        savingsTextDesc.textContent = `Best basket found: ${winner.name} saves ₹${diff} compared to ${secondBest.name}.`;
        savingsBadgeVal.textContent = `₹${diff} Cheaper (${pct}% Savings)`;
      } else {
        savingsTextDesc.textContent = `Parity across top platforms. ${winner.name} offers fastest ETA (${winner.deliveryEta}).`;
        savingsBadgeVal.textContent = `Optimal Basket Match`;
      }
    }

    // Render 5 platform cards
    if (platformsContainer) {
      platformsContainer.innerHTML = "";
      calculatedPlatforms.forEach(plat => {
        const isWinner = plat.id === winner.id;
        const isSelected = plat.id === currentPlatformId;
        const card = document.createElement("div");
        card.className = `platform-rank-card ${isWinner ? "winner" : ""} ${isSelected ? "selected" : ""}`;
        card.dataset.id = plat.id;

        card.innerHTML = `
          ${isWinner ? '<div class="winner-pill-tag">Best Value</div>' : ''}
          <div style="width:28px; height:28px; border-radius:6px; background:${plat.accentBg}; border:1px solid rgba(0,0,0,0.06); margin:0 auto 6px auto; display:flex; align-items:center; justify-content:center; font-size:0.85rem;">
            🛒
          </div>
          <div class="platform-logo-title" style="color:${plat.brandColor};">${plat.name}</div>
          <div class="platform-basket-price">₹${plat.grandTotal}</div>
          <div class="platform-eta-pill">⚡ ${plat.deliveryEta}</div>
          <div style="font-size:0.68rem; color:var(--color-olive-dark); font-weight:700; margin-top:4px;">${plat.badge}</div>
        `;

        card.addEventListener("click", () => {
          currentPlatformId = plat.id;
          updateAllCalculations();
        });

        platformsContainer.appendChild(card);
      });
    }

    // Render Relative Benchmark Graph
    if (relGraphBarsContainer) {
      relGraphBarsContainer.innerHTML = "";
      const maxPrice = Math.max(...calculatedPlatforms.map(p => p.grandTotal));
      const minPrice = Math.min(...calculatedPlatforms.map(p => p.grandTotal));

      calculatedPlatforms.forEach(plat => {
        const widthPercent = Math.max(30, (plat.grandTotal / maxPrice) * 100);
        const isWinner = plat.id === winner.id;
        const barRow = document.createElement("div");
        barRow.className = "rel-graph-row";
        barRow.innerHTML = `
          <div style="font-size:0.85rem; font-weight:700; color:var(--color-forest);">${plat.name}</div>
          <div class="rel-graph-bar-track">
            <div class="rel-graph-bar-fill" style="width:${widthPercent}%; background:${isWinner ? 'var(--color-olive)' : 'rgba(20,40,11,0.25)'};"></div>
          </div>
          <div style="font-family:var(--font-mono); font-weight:700; font-size:0.86rem; text-align:right; color:${isWinner ? 'var(--color-olive-dark)' : 'var(--color-text-main)'};">
            ₹${plat.grandTotal}
          </div>
        `;
        relGraphBarsContainer.appendChild(barRow);
      });
    }

    // Render Table Breakdown for current selected platform
    const activePlat = calculatedPlatforms.find(p => p.id === currentPlatformId) || winner;

    if (breakdownSelectedTitle) {
      breakdownSelectedTitle.innerHTML = `
        <span style="color:${activePlat.brandColor}; font-weight:800;">${activePlat.name}</span> Itemized Basket
      `;
    }

    if (breakdownMeta) {
      breakdownMeta.innerHTML = `
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-olive-dark); background:var(--pastel-mint); padding:4px 10px; border-radius:99px; font-weight:700;">
          ✓ Verified Stock · ETA ${activePlat.deliveryEta}
        </span>
      `;
    }

    if (breakdownTbody) {
      breakdownTbody.innerHTML = "";

      activePlat.breakdownItems.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>
            <div class="breakdown-sku-name">${item.name}</div>
            <div class="breakdown-sku-meta">Normalized SKU · In-Stock Dark Store Verified</div>
          </td>
          <td style="font-family:var(--font-mono); font-weight:700;">${item.qty}</td>
          <td style="font-family:var(--font-mono);">₹${item.unitPrice}</td>
          <td style="font-family:var(--font-mono); font-weight:700; text-align:right;">₹${item.lineTotal}</td>
        `;
        breakdownTbody.appendChild(tr);
      });

      // Fees row
      const totalFees = activePlat.handlingFee + activePlat.deliveryFee + activePlat.surgeFee;
      const feeTr = document.createElement("tr");
      feeTr.className = "fee-breakdown-row";
      feeTr.innerHTML = `
        <td colspan="3" style="color:var(--color-text-muted);">
          Platform Fees & Handling (Handling: ₹${activePlat.handlingFee} | Delivery: ₹${activePlat.deliveryFee} | Surge: ₹${activePlat.surgeFee})
        </td>
        <td style="font-family:var(--font-mono); font-weight:700; text-align:right;">
          ₹${totalFees}
        </td>
      `;
      breakdownTbody.appendChild(feeTr);

      // Grand total row
      const totalTr = document.createElement("tr");
      totalTr.style.background = "var(--color-sand)";
      totalTr.innerHTML = `
        <td colspan="3" style="font-family:var(--font-display); font-weight:800; font-size:1.05rem; color:var(--color-forest);">
          Total Basket Landing Cost
        </td>
        <td style="font-family:var(--font-display); font-weight:800; font-size:1.35rem; color:var(--color-forest); text-align:right;">
          ₹${activePlat.grandTotal}
        </td>
      `;
      breakdownTbody.appendChild(totalTr);
    }
  }

  /* ------------------------------------------------------------------------
     7. Simulate Recalculation Effect (Scanning Radar State)
     ------------------------------------------------------------------------ */
  const simulateBtn = document.getElementById("btn-simulate-calc");
  const scanningBox = document.getElementById("sim-scanning-box");
  const resultsBox = document.getElementById("sim-results-box");
  const scanningStatusText = document.getElementById("scanning-status-text");

  function simulateBasketCalculation() {
    if (!scanningBox || !resultsBox) return;

    resultsBox.classList.add("hidden");
    scanningBox.classList.add("active");

    const statuses = [
      "1/4 · Querying local fulfillment zones...",
      "2/4 · Cross-referencing dark store inventories...",
      "3/4 · Normalizing pack sizes & SKU equivalents...",
      "4/4 · Reconciling platform fees & surge pricing..."
    ];

    let i = 0;
    if (scanningStatusText) scanningStatusText.textContent = statuses[0];

    const interval = setInterval(() => {
      i++;
      if (i < statuses.length && scanningStatusText) {
        scanningStatusText.textContent = statuses[i];
      } else {
        clearInterval(interval);
        setTimeout(() => {
          scanningBox.classList.remove("active");
          resultsBox.classList.remove("hidden");
          updateAllCalculations();
        }, 260);
      }
    }, 240);
  }

  if (simulateBtn) {
    simulateBtn.addEventListener("click", () => {
      simulateBasketCalculation();
    });
  }

  /* ------------------------------------------------------------------------
     8. Modal Dialogue Handlers
     ------------------------------------------------------------------------ */
  const modal = document.getElementById("waitlist-modal");
  const openModalBtns = document.querySelectorAll(".trigger-waitlist-modal");
  const closeModalBtn = document.querySelector(".modal-close-btn");
  const waitlistForm = document.getElementById("waitlist-form");
  const waitlistSuccess = document.getElementById("waitlist-success");

  openModalBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add("open");
        if (waitlistSuccess) waitlistSuccess.classList.remove("show");
        if (waitlistForm) waitlistForm.style.display = "flex";
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }

  if (waitlistForm) {
    waitlistForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = waitlistForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        waitlistForm.style.display = "none";
        if (waitlistSuccess) waitlistSuccess.classList.add("show");
      }
    });
  }

  /* ------------------------------------------------------------------------
     9. Initial Page Load Execution
     ------------------------------------------------------------------------ */
  setupLocations();
  renderItemList();
  renderQuickChips();
  updateAllCalculations();
});
