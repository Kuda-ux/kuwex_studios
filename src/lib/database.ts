// =====================================================
// Client-side database wrapper for Turso (via /api/db/*)
// Public API matches the old Supabase wrapper so existing
// dashboard pages & hooks continue to work unchanged.
// =====================================================

import type {
  Project,
  Lead,
  Client,
  Quotation,
  Invoice,
  Tender,
  TeamMember,
  Task,
  Document,
  SocialPost,
  CompanySettings,
  TableName,
} from './types';

const BASE = '/api/db';

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || `Request failed: ${res.status}`);
  return json as T;
}

async function list<T>(table: TableName, params: Record<string, string> = {}): Promise<T[]> {
  const qs = new URLSearchParams(params).toString();
  const suffix = qs ? `?${qs}` : '';
  const { data } = await req<{ data: T[] }>(`/${table}${suffix}`);
  return data;
}

async function getOne<T>(table: TableName, id: string): Promise<T> {
  const { data } = await req<{ data: T }>(`/${table}/${id}`);
  return data;
}

async function create<T>(table: TableName, body: Record<string, unknown>): Promise<T> {
  const { data } = await req<{ data: T }>(`/${table}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return data;
}

async function patchRow<T>(table: TableName, id: string, body: Record<string, unknown>): Promise<T> {
  const { data } = await req<{ data: T }>(`/${table}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  return data;
}

async function remove(table: TableName, id: string): Promise<void> {
  await req(`/${table}/${id}`, { method: 'DELETE' });
}

// ================================
// PROJECTS
// ================================
export const projectsDb = {
  getAll: () => list<Project>('projects'),
  getById: (id: string) => getOne<Project>('projects', id),
  create: (p: Omit<Project, 'id' | 'created_at' | 'updated_at'>) =>
    create<Project>('projects', p as unknown as Record<string, unknown>),
  update: (id: string, u: Partial<Project>) =>
    patchRow<Project>('projects', id, u as Record<string, unknown>),
  delete: (id: string) => remove('projects', id),
  async getStats() {
    const projects = await this.getAll();
    return {
      total: projects.length,
      active: projects.filter((p) => p.status === 'in_progress' || p.status === 'review').length,
      completed: projects.filter((p) => p.status === 'completed').length,
      totalValue: projects.reduce((sum, p) => sum + (p.value || 0), 0),
    };
  },
};

// ================================
// LEADS
// ================================
export const leadsDb = {
  getAll: () => list<Lead>('leads'),
  getById: (id: string) => getOne<Lead>('leads', id),
  create: (l: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) =>
    create<Lead>('leads', l as unknown as Record<string, unknown>),
  update: (id: string, u: Partial<Lead>) => patchRow<Lead>('leads', id, u as Record<string, unknown>),
  delete: (id: string) => remove('leads', id),
  async convertToClient(leadId: string) {
    const lead = await this.getById(leadId);
    if (!lead) throw new Error('Lead not found');
    const client = await clientsDb.create({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      total_spent: 0,
      projects_count: 0,
      status: 'active',
      joined_date: new Date().toISOString().split('T')[0],
    });
    await this.update(leadId, { status: 'won' });
    return client;
  },
};

// ================================
// CLIENTS
// ================================
export const clientsDb = {
  getAll: () => list<Client>('clients'),
  getById: (id: string) => getOne<Client>('clients', id),
  create: (c: Omit<Client, 'id' | 'created_at' | 'updated_at'>) =>
    create<Client>('clients', c as unknown as Record<string, unknown>),
  update: (id: string, u: Partial<Client>) =>
    patchRow<Client>('clients', id, u as Record<string, unknown>),
  delete: (id: string) => remove('clients', id),
};

// ================================
// QUOTATIONS
// ================================
export const quotationsDb = {
  getAll: () => list<Quotation>('quotations'),
  getById: (id: string) => getOne<Quotation>('quotations', id),
  create: (q: Omit<Quotation, 'id' | 'created_at' | 'updated_at'>) =>
    create<Quotation>('quotations', q as unknown as Record<string, unknown>),
  update: (id: string, u: Partial<Quotation>) =>
    patchRow<Quotation>('quotations', id, u as Record<string, unknown>),
  delete: (id: string) => remove('quotations', id),
  async convertToInvoice(quotationId: string) {
    const quote = await this.getById(quotationId);
    if (!quote) throw new Error('Quotation not found');
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    return invoicesDb.create({
      invoice_number: invoiceNumber,
      client_id: quote.client_id,
      client_name: quote.client_name,
      project_name: quote.project_name,
      amount: quote.amount,
      paid_amount: 0,
      status: 'draft',
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: quote.items,
    });
  },
  async generateQuoteNumber() {
    const all = await this.getAll();
    return `QUO-${String(all.length + 1).padStart(3, '0')}`;
  },
};

// ================================
// INVOICES
// ================================
export const invoicesDb = {
  getAll: () => list<Invoice>('invoices'),
  getById: (id: string) => getOne<Invoice>('invoices', id),
  create: (i: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>) =>
    create<Invoice>('invoices', i as unknown as Record<string, unknown>),
  update: (id: string, u: Partial<Invoice>) =>
    patchRow<Invoice>('invoices', id, u as Record<string, unknown>),
  delete: (id: string) => remove('invoices', id),
  async recordPayment(id: string, amount: number) {
    const invoice = await this.getById(id);
    if (!invoice) throw new Error('Invoice not found');
    const newPaidAmount = (invoice.paid_amount || 0) + amount;
    const newStatus: Invoice['status'] = newPaidAmount >= invoice.amount ? 'paid' : 'partial';
    return this.update(id, { paid_amount: newPaidAmount, status: newStatus });
  },
  async generateInvoiceNumber() {
    const all = await this.getAll();
    return `INV-${String(all.length + 1).padStart(3, '0')}`;
  },
  async getStats() {
    const invoices = await this.getAll();
    return {
      total: invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0),
      paid: invoices.reduce((sum, inv) => sum + (inv.paid_amount || 0), 0),
      outstanding: invoices.reduce((sum, inv) => sum + ((inv.amount || 0) - (inv.paid_amount || 0)), 0),
      overdue: invoices
        .filter((inv) => inv.status === 'overdue')
        .reduce((sum, inv) => sum + ((inv.amount || 0) - (inv.paid_amount || 0)), 0),
    };
  },
};

// ================================
// TENDERS
// ================================
export const tendersDb = {
  getAll: () => list<Tender>('tenders', { orderBy: 'deadline', order: 'asc' }),
  getById: (id: string) => getOne<Tender>('tenders', id),
  create: (t: Omit<Tender, 'id' | 'created_at' | 'updated_at'>) =>
    create<Tender>('tenders', t as unknown as Record<string, unknown>),
  update: (id: string, u: Partial<Tender>) =>
    patchRow<Tender>('tenders', id, u as Record<string, unknown>),
  delete: (id: string) => remove('tenders', id),
};

// ================================
// TEAM MEMBERS
// ================================
export const teamMembersDb = {
  getAll: () => list<TeamMember>('team_members', { orderBy: 'name', order: 'asc' }),
  getById: (id: string) => getOne<TeamMember>('team_members', id),
  create: (m: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) =>
    create<TeamMember>('team_members', m as unknown as Record<string, unknown>),
  update: (id: string, u: Partial<TeamMember>) =>
    patchRow<TeamMember>('team_members', id, u as Record<string, unknown>),
  delete: (id: string) => remove('team_members', id),
};

// ================================
// TASKS
// ================================
export const tasksDb = {
  getAll: () => list<Task>('tasks', { orderBy: 'due_date', order: 'asc' }),
  getByAssignee: (assigneeId: string) =>
    list<Task>('tasks', { orderBy: 'due_date', order: 'asc', 'where[assignee_id]': assigneeId }),
  getByProject: (projectId: string) =>
    list<Task>('tasks', { orderBy: 'due_date', order: 'asc', 'where[project_id]': projectId }),
  create: (t: Omit<Task, 'id' | 'created_at' | 'updated_at'>) =>
    create<Task>('tasks', t as unknown as Record<string, unknown>),
  update: (id: string, u: Partial<Task>) => patchRow<Task>('tasks', id, u as Record<string, unknown>),
  delete: (id: string) => remove('tasks', id),
  async toggleComplete(id: string) {
    const task = await getOne<Task>('tasks', id);
    const newStatus: Task['status'] = task.status === 'completed' ? 'pending' : 'completed';
    return this.update(id, { status: newStatus });
  },
};

// ================================
// DOCUMENTS
// ================================
export const documentsDb = {
  getAll: (parentId?: string | null) => {
    const params: Record<string, string> = { orderBy: 'name', order: 'asc' };
    if (parentId === null) params['where[parent_id]'] = 'null';
    else if (parentId) params['where[parent_id]'] = parentId;
    return list<Document>('documents', params);
  },
  create: (d: Omit<Document, 'id' | 'created_at' | 'updated_at'>) =>
    create<Document>('documents', d as unknown as Record<string, unknown>),
  update: (id: string, u: Partial<Document>) =>
    patchRow<Document>('documents', id, u as Record<string, unknown>),
  delete: (id: string) => remove('documents', id),
};

// ================================
// SOCIAL POSTS
// ================================
export const socialPostsDb = {
  getAll: () => list<SocialPost>('social_posts', { orderBy: 'scheduled_date', order: 'asc' }),
  create: (p: Omit<SocialPost, 'id' | 'created_at' | 'updated_at'>) =>
    create<SocialPost>('social_posts', p as unknown as Record<string, unknown>),
  update: (id: string, u: Partial<SocialPost>) =>
    patchRow<SocialPost>('social_posts', id, u as Record<string, unknown>),
  delete: (id: string) => remove('social_posts', id),
  publish: (id: string) => patchRow<SocialPost>('social_posts', id, { status: 'published' }),
};

// ================================
// COMPANY SETTINGS
// ================================
export const companySettingsDb = {
  async get(): Promise<CompanySettings | null> {
    const all = await list<CompanySettings>('company_settings');
    return all[0] || null;
  },
  async update(updates: Partial<CompanySettings>): Promise<CompanySettings> {
    const existing = await this.get();
    if (existing) {
      return patchRow<CompanySettings>(
        'company_settings',
        existing.id,
        updates as Record<string, unknown>
      );
    }
    return create<CompanySettings>(
      'company_settings',
      updates as unknown as Record<string, unknown>
    );
  },
};
