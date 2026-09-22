/**
 * Baskt Intelligence Layer - Enhanced Mock Data Source
 * Fully decoupled data layer with dynamic multi-platform pricing formulas
 */

window.BASKT_DATA = {
  meta: {
    title: "Baskt — Quick Commerce Intelligence Layer",
    tagline: "One basket. Every store. Better decisions.",
    contactPhone: "+91 99659 85951",
    contactPhoneRaw: "9965985951",
    demonstrationNotice: "Concept demonstration. Real-time dark store inventories, SKU matches, and delivery fees are simulated."
  },

  // Base shopping list items with unit catalog across platforms
  initialItems: [
    {
      id: "item-1",
      name: "Fresh Milk",
      subtitle: "Amul Taaza / Nandini Toned (500ml)",
      category: "Dairy",
      qty: 2,
      unit: "500ml",
      icon: "🥛",
      prices: { instamart: 29, zepto: 30, amazon: 30, bigbasket: 30, blinkit: 31 }
    },
    {
      id: "item-2",
      name: "Farm Fresh Eggs",
      subtitle: "White Table Eggs (Pack of 12)",
      category: "Pantry",
      qty: 1,
      unit: "12 pcs",
      icon: "🥚",
      prices: { instamart: 92, zepto: 94, amazon: 95, bigbasket: 98, blinkit: 102 }
    },
    {
      id: "item-3",
      name: "Whole Wheat Bread",
      subtitle: "Modern / Harvest Gold 100% Atta (400g)",
      category: "Bakery",
      qty: 1,
      unit: "400g",
      icon: "🍞",
      prices: { instamart: 45, zepto: 48, amazon: 50, bigbasket: 48, blinkit: 50 }
    },
    {
      id: "item-4",
      name: "Fresh Bananas",
      subtitle: "Robusta Grade-A Cavendish (1kg)",
      category: "Produce",
      qty: 1,
      unit: "1 kg",
      icon: "🍌",
      prices: { instamart: 50, zepto: 54, amazon: 55, bigbasket: 58, blinkit: 60 }
    },
    {
      id: "item-5",
      name: "Premium Basmati Rice",
      subtitle: "India Gate / Daawat Rozana (5kg)",
      category: "Staples",
      qty: 1,
      unit: "5 kg",
      icon: "🌾",
      prices: { instamart: 370, zepto: 360, amazon: 375, bigbasket: 380, blinkit: 372 }
    },
    {
      id: "item-6",
      name: "Herbal Toothpaste",
      subtitle: "Colgate Total / MaxFresh (150g)",
      category: "Personal Care",
      qty: 1,
      unit: "150g",
      icon: "🪥",
      prices: { instamart: 80, zepto: 82, amazon: 85, bigbasket: 85, blinkit: 85 }
    }
  ],

  // Extra quick-add items for interactive simulation
  quickAddCatalog: [
    {
      id: "item-7",
      name: "Amul Butter",
      subtitle: "Pasteurised Salted Table Butter (100g)",
      category: "Dairy",
      qty: 1,
      unit: "100g",
      icon: "🧈",
      prices: { instamart: 56, zepto: 58, amazon: 58, bigbasket: 57, blinkit: 58 }
    },
    {
      id: "item-8",
      name: "Fresh Dahi Curd",
      subtitle: "Milky Mist / Mother Dairy Cup (400g)",
      category: "Dairy",
      qty: 1,
      unit: "400g",
      icon: "🥣",
      prices: { instamart: 40, zepto: 42, amazon: 40, bigbasket: 42, blinkit: 45 }
    },
    {
      id: "item-9",
      name: "Filter Coffee Powder",
      subtitle: "Narasu's / Cothas Special (200g)",
      category: "Beverages",
      qty: 1,
      unit: "200g",
      icon: "☕",
      prices: { instamart: 115, zepto: 120, amazon: 118, bigbasket: 122, blinkit: 125 }
    },
    {
      id: "item-10",
      name: "Fresh Red Tomatoes",
      subtitle: "Country Hybrid Tomatoes (1kg)",
      category: "Produce",
      qty: 1,
      unit: "1 kg",
      icon: "🍅",
      prices: { instamart: 32, zepto: 36, amazon: 35, bigbasket: 38, blinkit: 40 }
    }
  ],

  // Platform metadata and fee formulas
  platforms: [
    {
      id: "instamart",
      name: "Swiggy Instamart",
      brandColor: "#FC8019",
      accentBg: "#FFF4EB",
      deliveryEta: "11 mins",
      darkStoresNear: 8,
      handlingFee: 5,
      deliveryThreshold: 499,
      baseDeliveryFee: 25,
      surgeFee: 0,
      badge: "Lowest Total Basket",
      rating: "4.8 ★",
      verifiedStock: "100%"
    },
    {
      id: "zepto",
      name: "Zepto",
      brandColor: "#8B3DF5",
      accentBg: "#F7F2FE",
      deliveryEta: "9 mins",
      darkStoresNear: 9,
      handlingFee: 10,
      deliveryThreshold: 499,
      baseDeliveryFee: 25,
      surgeFee: 0,
      badge: "Fastest ETA (9m)",
      rating: "4.9 ★",
      verifiedStock: "100%"
    },
    {
      id: "amazon",
      name: "Amazon Fresh / Now",
      brandColor: "#232F3E",
      accentBg: "#F4F6F8",
      deliveryEta: "25 mins",
      darkStoresNear: 5,
      handlingFee: 0,
      deliveryThreshold: 499,
      baseDeliveryFee: 0,
      surgeFee: 0,
      badge: "Zero Handling Fees",
      rating: "4.7 ★",
      verifiedStock: "100%"
    },
    {
      id: "bigbasket",
      name: "BigBasket BB Now",
      brandColor: "#84C225",
      accentBg: "#F4FAE8",
      deliveryEta: "14 mins",
      darkStoresNear: 7,
      handlingFee: 5,
      deliveryThreshold: 499,
      baseDeliveryFee: 20,
      surgeFee: 0,
      badge: "Organic Brand Match",
      rating: "4.7 ★",
      verifiedStock: "100%"
    },
    {
      id: "blinkit",
      name: "Blinkit",
      brandColor: "#F8CB46",
      accentBg: "#FFFDF2",
      deliveryEta: "12 mins",
      darkStoresNear: 11,
      handlingFee: 10,
      deliveryThreshold: 499,
      baseDeliveryFee: 25,
      surgeFee: 0,
      badge: "Dense Store Coverage",
      rating: "4.8 ★",
      verifiedStock: "100%"
    }
  ],

  // Hyperlocal locations
  locations: [
    {
      id: "chennai-adyar",
      city: "Chennai",
      locality: "Adyar / Besant Nagar",
      pincode: "600020",
      activeDarkStores: 8,
      notes: "Optimal fulfillment radius 1.8km across 4 dark store hubs"
    },
    {
      id: "chennai-omr",
      city: "Chennai",
      locality: "OMR / Thoraipakkam",
      pincode: "600097",
      activeDarkStores: 7,
      notes: "Rapid delivery pod hub for high-rise residential tech corridors"
    },
    {
      id: "blr-koramangala",
      city: "Bengaluru",
      locality: "Koramangala 4th Block",
      pincode: "560034",
      activeDarkStores: 11,
      notes: "High dark store density with aggressive localized SKU promotions"
    },
    {
      id: "mumbai-bandra",
      city: "Mumbai",
      locality: "Bandra West (Pali Hill)",
      pincode: "400050",
      activeDarkStores: 9,
      notes: "Premium organic catalog availability and fast two-wheeler transit"
    },
    {
      id: "delhi-gurugram",
      city: "Delhi NCR",
      locality: "DLF Phase 5, Gurugram",
      pincode: "122002",
      activeDarkStores: 12,
      notes: "Surge-adjusted dynamic fees calibrated in real time"
    }
  ]
};
