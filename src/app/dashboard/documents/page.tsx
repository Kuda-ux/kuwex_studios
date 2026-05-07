"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  FolderOpen,
  FileText,
  Image as ImageIcon,
  File,
  Plus,
  Trash2,
  Edit,
  Loader2,
  X,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { useDocuments, useProjects } from "@/hooks/useDatabase";
import type { Document } from "@/lib/types";

type DocType = Document["type"];

const typeIcons: Record<DocType, typeof FileText> = {
  folder: FolderOpen,
  pdf: FileText,
  image: ImageIcon,
  doc: FileText,
  other: File,
};

const typeColors: Record<DocType, string> = {
  folder: "bg-yellow-500/20 text-yellow-400",
  pdf: "bg-red-500/20 text-red-400",
  image: "bg-purple-500/20 text-purple-400",
  doc: "bg-blue-500/20 text-blue-400",
  other: "bg-gray-500/20 text-gray-400",
};

interface DocForm {
  name: string;
  type: DocType;
  size: number;
  path: string;
  project_id: string;
}

const emptyForm: DocForm = {
  name: "",
  type: "other",
  size: 0,
  path: "",
  project_id: "",
};

function formatSize(bytes: number): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function detectType(name: string): DocType {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  if (["pdf"].includes(ext)) return "pdf";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "image";
  if (["doc", "docx", "txt", "md", "rtf"].includes(ext)) return "doc";
  return "other";
}

export default function DocumentsPage() {
  const [parentId, setParentId] = useState<string | null>(null);
  const { documents, loading, error, createDocument, updateDocument, deleteDocument, refresh } =
    useDocuments(parentId);
  const { projects } = useProjects();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [createMode, setCreateMode] = useState<"folder" | "file">("file");
  const [editing, setEditing] = useState<Document | null>(null);
  const [form, setForm] = useState<DocForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<Document[]>([]);

  const filtered = useMemo(() => {
    if (!search) return documents;
    const q = search.toLowerCase();
    return documents.filter((d) => d.name.toLowerCase().includes(q));
  }, [documents, search]);

  const folders = filtered.filter((d) => d.type === "folder");
  const files = filtered.filter((d) => d.type !== "folder");

  const stats = {
    total: documents.length,
    folders: documents.filter((d) => d.type === "folder").length,
    size: formatSize(documents.reduce((s, d) => s + (d.size || 0), 0)),
  };

  const projectById = (id: string) => projects.find((p) => p.id === id);

  const enterFolder = (folder: Document) => {
    setBreadcrumbs((b) => [...b, folder]);
    setParentId(folder.id);
  };

  const goBack = () => {
    const next = breadcrumbs.slice(0, -1);
    setBreadcrumbs(next);
    setParentId(next.length ? next[next.length - 1].id : null);
  };

  const goRoot = () => {
    setBreadcrumbs([]);
    setParentId(null);
  };

  const openCreateFolder = () => {
    setCreateMode("folder");
    setEditing(null);
    setForm({ ...emptyForm, type: "folder" });
    setShowForm(true);
  };

  const openCreateFile = () => {
    setCreateMode("file");
    setEditing(null);
    setForm({ ...emptyForm, type: "other" });
    setShowForm(true);
  };

  const openEdit = (d: Document) => {
    setCreateMode(d.type === "folder" ? "folder" : "file");
    setEditing(d);
    setForm({
      name: d.name,
      type: d.type,
      size: d.size || 0,
      path: d.path || "",
      project_id: d.project_id || "",
    });
    setShowForm(true);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        type:
          createMode === "folder"
            ? ("folder" as DocType)
            : form.type === "folder"
              ? detectType(form.name)
              : form.type,
        size: createMode === "folder" ? 0 : form.size,
        path: form.path,
        project_id: form.project_id || null,
        parent_id: parentId,
      };
      if (editing) {
        await updateDocument(editing.id, payload);
      } else {
        await createDocument(payload);
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (d: Document) => {
    if (!confirm(`Delete "${d.name}"?`)) return;
    try {
      await deleteDocument(d.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="text-gray-500">Organize project files and folders</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openCreateFolder}
            className="flex items-center gap-2 bg-[#16181C] border border-[#2F3336] text-white px-4 py-2.5 rounded-xl font-medium hover:border-kuwex-cyan/50 transition-colors"
          >
            <FolderOpen size={18} />
            New Folder
          </button>
          <button
            onClick={openCreateFile}
            className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors"
          >
            <Plus size={18} />
            Add File
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-xs text-gray-500">Total Items</p>
        </div>
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{stats.folders}</p>
          <p className="text-xs text-gray-500">Folders</p>
        </div>
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-kuwex-cyan">{stats.size}</p>
          <p className="text-xs text-gray-500">Total Size</p>
        </div>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-gray-400 hover:text-white"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <span className="text-gray-600">|</span>
          <button onClick={goRoot} className="text-gray-400 hover:text-white">
            Root
          </button>
          {breadcrumbs.map((b, i) => (
            <span key={b.id} className="flex items-center gap-2">
              <span className="text-gray-600">/</span>
              <span className={i === breadcrumbs.length - 1 ? "text-white font-medium" : "text-gray-400"}>
                {b.name}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-kuwex-cyan" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-400">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-12 text-center">
          <FolderOpen className="mx-auto text-gray-600 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-white mb-2">
            {documents.length === 0 ? "This folder is empty" : "No items match your search"}
          </h3>
          <p className="text-gray-500 mb-4">
            {documents.length === 0
              ? "Create a folder or add a document to get started."
              : "Try a different search."}
          </p>
        </div>
      ) : (
        <>
          {folders.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-400 mb-3">Folders</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {folders.map((folder, i) => (
                  <motion.div
                    key={folder.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group bg-[#16181C] border border-[#2F3336] rounded-2xl p-4 hover:border-kuwex-cyan/40 transition-colors"
                  >
                    <button
                      onClick={() => enterFolder(folder)}
                      className="w-full text-left flex items-center gap-3 mb-2"
                    >
                      <div className={`w-10 h-10 rounded-xl ${typeColors.folder} flex items-center justify-center`}>
                        <FolderOpen size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{folder.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(folder.updated_at || folder.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </button>
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(folder)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => remove(folder)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {files.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-400 mb-3">Files</h2>
              <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#2F3336]">
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Name</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Project</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Size</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Modified</th>
                        <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((f, i) => {
                        const Icon = typeIcons[f.type];
                        const project = f.project_id ? projectById(f.project_id) : null;
                        return (
                          <motion.tr
                            key={f.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.02 }}
                            className="border-b border-[#2F3336] hover:bg-[#1a1a1a]"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg ${typeColors[f.type]} flex items-center justify-center`}>
                                  <Icon size={16} />
                                </div>
                                <span className="text-white font-medium truncate max-w-[200px]">{f.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-400 text-sm">{project?.name || "—"}</td>
                            <td className="px-4 py-3 text-gray-400 text-sm">{formatSize(f.size)}</td>
                            <td className="px-4 py-3 text-gray-400 text-sm">
                              {new Date(f.updated_at || f.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end items-center gap-1">
                                {f.path && (
                                  <a
                                    href={f.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-kuwex-cyan hover:bg-kuwex-cyan/10"
                                    title="Open"
                                  >
                                    <ExternalLink size={14} />
                                  </a>
                                )}
                                <button
                                  onClick={() => openEdit(f)}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => remove(f)}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#16181C] border border-[#2F3336] rounded-2xl w-full max-w-lg my-8"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F3336]">
              <h2 className="text-lg font-semibold text-white">
                {editing ? "Edit" : createMode === "folder" ? "New Folder" : "Add File"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitForm} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={createMode === "folder" ? "Folder name" : "Document_v1.pdf"}
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                />
              </div>
              {createMode === "file" && (
                <>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">URL / Path *</label>
                    <input
                      type="url"
                      required
                      value={form.path}
                      onChange={(e) => setForm({ ...form, path: e.target.value })}
                      placeholder="https://drive.google.com/... or https://..."
                      className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Link to the file (Google Drive, Dropbox, OneDrive, public URL, etc.)
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Type</label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value as DocType })}
                        className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                      >
                        <option value="pdf">PDF</option>
                        <option value="image">Image</option>
                        <option value="doc">Document</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Size (bytes)</label>
                      <input
                        type="number"
                        min={0}
                        value={form.size}
                        onChange={(e) => setForm({ ...form, size: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Linked Project (optional)</label>
                <select
                  value={form.project_id}
                  onChange={(e) => setForm({ ...form, project_id: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50"
                >
                  <option value="">No project</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#2F3336] text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-kuwex-cyan text-black font-semibold hover:bg-kuwex-cyan/90 disabled:opacity-50"
                >
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  {editing ? "Save" : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
