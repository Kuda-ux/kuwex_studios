import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureSchema, serializeRow, deserializeRow, nowIso } from '@/lib/turso';
import { VALID_TABLES, TableName } from '@/lib/types';

export const dynamic = 'force-dynamic';

function isValidTable(table: string): table is TableName {
  return (VALID_TABLES as readonly string[]).includes(table);
}

// GET /api/db/[table]/[id] — fetch one
export async function GET(_req: NextRequest, { params }: { params: { table: string; id: string } }) {
  try {
    const { table, id } = params;
    if (!isValidTable(table)) {
      return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
    }

    await ensureSchema();
    const db = getDb();

    const result = await db.execute({
      sql: `SELECT * FROM ${table} WHERE id = ?`,
      args: [id],
    });

    if (!result.rows.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const row = deserializeRow(table, result.rows[0] as Record<string, unknown>);
    return NextResponse.json({ data: row });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Database error';
    console.error('[db GET id]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// PATCH /api/db/[table]/[id] — partial update
export async function PATCH(req: NextRequest, { params }: { params: { table: string; id: string } }) {
  try {
    const { table, id } = params;
    if (!isValidTable(table)) {
      return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
    }

    await ensureSchema();
    const db = getDb();

    const body = await req.json();
    const patch = serializeRow(table, { ...body, updated_at: nowIso() });

    // Don't allow updating id/created_at
    delete (patch as Record<string, unknown>).id;
    delete (patch as Record<string, unknown>).created_at;

    const columns = Object.keys(patch);
    if (!columns.length) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    const setClause = columns.map((c) => `${c} = ?`).join(', ');
    const values = columns.map((c) => (patch as Record<string, unknown>)[c] as never);

    await db.execute({
      sql: `UPDATE ${table} SET ${setClause} WHERE id = ?`,
      args: [...values, id] as never,
    });

    const fetched = await db.execute({
      sql: `SELECT * FROM ${table} WHERE id = ?`,
      args: [id],
    });

    if (!fetched.rows.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const row = deserializeRow(table, fetched.rows[0] as Record<string, unknown>);
    return NextResponse.json({ data: row });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Database error';
    console.error('[db PATCH]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/db/[table]/[id]
export async function DELETE(_req: NextRequest, { params }: { params: { table: string; id: string } }) {
  try {
    const { table, id } = params;
    if (!isValidTable(table)) {
      return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
    }

    await ensureSchema();
    const db = getDb();

    await db.execute({
      sql: `DELETE FROM ${table} WHERE id = ?`,
      args: [id],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Database error';
    console.error('[db DELETE]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
