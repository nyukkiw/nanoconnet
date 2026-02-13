-- ============================================================================
-- NANOConnect Database Schema for Supabase/PostgreSQL
-- ============================================================================
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('sme', 'influencer', 'admin')),
  profile_image_url TEXT,
  bio TEXT,
  location VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_is_active ON users(is_active);

-- ============================================================================
-- 2. INFLUENCERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS influencers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  followers_count INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5, 2) DEFAULT 0,
  niche VARCHAR(255) NOT NULL,
  price_per_post DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  bio_extended TEXT,
  instagram_handle VARCHAR(255),
  tiktok_handle VARCHAR(255),
  youtube_channel VARCHAR(255),
  twitter_handle VARCHAR(255),
  collaboration_rate DECIMAL(5, 2),
  response_time_hours INTEGER,
  previous_collaborations INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_influencers_user_id ON influencers(user_id);
CREATE INDEX idx_influencers_niche ON influencers(niche);
CREATE INDEX idx_influencers_is_available ON influencers(is_available);

-- ============================================================================
-- 3. ORDERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  influencer_id UUID NOT NULL REFERENCES influencers(id) ON DELETE CASCADE,
  sme_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'negotiating', 'accepted', 'in_progress', 'completed', 'cancelled')),
  campaign_title VARCHAR(255) NOT NULL,
  campaign_description TEXT,
  campaign_requirements TEXT,
  total_price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  delivery_deadline DATE,
  actual_delivery_date DATE,
  number_of_posts INTEGER DEFAULT 1,
  hashtags_required TEXT,
  content_type VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_influencer_id ON orders(influencer_id);
CREATE INDEX idx_orders_sme_id ON orders(sme_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);

-- ============================================================================
-- 4. REVIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES influencers(id) ON DELETE SET NULL,
  sme_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  review_type VARCHAR(50) DEFAULT 'influencer_performance' CHECK (review_type IN ('influencer_performance', 'sme_collaboration')),
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_order_id ON reviews(order_id);
CREATE INDEX idx_reviews_influencer_id ON reviews(influencer_id);
CREATE INDEX idx_reviews_sme_id ON reviews(sme_id);

-- ============================================================================
-- INSERT SAMPLE DATA
-- ============================================================================

-- Sample Users (3 SME, 2 Influencers, 1 Admin)
INSERT INTO users (name, email, password, phone, user_type, profile_image_url, location, verified_at) VALUES
('PT Modern Marketing', 'contact@modernmkt.com', '$2b$10$hashedpassword1', '+62812345678', 'sme', 'https://example.com/img1.jpg', 'Jakarta, Indonesia', CURRENT_TIMESTAMP),
('Toko Emas Sejati', 'admin@tokoemasbersama.com', '$2b$10$hashedpassword2', '+62813456789', 'sme', 'https://example.com/img2.jpg', 'Bandung, Indonesia', CURRENT_TIMESTAMP),
('E-Commerce Fashion ID', 'hello@fashionid.com', '$2b$10$hashedpassword3', '+62814567890', 'sme', 'https://example.com/img3.jpg', 'Surabaya, Indonesia', CURRENT_TIMESTAMP),
('Siti Nurhaliza', 'siti@instagram.com', '$2b$10$hashedpassword4', '+62815678901', 'influencer', 'https://example.com/img4.jpg', 'Jakarta, Indonesia', CURRENT_TIMESTAMP),
('Atta Halilintar', 'atta@youtube.com', '$2b$10$hashedpassword5', '+62816789012', 'influencer', 'https://example.com/img5.jpg', 'Bandung, Indonesia', CURRENT_TIMESTAMP),
('Admin NanoConnect', 'admin@nanoconnect.com', '$2b$10$hashedpassword6', '+62817890123', 'admin', NULL, 'Jakarta, Indonesia', CURRENT_TIMESTAMP);

-- Sample Influencers
INSERT INTO influencers (user_id, followers_count, engagement_rate, niche, price_per_post, instagram_handle, tiktok_handle, collaboration_rate, response_time_hours, previous_collaborations, rating, total_reviews) 
SELECT id, 250000, 4.5, 'Fashion & Lifestyle', 5000000, '@sitiofficial', '@sitiofficial', 85, 24, 12, 4.8, 15
FROM users WHERE email = 'siti@instagram.com'
UNION ALL
SELECT id, 5000000, 8.2, 'Entertainment & Travel', 50000000, '@attahalilintar', '@attahalilintar', 90, 12, 45, 4.9, 42
FROM users WHERE email = 'atta@youtube.com';

-- Sample Orders
INSERT INTO orders (influencer_id, sme_id, order_status, campaign_title, campaign_description, total_price, delivery_deadline, number_of_posts, content_type, payment_status)
SELECT 
  inf.id,
  u.id,
  'completed',
  'Promosi Koleksi Terbaru 2024',
  'Promosi koleksi fashion terbaru untuk musim panas',
  10000000,
  CURRENT_DATE + INTERVAL '14 days',
  3,
  'Instagram Reels & Feed Posts',
  'paid'
FROM influencers inf
JOIN users u ON u.email = 'contact@modernmkt.com'
WHERE inf.user_id = (SELECT id FROM users WHERE email = 'siti@instagram.com')
LIMIT 1;

INSERT INTO orders (influencer_id, sme_id, order_status, campaign_title, campaign_description, total_price, delivery_deadline, number_of_posts, content_type, payment_status)
SELECT 
  inf.id,
  u.id,
  'in_progress',
  'Campaign Perhiasan Emas Premium',
  'Showcase koleksi perhiasan emas eksklusif',
  25000000,
  CURRENT_DATE + INTERVAL '21 days',
  5,
  'YouTube Video & TikTok',
  'paid'
FROM influencers inf
JOIN users u ON u.email = 'admin@tokoemasbersama.com'
WHERE inf.user_id = (SELECT id FROM users WHERE email = 'atta@youtube.com')
LIMIT 1;

INSERT INTO orders (influencer_id, sme_id, order_status, campaign_title, campaign_description, total_price, delivery_deadline, number_of_posts, content_type, payment_status)
SELECT 
  inf.id,
  u.id,
  'pending',
  'Fashion Forward Challenge',
  'Campaign tantangan styling dengan produk kami',
  8000000,
  CURRENT_DATE + INTERVAL '30 days',
  2,
  'TikTok Challenge',
  'pending'
FROM influencers inf
JOIN users u ON u.email = 'hello@fashionid.com'
WHERE inf.user_id = (SELECT id FROM users WHERE email = 'siti@instagram.com')
LIMIT 1;

INSERT INTO orders (influencer_id, sme_id, order_status, campaign_title, campaign_description, total_price, delivery_deadline, number_of_posts, content_type, payment_status)
SELECT 
  inf.id,
  u.id,
  'completed',
  'Travel & Lifestyle Documentation',
  'Dokumentasi pengalaman produk kami dalam perjalanan',
  15000000,
  CURRENT_DATE + INTERVAL '7 days',
  4,
  'Instagram Stories & Reels',
  'paid'
FROM influencers inf
JOIN users u ON u.email = 'hello@fashionid.com'
WHERE inf.user_id = (SELECT id FROM users WHERE email = 'atta@youtube.com')
LIMIT 1;

INSERT INTO orders (influencer_id, sme_id, order_status, campaign_title, campaign_description, total_price, delivery_deadline, number_of_posts, content_type, payment_status)
SELECT 
  inf.id,
  u.id,
  'negotiating',
  'Seasonal Product Launch',
  'Peluncuran produk musiman dengan brand ambassador',
  12000000,
  CURRENT_DATE + INTERVAL '45 days',
  3,
  'Multi-platform Campaign',
  'pending'
FROM influencers inf
JOIN users u ON u.email = 'contact@modernmkt.com'
WHERE inf.user_id = (SELECT id FROM users WHERE email = 'atta@youtube.com')
LIMIT 1;

-- Sample Reviews
INSERT INTO reviews (order_id, influencer_id, sme_id, rating, comment, review_type)
SELECT 
  o.id,
  inf.id,
  u.id,
  5,
  'Kolaborasi yang sangat profesional dan hasil yang memuaskan. Influencer sangat responsif dan memahami kebutuhan brand kami dengan baik.',
  'influencer_performance'
FROM orders o
JOIN influencers inf ON o.influencer_id = inf.id
JOIN users u ON o.sme_id = u.id
WHERE o.order_status = 'completed'
ORDER BY o.created_at ASC
LIMIT 1;

INSERT INTO reviews (order_id, influencer_id, sme_id, rating, comment, review_type)
SELECT 
  o.id,
  inf.id,
  u.id,
  4,
  'Hasil kampanye sangat baik dengan engagement rate yang tinggi. Proses pembayaran lancar dan transparan.',
  'sme_collaboration'
FROM orders o
JOIN influencers inf ON o.influencer_id = inf.id
JOIN users u ON o.sme_id = u.id
WHERE o.order_status = 'completed'
ORDER BY o.created_at ASC
OFFSET 1
LIMIT 1;

INSERT INTO reviews (order_id, influencer_id, sme_id, rating, comment, review_type)
SELECT 
  o.id,
  inf.id,
  u.id,
  5,
  'Influencer memberikan konten berkualitas tinggi dengan visual yang menarik. Rekomendasi untuk campaign berikutnya!',
  'influencer_performance'
FROM orders o
JOIN influencers inf ON o.influencer_id = inf.id
JOIN users u ON o.sme_id = u.id
WHERE o.order_status = 'completed'
ORDER BY o.created_at ASC
OFFSET 2
LIMIT 1;

INSERT INTO reviews (order_id, influencer_id, sme_id, rating, comment, review_type)
SELECT 
  o.id,
  inf.id,
  u.id,
  4,
  'Proses negosiasi lancar dan influencer fleksibel dalam menyesuaikan konten sesuai brand guidelines kami.',
  'sme_collaboration'
FROM orders o
JOIN influencers inf ON o.influencer_id = inf.id
JOIN users u ON o.sme_id = u.id
WHERE o.order_status = 'completed'
ORDER BY o.created_at ASC
OFFSET 3
LIMIT 1;

INSERT INTO reviews (order_id, influencer_id, sme_id, rating, comment, review_type)
SELECT 
  o.id,
  inf.id,
  u.id,
  5,
  'Delivery tepat waktu, kualitas konten premium, dan peningkatan follower yang signifikan setelah campaign.',
  'influencer_performance'
FROM orders o
JOIN influencers inf ON o.influencer_id = inf.id
JOIN users u ON o.sme_id = u.id
WHERE o.order_status = 'completed'
ORDER BY o.created_at ASC
OFFSET 4
LIMIT 1;