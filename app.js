const iconPaths = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  discover:
    '<path d="m14 4 6 6-9 9-7-1-1-7 9-9z"/><circle cx="15" cy="9" r="1"/>',
  bookmark: '<path d="M6 4h12v17l-6-4-6 4z"/>',
  settings:
    '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor"/><circle cx="15" cy="17" r="3" fill="currentColor"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z"/><circle cx="12" cy="10" r="2.3"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  compare: '<path d="M6 3v18M18 3v18M3 7h6M15 17h6M9 7l4 4M15 17l-4-4"/>',
  check: '<path d="m5 12 4 4 10-10"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  bag: '<path d="M5 7h14l2 14H3L5 7zM8 8V6a4 4 0 0 1 8 0v2"/>',
  share:
    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 10 6-4m-6 8 6 4"/>',
  reset: '<path d="M4 11a8 8 0 1 1 2 7M4 4v7h7"/>',
  bell: '<path d="M5 16h14l-2-3V9a5 5 0 0 0-10 0v4l-2 3zm4 4h6"/>',
  export: '<path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/>',
};
const ico = (name) =>
  `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.info}</svg>`;
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const money = (amount) => `$${Number(amount).toFixed(2)}`;
const SHOPPING_AREAS = ["Carlton", "Melbourne", "Fitzroy"];
const HISTORY_DATES = ["19 Sep", "26 Sep", "3 Oct", "10 Oct"];
// Keep the legacy key so existing shopping lists remain available.
const STORAGE_KEY = "dealwise-v1";

const offers = [
  {
    id: "ww-oats",
    group: "oats",
    name: "Rolled Oats",
    brand: "Woolworths Essentials",
    retailer: "Woolworths",
    price: 3.6,
    previous: 4.5,
    size: 750,
    measure: "g",
    category: "Groceries",
    stock: "available",
    tone: "sage",
    source: "Catalogue",
    checked: "10 Oct, 9:15 am",
    expiry: "14 Oct 2026",
    expiryOrder: 14,
    condition: "No membership required.",
    delivery: 7,
    history: [4.5, 4.5, 4.5, 3.6],
    distances: { Carlton: 0.6, Melbourne: 0.9, Fitzroy: 1.8 },
    locations: {
      Carlton: "Lygon Street",
      Melbourne: "QV Melbourne",
      Fitzroy: "Smith Street",
    },
  },
  {
    id: "coles-oats",
    group: "oats",
    name: "Rolled Oats",
    brand: "Coles",
    retailer: "Coles",
    price: 4.5,
    previous: 5.4,
    size: 1000,
    measure: "g",
    category: "Groceries",
    stock: "available",
    tone: "yellow",
    source: "Product listing",
    checked: "10 Oct, 9:10 am",
    expiry: "14 Oct 2026",
    expiryOrder: 14,
    condition: "No membership required.",
    delivery: 5,
    history: [5.4, 5.4, 5.0, 4.5],
    distances: { Carlton: 1.2, Melbourne: 0.3, Fitzroy: 0.7 },
    locations: {
      Carlton: "Melbourne Central",
      Melbourne: "Melbourne Central",
      Fitzroy: "Smith Street",
    },
  },
  {
    id: "aldi-oats",
    group: "oats",
    name: "Rolled Oats",
    brand: "Goldenvale",
    retailer: "ALDI",
    price: 3.8,
    previous: 4.2,
    size: 1000,
    measure: "g",
    category: "Groceries",
    stock: "sold",
    tone: "peach",
    source: "Catalogue",
    checked: "10 Oct, 9:00 am",
    expiry: "13 Oct 2026",
    expiryOrder: 13,
    condition: "Local stock reported unavailable.",
    delivery: null,
    history: [4.2, 4.2, 4.0, 3.8],
    distances: { Carlton: 2.2, Melbourne: 1.6, Fitzroy: 0.8 },
    locations: {
      Carlton: "Fitzroy",
      Melbourne: "Franklin Street",
      Fitzroy: "Johnston Street",
    },
  },
  {
    id: "coles-rice",
    group: "rice",
    name: "Jasmine Rice",
    brand: "Coles",
    retailer: "Coles",
    price: 3.2,
    previous: 4,
    size: 1000,
    measure: "g",
    category: "Groceries",
    stock: "available",
    tone: "yellow",
    source: "Product listing",
    checked: "10 Oct, 9:10 am",
    expiry: "14 Oct 2026",
    expiryOrder: 14,
    condition: "No membership required.",
    delivery: 5,
    history: [4, 4, 3.8, 3.2],
    distances: { Carlton: 1.2, Melbourne: 0.3, Fitzroy: 0.7 },
    locations: {
      Carlton: "Melbourne Central",
      Melbourne: "Melbourne Central",
      Fitzroy: "Smith Street",
    },
  },
  {
    id: "ww-eggs",
    group: "eggs",
    name: "Free Range Eggs",
    brand: "Woolworths",
    retailer: "Woolworths",
    price: 5.8,
    previous: 6.5,
    size: 12,
    measure: "each",
    category: "Groceries",
    stock: "unknown",
    tone: "sage",
    source: "Product listing",
    checked: "10 Oct, 8:45 am",
    expiry: "14 Oct 2026",
    expiryOrder: 14,
    condition: "Stock unconfirmed. No membership required.",
    delivery: 7,
    history: [6.5, 6.5, 6.5, 5.8],
    distances: { Carlton: 0.6, Melbourne: 0.9, Fitzroy: 1.8 },
    locations: {
      Carlton: "Lygon Street",
      Melbourne: "QV Melbourne",
      Fitzroy: "Smith Street",
    },
  },
  {
    id: "cw-shampoo",
    group: "shampoo",
    name: "Daily Nourishing Shampoo",
    brand: "Sukin",
    retailer: "Chemist Warehouse",
    price: 7.5,
    previous: 12,
    size: 500,
    measure: "ml",
    category: "Toiletries",
    stock: "available",
    tone: "blue",
    source: "Catalogue",
    checked: "10 Oct, 9:20 am",
    expiry: "12 Oct 2026",
    expiryOrder: 12,
    condition: "Standard offer. No membership required.",
    delivery: 6,
    history: [12, 10, 12, 7.5],
    distances: { Carlton: 0.4, Melbourne: 0.5, Fitzroy: 1.1 },
    locations: {
      Carlton: "Lygon Street",
      Melbourne: "Elizabeth Street",
      Fitzroy: "Brunswick Street",
    },
  },
];

// Fictional public prices; member prices are shown separately.
function addOffer(baseId, patch) {
  const base = offers.find((offer) => offer.id === baseId);
  const store =
    offers.find((offer) => offer.retailer === patch.retailer) || base;
  offers.push({
    ...base,
    distances: { ...store.distances },
    locations: { ...store.locations },
    ...patch,
  });
}
addOffer("coles-rice", {
  id: "ww-rice",
  brand: "Woolworths Essentials",
  retailer: "Woolworths",
  price: 2.6,
  previous: 3.4,
  size: 750,
  tone: "sage",
  history: [3.4, 3.2, 3.4, 2.6],
  source: "App",
  delivery: 7,
});
addOffer("coles-rice", {
  id: "aldi-rice",
  brand: "Imperial Grain",
  retailer: "ALDI",
  price: 2.8,
  previous: 3.5,
  tone: "peach",
  history: [3.5, 3.5, 3.2, 2.8],
  delivery: null,
});
addOffer("ww-eggs", {
  id: "coles-eggs",
  brand: "Coles",
  retailer: "Coles",
  price: 6.0,
  previous: 6.8,
  stock: "available",
  tone: "yellow",
  history: [6.8, 6.8, 6.5, 6],
  delivery: 5,
  condition: "12 free-range eggs. Standard offer.",
});
addOffer("cw-shampoo", {
  id: "coles-shampoo",
  retailer: "Coles",
  price: 9.0,
  previous: 12,
  memberPrice: 8.4,
  tone: "sage",
  history: [12, 12, 10, 9],
  delivery: 5,
  condition: "Standard price $9.00. Member price $8.40.",
});
addOffer("cw-shampoo", {
  id: "ww-shampoo",
  retailer: "Woolworths",
  price: 10.0,
  previous: 12,
  stock: "unknown",
  sponsored: true,
  tone: "yellow",
  history: [12, 12, 12, 10],
  delivery: 7,
  condition: "Standard offer. Check local stock.",
});
addOffer("cw-shampoo", {
  id: "ww-detergent",
  group: "detergent",
  name: "Laundry Liquid",
  brand: "Earth Choice",
  retailer: "Woolworths",
  price: 7.0,
  previous: 9.0,
  size: 1000,
  category: "Household",
  history: [9, 9, 8.5, 7],
  delivery: 7,
  tone: "sage",
  condition: "Standard offer. No membership required.",
});
addOffer("ww-detergent", {
  id: "coles-detergent",
  brand: "Coles",
  retailer: "Coles",
  price: 7.8,
  previous: 10.0,
  size: 2000,
  tone: "blue",
  history: [10, 10, 9, 7.8],
  delivery: 5,
});
addOffer("cw-shampoo", {
  id: "cw-shampoo-expired",
  price: 6.5,
  previous: 12,
  history: [12, 10, 12, 6.5],
  expiry: "9 Oct 2026",
  expiryOrder: 9,
  checked: "8 Oct, 9:20 am",
  condition: "Offer ended 9 Oct.",
});
for (const offer of offers) {
  offer.startsOn = "2026-10-07";
  offer.expiresOn = `2026-10-${String(offer.expiryOrder).padStart(2, "0")}`;
  offer.channel = "Online & in-store";
}
Object.assign(
  offers.find((offer) => offer.id === "cw-shampoo"),
  {
    stockWas: "sold",
    code: "SAVE10",
    channel: "Online only",
    condition: "Use SAVE10 for $7.50. Price before code: $8.33.",
  },
);
const demoDay = "2026-10-10";
const daysLeft = (offer) =>
  Math.round(
    (Date.parse(offer.expiresOn + "T00:00:00Z") -
      Date.parse(demoDay + "T00:00:00Z")) /
      86400000,
  );
const isExpired = (offer) => daysLeft(offer) < 0;
const discount = (offer) =>
  Math.round(((offer.previous - offer.price) / offer.previous) * 10000) / 100;
const resetFilters = () => ({
  query: "",
  category: "All offers",
  sort: "featured",
  retailer: "All retailers",
  distance: "any",
  available: false,
  minDiscount: "0",
  expiry: "any",
  showExpired: false,
  filters: false,
  comparison: [],
  priceLens: "unit",
});

const unitValue = (offer) =>
  (offer.price / offer.size) * (offer.measure === "each" ? 1 : 100);
const unitLabel = (offer) =>
  `${money(unitValue(offer))} / ${offer.measure === "each" ? "egg" : "100" + offer.measure}`;
const sizeLabel = (offer) =>
  offer.measure === "each"
    ? `${offer.size} pack`
    : offer.size >= 1000 && offer.measure === "g"
      ? `${offer.size / 1000} kg`
      : offer.size >= 1000 && offer.measure === "ml"
        ? `${offer.size / 1000} L`
        : `${offer.size} ${offer.measure}`;
const stockLabel = (offer) =>
  isExpired(offer)
    ? "Expired"
    : {
        available: "Stock reported",
        sold: "Out of stock",
        unknown: "Stock unconfirmed",
      }[offer.stock];
const getOffer = (id) => offers.find((offer) => offer.id === id);

const stockClass = (offer) => (isExpired(offer) ? "sold" : offer.stock);
const stockBadge = (offer) =>
  `<span class="stock ${stockClass(offer)}">${stockLabel(offer)}</span>`;
const promotionLabel = (offer, withYear = false) =>
  `${Number(offer.startsOn.slice(-2))}–${offer.expiryOrder} Oct${withYear ? " 2026" : ""}`;
function matchingOffers(id) {
  const group = getOffer(id).group;
  return offers
    .filter((offer) => offer.group === group && !isExpired(offer))
    .slice(0, 3);
}
function lowestAvailablePrice(selected, price = unitValue) {
  const available = selected.filter(
    (offer) => offer.stock === "available" && !isExpired(offer),
  );
  return available.length ? Math.min(...available.map(price)) : null;
}
function budgetSummary() {
  const total = listTotal(),
    over = total > state.budget;
  return {
    total,
    over,
    itemCount: Object.values(state.saved).reduce(
      (sum, quantity) => sum + quantity,
      0,
    ),
    percentage:
      state.budget > 0
        ? Math.min(100, (total / state.budget) * 100)
        : total > 0
          ? 100
          : 0,
    message: over
      ? money(total - state.budget) + " over budget"
      : money(state.budget - total) + " remaining",
  };
}
function updateBudgetDisplay() {
  const { over, percentage, message } = budgetSummary();
  const status = document.querySelector("#budget-status");
  status.textContent = message;
  status.classList.toggle("over", over);
  const meter = document.querySelector(".budget-meter");
  meter.classList.toggle("over", over);
  meter.firstElementChild.style.width = percentage + "%";
}

const freshState = () => ({
  page: "discover",
  area: "Carlton",
  saved: {},
  budget: 25,
  reminders: false,
  frequency: "Weekly",
  quiet: "20:00",
  reminderTypes: { price: true, stock: true, expiry: false },
  reports: [],
});
function readState() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!value || typeof value !== "object") return freshState();
    const saved = Object.fromEntries(
      Object.entries(value.saved || {}).filter(
        ([id, q]) => getOffer(id) && Number.isInteger(q) && q > 0 && q <= 99,
      ),
    );
    return {
      ...freshState(),
      ...value,
      page: "discover",
      area: SHOPPING_AREAS.includes(value.area) ? value.area : "Carlton",
      saved,
      reminderTypes: { ...freshState().reminderTypes, ...value.reminderTypes },
      reports: Array.isArray(value.reports) ? value.reports : [],
      budget:
        Number.isFinite(value.budget) && value.budget >= 0 ? value.budget : 25,
    };
  } catch {
    return freshState();
  }
}
let state = readState();
let ui = resetFilters();
let toastTimer;
let previousFocus;

const saveState = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    toast(
      "Your browser could not save changes. They are available for this session.",
    );
  }
};
function toast(message) {
  const el = document.querySelector("#toast");
  el.textContent = message;
  el.classList.add("toast");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("toast"), 3500);
}
function nav(mobile = false) {
  return `<nav class="${mobile ? "mobile-nav" : "nav"}" aria-label="${mobile ? "Mobile" : "Main"} navigation">${[
    ["discover", "discover", "Discover"],
    ["saved", "bookmark", "Shopping list"],
    ["preferences", "settings", "Preferences"],
  ]
    .map(
      ([page, icon, label]) =>
        `<button data-nav="${page}" class="${state.page === page ? "active" : ""}" ${state.page === page ? 'aria-current="page"' : ""}>${ico(icon)}<span>${mobile && page === "saved" ? "My list" : label}</span>${!mobile && page === "saved" ? `<span class="nav-count">${Object.keys(state.saved).length}</span>` : ""}</button>`,
    )
    .join("")}</nav>`;
}
function render() {
  const focused = document.activeElement;
  const focusId = focused?.id;
  const focusData = focused?.dataset
    ? Object.entries(focused.dataset).find(([key]) =>
        ["save", "compare", "category", "action"].includes(key),
      )
    : null;
  const updates = offerUpdates();
  document.querySelector("#app").innerHTML =
    `<div class="shell"><header class="topbar"><a class="brand" href="#" data-nav="discover" aria-label="CartCrush home"><span class="brand-mark">${ico("discover")}</span>CartCrush<span class="brand-period">.</span></a>${nav()}<div class="topbar-right"><button class="demo-label" data-action="demo-info">Demo data</button><button class="updates-button" data-action="updates" aria-label="Offer updates, ${updates.length} updates">${ico("bell")}${updates.length ? `<span>${updates.length}</span>` : ""}</button></div></header><main id="main" class="main" tabindex="-1">${state.page === "discover" ? discover() : state.page === "saved" ? savedPage() : preferences()}</main>${nav(true)}</div>${compareTray()}`;
  if (focusId) document.getElementById(focusId)?.focus();
  else if (focusData) {
    const [key, value] = focusData;
    document.querySelector(`[data-${key}="${CSS.escape(value)}"]`)?.focus();
  }
}

function productDrawing(offer) {
  const coles = offer.retailer === "Coles",
    aldi = offer.retailer === "ALDI";
  const ink = coles ? "#bb3f35" : aldi ? "#294984" : "#345e49";
  const base = coles ? "#f3d56e" : aldi ? "#eab39a" : "#c4d6ad";
  const tiny = 'text-anchor="middle"';
  let shape = "";
  if (offer.group === "eggs") {
    shape = `<g transform="rotate(-7 120 145)"><path d="m32 111 29-25h124l27 26-6 72H38Z" fill="#c9baa1"/><path d="m32 111 27 17h132l21-16-28-22H62Z" fill="#e1d4bd"/><path d="m38 177 16-11h137l15 11-5 13H43Z" fill="#aa987f"/><path d="M57 106q6-28 19-25t17 25m4 0q6-28 19-25t17 25m4 0q6-28 19-25t17 25" fill="#f8edd5" stroke="#cebea0" stroke-width="2"/><rect x="70" y="118" width="101" height="55" rx="4" fill="${coles ? "#f9e8a7" : "#edf0d8"}"/><text x="120" y="134" ${tiny} font-size="8" fill="${ink}">${coles ? "coles" : "WOOLWORTHS"}</text><text x="120" y="150" ${tiny} font-family="Georgia,serif" font-weight="bold" font-size="13" fill="${ink}">free range</text><text x="120" y="163" ${tiny} font-size="7" fill="${ink}">12 AUSTRALIAN EGGS</text><path d="m49 137 7 0m-7 14h7m130-14h7m-7 14h7" stroke="#ab997d" stroke-width="4" stroke-linecap="round"/></g>`;
  } else if (offer.group === "detergent") {
    shape = `<g transform="rotate(6 120 125)"><path d="M110 31h28v18h-28Z" fill="#375846"/><path d="M104 49h40l9 20c20 4 34 22 33 45l-5 89H70l-4-89c-2-21 11-40 29-47Z" fill="${coles ? "#87aec7" : "#bed5a6"}"/><path d="M142 77c23 1 34 21 27 45l-19-4 1-24-9-2Z" fill="#fbf8ee"/><path d="M76 191h97" stroke="#fff" stroke-opacity=".35" stroke-width="5"/><rect x="79" y="115" width="65" height="66" rx="8" fill="#fcf8e9"/><text x="111" y="137" ${tiny} font-family="Georgia,serif" font-weight="bold" font-size="13" fill="#365647">${coles ? "clean" : "earth"}</text><text x="111" y="150" ${tiny} font-size="8" fill="#365647">${coles ? "LAUNDRY" : "choice"}</text><text x="111" y="164" ${tiny} font-size="6" fill="#365647">LAUNDRY LIQUID</text><text x="111" y="174" ${tiny} font-size="7" fill="#365647">${sizeLabel(offer)}</text><path d="M91 92c-7-17 9-22 20-22-1 18-8 23-20 22Z" fill="#365647"/></g>`;
  } else if (offer.group === "shampoo") {
    shape = `<g transform="rotate(-5 120 124)"><rect x="106" y="30" width="30" height="28" rx="4" fill="#222e29"/><path d="M108 56h26l15 22v119q0 9-9 9H99q-9 0-9-9V78Z" fill="#614129"/><path d="M98 81v117" stroke="#9b795b" stroke-width="4" opacity=".5"/><rect x="91" y="92" width="58" height="91" fill="#e7e6d7"/><text x="120" y="113" ${tiny} font-size="16" fill="#355547">sukin</text><text x="120" y="125" ${tiny} font-size="5.5" letter-spacing="1" fill="#355547">AUSTRALIAN NATURAL</text><path d="M107 145c-2-14 8-17 22-21-1 16-8 25-22 21Z" fill="#67816a"/><path d="m109 149 12-17" stroke="#395742" stroke-width="1.2"/><text x="120" y="160" ${tiny} font-size="5.5" fill="#355547">DAILY NOURISHING</text><text x="120" y="170" ${tiny} font-size="7" fill="#355547">SHAMPOO</text><text x="120" y="190" ${tiny} font-size="7" fill="#eee5d6">${sizeLabel(offer)}</text></g>`;
  } else {
    const rice = offer.group === "rice";
    const packet = coles ? "#f6e8aa" : aldi ? "#e6bf98" : "#e5e8d2";
    shape = `<g transform="rotate(${coles ? 6 : -6} 120 125)"><path d="m70 37 99 0-5 17 7 126-8 26H71l-7-26 10-127Z" fill="${packet}"/><path d="M70 37h99v9H70Z" fill="${base}"/><path d="m73 47 91 0" stroke="${ink}" stroke-width="1" opacity=".35"/><path d="m67 187 103 0-7 19H71Z" fill="${base}"/><path d="M78 57v120" stroke="#fff" stroke-width="3" opacity=".35"/><text x="120" y="70" ${tiny} font-size="${coles ? 14 : 8}" font-weight="bold" fill="${ink}">${coles ? "coles" : aldi ? (rice ? "IMPERIAL GRAIN" : "GOLDENVALE") : "WOOLWORTHS"}</text>${!coles && !aldi ? `<text x="120" y="84" ${tiny} font-size="8" fill="${ink}">essentials</text>` : ""}<text x="120" y="${coles || aldi ? 97 : 104}" ${tiny} font-family="Georgia,serif" font-weight="bold" font-size="19" fill="${ink}">${rice ? "jasmine" : "rolled"}</text><text x="120" y="${coles || aldi ? 118 : 126}" ${tiny} font-family="Georgia,serif" font-weight="bold" font-size="21" fill="${ink}">${rice ? "rice" : "oats"}</text>${rice ? `<ellipse cx="121" cy="157" rx="26" ry="16" fill="#fff8de"/><path d="M94 156q28 41 55 0Z" fill="${ink}"/><path d="m107 150 5 4m5-7 4 5m5-2 5 4m-22 3 5 3m10-1 5 2" stroke="#c2b89c" stroke-width="2" stroke-linecap="round"/>` : `<path d="M118 172v-32m0 13q-19-2-14-14 14 1 14 14m0 7q19-3 14-15-14 1-14 15m0 6q-19-2-14-13 14 1 14 13" fill="${base}" stroke="${ink}" stroke-width="1.5"/>`}<text x="120" y="194" ${tiny} font-size="8" fill="${ink}">${sizeLabel(offer)}</text></g>`;
  }
  return `<svg class="product-illustration ${offer.group}" viewBox="0 0 240 240" font-family="Arial,sans-serif" aria-hidden="true"><ellipse cx="121" cy="215" rx="${offer.group === "eggs" ? 78 : 50}" ry="8" fill="#253528" opacity=".10"/>${shape}</svg>`;
}

function art(offer, small = false) {
  return `<div class="card-art ${offer.tone}"><span class="art-orbit" aria-hidden="true"></span>${productDrawing(offer)}${small ? "" : `<span class="art-meta ${offer.memberPrice ? "member-tag" : ""}">${isExpired(offer) ? "Expired" : offer.memberPrice ? "Member offer" : Math.round(discount(offer)) + "% off"}</span>${offer.sponsored ? '<span class="sponsored-label">Sponsored</span>' : ""}<button class="save-btn ${state.saved[offer.id] ? "saved" : ""}" data-save="${offer.id}" aria-label="${state.saved[offer.id] ? "Remove" : "Save"} ${escapeHtml(offer.brand + " " + offer.name)} at ${offer.retailer}" aria-pressed="${!!state.saved[offer.id]}">${ico(state.saved[offer.id] ? "check" : "bookmark")}</button>`}</div>`;
}

function card(offer) {
  return `<article class="offer-card ${ui.comparison.includes(offer.id) ? "on-board" : ""} ${isExpired(offer) ? "expired" : ""}">${art(offer)}<div class="card-body"><div class="retailer-line"><span class="retailer-dot ${offer.retailer === "Coles" ? "coles" : offer.retailer === "ALDI" ? "aldi" : offer.retailer === "Chemist Warehouse" ? "chemist" : ""}"></span>${offer.retailer}<span class="pack-size">${sizeLabel(offer)}</span></div><h3 class="card-title">${offer.name}</h3><div class="brand-line">${offer.brand}</div><div class="price-ticket"><div class="price-line"><span class="price">${money(offer.price)}</span><span class="previous" title="Previous sample selling price" aria-label="Previous price ${money(offer.previous)}">${money(offer.previous)}</span></div><div class="unit-price">${unitLabel(offer)}</div>${offer.memberPrice ? `<span class="member-price">Members ${money(offer.memberPrice)}</span>` : ""}</div><div class="availability-line">${stockBadge(offer)}<span class="distance">${ico("pin")}${offer.distances[state.area].toFixed(1)} km</span></div><div class="checked"><span>${offer.source} · ${offer.checked}</span><span>${isExpired(offer) ? "Ended" : "Until"} ${offer.expiry.split(" 2026")[0]}${offer.code ? " · " + offer.code : ""}</span></div><div class="card-actions"><button class="details-btn" data-details="${offer.id}">Details ${ico("chevron")}</button><button class="compare-button ${ui.comparison.includes(offer.id) ? "selected" : ""}" data-compare="${offer.id}" aria-pressed="${ui.comparison.includes(offer.id)}">${ico(ui.comparison.includes(offer.id) ? "check" : "compare")}${ui.comparison.includes(offer.id) ? "On board" : "+ Compare"}</button></div></div></article>`;
}

function filteredOffers() {
  const groupOrder = ["oats", "rice", "eggs", "detergent", "shampoo"];
  const featuredOrder = [
    "ww-oats",
    "cw-shampoo",
    "coles-rice",
    "ww-detergent",
    "coles-eggs",
    "coles-oats",
    "ww-rice",
    "coles-detergent",
    "coles-shampoo",
    "aldi-rice",
    "ww-eggs",
    "aldi-oats",
    "ww-shampoo",
    "cw-shampoo-expired",
  ];
  let result = offers.filter(
    (offer) =>
      (ui.showExpired || !isExpired(offer)) &&
      (ui.category === "All offers" || offer.category === ui.category) &&
      (ui.retailer === "All retailers" || offer.retailer === ui.retailer) &&
      (ui.distance === "any" ||
        offer.distances[state.area] <= Number(ui.distance)) &&
      (!ui.available || (offer.stock === "available" && !isExpired(offer))) &&
      discount(offer) >= Number(ui.minDiscount) &&
      (ui.expiry === "any" ||
        (daysLeft(offer) >= 0 && daysLeft(offer) <= Number(ui.expiry))) &&
      `${offer.name} ${offer.brand} ${offer.retailer} ${offer.category}`
        .toLowerCase()
        .includes(ui.query.trim().toLowerCase()),
  );
  return result.sort((a, b) =>
    ui.sort === "price"
      ? a.price - b.price
      : ui.sort === "discount"
        ? discount(b) - discount(a)
        : ui.sort === "distance"
          ? a.distances[state.area] - b.distances[state.area]
          : ui.sort === "expiry"
            ? daysLeft(a) - daysLeft(b)
            : ui.sort === "featured"
              ? featuredOrder.indexOf(a.id) - featuredOrder.indexOf(b.id)
              : groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group),
  );
}

function discover() {
  const result = filteredOffers();
  return `<div class="heading-row"><div><h1>Shopping <span class="heading-accent">desk</span></h1></div><button class="location-pill" data-action="area">${ico("pin")}${escapeHtml(state.area)} ${ico("down")}</button></div><div class="desk-layout"><section class="shelf" aria-label="Discover offers"><div class="searchbar">${ico("search")}<label for="search" class="sr-only">Search products, brands or retailers</label><input id="search" type="search" value="${escapeHtml(ui.query)}" placeholder="What’s on your list?" autocomplete="off"><button data-action="clear-search" aria-label="Clear search">${ico("close")}</button></div><div class="chips" aria-label="Categories">${["All offers", "Groceries", "Toiletries", "Household"].map((category) => `<button class="chip ${ui.category === category ? "active" : ""}" data-category="${category}" aria-pressed="${ui.category === category}">${category}</button>`).join("")}</div><div class="section-bar"><div class="section-title"><span id="result-count">${result.length} offers</span><h2 id="results-title" class="sr-only">${ui.query ? "Search results" : "Offers"}</h2></div><div class="section-tools"><button class="stock-filter ${ui.available ? "active" : ""}" data-action="stock-filter" aria-pressed="${ui.available}">${ico("check")}In stock</button><button class="filter-toggle" data-action="filters" aria-expanded="${ui.filters}">${ico("settings")}Filters${ui.retailer !== "All retailers" || ui.distance !== "any" || ui.minDiscount !== "0" || ui.expiry !== "any" || ui.showExpired ? " · active" : ""}</button><label class="sort-label"><span class="sr-only">Sort offers</span><select id="sort"><option value="featured" ${ui.sort === "featured" ? "selected" : ""}>Featured</option><option value="product" ${ui.sort === "product" ? "selected" : ""}>By product</option><option value="price" ${ui.sort === "price" ? "selected" : ""}>Pack price</option><option value="discount" ${ui.sort === "discount" ? "selected" : ""}>Discount</option><option value="distance" ${ui.sort === "distance" ? "selected" : ""}>Distance</option><option value="expiry" ${ui.sort === "expiry" ? "selected" : ""}>Expiry</option></select></label></div></div>${ui.filters ? filters() : ""}<div class="grid" id="offer-grid">${result.length ? result.map(card).join("") : emptyResults()}</div></section><aside class="desk-rail" aria-label="Your shopping workspace">${compareBoard()}${listNote()}</aside></div>`;
}

function compareBoard() {
  const selected = ui.comparison.map(getOffer);
  return `<section class="compare-board" aria-labelledby="board-title"><span class="board-pin" aria-hidden="true"></span><div class="object-heading"><h2 id="board-title">Compare board</h2><span>${selected.length}/3</span></div>${selected.length ? `<div class="board-products">${selected.map((offer) => `<div class="board-product">${art(offer, true)}<div><strong>${offer.retailer}</strong><span>${sizeLabel(offer)} · ${money(offer.price)}</span><small>${unitLabel(offer)}</small><i class="board-stock ${stockClass(offer)}">${stockLabel(offer)}</i></div><button class="board-remove" data-compare="${offer.id}" aria-label="Remove ${offer.retailer} ${offer.name} from comparison">${ico("close")}</button></div>`).join("")}</div><p class="board-caption">${selected[0].name}</p>` : `<div class="board-empty"><div class="empty-pair" aria-hidden="true"><span>${ico("bag")}</span><span>${ico("bag")}</span><b>↔</b></div><p>Add matching products with <strong>+ Compare</strong>.</p></div>`}<div class="board-actions">${selected.length === 1 ? `<button class="board-primary" data-action="fill-board" data-id="${selected[0].id}">Add similar offers ${ico("arrow")}</button>` : `<button class="board-primary" data-action="open-comparison" ${selected.length < 2 ? "disabled" : ""}>Compare prices ${ico("arrow")}</button>`}${selected.length ? '<button class="board-clear" data-action="clear-comparison">Clear</button>' : ""}</div></section>`;
}

function listNote() {
  const entries = Object.entries(state.saved);
  const { total, over, itemCount, percentage, message } = budgetSummary();
  return `<section class="list-note" aria-labelledby="note-title"><span class="paper-tape" aria-hidden="true"></span><div class="object-heading"><h2 id="note-title">My shopping list</h2><span>${itemCount}</span></div><div class="note-lines">${
    entries.length
      ? entries
          .slice(0, 3)
          .map(([id, quantity]) => {
            const offer = getOffer(id);
            return `<div class="note-line"><span class="note-check" aria-hidden="true">${ico("check")}</span><button data-details="${id}"><strong>${quantity} × ${offer.name}</strong><small>${offer.retailer}</small></button><span>${money(offer.price * quantity)}</span></div>`;
          })
          .join("")
      : `<p class="note-empty">Save a few things for later.</p><div class="blank-rule" aria-hidden="true"></div><div class="blank-rule" aria-hidden="true"></div>`
  }${entries.length > 3 ? `<button class="more-list" data-nav="saved">+ ${entries.length - 3} more items</button>` : ""}</div><div class="note-total"><span>Item total</span><strong>${money(total)}</strong></div><label class="budget-field">Budget <span>$</span><input id="budget" type="number" min="0" max="10000" step="0.50" value="${state.budget}" aria-label="Shopping budget in Australian dollars"></label><div class="budget-meter ${over ? "over" : ""}"><div style="width:${percentage}%"></div></div><div class="budget-detail ${over ? "over" : ""}" id="budget-status">${message}</div><button class="note-open" data-nav="saved">Open my list ${ico("arrow")}</button><p class="cost-caption">Travel & delivery extra.</p></section>`;
}

function filters() {
  return `<div class="filters"><label class="field-inline">Retailer <select id="retailer">${["All retailers", "Woolworths", "Coles", "ALDI", "Chemist Warehouse"].map((value) => `<option ${ui.retailer === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label class="field-inline">Distance <select id="distance"><option value="any">Any</option>${[1, 2, 5].map((value) => `<option value="${value}" ${ui.distance === String(value) ? "selected" : ""}>${value} km</option>`).join("")}</select></label><label class="field-inline">Discount <select id="minDiscount">${[0, 10, 20, 30, 40].map((value) => `<option value="${value}" ${ui.minDiscount === String(value) ? "selected" : ""}>${value ? value + "%+" : "Any"}</option>`).join("")}</select></label><label class="field-inline">Ends within <select id="expiry"><option value="any">Any time</option>${[2, 3, 7].map((value) => `<option value="${value}" ${ui.expiry === String(value) ? "selected" : ""}>${value} days</option>`).join("")}</select></label><label class="checklabel"><input type="checkbox" id="showExpired" ${ui.showExpired ? "checked" : ""}>Include expired</label><button class="filter-toggle" data-action="reset-filters">Reset</button></div>`;
}

function emptyResults() {
  return `<div class="empty">${ico("search")}<h2>No matching offers</h2><button class="secondary" data-action="reset-filters">Clear filters</button></div>`;
}

function compareTray() {
  return ui.comparison.length
    ? `<div class="compare-tray ${state.page === "discover" ? "desk-tray" : ""}" aria-label="Selected offers"><div class="tray-text">${ui.comparison.length} / 3 on board<span>${getOffer(ui.comparison[0]).name}</span></div><button class="tray-clear" data-action="clear-comparison">Clear</button><button class="primary" data-action="open-comparison" ${ui.comparison.length < 2 ? "disabled" : ""}>Compare ${ico("arrow")}</button></div>`
    : "";
}

function savedPage() {
  const entries = Object.entries(state.saved).map(([id, quantity]) => ({
    offer: getOffer(id),
    quantity,
  }));
  const { total, over, itemCount, percentage, message } = budgetSummary();
  return `<div class="heading-row"><div><h1>Shopping <span class="heading-accent">list</span></h1></div><button class="location-pill" data-action="area">${ico("pin")}${escapeHtml(state.area)} ${ico("down")}</button></div><div class="list-layout"><div>${entries.length ? entries.map(({ offer, quantity }) => `<article class="list-item">${art(offer, true)}<div class="list-description"><h3>${offer.name}</h3><p>${offer.retailer} · ${sizeLabel(offer)} · ${unitLabel(offer)}</p>${stockBadge(offer)}<div class="list-controls"><button class="quantity-button" data-quantity="${offer.id}" data-delta="-1" aria-label="Decrease ${offer.name} quantity">−</button><span>${quantity}</span><button class="quantity-button" data-quantity="${offer.id}" data-delta="1" aria-label="Increase ${offer.name} quantity">+</button><button class="details-btn" data-details="${offer.id}">Details</button><button class="details-btn" data-action="compare-similar" data-id="${offer.id}">Compare</button></div></div><div class="list-price">${money(offer.price * quantity)}<button data-save="${offer.id}" aria-label="Remove ${offer.brand} ${offer.name}">Remove</button></div></article>`).join("") : `<div class="empty">${ico("bookmark")}<h2>Your list is empty</h2><button class="primary" data-nav="discover">Find offers ${ico("arrow")}</button></div>`}</div><aside class="budget-card"><div class="receipt-kicker">CARTCRUSH · ESTIMATE</div><h2>Your receipt</h2><label class="budget-field">AUD <input id="budget" type="number" min="0" max="10000" step="0.50" value="${state.budget}" aria-label="Shopping budget in Australian dollars"></label><div class="budget-number">${money(total)}</div><p>Item total · ${itemCount} ${itemCount === 1 ? "item" : "items"}</p><div class="budget-meter ${over ? "over" : ""}"><div style="width:${percentage}%"></div></div><div class="budget-detail ${over ? "over" : ""}" id="budget-status">${message}</div><p class="cost-caption">Travel and delivery extra.</p><button class="primary" data-action="export-list" ${entries.length ? "" : "disabled"}>${ico("export")}Download list</button><button class="reminder-shortcut" data-nav="preferences">${ico("bell")}Reminders ${state.reminders ? "on" : "off"}</button></aside></div>`;
}

function preferences() {
  return `<div class="heading-row"><div><h1>Your <span class="heading-accent">preferences</span></h1></div></div><div class="settings-grid"><section class="settings-card"><h2>Shopping area</h2><label class="form-row"><span class="sr-only">Shopping area</span><select id="preference-area">${SHOPPING_AREAS.map((area) => `<option ${state.area === area ? "selected" : ""}>${area}</option>`).join("")}</select></label><p class="privacy-small">Manual selection · saved on this device.</p></section><section class="settings-card"><h2>Saved-offer reminders</h2><div class="toggle-row"><label for="reminders">Enable reminders</label><input class="toggle" id="reminders" type="checkbox" ${state.reminders ? "checked" : ""}></div><div class="reminder-types">${[
    ["price", "Price drops"],
    ["stock", "Back in stock"],
    ["expiry", "Ending soon"],
  ]
    .map(
      ([key, label]) =>
        `<label class="checklabel"><input id="type-${key}" type="checkbox" ${state.reminderTypes[key] ? "checked" : ""} ${state.reminders ? "" : "disabled"}>${label}</label>`,
    )
    .join(
      "",
    )}</div><label class="form-row">Frequency<select id="frequency" ${state.reminders ? "" : "disabled"}>${["Weekly", "Daily"].map((f) => `<option ${state.frequency === f ? "selected" : ""}>${f}</option>`).join("")}</select></label><label class="form-row">Quiet hours<input id="quiet" type="time" value="${escapeHtml(state.quiet)}" ${state.reminders ? "" : "disabled"}><small>Until 8:00 am.</small></label><p class="privacy-small">Demo updates appear in ${ico("bell")}.</p></section><section class="settings-card"><h2>Reports</h2>${
    state.reports.length
      ? `<div class="report-history">${state.reports
          .slice(-4)
          .reverse()
          .map(
            (report) =>
              `<div><strong>${getOffer(report.offer)?.name || "Offer"}</strong><span>${escapeHtml(report.reason)} · Pending review</span></div>`,
          )
          .join("")}</div>`
      : '<p class="privacy-small">No reports.</p>'
  }</section><section class="settings-card"><h2>Local data</h2><p class="privacy-small">List, preferences and reports stay on this device.</p><button class="secondary" data-action="reset-demo">${ico("reset")}Clear data</button></section></div>`;
}

function openModal(title, content, wide = false) {
  previousFocus = document.activeElement;
  document.querySelector("#overlay-root").innerHTML =
    `<div class="overlay"><section class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><div class="modal-head"><h2 id="dialog-title">${title}</h2><button class="close-btn" data-action="close-modal" aria-label="Close dialog">${ico("close")}</button></div><div class="modal-content">${content}</div></section></div>`;
  document.body.style.overflow = "hidden";
  document.querySelector(".close-btn").focus();
}
function closeModal() {
  document.querySelector("#overlay-root").innerHTML = "";
  document.body.style.overflow = "";
  if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
  else document.querySelector("#main")?.focus({ preventScroll: true });
}
function detail(id) {
  const offer = getOffer(id);
  if (!offer) return;
  openModal(
    "Offer details",
    `<div class="detail-product">${art(offer, true)}<div><p>${offer.retailer}${offer.sponsored ? " · Sponsored" : ""}</p><h3>${offer.name}</h3><p>${offer.brand} · ${sizeLabel(offer)}</p><div class="price-line"><span class="price">${money(offer.price)}</span><span class="previous" title="Previous sample selling price">${money(offer.previous)}</span></div><div class="unit-price">${unitLabel(offer)}</div></div></div><div class="facts"><div class="fact"><span>Store</span><strong>${offer.locations[state.area]} · ${offer.distances[state.area]} km</strong></div><div class="fact"><span>Stock</span><strong>${stockBadge(offer)}</strong></div><div class="fact"><span>Source</span><strong>${offer.source}</strong></div><div class="fact"><span>Checked</span><strong>${offer.checked}</strong></div><div class="fact"><span>Promotion</span><strong>${promotionLabel(offer, true)}</strong></div><div class="fact"><span>Applies to</span><strong>${offer.channel}</strong></div></div><div class="notice ${offer.stock !== "available" || isExpired(offer) ? "warning" : ""}">${offer.condition}</div><div class="detail-section"><h3>Price history</h3>${historyPanel(offer)}</div><div class="detail-section"><h3>Cost per pack</h3><div class="facts cost-facts"><div class="fact"><span>Pickup · travel extra</span><strong>${money(offer.price)}</strong></div><div class="fact"><span>Delivery estimate${offer.delivery !== null ? " · fee " + money(offer.delivery) : ""}</span><strong>${offer.delivery === null ? "Unavailable" : money(offer.price + offer.delivery)}</strong></div></div><p class="cost-caption">Final fees, order limits and stock need retailer confirmation.</p></div><div class="modal-footer"><button class="primary" data-action="detail-save" data-id="${id}">${ico("bookmark")}${state.saved[id] ? "Saved" : "Save"}</button><button class="secondary" data-action="compare-similar" data-id="${id}">${ico("compare")}Compare offers</button><button class="text-button" data-action="report" data-id="${id}">Report issue</button><button class="text-button" data-action="share" data-id="${id}">${ico("share")} Share</button></div>`,
  );
}

function toggleSave(id) {
  const offer = getOffer(id);
  if (!offer) return;
  if (state.saved[id]) {
    delete state.saved[id];
    toast("Removed from your shopping list");
  } else {
    state.saved[id] = 1;
    toast(`${offer.name} saved to your shopping list`);
  }
  saveState();
  render();
}
function toggleCompare(id) {
  if (ui.comparison.includes(id)) {
    ui.comparison = ui.comparison.filter((x) => x !== id);
  } else if (ui.comparison.length >= 3) {
    toast("Choose up to 3 offers to compare");
    return;
  } else if (
    ui.comparison.length &&
    getOffer(ui.comparison[0]).group !== getOffer(id).group
  ) {
    toast("Choose matching products so the unit prices are comparable");
    return;
  } else {
    ui.comparison.push(id);
  }
  render();
}
function priceLens(selected) {
  const unit = ui.priceLens !== "pack",
    value = (offer) => (unit ? unitValue(offer) : offer.price),
    max = Math.max(...selected.map(value)),
    best = lowestAvailablePrice(selected, value);
  const ordered = [...selected].sort((a, b) => value(a) - value(b));
  return `<section class="price-lens" aria-labelledby="lens-title"><div class="lens-header"><h3 id="lens-title">Price at a glance</h3><div class="lens-switch" role="group" aria-label="Compare price basis"><button data-lens="pack" aria-pressed="${!unit}" class="${!unit ? "active" : ""}">Pack price</button><button data-lens="unit" aria-pressed="${unit}" class="${unit ? "active" : ""}">Unit price</button></div></div><div class="price-rulers">${ordered.map((offer) => `<div class="ruler-row ${offer.stock === "sold" || isExpired(offer) ? "unavailable" : ""}"><span>${offer.retailer}<small>${sizeLabel(offer)}${isExpired(offer) ? " · Expired" : offer.stock === "sold" ? " · Out of stock" : offer.stock === "unknown" ? " · Unconfirmed" : ""}</small></span><div class="ruler-track"><div style="width:${(value(offer) / max) * 100}%" class="ruler-fill ${offer.stock === "available" && value(offer) === best ? "best" : ""}"></div></div><strong>${unit ? unitLabel(offer) : money(offer.price)}</strong></div>`).join("")}</div><p>${unit ? "Same unit, different pack sizes." : "Cost of one whole pack."} Lowest highlighted among offers with reported stock.</p></section>`;
}

function comparison() {
  const selected = ui.comparison.map(getOffer).filter(Boolean);
  if (selected.length < 2) return;
  const best = lowestAvailablePrice(selected);
  const row = (label, renderCell) =>
    `<tr><th scope="row">${label}</th>${selected.map((offer) => `<td>${renderCell(offer)}</td>`).join("")}</tr>`;
  openModal(
    "Compare offers",
    `<div class="receipt-title"><span class="receipt-kicker">THE COMPARISON RECEIPT</span><h3>${selected[0].name}</h3><p>Brands may differ · ${selected.length} offers</p></div>${priceLens(selected)}<p class="swipe-hint">Swipe the receipt to compare →</p><div class="comparison-scroll"><table class="comparison"><thead><tr><th scope="col">${selected[0].name}</th>${selected.map((offer) => `<th scope="col"><div class="compare-product-art">${art(offer, true)}</div>${offer.retailer}<br><small>${offer.brand}${offer.sponsored ? " · Sponsored" : ""}</small></th>`).join("")}</tr></thead><tbody>${row("Pack price", (offer) => `<span class="price">${money(offer.price)}</span>`)}${row("Pack size", sizeLabel)}${row("Unit price", (offer) => `<strong>${unitLabel(offer)}</strong>${offer.stock === "available" && !isExpired(offer) && unitValue(offer) === best ? '<br><span class="best-value">Lowest · stock reported</span>' : ""}`)}${row("Store", (offer) => `${offer.locations[state.area]}<br><small>${offer.distances[state.area]} km</small>`)}${row("Stock", stockBadge)}${row("Pickup", (offer) => `${money(offer.price)}<br><small>Travel extra</small>`)}${row("Delivery estimate", (offer) => (offer.delivery === null ? "Unavailable" : `${money(offer.price + offer.delivery)}<br><small>Includes ${money(offer.delivery)} fee</small>`))}${row("Conditions", (offer) => offer.condition)}${row("Promotion", (offer) => promotionLabel(offer))}${row("Applies to", (offer) => offer.channel)}${row("Source / checked", (offer) => `${offer.source}<br><small>${offer.checked}</small>`)}${row("List", (offer) => `<button class="${state.saved[offer.id] ? "secondary" : "primary"}" data-action="compare-save" data-id="${offer.id}">${ico(state.saved[offer.id] ? "check" : "bookmark")}${state.saved[offer.id] ? "Saved" : "Save"}</button>`)}</tbody></table></div>`,
    true,
  );
}

function historyPanel(offer) {
  const high = Math.max(...offer.history),
    low = Math.min(...offer.history),
    span = high - low || 1;
  const points = offer.history.map(
    (price, i) => `${22 + i * 118},${70 - ((price - low) / span) * 48}`,
  );
  return `<div class="history-panel"><div class="history-readout"><span id="history-date">10 Oct</span><strong id="history-price">${money(offer.history[3])}</strong><small>Sample price history</small></div><svg class="history-chart" viewBox="0 0 398 92" role="img" aria-label="Four recorded prices: ${offer.history.map(money).join(", ")}"><path d="M22 78H376M22 45H376M22 12H376" stroke="#dedcd2" stroke-dasharray="3 4" fill="none"/><path d="M${points.join(" L")} L376 78 L22 78Z" fill="#e8ae7d" opacity=".18"/><polyline points="${points.join(" ")}" fill="none" stroke="#b75a35" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${points
    .map((point, index) => {
      const [x, y] = point.split(",");
      return `<circle cx="${x}" cy="${y}" r="5" fill="${index === 3 ? "#b75a35" : "#fbf7ed"}" stroke="#b75a35" stroke-width="2"/>`;
    })
    .join(
      "",
    )}</svg><label class="sr-only" for="history-range">Select price history date</label><input id="history-range" type="range" min="0" max="3" step="1" value="3" data-history="${offer.id}" aria-valuetext="10 Oct, ${money(offer.history[3])}"><div class="history-dates">${HISTORY_DATES.map((date) => `<span>${date}</span>`).join("")}</div></div>`;
}

function areaModal() {
  openModal(
    "Shopping area",
    `<form id="area-form"><label class="form-row"><span class="sr-only">Shopping area</span><select name="area">${SHOPPING_AREAS.map((area) => `<option ${state.area === area ? "selected" : ""}>${area}</option>`).join("")}</select></label><button class="primary" type="submit">Apply</button></form>`,
  );
}

function reportModal(id) {
  openModal(
    "Report issue",
    `<form id="report-form" data-id="${id}"><fieldset style="border:0;margin:0;padding:0"><legend class="sr-only">Issue type</legend><div class="report-options">${[
      ["expired", "Expired offer"],
      ["price", "Incorrect price"],
      ["stock", "Incorrect stock"],
      ["misleading", "Misleading conditions"],
    ]
      .map(
        ([value, label], i) =>
          `<label><input type="radio" name="reason" value="${value}" ${i === 0 ? "checked" : ""}>${label}</label>`,
      )
      .join(
        "",
      )}</div></fieldset><label class="form-row">Details (optional)<textarea name="note" maxlength="300"></textarea></label><button class="primary" type="submit">Submit report ${ico("arrow")}</button></form>`,
  );
}

function updateGrid() {
  const items = filteredOffers();
  document.querySelector("#offer-grid").innerHTML = items.length
    ? items.map(card).join("")
    : emptyResults();
  document.querySelector("#results-title").textContent = ui.query
    ? "Search results"
    : "Offers";
  const counter = document.querySelector("#result-count");
  if (counter) counter.textContent = `${items.length} offers`;
}
function downloadList() {
  const items = Object.entries(state.saved);
  if (!items.length) return;
  const total = listTotal();
  const text = [
    "CARTCRUSH — MY SHOPPING LIST",
    "Concept demo: fictional prices and availability. Snapshot: 10 Oct 2026.",
    `Shopping area: ${state.area}`,
    `Budget: ${money(state.budget)}`,
    "",
    ...items.map(([id, q]) => {
      const o = getOffer(id);
      return `${q} × ${o.name} (${sizeLabel(o)}) — ${o.retailer}: ${money(o.price * q)}\n  ${o.locations[state.area]} · ${stockLabel(o)} · ${unitLabel(o)}`;
    }),
    "",
    `Estimated item total: ${money(total)}`,
    "Travel and delivery costs excluded. Confirm prices and stock with the retailer.",
  ].join("\n");
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "cartcrush-shopping-list.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Shopping list downloaded");
}

function listTotal() {
  return Object.entries(state.saved).reduce(
    (sum, [id, quantity]) => sum + getOffer(id).price * quantity,
    0,
  );
}
function offerUpdates() {
  if (!state.reminders) return [];
  const updates = [];
  for (const id of Object.keys(state.saved)) {
    const offer = getOffer(id);
    if (isExpired(offer)) continue;
    if (state.reminderTypes.price && offer.history.at(-2) > offer.price)
      updates.push({
        id,
        title: "Price drop",
        text: `${money(offer.history.at(-2))} → ${money(offer.price)}`,
      });
    if (
      state.reminderTypes.stock &&
      offer.stockWas === "sold" &&
      offer.stock === "available"
    )
      updates.push({
        id,
        title: "Back in stock",
        text: offer.locations[state.area],
      });
    if (state.reminderTypes.expiry && daysLeft(offer) <= 3)
      updates.push({ id, title: "Ending soon", text: "Until " + offer.expiry });
  }
  return updates;
}
function updatesModal() {
  const updates = offerUpdates();
  openModal(
    "Saved-offer updates",
    `${
      updates.length
        ? updates
            .map((update) => {
              const offer = getOffer(update.id);
              return `<button class="update-item" data-details="${update.id}"><span class="update-type">${update.title}</span><strong>${offer.name} · ${offer.retailer}</strong><span>${update.text}</span><small>${offer.checked}</small></button>`;
            })
            .join("")
        : `<div class="empty"><h3>${state.reminders ? "No updates" : "Reminders are off"}</h3><button class="secondary" data-action="reminder-settings">Preferences</button></div>`
    }<p class="cost-caption">Demo updates · 10 Oct 2026.</p>`,
  );
}
function demoInfo() {
  openModal(
    "Demo data",
    `<p class="compare-note">Prices, stock, histories, sources and distances are fictional. Snapshot: 10 Oct 2026.</p><p class="compare-note">List, reports and reminder preferences are stored on this device. Updates are simulated.</p>`,
  );
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("button,a[data-nav]");
  if (!button) {
    if (event.target.classList.contains("overlay")) closeModal();
    return;
  }
  if (button.dataset.nav) {
    event.preventDefault();
    state.page = button.dataset.nav;
    render();
    window.scrollTo({ top: 0 });
    document.querySelector("#main").focus({ preventScroll: true });
    return;
  }
  if (button.dataset.save) {
    toggleSave(button.dataset.save);
    return;
  }
  if (button.dataset.details) {
    detail(button.dataset.details);
    return;
  }
  if (button.dataset.compare) {
    toggleCompare(button.dataset.compare);
    return;
  }
  if (button.dataset.lens) {
    ui.priceLens = button.dataset.lens;
    comparison();
    document.querySelector(`[data-lens="${ui.priceLens}"]`)?.focus();
    return;
  }
  if (button.dataset.category) {
    ui.category = button.dataset.category;
    render();
    return;
  }
  if (button.dataset.quantity) {
    const id = button.dataset.quantity;
    state.saved[id] = Math.min(
      99,
      state.saved[id] + Number(button.dataset.delta),
    );
    if (state.saved[id] <= 0) delete state.saved[id];
    saveState();
    render();
    return;
  }
  const action = button.dataset.action,
    id = button.dataset.id;
  if (action === "close-modal") closeModal();
  if (action === "demo-info") demoInfo();
  if (action === "updates") updatesModal();
  if (action === "stock-filter") {
    ui.available = !ui.available;
    render();
  }
  if (action === "reminder-settings") {
    closeModal();
    state.page = "preferences";
    render();
  }
  if (action === "area") areaModal();
  if (action === "filters") {
    ui.filters = !ui.filters;
    render();
  }
  if (action === "clear-search") {
    ui.query = "";
    render();
    document.querySelector("#search").focus();
  }
  if (action === "reset-filters") {
    ui = { ...resetFilters(), filters: ui.filters, comparison: ui.comparison };
    render();
  }
  if (action === "clear-comparison") {
    ui.comparison = [];
    render();
  }
  if (action === "open-comparison") comparison();
  if (action === "fill-board") {
    ui.comparison = matchingOffers(id).map((offer) => offer.id);
    render();
  }
  if (action === "detail-save") {
    if (!state.saved[id]) {
      state.saved[id] = 1;
      saveState();
      render();
      toast("Saved to your shopping list");
    }
    detail(id);
  }
  if (action === "compare-save") {
    if (!state.saved[id]) {
      state.saved[id] = 1;
      saveState();
      render();
      toast("Saved to your shopping list");
    }
    comparison();
  }
  if (action === "compare-similar") {
    const related = matchingOffers(id);
    if (related.length < 2) {
      toast("No matching offers.");
      return;
    }
    ui.comparison = related.map((offer) => offer.id);
    render();
    comparison();
  }
  if (action === "report") reportModal(id);
  if (action === "share") {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("offer", id);
    try {
      await navigator.clipboard.writeText(url.toString());
      toast("Offer link copied");
    } catch {
      openModal(
        "Share this offer",
        `<label class="form-row">Copy this link<input readonly value="${escapeHtml(url.toString())}" onclick="this.select()"></label>`,
      );
    }
  }
  if (action === "export-list") downloadList();
  if (action === "reset-demo") {
    openModal(
      "Clear local data?",
      `<p class="compare-note">Clear your list, preferences and reports.</p><div class="modal-footer"><button class="secondary" data-action="close-modal">Cancel</button><button class="primary" data-action="confirm-reset">Clear</button></div>`,
    );
  }
  if (action === "confirm-reset") {
    state = freshState();
    ui = resetFilters();
    saveState();
    closeModal();
    history.replaceState(null, "", window.location.pathname);
    render();
    window.scrollTo({ top: 0 });
    toast("Local data cleared.");
  }
});
document.addEventListener("input", (event) => {
  if (event.target.id === "history-range") {
    const index = Number(event.target.value),
      offer = getOffer(event.target.dataset.history),
      date = HISTORY_DATES[index];
    document.querySelector("#history-date").textContent = date;
    document.querySelector("#history-price").textContent = money(
      offer.history[index],
    );
    event.target.setAttribute(
      "aria-valuetext",
      date + ", " + money(offer.history[index]),
    );
    document
      .querySelectorAll(".history-chart circle")
      .forEach((dot, i) =>
        dot.setAttribute("fill", i === index ? "#b75a35" : "#fbf7ed"),
      );
  }
  if (event.target.id === "search") {
    ui.query = event.target.value;
    updateGrid();
  }
  if (event.target.id === "budget" && event.target.value !== "") {
    const budget = Number(event.target.value);
    if (Number.isFinite(budget) && budget >= 0 && budget <= 10000) {
      state.budget = budget;
      saveState();
      updateBudgetDisplay();
    }
  }
});
document.addEventListener("change", (event) => {
  const el = event.target;
  if (
    ["sort", "retailer", "distance", "minDiscount", "expiry"].includes(el.id)
  ) {
    ui[el.id] = el.value;
    render();
  }
  if (el.id === "showExpired") {
    ui.showExpired = el.checked;
    render();
  }
  if (el.id.startsWith("type-")) {
    state.reminderTypes[el.id.slice(5)] = el.checked;
    saveState();
    render();
  }
  if (el.id === "budget") {
    const budget = Number(el.value);
    if (!Number.isFinite(budget) || budget < 0 || budget > 10000) {
      toast("Choose a budget between $0 and $10,000");
      render();
      return;
    }
    state.budget = budget;
    saveState();
    render();
  }
  if (el.id === "preference-area") {
    state.area = el.value;
    saveState();
    render();
    toast("Shopping area updated");
  }
  if (el.id === "reminders") {
    state.reminders = el.checked;
    saveState();
    render();
    toast(state.reminders ? "Reminders on" : "Reminders off");
  }
  if (el.id === "frequency" || el.id === "quiet") {
    state[el.id] = el.value;
    saveState();
    toast("Saved");
  }
});
document.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.id === "area-form") {
    state.area = new FormData(form).get("area");
    saveState();
    closeModal();
    render();
    toast(`Showing sample stores near ${state.area}`);
  }
  if (form.id === "report-form") {
    const data = new FormData(form);
    state.reports.push({
      offer: form.dataset.id,
      reason: data.get("reason"),
      note: data.get("note"),
    });
    saveState();
    closeModal();
    toast("Report saved · Pending review");
  }
});
document.addEventListener("keydown", (event) => {
  const modal = document.querySelector(".modal");
  if (!modal) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
  }
  if (event.key === "Tab") {
    const focusable = [
      ...modal.querySelectorAll(
        'button:not(:disabled),a,input,select,textarea,[tabindex="0"]',
      ),
    ].filter((el) => el.getClientRects().length);
    const first = focusable[0],
      last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
render();
const sharedId = new URL(window.location.href).searchParams.get("offer");
if (sharedId && getOffer(sharedId)) detail(sharedId);
