-- Reality Replay Supabase PostgreSQL Schema
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Replays Table
CREATE TABLE IF NOT EXISTS replays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  decision TEXT NOT NULL,
  context JSONB NOT NULL DEFAULT '{}'::jsonb,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  priorities JSONB NOT NULL DEFAULT '[]'::jsonb,
  time_horizon TEXT DEFAULT '3 years',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Scenarios Table
CREATE TABLE IF NOT EXISTS scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  replay_id UUID NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
  parent_scenario_id UUID REFERENCES scenarios(id) ON DELETE SET NULL,
  parent_event_id TEXT,
  title TEXT NOT NULL,
  option_label TEXT NOT NULL,
  summary TEXT,
  color_theme TEXT DEFAULT 'blue',
  uncertainty JSONB NOT NULL DEFAULT '{}'::jsonb,
  assumptions JSONB NOT NULL DEFAULT '[]'::jsonb,
  generation_version INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Timeline Events Table
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scenario_id UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  horizon TEXT NOT NULL,
  opportunities JSONB DEFAULT '[]'::jsonb,
  challenges JSONB DEFAULT '[]'::jsonb,
  turning_points JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Replay Generations Table (History & Debugging)
CREATE TABLE IF NOT EXISTS replay_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  replay_id UUID NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
  generation_type TEXT NOT NULL,
  input_snapshot JSONB NOT NULL,
  output_snapshot JSONB NOT NULL,
  status TEXT DEFAULT 'success',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE replays ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own replays" 
  ON replays FOR ALL 
  USING (auth.uid() = user_id);
