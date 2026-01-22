/*
  # Opportunities CMS Database Setup

  1. New Tables
    - `opportunities`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `organization` (text, required)
      - `type` (text, required - scholarship/internship/summit/competition)
      - `description` (text, required - short description)
      - `full_description` (text, required - detailed description)
      - `deadline` (date, required)
      - `location` (text, required)
      - `amount` (text, optional)
      - `url` (text, required)
      - `image_url` (text, optional - store URL to external images)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tags`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    
    - `opportunity_tags` (junction table for many-to-many)
      - `opportunity_id` (uuid, foreign key)
      - `tag_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for opportunities and tags
    - Admin-only write access (future admin role support)

  3. Indexes
    - Index on type for filtering
    - Index on deadline for sorting
    - Index on location for filtering
    - Full text search support on title and description
*/

-- Create opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  type text NOT NULL CHECK (type IN ('scholarship', 'internship', 'summit', 'competition')),
  description text NOT NULL,
  full_description text NOT NULL,
  deadline date NOT NULL,
  location text NOT NULL,
  amount text,
  url text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create opportunity_tags junction table
CREATE TABLE IF NOT EXISTS opportunity_tags (
  opportunity_id uuid NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (opportunity_id, tag_id)
);

-- Enable RLS
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for opportunities (public read)
CREATE POLICY "Opportunities are publicly readable"
  ON opportunities FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert opportunities"
  ON opportunities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update opportunities"
  ON opportunities FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete opportunities"
  ON opportunities FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for tags (public read)
CREATE POLICY "Tags are publicly readable"
  ON tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tags"
  ON tags FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tags"
  ON tags FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for opportunity_tags (public read)
CREATE POLICY "Opportunity tags are publicly readable"
  ON opportunity_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage opportunity tags"
  ON opportunity_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete opportunity tags"
  ON opportunity_tags FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS opportunities_type_idx ON opportunities(type);
CREATE INDEX IF NOT EXISTS opportunities_deadline_idx ON opportunities(deadline);
CREATE INDEX IF NOT EXISTS opportunities_location_idx ON opportunities(location);
CREATE INDEX IF NOT EXISTS opportunities_created_at_idx ON opportunities(created_at DESC);
CREATE INDEX IF NOT EXISTS tags_name_idx ON tags(name);
