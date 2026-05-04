# 🗄️ Dashboard Database Setup — Turso (Free, 5 minutes)

The KuWeX Studios dashboard uses **Turso** (SQLite in the cloud) for all
project, CRM, invoice, quotation, tender, team, task, and marketing data.

**Why Turso?** 100% free forever (9 GB storage, 500 databases), fast, simple,
no credit card, no server to manage.

---

## 🚀 Step 1 — Create your Turso account (2 min)

1. Go to **https://turso.tech**
2. Click **Sign up** → use GitHub or email (free)
3. After signing in, you'll land on the dashboard

---

## 🗃️ Step 2 — Create a database (1 min)

### Option A — Web UI (easiest)

1. Click **"Create Database"**
2. Name it: `kuwex-dashboard`
3. Pick the closest region (e.g. `fra` for Frankfurt = good for Zimbabwe)
4. Click **Create**

### Option B — CLI (if you prefer)

```powershell
# Install the Turso CLI (one-time)
iwr -useb https://get.tur.so/install.ps1 | iex

# Login
turso auth signup

# Create DB
turso db create kuwex-dashboard
```

---

## 🔑 Step 3 — Get your credentials (1 min)

### In the Turso web dashboard:

1. Click your database → **Overview** tab
2. Copy the **Database URL** (looks like `libsql://kuwex-dashboard-yourname.turso.io`)
3. Go to **Tokens** tab → **Create Token** → copy the token

### Or via CLI:

```powershell
turso db show kuwex-dashboard --url
turso db tokens create kuwex-dashboard
```

---

## ⚙️ Step 4 — Add to `.env.local` (1 min)

In the project root, create a file called **`.env.local`**:

```env
TURSO_DATABASE_URL=libsql://kuwex-dashboard-yourname.turso.io
TURSO_AUTH_TOKEN=paste_your_token_here
```

(There's an `.env.example` file you can copy as a template.)

---

## ▶️ Step 5 — Start the dev server

```powershell
npm run dev
```

Open **http://localhost:3000/dashboard**

The first time any dashboard page loads, the server **automatically creates all
tables** (projects, leads, clients, invoices, quotations, tenders, team_members,
tasks, documents, social_posts, company_settings). You don't need to run any
migrations or SQL scripts.

---

## ☁️ Step 6 — Deploy to Netlify

Add the same two variables in **Netlify → Site settings → Environment variables**:

| Key | Value |
|-----|-------|
| `TURSO_DATABASE_URL` | `libsql://...turso.io` |
| `TURSO_AUTH_TOKEN` | your token |

Redeploy → done.

---

## 🧑‍🤝‍🧑 Team access

Any team member with access to the Netlify env vars (or local `.env.local`)
automatically connects to the same database — everyone sees the **same
projects, leads, invoices, etc.** in real time. No separate accounts needed.

---

## 🔄 Reset the database (wipe all data)

### Option A — Web UI

In Turso dashboard → click database → **Delete** → create a fresh one with the same name.

### Option B — CLI

```powershell
turso db destroy kuwex-dashboard --yes
turso db create kuwex-dashboard
```

Then update `TURSO_AUTH_TOKEN` with the new token (URL stays the same).

---

## 🐛 Troubleshooting

**Error: `TURSO_DATABASE_URL is not set`**
→ Your `.env.local` isn't being loaded. Restart the dev server (`Ctrl+C` then `npm run dev`).

**Error: `SQLITE_AUTH` or 401**
→ Token expired or wrong. Regenerate in Turso dashboard → Tokens.

**Dashboard shows no data**
→ Normal on first run (empty DB). Click **"New Project"** / **"New Lead"** etc. to start adding data.

**Tables not being created**
→ Tables are auto-created on first API request. Load any dashboard page (e.g. `/dashboard/projects`) to trigger creation.

---

## 💰 Free tier limits (you won't hit these)

- **9 GB storage** — enough for ~10 million rows
- **1 billion row reads / month**
- **25 million row writes / month**
- **Up to 500 databases**

For a 2-10 person agency, this is essentially unlimited.

---

## 🔐 Security notes

- `TURSO_AUTH_TOKEN` is **server-side only** — never exposed to the browser
- All database access goes through `/api/db/*` routes (same-origin)
- Keep your `.env.local` out of Git (already in `.gitignore`)
- Rotate tokens periodically via the Turso dashboard

---

That's it. Your dashboard is now running on a free, production-grade SQLite database.
