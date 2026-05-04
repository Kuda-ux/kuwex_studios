// =====================================================
// Turso (SQLite) — Server-side DB client
// Do NOT import this from client components.
// Use via /api/db/* routes only.
// =====================================================

import { createClient, type Client as LibsqlClient } from '@libsql/client';
import { TableName, JSON_COLUMNS } from './types';

let client: LibsqlClient | null = null;
let schemaInitialized = false;

export function getDb(): LibsqlClient {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error(
      'TURSO_DATABASE_URL is not set. Add it to .env.local — see SETUP-TURSO.md'
    );
  }

  client = createClient({ url, authToken });
  return client;
}

// ==============================
// SCHEMA — runs on first request
// ==============================
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    client TEXT,
    status TEXT DEFAULT 'planning',
    progress INTEGER DEFAULT 0,
    value REAL DEFAULT 0,
    start_date TEXT,
    deadline TEXT,
    category TEXT,
    team TEXT DEFAULT '[]',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    service TEXT,
    status TEXT DEFAULT 'new',
    value REAL DEFAULT 0,
    source TEXT,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    total_spent REAL DEFAULT 0,
    projects_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    joined_date TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS quotations (
    id TEXT PRIMARY KEY,
    quote_number TEXT,
    client_id TEXT,
    client_name TEXT,
    project_name TEXT,
    amount REAL DEFAULT 0,
    status TEXT DEFAULT 'draft',
    valid_until TEXT,
    items TEXT DEFAULT '[]',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    invoice_number TEXT,
    client_id TEXT,
    client_name TEXT,
    project_name TEXT,
    amount REAL DEFAULT 0,
    paid_amount REAL DEFAULT 0,
    status TEXT DEFAULT 'draft',
    due_date TEXT,
    items TEXT DEFAULT '[]',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS tenders (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    organization TEXT,
    value REAL DEFAULT 0,
    deadline TEXT,
    status TEXT DEFAULT 'identified',
    match_score INTEGER DEFAULT 0,
    category TEXT,
    description TEXT,
    requirements TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    role TEXT,
    avatar_url TEXT,
    status TEXT DEFAULT 'offline',
    hours_this_week INTEGER DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    productivity INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    assignee_id TEXT,
    project_id TEXT,
    status TEXT DEFAULT 'pending',
    priority TEXT DEFAULT 'medium',
    due_date TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    size INTEGER DEFAULT 0,
    path TEXT,
    project_id TEXT,
    parent_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS social_posts (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    platforms TEXT DEFAULT '[]',
    scheduled_date TEXT,
    status TEXT DEFAULT 'draft',
    image_url TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS company_settings (
    id TEXT PRIMARY KEY,
    company_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    website TEXT,
    currency TEXT DEFAULT 'USD',
    logo_url TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
];

export async function ensureSchema() {
  if (schemaInitialized) return;
  const db = getDb();
  for (const sql of SCHEMA) {
    await db.execute(sql);
  }
  schemaInitialized = true;
}

// ==============================
// Row serialization helpers
// ==============================
export function serializeRow(table: TableName, data: Record<string, unknown>) {
  const out: Record<string, unknown> = { ...data };
  for (const col of JSON_COLUMNS[table]) {
    if (out[col] !== undefined && typeof out[col] !== 'string') {
      out[col] = JSON.stringify(out[col]);
    }
  }
  return out;
}

export function deserializeRow(table: TableName, row: Record<string, unknown>) {
  if (!row) return row;
  const out: Record<string, unknown> = { ...row };
  for (const col of JSON_COLUMNS[table]) {
    if (typeof out[col] === 'string') {
      try {
        out[col] = JSON.parse(out[col] as string);
      } catch {
        out[col] = [];
      }
    }
  }
  return out;
}

export function generateId(): string {
  // Simple unique ID: timestamp + random suffix
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}
