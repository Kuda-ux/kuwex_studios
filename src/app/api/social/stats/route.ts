import { NextResponse } from 'next/server';

const FACEBOOK_API_URL = 'https://graph.facebook.com/v18.0';

interface FacebookPageStats {
  followers: number;
  likes: number;
  name: string;
  id: string;
}

/**
 * Fetch Facebook Page statistics
 */
async function getFacebookStats(): Promise<{ success: boolean; data?: FacebookPageStats; error?: string }> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    return {
      success: false,
      error: 'Facebook credentials not configured'
    };
  }

  try {
    // Fetch page info including followers count
    const response = await fetch(
      `${FACEBOOK_API_URL}/${pageId}?fields=id,name,followers_count,fan_count&access_token=${accessToken}`
    );

    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        error: data.error.message || 'Failed to fetch Facebook stats'
      };
    }

    return {
      success: true,
      data: {
        id: data.id,
        name: data.name || 'KuWeX Studios',
        followers: data.followers_count || 0,
        likes: data.fan_count || 0,
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error fetching Facebook stats'
    };
  }
}

/**
 * Fetch recent Facebook posts with engagement
 */
async function getFacebookPosts(): Promise<{ success: boolean; data?: Array<{ id: string; message: string; created_time: string; likes: number; comments: number; shares: number }>; error?: string }> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    return {
      success: false,
      error: 'Facebook credentials not configured'
    };
  }

  try {
    const response = await fetch(
      `${FACEBOOK_API_URL}/${pageId}/posts?fields=id,message,created_time,likes.summary(true),comments.summary(true),shares&limit=10&access_token=${accessToken}`
    );

    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        error: data.error.message || 'Failed to fetch Facebook posts'
      };
    }

    const posts = (data.data || []).map((post: {
      id: string;
      message?: string;
      created_time: string;
      likes?: { summary?: { total_count?: number } };
      comments?: { summary?: { total_count?: number } };
      shares?: { count?: number };
    }) => ({
      id: post.id,
      message: post.message || '',
      created_time: post.created_time,
      likes: post.likes?.summary?.total_count || 0,
      comments: post.comments?.summary?.total_count || 0,
      shares: post.shares?.count || 0,
    }));

    return {
      success: true,
      data: posts
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error fetching Facebook posts'
    };
  }
}

/**
 * GET /api/social/stats
 * Get social media statistics from connected platforms
 */
export async function GET() {
  const [facebookStats, facebookPosts] = await Promise.all([
    getFacebookStats(),
    getFacebookPosts()
  ]);

  // Calculate total engagement from posts
  let totalLikes = 0;
  let totalComments = 0;
  let totalShares = 0;

  if (facebookPosts.success && facebookPosts.data) {
    facebookPosts.data.forEach(post => {
      totalLikes += post.likes;
      totalComments += post.comments;
      totalShares += post.shares;
    });
  }

  return NextResponse.json({
    success: true,
    facebook: {
      configured: !!(process.env.FACEBOOK_PAGE_ID && process.env.FACEBOOK_PAGE_ACCESS_TOKEN),
      stats: facebookStats.success ? facebookStats.data : null,
      error: facebookStats.error,
      recentPosts: facebookPosts.success ? facebookPosts.data : [],
      engagement: {
        totalLikes,
        totalComments,
        totalShares
      }
    },
    linkedin: {
      configured: !!(process.env.LINKEDIN_ORGANIZATION_ID && process.env.LINKEDIN_ACCESS_TOKEN),
      stats: null, // LinkedIn API requires more complex OAuth
      error: process.env.LINKEDIN_ORGANIZATION_ID ? null : 'LinkedIn not configured'
    },
    timestamp: new Date().toISOString()
  });
}
