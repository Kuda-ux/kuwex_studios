import { NextResponse } from 'next/server';

// Facebook Graph API endpoint
const FACEBOOK_API_URL = 'https://graph.facebook.com/v18.0';
// LinkedIn API endpoint  
const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';

interface PostRequest {
  content: string;
  platforms: string[];
  imageUrl?: string;
  scheduledDate?: string;
  postId?: string; // For updating existing posts
}

interface PostResult {
  platform: string;
  success: boolean;
  postId?: string;
  error?: string;
}

/**
 * Post to Facebook Page
 */
async function postToFacebook(content: string, imageUrl?: string): Promise<PostResult> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    return {
      platform: 'facebook',
      success: false,
      error: 'Facebook credentials not configured. Please set FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN in environment variables.'
    };
  }

  try {
    let endpoint = `${FACEBOOK_API_URL}/${pageId}/feed`;
    const body: Record<string, string> = {
      message: content,
      access_token: accessToken,
    };

    // If there's an image, post as photo instead
    if (imageUrl) {
      endpoint = `${FACEBOOK_API_URL}/${pageId}/photos`;
      body.url = imageUrl;
      body.caption = content;
      delete body.message;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body),
    });

    const data = await response.json();

    if (data.error) {
      return {
        platform: 'facebook',
        success: false,
        error: data.error.message || 'Failed to post to Facebook'
      };
    }

    return {
      platform: 'facebook',
      success: true,
      postId: data.id || data.post_id
    };
  } catch (error) {
    return {
      platform: 'facebook',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error posting to Facebook'
    };
  }
}

/**
 * Post to LinkedIn Company Page
 */
async function postToLinkedIn(content: string, imageUrl?: string): Promise<PostResult> {
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

  if (!organizationId || !accessToken) {
    return {
      platform: 'linkedin',
      success: false,
      error: 'LinkedIn credentials not configured. Please set LINKEDIN_ORGANIZATION_ID and LINKEDIN_ACCESS_TOKEN in environment variables.'
    };
  }

  try {
    // LinkedIn UGC Post API
    const postBody: Record<string, unknown> = {
      author: `urn:li:organization:${organizationId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: imageUrl ? 'IMAGE' : 'NONE',
          ...(imageUrl && {
            media: [{
              status: 'READY',
              originalUrl: imageUrl,
            }]
          })
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    const response = await fetch(`${LINKEDIN_API_URL}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(postBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        platform: 'linkedin',
        success: false,
        error: errorData.message || `LinkedIn API error: ${response.status}`
      };
    }

    const data = await response.json();
    
    return {
      platform: 'linkedin',
      success: true,
      postId: data.id
    };
  } catch (error) {
    return {
      platform: 'linkedin',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error posting to LinkedIn'
    };
  }
}

/**
 * POST /api/social/post
 * Post content to selected social media platforms
 */
export async function POST(request: Request) {
  try {
    const body: PostRequest = await request.json();
    const { content, platforms, imageUrl } = body;

    if (!content || !platforms || platforms.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Content and at least one platform are required'
      }, { status: 400 });
    }

    const results: PostResult[] = [];

    // Post to each selected platform
    for (const platform of platforms) {
      switch (platform.toLowerCase()) {
        case 'facebook':
          results.push(await postToFacebook(content, imageUrl));
          break;
        case 'linkedin':
          results.push(await postToLinkedIn(content, imageUrl));
          break;
        default:
          results.push({
            platform,
            success: false,
            error: `Platform "${platform}" is not supported yet`
          });
      }
    }

    const allSuccessful = results.every(r => r.success);
    const anySuccessful = results.some(r => r.success);

    return NextResponse.json({
      success: anySuccessful,
      message: allSuccessful 
        ? 'Posted successfully to all platforms' 
        : anySuccessful 
          ? 'Posted to some platforms with errors'
          : 'Failed to post to all platforms',
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Social post error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process post request'
    }, { status: 500 });
  }
}

/**
 * GET /api/social/post
 * Get configuration status for social media platforms
 */
export async function GET() {
  const platforms = {
    facebook: {
      configured: !!(process.env.FACEBOOK_PAGE_ID && process.env.FACEBOOK_PAGE_ACCESS_TOKEN),
      pageId: process.env.FACEBOOK_PAGE_ID ? '***configured***' : null,
    },
    linkedin: {
      configured: !!(process.env.LINKEDIN_ORGANIZATION_ID && process.env.LINKEDIN_ACCESS_TOKEN),
      organizationId: process.env.LINKEDIN_ORGANIZATION_ID ? '***configured***' : null,
    },
  };

  return NextResponse.json({
    success: true,
    platforms,
    message: 'Social media configuration status'
  });
}
