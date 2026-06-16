# The Harvard Cafe MVP Notes

## What works in this MVP

- One-page public React website with premium aviation restaurant styling.
- Menu with categories, availability, prices in South African Rand, and add-to-cart takeaway flow.
- Booking request form with pending status.
- Takeaway order form with server-side total calculation in PHP.
- Function enquiry form.
- Daily specials section.
- Gallery, history timeline, airshow/event mode, and contact placeholders.
- Hidden `/admin` Harvard Command Deck dashboard.
- Admin polling every 10 seconds for bookings and orders.
- Staff status updates for orders and bookings.
- Basic JSON PHP API using PDO and MySQL.
- SQL schema and seed data for a practical cPanel deployment.

## Placeholder content

- All images are referenced by filename but must be replaced with original, licensed, or approved assets.
- Menu names, prices, descriptions, specials, and function wording are placeholder content.
- Contact details, WhatsApp number, address, opening hours, and social links are placeholders.
- Rand Airport history copy is intentionally marked as unverified placeholder text.
- Admin login is a local-state placeholder only.

## Must be verified before client launch

- Official restaurant logo, name styling, brand copy, menu, prices, and trading hours.
- Official contact details and WhatsApp number.
- Correct physical address and Google Maps embed.
- Historical claims about Rand Airport, WWII relevance, SAA Museum references, and aviation preservation.
- Rights and permissions for all food, aircraft, apron, event, and historical images.
- POPIA/privacy wording for customer data collection.
- Production database credentials and hosting paths.

## Recommended future improvements

- Proper admin login with password hashing, sessions, roles, and CSRF protection.
- WhatsApp integration for confirmations and customer updates.
- Online payments for deposits, vouchers, and pre-orders.
- WebSocket or push notifications instead of 10-second polling.
- Full airshow mode with capacity controls, special menus, platters, VIP seating, and timed pre-orders.
- Gift vouchers.
- Runway Club loyalty programme.
- Menu manager CRUD.
- Gallery upload manager.
- Reports for revenue, order status, booking conversion, and popular menu items.
- Email notifications for bookings and function enquiries.
