import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureSchema, serializeRow, deserializeRow, generateId, nowIso } from '@/lib/turso';
import { VALID_TABLES, TableName } from '@/lib/types';

export const dynamic = 'force-dynamic';

function isValidTable(table: string): table is TableName {
  return (VALID_TABLES as readonly string[]).includes(table);
}

// GET /api/db/[table] — list all
// Supports ?orderBy=created_at&order=desc
export async function GET(req: NextRequest, { params }: { params: { table: string } }) {
  try {
    const { table } = params;
    if (!isValidTable(table)) {
      return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
    }

    await ensureSchema();
    const db = getDb();

    const url = new URL(req.url);
    const orderBy = url.searchParams.get('orderBy') || 'created_at';
    const order = url.searchParams.get('order')?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Filter by arbitrary column via ?where[col]=value
    const whereParts: string[] = [];
    const whereArgs: unknown[] = [];
    url.searchParams.forEach((value, key) => {
      const match = key.match(/^where\[(\w+)\]$/);
      if (match) {
        whereParts.push(`${match[1]} = ?`);
        whereArgs.push(value === 'null' ? null : value);
      }
    });

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';
    const sql = `SELECT * FROM ${table} ${whereClause} ORDER BY ${orderBy} ${order}`;
    const result = await db.execute({ sql, args: whereArgs as never });

    const rows = result.rows.map((r) => deserializeRow(table, r as Record<string, unknown>));
    return NextResponse.json({ data: rows });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Database error';
    console.error('[db GET]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/db/[table] — create
export async function POST(req: NextRequest, { params }: { params: { table: string } }) {
  try {
    const { table } = params;
    if (!isValidTable(table)) {
      return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
    }

    await ensureSchema();
    const db = getDb();

    const body = await req.json();
    const now = nowIso();
    const id = body.id ?? generateId();

    const record = serializeRow(table, {
      ...body,
      id,
      created_at: body.created_at ?? now,
      updated_at: body.updated_at ?? now,
    });

    const columns = Object.keys(record);
    const placeholders = columns.map(() => '?').join(', ');
    const values = columns.map((c) => record[c] as never);

    const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
    await db.execute({ sql, args: values });

    const fetched = await db.execute({
      sql: `SELECT * FROM ${table} WHERE id = ?`,
      args: [id],
    });
    const row = fetched.rows[0]
      ? deserializeRow(table, fetched.rows[0] as Record<string, unknown>)
      : null;

    return NextResponse.json({ data: row }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Database error';
    console.error('[db POST]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
