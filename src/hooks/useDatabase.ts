"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  projectsDb, 
  leadsDb, 
  clientsDb, 
  quotationsDb, 
  invoicesDb, 
  tendersDb, 
  teamMembersDb, 
  tasksDb, 
  documentsDb, 
  socialPostsDb,
  companySettingsDb 
} from '@/lib/database';
import { 
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
  CompanySettings 
} from '@/lib/supabase';

// Generic hook for database operations - fixed to prevent infinite loops
function useDbCollection<T>(
  fetchFn: () => Promise<T[]>
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      refresh();
    }
  }, [refresh]);

  return { data, loading, error, refresh, setData };
}

// Projects Hook
export function useProjects() {
  const { data: projects, loading, error, refresh, setData } = useDbCollection<Project>(
    () => projectsDb.getAll()
  );

  const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const newProject = await projectsDb.create(project);
    setData(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const updated = await projectsDb.update(id, updates);
    setData(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  };

  const deleteProject = async (id: string) => {
    await projectsDb.delete(id);
    setData(prev => prev.filter(p => p.id !== id));
  };

  return { projects, loading, error, refresh, createProject, updateProject, deleteProject };
}

// Leads Hook
export function useLeads() {
  const { data: leads, loading, error, refresh, setData } = useDbCollection<Lead>(
    () => leadsDb.getAll()
  );

  const createLead = async (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => {
    const newLead = await leadsDb.create(lead);
    setData(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    const updated = await leadsDb.update(id, updates);
    setData(prev => prev.map(l => l.id === id ? updated : l));
    return updated;
  };

  const deleteLead = async (id: string) => {
    await leadsDb.delete(id);
    setData(prev => prev.filter(l => l.id !== id));
  };

  const convertToClient = async (leadId: string) => {
    const client = await leadsDb.convertToClient(leadId);
    await refresh();
    return client;
  };

  return { leads, loading, error, refresh, createLead, updateLead, deleteLead, convertToClient };
}

// Clients Hook
export function useClients() {
  const { data: clients, loading, error, refresh, setData } = useDbCollection<Client>(
    () => clientsDb.getAll()
  );

  const createClient = async (client: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => {
    const newClient = await clientsDb.create(client);
    setData(prev => [newClient, ...prev]);
    return newClient;
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    const updated = await clientsDb.update(id, updates);
    setData(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  };

  const deleteClient = async (id: string) => {
    await clientsDb.delete(id);
    setData(prev => prev.filter(c => c.id !== id));
  };

  return { clients, loading, error, refresh, createClient, updateClient, deleteClient };
}

// Quotations Hook
export function useQuotations() {
  const { data: quotations, loading, error, refresh, setData } = useDbCollection<Quotation>(
    () => quotationsDb.getAll()
  );

  const createQuotation = async (quotation: Omit<Quotation, 'id' | 'created_at' | 'updated_at'>) => {
    const newQuotation = await quotationsDb.create(quotation);
    setData(prev => [newQuotation, ...prev]);
    return newQuotation;
  };

  const updateQuotation = async (id: string, updates: Partial<Quotation>) => {
    const updated = await quotationsDb.update(id, updates);
    setData(prev => prev.map(q => q.id === id ? updated : q));
    return updated;
  };

  const deleteQuotation = async (id: string) => {
    await quotationsDb.delete(id);
    setData(prev => prev.filter(q => q.id !== id));
  };

  const convertToInvoice = async (quotationId: string) => {
    return quotationsDb.convertToInvoice(quotationId);
  };

  const generateQuoteNumber = async () => {
    return quotationsDb.generateQuoteNumber();
  };

  return { quotations, loading, error, refresh, createQuotation, updateQuotation, deleteQuotation, convertToInvoice, generateQuoteNumber };
}

// Invoices Hook
export function useInvoices() {
  const { data: invoices, loading, error, refresh, setData } = useDbCollection<Invoice>(
    () => invoicesDb.getAll()
  );

  const createInvoice = async (invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>) => {
    const newInvoice = await invoicesDb.create(invoice);
    setData(prev => [newInvoice, ...prev]);
    return newInvoice;
  };

  const updateInvoice = async (id: string, updates: Partial<Invoice>) => {
    const updated = await invoicesDb.update(id, updates);
    setData(prev => prev.map(i => i.id === id ? updated : i));
    return updated;
  };

  const deleteInvoice = async (id: string) => {
    await invoicesDb.delete(id);
    setData(prev => prev.filter(i => i.id !== id));
  };

  const recordPayment = async (id: string, amount: number) => {
    const updated = await invoicesDb.recordPayment(id, amount);
    setData(prev => prev.map(i => i.id === id ? updated : i));
    return updated;
  };

  const generateInvoiceNumber = async () => {
    return invoicesDb.generateInvoiceNumber();
  };

  return { invoices, loading, error, refresh, createInvoice, updateInvoice, deleteInvoice, recordPayment, generateInvoiceNumber };
}

// Tenders Hook
export function useTenders() {
  const { data: tenders, loading, error, refresh, setData } = useDbCollection<Tender>(
    () => tendersDb.getAll()
  );

  const createTender = async (tender: Omit<Tender, 'id' | 'created_at' | 'updated_at'>) => {
    const newTender = await tendersDb.create(tender);
    setData(prev => [newTender, ...prev]);
    return newTender;
  };

  const updateTender = async (id: string, updates: Partial<Tender>) => {
    const updated = await tendersDb.update(id, updates);
    setData(prev => prev.map(t => t.id === id ? updated : t));
    return updated;
  };

  const deleteTender = async (id: string) => {
    await tendersDb.delete(id);
    setData(prev => prev.filter(t => t.id !== id));
  };

  return { tenders, loading, error, refresh, createTender, updateTender, deleteTender };
}

// Team Members Hook
export function useTeamMembers() {
  const { data: teamMembers, loading, error, refresh, setData } = useDbCollection<TeamMember>(
    () => teamMembersDb.getAll()
  );

  const createTeamMember = async (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) => {
    const newMember = await teamMembersDb.create(member);
    setData(prev => [...prev, newMember]);
    return newMember;
  };

  const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
    const updated = await teamMembersDb.update(id, updates);
    setData(prev => prev.map(m => m.id === id ? updated : m));
    return updated;
  };

  const deleteTeamMember = async (id: string) => {
    await teamMembersDb.delete(id);
    setData(prev => prev.filter(m => m.id !== id));
  };

  return { teamMembers, loading, error, refresh, createTeamMember, updateTeamMember, deleteTeamMember };
}

// Tasks Hook
export function useTasks() {
  const { data: tasks, loading, error, refresh, setData } = useDbCollection<Task>(
    () => tasksDb.getAll()
  );

  const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    const newTask = await tasksDb.create(task);
    setData(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const updated = await tasksDb.update(id, updates);
    setData(prev => prev.map(t => t.id === id ? updated : t));
    return updated;
  };

  const deleteTask = async (id: string) => {
    await tasksDb.delete(id);
    setData(prev => prev.filter(t => t.id !== id));
  };

  const toggleComplete = async (id: string) => {
    const updated = await tasksDb.toggleComplete(id);
    setData(prev => prev.map(t => t.id === id ? updated : t));
    return updated;
  };

  return { tasks, loading, error, refresh, createTask, updateTask, deleteTask, toggleComplete };
}

// Documents Hook
export function useDocuments(parentId?: string | null) {
  const { data: documents, loading, error, refresh, setData } = useDbCollection<Document>(
    () => documentsDb.getAll(parentId)
  );

  const createDocument = async (doc: Omit<Document, 'id' | 'created_at' | 'updated_at'>) => {
    const newDoc = await documentsDb.create(doc);
    setData(prev => [...prev, newDoc]);
    return newDoc;
  };

  const updateDocument = async (id: string, updates: Partial<Document>) => {
    const updated = await documentsDb.update(id, updates);
    setData(prev => prev.map(d => d.id === id ? updated : d));
    return updated;
  };

  const deleteDocument = async (id: string) => {
    await documentsDb.delete(id);
    setData(prev => prev.filter(d => d.id !== id));
  };

  return { documents, loading, error, refresh, createDocument, updateDocument, deleteDocument };
}

// Social Posts Hook
export function useSocialPosts() {
  const { data: posts, loading, error, refresh, setData } = useDbCollection<SocialPost>(
    () => socialPostsDb.getAll()
  );

  const createPost = async (post: Omit<SocialPost, 'id' | 'created_at' | 'updated_at'>) => {
    const newPost = await socialPostsDb.create(post);
    setData(prev => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = async (id: string, updates: Partial<SocialPost>) => {
    const updated = await socialPostsDb.update(id, updates);
    setData(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  };

  const deletePost = async (id: string) => {
    await socialPostsDb.delete(id);
    setData(prev => prev.filter(p => p.id !== id));
  };

  const publishPost = async (id: string) => {
    const updated = await socialPostsDb.publish(id);
    setData(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  };

  return { posts, loading, error, refresh, createPost, updatePost, deletePost, publishPost };
}

// Company Settings Hook
export function useCompanySettings() {
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await companySettingsDb.get();
      setSettings(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateSettings = async (updates: Partial<CompanySettings>) => {
    const updated = await companySettingsDb.update(updates);
    setSettings(updated);
    return updated;
  };

  return { settings, loading, error, refresh, updateSettings };
}
