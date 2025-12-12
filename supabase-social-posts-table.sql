-- =====================================================
-- KUWEX STUDIOS - SOCIAL POSTS TABLE
-- Run this SQL in your Supabase SQL Editor to create
-- the social_posts table for the Marketing dashboard
-- =====================================================

-- Create the social_posts table
CREATE TABLE IF NOT EXISTS social_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    platforms TEXT[] NOT NULL DEFAULT '{}',
    scheduled_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social_posts(status);

-- Create an index on scheduled_date for sorting
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled_date ON social_posts(scheduled_date);

-- Enable Row Level Security (RLS)
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust as needed for your auth setup)
CREATE POLICY "Allow all operations on social_posts" ON social_posts
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_social_posts_updated_at ON social_posts;
CREATE TRIGGER update_social_posts_updated_at
    BEFORE UPDATE ON social_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================
INSERT INTO social_posts (content, platforms, scheduled_date, status, image_url) VALUES
(
    '🚀 Excited to announce our latest project launch! Check out the amazing website we built for TechStart Inc. 

Our team delivered a modern, responsive design that perfectly captures their brand identity.

Ready to transform your digital presence? Let''s talk! 💬

#WebDesign #Zimbabwe #DigitalAgency #KuWeXStudios',
    ARRAY['facebook', 'linkedin'],
    NOW() - INTERVAL '2 days',
    'published',
    NULL
),
(
    '💡 5 Web Design Trends to Watch in 2025:

1. AI-Powered Personalization
2. Immersive 3D Elements
3. Sustainable Web Design
4. Voice User Interfaces
5. Micro-Interactions

Which trend are you most excited about? Drop a comment below! 👇

#WebDesignTrends #2025 #DigitalMarketing #KuWeX',
    ARRAY['facebook', 'linkedin'],
    NOW() + INTERVAL '1 day',
    'scheduled',
    NULL
),
(
    'Behind the scenes of our latest branding project 🎨

Creating a brand identity is more than just a logo - it''s about telling your story visually.

Swipe to see the process →

#Branding #DesignProcess #CreativeAgency #Zimbabwe',
    ARRAY['facebook'],
    NOW(),
    'draft',
    NULL
);

-- Verify the table was created
SELECT 'social_posts' as table_name, COUNT(*) as count FROM social_posts;
