CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(60) NOT NULL DEFAULT 'manager',
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(160) NOT NULL,
  description TEXT,
  price_cents INT NOT NULL,
  image_path VARCHAR(255),
  available TINYINT(1) NOT NULL DEFAULT 1,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_menu_items_category FOREIGN KEY (category_id) REFERENCES menu_categories(id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(40) NOT NULL UNIQUE,
  customer_name VARCHAR(140) NOT NULL,
  customer_phone VARCHAR(60) NOT NULL,
  customer_email VARCHAR(160),
  collection_time VARCHAR(40) NOT NULL,
  notes TEXT,
  status VARCHAR(40) NOT NULL DEFAULT 'pending',
  payment_method VARCHAR(80) NOT NULL DEFAULT 'Pay on collection',
  subtotal_cents INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT,
  item_name VARCHAR(160) NOT NULL,
  qty INT NOT NULL,
  unit_price_cents INT NOT NULL,
  line_total_cents INT NOT NULL,
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_menu_item FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE SET NULL
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(140) NOT NULL,
  customer_phone VARCHAR(60) NOT NULL,
  customer_email VARCHAR(160),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  guests INT NOT NULL,
  seating_preference VARCHAR(120),
  occasion VARCHAR(140),
  notes TEXT,
  status VARCHAR(40) NOT NULL DEFAULT 'pending',
  staff_note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE function_enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(140) NOT NULL,
  customer_phone VARCHAR(60) NOT NULL,
  customer_email VARCHAR(160),
  event_date DATE NOT NULL,
  guest_count INT NOT NULL,
  function_type VARCHAR(120) NOT NULL,
  budget_range VARCHAR(120),
  notes TEXT,
  status VARCHAR(40) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE daily_specials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT,
  price_cents INT NOT NULL,
  image_path VARCHAR(255),
  special_date DATE,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT,
  image_path VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(140) NOT NULL,
  phone VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(160),
  source VARCHAR(80) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT,
  event_date DATE,
  event_type VARCHAR(100),
  booking_enabled TINYINT(1) NOT NULL DEFAULT 0,
  preorder_enabled TINYINT(1) NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(120) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id INT,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE SET NULL
);
