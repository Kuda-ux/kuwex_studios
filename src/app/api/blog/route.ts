import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureSchema, generateId, nowIso } from '@/lib/turso';
import { verifyApiAuth } from '@/lib/auth';
import type { BlogPost } from '@/lib/types';

function parseRow(row: Record<string, unknown>): BlogPost {
  const parse = (v: unknown, fallback: unknown[] = []) => {
    if (Array.isArray(v)) return v;
    if (typeof v === 'string') {
      try { return JSON.parse(v); } catch { return fallback; }
    }
    return fallback;
  };
  return {
    id: String(row.id ?? ''),
    slug: String(row.slug ?? ''),
    title: String(row.title ?? ''),
    excerpt: String(row.excerpt ?? ''),
    image: String(row.image ?? ''),
    og_image: row.og_image ? String(row.og_image) : undefined,
    author: String(row.author ?? 'Kuda'),
    author_role: String(row.author_role ?? 'Lead Developer, KuWeX Studios'),
    post_date: String(row.post_date ?? ''),
    read_time: String(row.read_time ?? '5 min read'),
    category: String(row.category ?? 'AI & Tech'),
    content: parse(row.content) as string[],
    related_slugs: parse(row.related_slugs) as string[],
    keywords: parse(row.keywords) as string[],
    status: (row.status === 'published' ? 'published' : 'draft') as BlogPost['status'],
    created_at: String(row.created_at ?? ''),
    updated_at: String(row.updated_at ?? ''),
  };
}

// GET /api/blog  — public: only published; admin: all
export async function GET(request: NextRequest) {
  try {
    await ensureSchema();
    const db = getDb();
    const isAdmin = await verifyApiAuth(request);
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const result = await db.execute({
        sql: 'SELECT * FROM blog_posts WHERE slug = ? LIMIT 1',
        args: [slug],
      });
      if (!result.rows.length) return NextResponse.json({ post: null }, { status: 404 });
      const row = Object.fromEntries(
        Object.entries(result.rows[0]).map(([k, v]) => [k, v])
      ) as Record<string, unknown>;
      return NextResponse.json({ post: parseRow(row) });
    }

    const sql = isAdmin
      ? 'SELECT * FROM blog_posts ORDER BY post_date DESC'
      : "SELECT * FROM blog_posts WHERE status = 'published' ORDER BY post_date DESC";
    const result = await db.execute(sql);
    const posts = result.rows.map(r =>
      parseRow(Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v])) as Record<string, unknown>)
    );
    return NextResponse.json({ posts });
  } catch (err) {
    console.error('[GET /api/blog]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/blog  — admin only
export async function POST(request: NextRequest) {
  if (!(await verifyApiAuth(request))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }
  try {
    await ensureSchema();
    const db = getDb();
    const body = await request.json();

    const id = generateId();
    const now = nowIso();
    const wordCount = (body.content as string[]).join(' ').split(/\s+/).length;
    const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;

    await db.execute({
      sql: `INSERT INTO blog_posts
        (id, slug, title, excerpt, image, og_image, author, author_role, post_date, read_time, category, content, related_slugs, keywords, status, created_at, updated_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        id,
        body.slug,
        body.title,
        body.excerpt || '',
        body.image || '',
        body.og_image || body.image || '',
        body.author || 'Kuda',
        body.author_role || 'Lead Developer, KuWeX Studios',
        body.post_date || now.slice(0, 10),
        body.read_time || readTime,
        body.category || 'AI & Tech',
        JSON.stringify(body.content || []),
        JSON.stringify(body.related_slugs || []),
        JSON.stringify(body.keywords || []),
        body.status || 'draft',
        now,
        now,
      ],
    });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error('[POST /api/blog]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
