import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureSchema, nowIso } from '@/lib/turso';
import { verifyApiAuth } from '@/lib/auth';

// PUT /api/blog/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await verifyApiAuth(request))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }
  try {
    await ensureSchema();
    const db = getDb();
    const body = await request.json();
    const now = nowIso();

    const wordCount = (body.content as string[]).join(' ').split(/\s+/).length;
    const readTime = body.read_time || `${Math.max(1, Math.round(wordCount / 200))} min read`;

    await db.execute({
      sql: `UPDATE blog_posts SET
        slug=?, title=?, excerpt=?, image=?, og_image=?, author=?, author_role=?,
        post_date=?, read_time=?, category=?, content=?, related_slugs=?, keywords=?,
        status=?, updated_at=?
        WHERE id=?`,
      args: [
        body.slug,
        body.title,
        body.excerpt || '',
        body.image || '',
        body.og_image || body.image || '',
        body.author || 'Kuda',
        body.author_role || 'Lead Developer, KuWeX Studios',
        body.post_date,
        readTime,
        body.category || 'AI & Tech',
        JSON.stringify(body.content || []),
        JSON.stringify(body.related_slugs || []),
        JSON.stringify(body.keywords || []),
        body.status || 'draft',
        now,
        params.id,
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[PUT /api/blog/[id]]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/blog/[id]
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await verifyApiAuth(request))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }
  try {
    await ensureSchema();
    const db = getDb();
    await db.execute({ sql: 'DELETE FROM blog_posts WHERE id = ?', args: [params.id] });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/blog/[id]]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
