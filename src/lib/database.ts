import { supabase, Project, Lead, Client, Quotation, Invoice, Tender, TeamMember, Task, Document, SocialPost, CompanySettings } from './supabase';

// =====================
// PROJECTS
// =====================
export const projectsDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Project[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Project;
  },

  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  },

  async update(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async getStats() {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw error;
    const projects = data as Project[];
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'in_progress' || p.status === 'review').length,
      completed: projects.filter(p => p.status === 'completed').length,
      totalValue: projects.reduce((sum, p) => sum + (p.value || 0), 0),
    };
  }
};

// =====================
// LEADS
// =====================
export const leadsDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Lead[];
  },

  async create(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('leads')
      .insert(lead)
      .select()
      .single();
    if (error) throw error;
    return data as Lead;
  },

  async update(id: string, updates: Partial<Lead>) {
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Lead;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

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

  async getById(id: string) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Lead;
  }
};

// =====================
// CLIENTS
// =====================
export const clientsDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Client[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Client;
  },

  async create(client: Omit<Client, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('clients')
      .insert(client)
      .select()
      .single();
    if (error) throw error;
    return data as Client;
  },

  async update(id: string, updates: Partial<Client>) {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Client;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// =====================
// QUOTATIONS
// =====================
export const quotationsDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('quotations')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Quotation[];
  },

  async create(quotation: Omit<Quotation, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('quotations')
      .insert(quotation)
      .select()
      .single();
    if (error) throw error;
    return data as Quotation;
  },

  async update(id: string, updates: Partial<Quotation>) {
    const { data, error } = await supabase
      .from('quotations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Quotation;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('quotations')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async convertToInvoice(quotationId: string) {
    const { data: quote, error } = await supabase
      .from('quotations')
      .select('*')
      .eq('id', quotationId)
      .single();
    if (error) throw error;
    
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    const invoice = await invoicesDb.create({
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
    
    return invoice;
  },

  async generateQuoteNumber() {
    const { count } = await supabase
      .from('quotations')
      .select('*', { count: 'exact', head: true });
    return `QUO-${String((count || 0) + 1).padStart(3, '0')}`;
  }
};

// =====================
// INVOICES
// =====================
export const invoicesDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Invoice[];
  },

  async create(invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('invoices')
      .insert(invoice)
      .select()
      .single();
    if (error) throw error;
    return data as Invoice;
  },

  async update(id: string, updates: Partial<Invoice>) {
    const { data, error } = await supabase
      .from('invoices')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Invoice;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async recordPayment(id: string, amount: number) {
    const { data: invoice, error: fetchError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', id)
      .single();
    if (fetchError) throw fetchError;
    
    const newPaidAmount = (invoice.paid_amount || 0) + amount;
    const newStatus = newPaidAmount >= invoice.amount ? 'paid' : 'partial';
    
    return this.update(id, { paid_amount: newPaidAmount, status: newStatus });
  },

  async generateInvoiceNumber() {
    const { count } = await supabase
      .from('invoices')
      .select('*', { count: 'exact', head: true });
    return `INV-${String((count || 0) + 1).padStart(3, '0')}`;
  },

  async getStats() {
    const { data, error } = await supabase.from('invoices').select('*');
    if (error) throw error;
    const invoices = data as Invoice[];
    return {
      total: invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0),
      paid: invoices.reduce((sum, inv) => sum + (inv.paid_amount || 0), 0),
      outstanding: invoices.reduce((sum, inv) => sum + ((inv.amount || 0) - (inv.paid_amount || 0)), 0),
      overdue: invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + ((inv.amount || 0) - (inv.paid_amount || 0)), 0),
    };
  }
};

// =====================
// TENDERS
// =====================
export const tendersDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('tenders')
      .select('*')
      .order('deadline', { ascending: true });
    if (error) throw error;
    return data as Tender[];
  },

  async create(tender: Omit<Tender, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('tenders')
      .insert(tender)
      .select()
      .single();
    if (error) throw error;
    return data as Tender;
  },

  async update(id: string, updates: Partial<Tender>) {
    const { data, error } = await supabase
      .from('tenders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Tender;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('tenders')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// =====================
// TEAM MEMBERS
// =====================
export const teamMembersDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw error;
    return data as TeamMember[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as TeamMember;
  },

  async create(member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('team_members')
      .insert(member)
      .select()
      .single();
    if (error) throw error;
    return data as TeamMember;
  },

  async update(id: string, updates: Partial<TeamMember>) {
    const { data, error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as TeamMember;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// =====================
// TASKS
// =====================
export const tasksDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data as Task[];
  },

  async getByAssignee(assigneeId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('assignee_id', assigneeId)
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data as Task[];
  },

  async getByProject(projectId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data as Task[];
  },

  async create(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();
    if (error) throw error;
    return data as Task;
  },

  async update(id: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Task;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async toggleComplete(id: string) {
    const { data: task, error: fetchError } = await supabase
      .from('tasks')
      .select('status')
      .eq('id', id)
      .single();
    if (fetchError) throw fetchError;
    
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    return this.update(id, { status: newStatus });
  }
};

// =====================
// DOCUMENTS
// =====================
export const documentsDb = {
  async getAll(parentId?: string | null) {
    let query = supabase
      .from('documents')
      .select('*')
      .order('type', { ascending: true })
      .order('name', { ascending: true });
    
    if (parentId === null) {
      query = query.is('parent_id', null);
    } else if (parentId) {
      query = query.eq('parent_id', parentId);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data as Document[];
  },

  async create(doc: Omit<Document, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('documents')
      .insert(doc)
      .select()
      .single();
    if (error) throw error;
    return data as Document;
  },

  async update(id: string, updates: Partial<Document>) {
    const { data, error } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Document;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// =====================
// SOCIAL POSTS
// =====================
export const socialPostsDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('social_posts')
      .select('*')
      .order('scheduled_date', { ascending: true });
    if (error) throw error;
    return data as SocialPost[];
  },

  async create(post: Omit<SocialPost, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('social_posts')
      .insert(post)
      .select()
      .single();
    if (error) throw error;
    return data as SocialPost;
  },

  async update(id: string, updates: Partial<SocialPost>) {
    const { data, error } = await supabase
      .from('social_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as SocialPost;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('social_posts')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async publish(id: string) {
    return this.update(id, { status: 'published' });
  }
};

// =====================
// COMPANY SETTINGS
// =====================
export const companySettingsDb = {
  async get() {
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data as CompanySettings | null;
  },

  async update(updates: Partial<CompanySettings>) {
    const existing = await this.get();
    if (existing) {
      const { data, error } = await supabase
        .from('company_settings')
        .update(updates)
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return data as CompanySettings;
    } else {
      const { data, error } = await supabase
        .from('company_settings')
        .insert(updates)
        .select()
        .single();
      if (error) throw error;
      return data as CompanySettings;
    }
  }
};
