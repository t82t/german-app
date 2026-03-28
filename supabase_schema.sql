-- Create tables

-- 1. Categories
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE, -- null means public/default category
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 2. Vocabulary
CREATE TABLE vocabulary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE, -- null means public/default word
  german text NOT NULL,
  english text NOT NULL,
  respelling text,
  created_at timestamptz DEFAULT now()
);

-- 3. User Progress (tracking learning status)
CREATE TABLE user_vocabulary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vocabulary_id uuid REFERENCES vocabulary(id) ON DELETE CASCADE NOT NULL,
  success_count integer DEFAULT 0,
  last_reviewed timestamptz,
  UNIQUE(user_id, vocabulary_id)
);


-- Setup Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_vocabulary ENABLE ROW LEVEL SECURITY;

-- Policies for Categories
-- Everyone can read public categories (user_id IS NULL) OR their own custom categories
CREATE POLICY "Users can view public or their own categories" 
  ON categories FOR SELECT 
  USING (user_id IS NULL OR user_id = auth.uid());

-- Users can only insert, update, or delete their own custom categories
CREATE POLICY "Users can manage their own categories" 
  ON categories FOR ALL 
  USING (user_id = auth.uid()) 
  WITH CHECK (user_id = auth.uid());

-- Policies for Vocabulary
-- Everyone can read public words (user_id IS NULL) OR their own custom words
CREATE POLICY "Users can view public or their own words" 
  ON vocabulary FOR SELECT 
  USING (user_id IS NULL OR user_id = auth.uid());

-- Users can only insert, update, or delete their own custom words
CREATE POLICY "Users can manage their own words" 
  ON vocabulary FOR ALL 
  USING (user_id = auth.uid()) 
  WITH CHECK (user_id = auth.uid());

-- Policies for User Progress
-- Users can only see and manage their own progress
CREATE POLICY "Users can manage their own progress" 
  ON user_vocabulary FOR ALL 
  USING (user_id = auth.uid()) 
  WITH CHECK (user_id = auth.uid());
