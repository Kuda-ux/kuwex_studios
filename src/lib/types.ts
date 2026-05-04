// =====================================================
// KuWeX Studios — Dashboard Database Types
// These interfaces define the shape of data stored in Turso
// =====================================================

export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  progress: number;
  value: number;
  start_date: string;
  deadline: string;
  category: string;
  team: string[];
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  value: number;
  source: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  total_spent: number;
  projects_count: number;
  status: 'active' | 'inactive';
  joined_date: string;
  created_at: string;
  updated_at: string;
}

export interface QuotationItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Quotation {
  id: string;
  quote_number: string;
  client_id: string;
  client_name: string;
  project_name: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  valid_until: string;
  items: QuotationItem[];
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  client_name: string;
  project_name: string;
  amount: number;
  paid_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'partial' | 'overdue';
  due_date: string;
  items: InvoiceItem[];
  created_at: string;
  updated_at: string;
}

export interface Tender {
  id: string;
  title: string;
  organization: string;
  value: number;
  deadline: string;
  status: 'identified' | 'planning' | 'submitted' | 'won' | 'lost';
  match_score: number;
  category: string;
  description: string;
  requirements: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url: string;
  status: 'online' | 'busy' | 'offline';
  hours_this_week: number;
  tasks_completed: number;
  productivity: number;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee_id: string;
  project_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'image' | 'doc' | 'other';
  size: number;
  path: string;
  project_id: string | null;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialPost {
  id: string;
  content: string;
  platforms: string[];
  scheduled_date: string;
  status: 'draft' | 'scheduled' | 'published';
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompanySettings {
  id: string;
  company_name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  currency: string;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

// Table name type — used for generic API routes
export type TableName =
  | 'projects'
  | 'leads'
  | 'clients'
  | 'quotations'
  | 'invoices'
  | 'tenders'
  | 'team_members'
  | 'tasks'
  | 'documents'
  | 'social_posts'
  | 'company_settings';

// JSON columns for each table — need serialize/deserialize on the server
export const JSON_COLUMNS: Record<TableName, string[]> = {
  projects: ['team'],
  leads: [],
  clients: [],
  quotations: ['items'],
  invoices: ['items'],
  tenders: [],
  team_members: [],
  tasks: [],
  documents: [],
  social_posts: ['platforms'],
  company_settings: [],
};

export const VALID_TABLES = Object.keys(JSON_COLUMNS) as TableName[];
