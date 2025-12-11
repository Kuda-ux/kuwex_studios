"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  Receipt,
  Briefcase,
  Megaphone,
  UserCog,
  FolderOpen,
  Settings,
  Brain,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Clients & CRM", href: "/dashboard/crm", icon: Users },
  { name: "Quotations", href: "/dashboard/quotations", icon: FileText },
  { name: "Invoices", href: "/dashboard/invoices", icon: Receipt },
  { name: "Tenders", href: "/dashboard/tenders", icon: Briefcase },
  { name: "Marketing", href: "/dashboard/marketing", icon: Megaphone },
  { name: "HR & Team", href: "/dashboard/hr", icon: UserCog },
  { name: "Documents", href: "/dashboard/documents", icon: FolderOpen },
  { name: "AI Insights", href: "/dashboard/insights", icon: Brain },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const notifications = [
  { id: 1, title: "New lead from website", time: "5 min ago", unread: true },
  { id: 2, title: "Project deadline approaching", time: "1 hour ago", unread: true },
  { id: 3, title: "Invoice #INV-024 paid", time: "3 hours ago", unread: false },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#111111] border-r border-[#2F3336] transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-[#2F3336]">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold">
                <span className="text-white">KuWe</span>
                <span className="text-kuwex-cyan">X</span>
              </span>
              <span className="text-xs text-gray-500 bg-[#1a1a1a] px-2 py-0.5 rounded">IMS</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-kuwex-cyan/10 text-kuwex-cyan"
                      : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-[#2F3336]">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#1a1a1a]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center text-black font-bold text-sm">
                K
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Kuda</p>
                <p className="text-xs text-gray-500 truncate">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 h-16 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#2F3336]">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu size={24} />
              </button>
              
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-[#16181C] border border-[#2F3336] rounded-xl px-4 py-2 w-80">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search projects, clients, invoices..."
                  className="bg-transparent border-none outline-none text-sm text-white placeholder:text-gray-600 w-full"
                />
                <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-gray-500 bg-[#0A0A0A] rounded">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-gray-400 hover:text-white hover:bg-[#16181C] rounded-xl transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-kuwex-cyan rounded-full" />
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-[#16181C] border border-[#2F3336] rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[#2F3336]">
                        <h3 className="font-semibold text-white">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer ${
                              notif.unread ? "bg-kuwex-cyan/5" : ""
                            }`}
                          >
                            <p className="text-sm text-white">{notif.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 border-t border-[#2F3336]">
                        <button className="text-sm text-kuwex-cyan hover:underline">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-[#16181C] rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center text-black font-bold text-sm">
                    K
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-[#16181C] border border-[#2F3336] rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[#2F3336]">
                        <p className="font-semibold text-white">Kuda</p>
                        <p className="text-xs text-gray-500">projects@kuwex.co</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                        >
                          <Settings size={16} />
                          Settings
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-[#1a1a1a]"
                        >
                          <LogOut size={16} />
                          Sign out
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
