// trip-config.js — top-level trip identity and global settings
// For a new trip, start here first. This file controls branding labels,
// destination basics, friends, currency, hotel, live dashboard copy, and menu wording.
// Then update itinerary-data.js for day-by-day content and data.js for Guide places.

const TRIP_CONFIG = {
  engineName: "CCMV Travel Companion Engine",
  tripName: "Saigon Companion",
  destinationName: "Ho Chi Minh City",
  destinationShort: "Saigon",
  country: "Vietnam",
  dateRange: "30 Oct – 3 Nov 2026",
  startDateISO: "2026-10-30T00:00:00+11:00",
  timezone: "Asia/Ho_Chi_Minh",
  timezoneLabel: "ICT",
  currency: {
    code: "VND",
    symbol: "₫",
    homeCode: "AUD",
    referenceRateLabel: "1 AUD ≈ 18,126 VND",
    referenceDate: "02/07/2026"
  },
  hotel: {
    name: "Fusion Original Saigon Centre",
    address: "65 Lê Lợi, Bến Nghé, District 1, Ho Chi Minh City, Vietnam",
    phone: "+84 28 3622 2265",
    maps: "https://maps.google.com/?q=Fusion+Original+Saigon+Centre"
  },
  friends: {
    christal: "🧸 Christal",
    crystal: "👓 Crystal",
    mero: "✝️ Mero",
    vivian: "👟 Vivian"
  },
  defaultFriend: "crystal",
  logo: "logo-monogram-transparent.png",
  watermark: "logo-watermark-monogram.png",
  weatherSummary: "Hot · Humid",
  weatherNote: "Likely showers",
  countdownPastText: "Thanks for the moments",
  homePrimaryDayHref: "day1.html",
  homePrimaryDayLabel: "Open Day 1 →",
  dayMenu: [
    { href: "day1.html", emoji: "👋", title: "Day 1", sub: "Hello Saigon<br/>30 Oct • Friday" },
    { href: "day2.html", emoji: "🍳", title: "Day 2", sub: "Made in Saigon<br/>31 Oct • Saturday" },
    { href: "day3.html", emoji: "🌿", title: "Day 3", sub: "A Slower Side<br/>1 Nov • Sunday" },
    { href: "day4.html", emoji: "🏛", title: "Day 4", sub: "City Contrast<br/>2 Nov • Monday" },
    { href: "day5.html", emoji: "✈️", title: "Day 5", sub: "Until Next Time<br/>3 Nov • Tuesday" }
  ],
  tripMenu: [
    { key: "checklist", emoji: "✅", title: "Checklist", sub: "Before the Trip" },
    { key: "city", emoji: "🇻🇳", title: "City", sub: "Ho Chi Minh" },
    { key: "emergency", emoji: "☎️", title: "Emergency", sub: "Useful numbers" },
    { key: "flights", emoji: "✈️", title: "Flights", sub: "VJ082 · VN781" },
    { key: "money", emoji: "💵", title: "Money", sub: "AUD / VND notes" },
    { key: "stay", emoji: "🏨", title: "Stay", sub: "Fusion Original" },
    { key: "tips", emoji: "⚠️", title: "Tips", sub: "Travel notes" },
    { key: "weather", emoji: "☀️", title: "Weather", sub: "Late October" }
  ]
};
