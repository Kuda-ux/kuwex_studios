"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  FolderOpen,
  FileText,
  Image,
  File,
  Upload,
  Download,
  MoreVertical,
  Grid,
  List,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";

interface Document {
  id: number;
  name: string;
  type: "folder" | "pdf" | "image" | "doc" | "other";
  size?: string;
  modified: string;
  project?: string;
}

const documents: Document[] = [
  { id: 1, name: "Contracts", type: "folder", modified: "2024-12-10" },
  { id: 2, name: "Proposals", type: "folder", modified: "2024-12-09" },
  { id: 3, name: "Brand Assets", type: "folder", modified: "2024-12-08" },
  { id: 4, name: "TechStart_Contract.pdf", type: "pdf", size: "245 KB", modified: "2024-12-10", project: "TechStart Website" },
  { id: 5, name: "GreenEnergy_Logo.png", type: "image", size: "1.2 MB", modified: "2024-12-08", project: "GreenEnergy Brand" },
  { id: 6, name: "HealthPlus_Proposal.pdf", type: "pdf", size: "890 KB", modified: "2024-12-07", project: "HealthPlus App" },
  { id: 7, name: "Marketing_Strategy.docx", type: "doc", size: "156 KB", modified: "2024-12-06", project: "EduLearn Marketing" },
  { id: 8, name: "Invoice_Template.pdf", type: "pdf", size: "78 KB", modified: "2024-12-05" },
  { id: 9, name: "Brand_Guidelines.pdf", type: "pdf", size: "2.4 MB", modified: "2024-12-04", project: "GreenEnergy Brand" },
  { id: 10, name: "Project_Timeline.xlsx", type: "other", size: "45 KB", modified: "2024-12-03" },
];

const typeIcons: Record<string, typeof FileText> = {
  folder: FolderOpen,
  pdf: FileText,
  image: Image,
  doc: FileText,
  other: File,
};

const typeColors: Record<string, string> = {
  folder: "bg-yellow-500/20 text-yellow-400",
  pdf: "bg-red-500/20 text-red-400",
  image: "bg-purple-500/20 text-purple-400",
  doc: "bg-blue-500/20 text-blue-400",
  other: "bg-gray-500/20 text-gray-400",
};

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const folders = filteredDocs.filter((d) => d.type === "folder");
  const files = filteredDocs.filter((d) => d.type !== "folder");

  const stats = {
    totalFiles: documents.filter((d) => d.type !== "folder").length,
    totalFolders: documents.filter((d) => d.type === "folder").length,
    totalSize: "12.4 MB",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="text-gray-500">Manage files and project documents</p>
        </div>
        <button className="flex items-center gap-2 bg-kuwex-cyan text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
          <Upload size={20} />
          Upload File
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{stats.totalFiles}</p>
          <p className="text-xs text-gray-500">Total Files</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-white">{stats.totalFolders}</p>
          <p className="text-xs text-gray-500">Folders</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4">
          <p className="text-2xl font-bold text-kuwex-cyan">{stats.totalSize}</p>
          <p className="text-xs text-gray-500">Storage Used</p>
        </motion.div>
      </div>

      {/* Search and View Toggle */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input type="text" placeholder="Search documents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#16181C] border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-kuwex-cyan/50" />
        </div>
        <div className="flex gap-2 bg-[#16181C] p-1 rounded-xl">
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}>
            <List size={20} />
          </button>
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white"}`}>
            <Grid size={20} />
          </button>
        </div>
      </div>

      {/* Folders */}
      {folders.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-400 mb-3">Folders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {folders.map((folder, index) => (
              <motion.div key={folder.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4 hover:border-[#3F4346] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${typeColors[folder.type]} flex items-center justify-center`}>
                    <FolderOpen size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{folder.name}</p>
                    <p className="text-xs text-gray-500">{new Date(folder.modified).toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      {files.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-400 mb-3">Files</h2>
          {viewMode === "list" ? (
            <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2F3336]">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Name</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Project</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Size</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Modified</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => {
                    const Icon = typeIcons[file.type];
                    return (
                      <motion.tr key={file.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-[#2F3336] hover:bg-[#1a1a1a]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${typeColors[file.type]} flex items-center justify-center`}>
                              <Icon size={16} />
                            </div>
                            <span className="text-white font-medium">{file.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-400">{file.project || "-"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-400">{file.size}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-400">{new Date(file.modified).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                              <Eye size={16} />
                            </button>
                            <button className="p-1.5 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-white">
                              <Download size={16} />
                            </button>
                            <button className="p-1.5 hover:bg-[#2F3336] rounded-lg transition-colors text-gray-400 hover:text-red-400">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {files.map((file, index) => {
                const Icon = typeIcons[file.type];
                return (
                  <motion.div key={file.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-4 hover:border-[#3F4346] transition-colors">
                    <div className={`w-12 h-12 rounded-xl ${typeColors[file.type]} flex items-center justify-center mb-3`}>
                      <Icon size={24} />
                    </div>
                    <p className="font-medium text-white truncate mb-1">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size} • {new Date(file.modified).toLocaleDateString()}</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
