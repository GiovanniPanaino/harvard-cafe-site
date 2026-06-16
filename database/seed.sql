INSERT INTO admin_users (name, email, password_hash, role, active) VALUES
('Harvard Manager Placeholder', 'manager@harvard-cafe.local', '$2y$10$replace_with_real_hash_before_launch', 'manager', 1);

INSERT INTO menu_categories (id, name, description, sort_order, active) VALUES
(1, 'Breakfast Hangar', 'Placeholder morning plates for early arrivals.', 1, 1),
(2, 'Runway Lunch', 'Burgers, grills, and family favourites.', 2, 1),
(3, 'Pilot Plates', 'Heartier mains for long-table lunches.', 3, 1),
(4, 'Little Flyers', 'Simple family-friendly placeholder meals.', 4, 1),
(5, 'Control Tower Drinks', 'Coffee, shakes, and soft drinks.', 5, 1);

INSERT INTO menu_items (category_id, name, description, price_cents, image_path, available, featured, sort_order) VALUES
(1, 'Harvard Breakfast', 'Eggs, bacon, grilled tomato, toast, and chips. Placeholder item.', 9200, '/assets/images/breakfast_plate_placeholder.webp', 1, 1, 1),
(1, 'Apron Sunrise Omelette', 'Three-egg omelette with cheese and herbs. Placeholder item.', 7800, '/assets/images/breakfast_plate_placeholder.webp', 1, 0, 2),
(1, 'Biker Breakfast Roll', 'Bacon, egg, and relish on a toasted roll. Placeholder item.', 6900, '/assets/images/breakfast_plate_placeholder.webp', 1, 0, 3),
(2, 'Runway Burger', 'Beef burger, cheese, chips, and house sauce. Placeholder item.', 11900, '/assets/images/burgers_and_fries_placeholder.webp', 1, 1, 4),
(2, 'Hangar Chicken Burger', 'Grilled chicken, slaw, aioli, and chips. Placeholder item.', 11200, '/assets/images/burgers_and_fries_placeholder.webp', 1, 0, 5),
(2, 'Club Sandwich Final Approach', 'Chicken, bacon, egg, tomato, and chips. Placeholder item.', 10500, '/assets/images/burgers_and_fries_placeholder.webp', 1, 0, 6),
(3, 'Heritage Steak Plate', 'Grilled steak, chips, onion rings, and sauce. Placeholder item.', 18900, '/assets/images/steak_dinner_placeholder.webp', 1, 1, 7),
(3, 'Captain''s Chicken Schnitzel', 'Chicken schnitzel with cheese sauce and chips. Placeholder item.', 13900, '/assets/images/steak_dinner_placeholder.webp', 1, 0, 8),
(3, 'Apron Fish and Chips', 'Crisp battered fish with chips and tartar sauce. Placeholder item.', 12800, '/assets/images/fish_and_chips_placeholder.webp', 1, 0, 9),
(4, 'Junior Pilot Burger', 'Mini burger and chips. Placeholder item.', 6500, '/assets/images/burgers_and_fries_placeholder.webp', 1, 0, 10),
(4, 'Little Flyer Nuggets', 'Chicken nuggets and chips. Placeholder item.', 5900, '/assets/images/burgers_and_fries_placeholder.webp', 1, 0, 11),
(4, 'Taxiway Toastie', 'Cheese toastie with chips. Placeholder item.', 5200, '/assets/images/breakfast_plate_placeholder.webp', 1, 0, 12),
(5, 'Control Tower Cappuccino', 'Fresh coffee, served hot. Placeholder item.', 3600, '/assets/images/coffee_latte_art_placeholder.webp', 1, 1, 13),
(5, 'Iced Coffee Flypast', 'Cold coffee with cream. Placeholder item.', 4900, '/assets/images/coffee_latte_art_placeholder.webp', 1, 0, 14),
(5, 'Runway Milkshake', 'Chocolate, vanilla, or strawberry. Placeholder item.', 5500, '/assets/images/coffee_latte_art_placeholder.webp', 1, 0, 15);

INSERT INTO daily_specials (title, description, price_cents, image_path, special_date, active) VALUES
('Tower Breakfast Clearance', 'A hearty breakfast plate with coffee. Placeholder special.', 9900, '/assets/images/breakfast_plate_placeholder.webp', CURDATE(), 1),
('Runway Burger Combo', 'Burger, chips, and a soft drink. Placeholder special.', 12900, '/assets/images/burgers_and_fries_placeholder.webp', CURDATE(), 1),
('Apron Steak Lunch', 'Steak, chips, and onion rings. Placeholder special.', 17900, '/assets/images/steak_dinner_placeholder.webp', CURDATE(), 1),
('Family Fly-In Platter', 'Shareable bites for the table. Placeholder special.', 24500, '/assets/images/table_with_food_placeholder.webp', CURDATE(), 1);

INSERT INTO gallery_items (title, description, image_path, category, sort_order, active) VALUES
('Food Placeholder', 'Replace with official food photography.', '/assets/images/table_with_food_placeholder.webp', 'Food', 1, 1),
('Aircraft Placeholder', 'Replace with licensed or original aircraft image.', '/assets/images/north_american_harvard_iia_7111.webp', 'Aircraft', 2, 1),
('Apron Placeholder', 'Replace with apron seating photography.', '/assets/images/hero_rand_airport_observation_deck.webp', 'Apron', 3, 1),
('Event Placeholder', 'Replace with approved event photography.', '/assets/images/function_elegant_dinner_table_placeholder.webp', 'Events', 4, 1),
('Restaurant Atmosphere Placeholder', 'Replace with interior restaurant photography.', '/assets/images/rand_airport_control_tower_airside.webp', 'Restaurant', 5, 1),
('Historic Photos Placeholder', 'Replace only after rights and historical wording are verified.', '/assets/images/saa_museum_boeing_747_lebombo.webp', 'History', 6, 1);

INSERT INTO events (title, description, event_date, event_type, booking_enabled, preorder_enabled, active) VALUES
('Airshow Mode Placeholder', 'Future event-day setup for reservations, pre-orders, platters, and VIP seating.', NULL, 'airshow', 0, 0, 1);
