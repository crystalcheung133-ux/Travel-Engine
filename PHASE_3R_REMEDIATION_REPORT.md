# Phase 3R — Engine Remediation

Status: COMPLETE

- Removed destination-specific New Zealand content from runtime HTML.
- Guide, Trip and Days pages now render from data.js.
- Day navigation derives the maximum day from ITINERARY_DATA.
- Currency dashboard supports JPY to AUD and HKD with cached offline rates.
- Theme metadata is synchronised to #8F4F61.
- Japan emergency settings are centralised: police 110; fire/ambulance 119.
- Latest confirmed rental booking is used: pickup and return at 15:30.
- Service worker cache bumped to tokyo-mum70-v2.
- Static stale-destination scan: PASS.
- Data integrity and local asset validation: PASS.
