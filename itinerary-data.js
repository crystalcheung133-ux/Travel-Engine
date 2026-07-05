// itinerary-data.js — flexible day-by-day trip content blocks
// This is the Travel Companion Engine separation layer.
//
// Edit itinerary shape here instead of editing day1.html / day2.html etc.
// A day is a free-form list of blocks. Current supported block types:
// - activity: normal timeline card, usually connected to a placeId in PLACES
// - meal: food / restaurant card
// - section: visual divider / heading
// - note: editorial note / reminder card
// - transport: train / flight / ferry / airport transfer / Grab / walking transfer card
// - ticket: booking / QR / paid ticket / reservation card
// - experience: cooking class / spa / ski lesson / tour / workshop card
// - appointment: time-sensitive booked appointment, similar to experience
// - drive: car rental / self-drive / parking / toll / fuel card
// - rest: nap time / reset window / hotel break / child-friendly pause
// - buffer: queue time, rest time, flexible waiting window
// - exploreWindow: shopping / wandering / optional multi-stop window
// - block: larger grouped window with optional children blocks
//
// Required fields are intentionally minimal: type + title/body/time as needed.
// Everything else is optional, so future trips can add trains, spas, queues,
// backup plans, shopping windows, or nested mini-routes without changing HTML.
//
// Optional structured fields available for special cards:
// status: "Booked" | "To book" | "Pay on arrival" etc.
// duration: "3 hours"
// mode: "Private transfer" | "Train" | "Self-drive" etc.
// bookingRequired: true
// optional: true
// tags: ["QR screenshot", "Bring socks"]
// fields: { "Pickup": "SGN Airport", "Ref": "ABC123", "Platform": "TBC" }
// children: [{ type: "activity", ... }] for explore windows or grouped blocks.

const ITINERARY_DAYS = {
  "day1": {
    "kicker": "Day 1 · 30 Oct • Friday",
    "title": "Hello Saigon",
    "note": "Days 頁以即場導航為主；詳細背景、必點同注意事項已移到 Guide。",
    "legend": [
      "☀️ Morning",
      "🍜 Midday",
      "🌙 Evening"
    ],
    "items": [
      {
        "type": "activity",
        "time": "09:30",
        "placeId": "fusion",
        "title": "🏨 Fusion Original Saigon Centre",
        "body": [
          "Drop luggage and settle in.",
          "🕘 24 Hours"
        ],
        "routeHint": "Next: walk / Grab to Phở SOL — approx. 8–10 min walk or 3 min Grab.",
        "mapUrl": "https://maps.google.com/?q=Fusion+Original+Saigon+Centre"
      },
      {
        "type": "activity",
        "time": "12:00",
        "placeId": "pho-sol",
        "title": "🍜 Phở SOL",
        "body": [
          "石鍋牛肉河粉，第一餐。約 150k–200k VND/人。",
          "🕘 出發前再確認"
        ],
        "routeHint": "Next: Grab to Central Post Office — approx. 5 min / ~40k–60k VND.",
        "mapUrl": "https://maps.google.com/?q=Phở+SOL+Bến+Thành"
      },
      {
        "type": "activity",
        "time": "13:30–15:00",
        "placeId": "post-office",
        "title": "📮 Post Office · ⛪ Cathedral · 📚 Book Street",
        "body": [
          "法式郵局、紅教堂、書街，第一日下午輕鬆散步。",
          "🕘 Mon–Fri 07:00–17:00；Sat 07:00–18:00；Sun 08:00–18:00"
        ],
        "routeHint": "Next: Grab to The Cafe Apartments / Nhà Suga — approx. 5 min / ~40k–60k VND.",
        "mapUrl": "https://maps.google.com/?q=Saigon+Central+Post+Office"
      },
      {
        "type": "experience",
        "time": "16:00",
        "placeId": "nha-suga",
        "title": "💆 Spa Nhà Suga Premium",
        "status": "To book",
        "bookingRequired": true,
        "fields": {
          "Package": "TBC",
          "Booking ref": "TBC"
        },
        "body": [
          "韓式 head spa，落機後 reset。",
          "🕘 出發前再確認"
        ],
        "routeHint": "Next: Grab to Omakase Tiger — approx. 15 min / ~60k–90k VND.",
        "mapUrl": "https://maps.google.com/?q=Spa+Nhà+Suga+Premium"
      },
      {
        "type": "activity",
        "time": "17:30",
        "placeId": "omakase-tiger",
        "title": "🍣 Omakase Tiger",
        "body": [
          "首晚日落 Omakase，建議提早訂位。",
          "🕘 Tue–Sun 17:30 / 20:00；Monday closed"
        ],
        "routeHint": "Next: Grab to Nguyễn Huệ / The Cafe Apartments night photo — approx. 15–20 min / ~60k–90k VND.",
        "mapUrl": "https://maps.google.com/?q=Omakase+Tiger+The+Penthouse+Ho+Chi+Minh"
      },
      {
        "type": "activity",
        "time": "19:45",
        "placeId": "cafe-apartments",
        "title": "🌃 The Cafe Apartments",
        "body": [
          "Optional night photo stop。",
          "🕘 各店不同；大多約 09:00–22:00"
        ],
        "routeHint": "Next: walk back to hotel — approx. 5 min.",
        "mapUrl": "https://maps.google.com/?q=The+Cafe+Apartments+42+Nguyễn+Huệ"
      }
    ]
  },
  "day2": {
    "kicker": "Day 2 · 31 Oct • Saturday",
    "title": "Breakfast, Cooking, Spa & LÚNE",
    "note": "Days 頁以即場導航為主；詳細背景、必點同注意事項已移到 Guide。",
    "legend": [
      "☀️ Morning",
      "🍜 Midday",
      "🌙 Evening"
    ],
    "items": [
      {
        "type": "activity",
        "time": "08:30–09:30",
        "placeId": "com-tam-moc",
        "title": "🍚 Cơm Tấm Mộc - Lý Tự Trọng",
        "body": [
          "在地特色早餐 · 老字號碎米飯，先試一口地道早餐再去 Cooking Class。",
          "📍 Lý Tự Trọng 街，距酒店步行約 8 分鐘",
          "🕐 06:00–22:00 · 💰 約 60,000–100,000 VND / 人",
          "⭐ 必點：炭烤厚切豬排碎米飯（Cơm Tấm Sườn）；4 人點 2–3 份分食。"
        ],
        "routeHint": "Cơm Tấm Mộc → Saigon Cooking Class：Grab 約 5 分鐘 ／ ~40,000–60,000 VND。",
        "mapUrl": "https://maps.google.com/?q=Cơm+Tấm+Mộc+Lý+Tự+Trọng+Ho+Chi+Minh"
      },
      {
        "type": "experience",
        "time": "10:00–13:00",
        "placeId": "cooking",
        "title": "👩🏻‍🍳 Saigon Cooking Class",
        "status": "To book",
        "duration": "3 hours",
        "bookingRequired": true,
        "fields": {
          "Meeting point": "39B Trần Cao Vân",
          "Includes": "Market walk + lunch",
          "Booking ref": "TBC"
        },
        "body": [
          "濱城市場導覽 + 散步廚藝課，完成後即場午餐。",
          "出發前將 booking confirmation / WhatsApp / QR screenshot 補入此卡。"
        ],
        "routeHint": "Cooking Class → Mộc Kim Spa & Beauty：Grab 約 10–12 分鐘。",
        "mapUrl": "https://maps.google.com/?q=Saigon+Cooking+Class+39B+Trần+Cao+Vân"
      },
      {
        "type": "activity",
        "time": "13:15–15:15",
        "placeId": "moc-kim",
        "title": "🌿 Mộc Kim Spa & Beauty",
        "body": [
          "經典放鬆療程，讓身心徹底舒緩。",
          "📍 143 Lê Thị Hồng Gấm, Phường Nguyễn Thái Bình, Quận 1",
          "☎️ +84 968 459 618 · 🕘 08:30–21:00"
        ],
        "routeHint": "Spa → LIBÉ：Grab 約 10 分鐘，開始 Nguyễn Trãi shopping flow。",
        "mapUrl": "https://maps.google.com/?q=Mộc+Kim+Spa+Beauty+143+Lê+Thị+Hồng+Gấm"
      },
      {
        "type": "activity",
        "time": "15:30–18:45",
        "placeId": "libe",
        "title": "🛍 Shopping Flow",
        "body": [
          "精品小店、設計師品牌、潮流選物店。時間夠就慢慢行，唔夠就 skip optional。"
        ],
        "routeHint": "🚕 To dinner\nVincom / The New Playground → LÚNE：Grab 約 5 分鐘。",
        "mapUrl": "https://maps.google.com/?q=LIBÉ+52+Nguyễn+Trãi"
      },
      {
        "type": "activity",
        "time": "19:00–21:00",
        "placeId": "lune",
        "title": "🍷 LÚNE Restaurant & Bar",
        "body": [
          "Shopping 後直接去的法式／現代越式晚餐。",
          "📍 17/14 Lê Thánh Tôn, Bến Nghé, Quận 1"
        ],
        "routeHint": "🚕 To hotel\nDinner 後按體力決定 Grab / walk 回 Fusion；Grab 約 5 分鐘。",
        "mapUrl": "https://maps.google.com/?q=LÚNE+Restaurant+Bar+17/14+Lê+Thánh+Tôn"
      }
    ]
  },
  "day3": {
    "kicker": "Day 3 · 1 Nov • Sunday",
    "title": "A Slower Side",
    "note": "Days 頁以即場導航為主；詳細背景、必點同注意事項已移到 Guide。",
    "legend": [
      "☀️ Morning",
      "🍜 Midday",
      "🌙 Evening"
    ],
    "items": [
      {
        "type": "activity",
        "time": "09:00–10:00",
        "placeId": "quan-thuy",
        "title": "🦀 Quán Thuý 94 - Miến Cua 老字號蟹肉粉絲",
        "body": [
          "必點：蟹肉炒粉絲湯 + 外酥內軟炸蟹肉春捲。約 80,000–120,000 VND / 人。",
          "🕘 06:00–14:00"
        ],
        "routeHint": "吃完步行約 5 分鐘即達粉紅教堂（同一個 Tân Định 街區）。",
        "mapUrl": "https://maps.google.com/?q=Quán+Thuý+94+Đinh+Tiên+Hoàng"
      },
      {
        "type": "activity",
        "time": "10:00–10:45",
        "placeId": "pink-church",
        "title": "🌸 新定教堂（粉紅教堂）快閃打卡 · ☕ Cộng Cà Phê",
        "body": [
          "正面廣場拍教堂全景 → 對面 Cộng Cà Phê 三樓景觀陽台可俯瞰教堂，點一杯椰子冰沙咖啡邊喝邊拍。"
        ],
        "routeHint": "Next: Push Push Official（教堂附近則順路，否則略過）。",
        "mapUrl": "https://maps.google.com/?q=Tân+Định+Church"
      },
      {
        "type": "activity",
        "time": "10:45–11:30",
        "placeId": "push-push",
        "title": "👗 Push Push Official 服飾",
        "body": [
          "主打 streetwear。備註：此品牌之前未能確認有實體店；建議出發前先查閱 Instagram @pusspussofficial 確認地址。如有實體店就在教堂附近則可順路，否則略過。"
        ],
        "routeHint": "叫 Grab 出發跨橋去草田區 Thảo Điền，約 15 分鐘 ／ ~80,000–120,000 VND。",
        "mapUrl": null
      },
      {
        "type": "activity",
        "time": "11:45–13:30",
        "placeId": "saigon-concept",
        "title": "🌿 草田街區漫步・選物店掃街",
        "body": [
          "第一站 Saigon Concept（14 Trần Ngọc Diện）：複合式紅磚庭園，棉麻女裝 DESIGNED BY SISI + 北歐風選物 LYKKE Studios（順路：In the Mood，32 Trần Ngọc Diện，手信家居小物）。第二站 Soo Kafe（23A Trần Ngọc Diện，正隔壁）：順路外帶手工蛋撻。第三站 YouOn Boutique（29 Thảo Điền）：高端輕熟度假風棉麻女裝。"
        ],
        "routeHint": "Next: 法式下午茶（步行可達）。",
        "mapUrl": "https://maps.google.com/?q=Saigon+Concept+Thảo+Điền"
      },
      {
        "type": "activity",
        "time": "13:30–14:30",
        "placeId": "bakes",
        "title": "🥐 精緻法式下午茶（二選一）",
        "body": [
          "Bakes Thảo Điền — 精緻法式甜點與多口味千層可頌；或 The Dreamers Bakery — 冷氣雅座，招牌蛋撻與大叻鮮牛奶（兩店相距僅 50 米）。約 80,000–150,000 VND / 人，4 人點 2–3 件分食。"
        ],
        "routeHint": "Next: 文創家居繼續逛（步行可達）。",
        "mapUrl": "https://maps.google.com/?q=Bakes+Thảo+Điền"
      },
      {
        "type": "activity",
        "time": "14:30–15:30",
        "placeId": "ohquao",
        "title": "🎨 文創家居",
        "body": [
          "OHQUAO Living（19 Đường Số 38）— 在地藝術家明信片、香氛、手工藝品；Louh × Alouane（61 Nguyễn Bá Huân）— 高級棉織品家居服，親膚柔軟。"
        ],
        "routeHint": "Next: 從 Louh × Alouane 步行 2–3 分鐘到 Mộc Hương Wellness。",
        "mapUrl": "https://maps.google.com/?q=OHQUAO+Living+Thảo+Điền"
      },
      {
        "type": "activity",
        "time": "15:45–17:45",
        "placeId": "moc-huong",
        "title": "🌿 Mộc Hương Wellness Thảo Điền",
        "body": [
          "白色法式別墅，附蒸氣房，寄存戰利品無憂。草本熱石按摩約 700,000–1,100,000 VND / 人。",
          "🕘 09:00–21:00"
        ],
        "routeHint": "Next: Grab to Little Bear — approx. 3 min / ~30k–50k VND.",
        "mapUrl": "https://maps.google.com/?q=Mộc+Hương+Wellness+Thảo+Điền"
      },
      {
        "type": "activity",
        "time": "19:00–21:00",
        "placeId": "little-bear",
        "title": "🐻 Little Bear",
        "body": [
          "Michelin Guide 餐酒館，留甜品空間。",
          "🕘 18:00–22:00；Monday closed"
        ],
        "routeHint": "Next: Grab back to hotel — approx. 15 min / ~80k–120k VND.",
        "mapUrl": "https://maps.google.com/?q=Little+Bear+Thảo+Điền"
      },
      {
        "type": "activity",
        "time": "21:00",
        "placeId": "marou",
        "title": "🍫 Maison Marou @ Fusion Original",
        "body": [
          "返回酒店後，到大廈內的 Maison Marou 嚐一杯濃郁熱朱古力。"
        ],
        "routeHint": null,
        "mapUrl": "https://maps.google.com/?q=Maison+Marou+Saigon"
      }
    ]
  },
  "day4": {
    "kicker": "Day 4 · 2 Nov • Monday",
    "title": "City Contrast",
    "note": "Days 頁以即場導航為主；詳細背景、必點同注意事項已移到 Guide。",
    "legend": [
      "☀️ Morning",
      "🍜 Midday",
      "🌙 Evening"
    ],
    "items": [
      {
        "type": "activity",
        "time": "08:30",
        "placeId": "running-bean",
        "title": "☕ The Running Bean",
        "body": [
          "晨間咖啡，慢慢開始一日。",
          "🕘 07:30–22:00"
        ],
        "routeHint": "Next: Grab to War Remnants Museum — approx. 8–10 min / ~60k–90k VND.",
        "mapUrl": "https://maps.google.com/?q=The+Running+Bean+Ho+Chi+Minh"
      },
      {
        "type": "activity",
        "time": "09:45",
        "placeId": "war-museum",
        "title": "🏛 War Remnants Museum",
        "body": [
          "內容沉重但重要，預留 60–90 分鐘。",
          "🕘 07:30–17:30"
        ],
        "routeHint": "Next: Grab to Pizza 4P’s Hai Bà Trưng — approx. 8 min / ~60k–90k VND.",
        "mapUrl": "https://maps.google.com/?q=War+Remnants+Museum"
      },
      {
        "type": "activity",
        "time": "12:00",
        "placeId": "pizza4ps",
        "title": "🍕 Pizza 4P’s Võ Văn Tần",
        "body": [
          "自家製芝士 Pizza，轉口味午餐。",
          "🕘 出發前再確認"
        ],
        "routeHint": "Next: Grab to 11 Garmentory / Trần Quang Diệu area — approx. 15 min.",
        "mapUrl": "https://maps.google.com/?q=Pizza+4P's+Võ+Văn+Tần"
      },
      {
        "type": "activity",
        "time": "13:30–16:30",
        "placeId": "garmentory",
        "title": "🛍 Shopping Block",
        "body": [
          "11 Garmentory、Push Push 設計師選物。",
          "🕘 出發前再確認"
        ],
        "routeHint": "Next: walk the Trần Quang Diệu shopping line — mostly 1–5 min between stores.",
        "mapUrl": "https://maps.google.com/?q=11+Garmentory+Ho+Chi+Minh"
      },
      {
        "type": "activity",
        "time": "17:30",
        "placeId": "temple-leaf",
        "title": "🦶 Temple Leaf Spa Land",
        "body": [
          "足底按摩，晚餐前放鬆雙腳。",
          "🕘 10:00–23:30"
        ],
        "routeHint": "Next: Grab back to hotel — approx. 8–10 min / ~60k–90k VND.",
        "mapUrl": "https://maps.google.com/?q=Temple+Leaf+Spa+Land+Ho+Chi+Minh"
      },
      {
        "type": "activity",
        "time": "19:30",
        "placeId": "quince",
        "title": "🔥 Quince Saigon",
        "body": [
          "木火料理，旅程最後正式晚餐。",
          "🕘 17:30–22:30"
        ],
        "routeHint": "Next: optional Social Club Rooftop Bar — approx. 5 min Grab / ~40k–60k VND.",
        "mapUrl": "https://maps.google.com/?q=Quince+Saigon"
      }
    ]
  },
  "day5": {
    "kicker": "Day 5 · 3 Nov • Tuesday",
    "title": "Until Next Time",
    "note": "Days 頁以即場導航為主；詳細背景、必點同注意事項已移到 Guide。",
    "legend": [
      "☀️ Morning",
      "🍜 Midday",
      "🌙 Evening"
    ],
    "items": [
      {
        "type": "activity",
        "time": "09:30–10:30",
        "placeId": "pho-vietnam",
        "title": "🥣 Phở Việt Nam Bến Thành 早餐",
        "body": [
          "Michelin 推介 2024 & 2025。招牌石鍋牛肉河粉，滾燙石鍋現場燙生和牛片，湯頭極香。約 100,000–150,000 VND / 人。",
          "🕘 06:00–22:00"
        ],
        "routeHint": "Next: walk to Fine Arts Museum — approx. 4 min.",
        "mapUrl": "https://maps.google.com/?q=Phở+Việt+Nam+Bến+Thành"
      },
      {
        "type": "activity",
        "time": "10:30–11:45",
        "placeId": "fine-arts",
        "title": "🖼 胡志明市美術館復古人文街拍",
        "body": [
          "全西貢最古老木製手拉升降電梯、彩色玻璃窗斜射光，王家衛風格大片首選。",
          "🕘 09:00–17:00（週二至週日，週一休息）· 入場費 30,000 VND / 人"
        ],
        "routeHint": "Next: Grab to Bếp Mẹ Ỉn — approx. 4 min / ~35k–50k VND.",
        "mapUrl": "https://maps.google.com/?q=Ho+Chi+Minh+City+Museum+of+Fine+Arts"
      },
      {
        "type": "activity",
        "time": "11:45–13:00",
        "placeId": "bep-me-in",
        "title": "🏡 Bếp Mẹ Ỉn 午餐",
        "body": [
          "Michelin Bib Gourmand（多年連續）。必點：黃金巨大煎餅（Bánh Xèo）外皮酥脆 + 整顆椰子炒飯 + 越式拼盤。約 150,000–250,000 VND / 人。",
          "🕘 10:00–21:00"
        ],
        "routeHint": "Next: Grab to Takashimaya — approx. 3 min / ~30k–50k VND.",
        "mapUrl": "https://maps.google.com/?q=Bếp+Mẹ+Ỉn+Ho+Chi+Minh"
      },
      {
        "type": "activity",
        "time": "13:00–14:15",
        "placeId": "takashimaya",
        "title": "🏬 Takashimaya · 🍫 Maison Marou",
        "body": [
          "高島屋手信快閃 + Maison Marou 朱古力。必購 Marou 朱古力磚、滴漏咖啡豆、大叻乾果、特色茶葉（可退稅）。地庫專櫃必買一杯招牌冰/熱朱古力。",
          "🕘 10:00–22:00"
        ],
        "routeHint": "回到 Fusion Original 酒店提取寄存行李，迅速塞箱打包。",
        "mapUrl": "https://maps.google.com/?q=Takashimaya+Saigon"
      },
      {
        "type": "activity",
        "time": "14:15–14:45",
        "placeId": "hotel-luggage",
        "title": "🧳 回酒店提行李與最後整理",
        "body": [
          "回到 Fusion Original 酒店提取寄存行李，迅速塞箱打包，準備出發。"
        ],
        "routeHint": "提早 14:45 出發，完美避開 17:00 後第一郡下班塞車潮。Grab 酒店 → Hạ Spa（Tân Bình）約 20–25 分鐘 ／ ~100,000–150,000 VND。",
        "mapUrl": null
      },
      {
        "type": "activity",
        "time": "15:30–17:30",
        "placeId": "ha-spa",
        "title": "🌿 Hạ Spa 120 分鐘「草本洗頭 + 全身熱石按摩」",
        "body": [
          "越式草本洗頭 + 全身熱石精油按摩，免費大行李寄存，備有吹風機。約 800,000–1,200,000 VND / 人。⚠️ 預約時必須備註「當晚 21:00 航班，療程必須 17:30 完成」。",
          "🕘 09:00–21:00（距新山一機場僅 2 分鐘車程）"
        ],
        "routeHint": "Next: Grab to airport international terminal — approx. 2 min / ~20k–30k VND.",
        "mapUrl": "https://maps.google.com/?q=Hạ+Spa+Ho+Chi+Minh"
      },
      {
        "type": "activity",
        "time": "18:00–21:10",
        "placeId": "airport",
        "title": "✈️ 機場 Check-in → 免稅店 → 登機",
        "body": [
          "18:00 準時在國際線櫃檯辦理 Check-in，國際線建議提早 3 小時。過關後在登機閘口旁嚐一份清爽鮮蝦米紙捲，為五天塗上最後一口西貢色彩。"
        ],
        "routeHint": null,
        "mapUrl": null
      }
    ]
  }
};
