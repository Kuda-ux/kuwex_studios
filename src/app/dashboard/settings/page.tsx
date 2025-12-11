"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Users,
  Mail,
  Phone,
  MapPin,
  Save,
  Camera,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "company", label: "Company", icon: Building2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "team", label: "Team", icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-500">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === tab.id ? "bg-kuwex-cyan text-black" : "text-gray-400 hover:text-white hover:bg-[#2F3336]"}`}>
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Profile Settings</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center text-black font-bold text-3xl">
                    K
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#2F3336] rounded-full flex items-center justify-center text-white hover:bg-[#3F4346] transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Kuda</h3>
                  <p className="text-gray-500">Founder & Lead Developer</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                  <input type="text" defaultValue="Kuda" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" defaultValue="kuda@kuwexstudios.com" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <input type="tel" defaultValue="+263 77 123 4567" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Role</label>
                  <input type="text" defaultValue="Founder & Lead Developer" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 bg-kuwex-cyan text-black px-6 py-3 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Company Tab */}
          {activeTab === "company" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Company Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                  <input type="text" defaultValue="KuWeX Studios" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" defaultValue="hello@kuwexstudios.com" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <input type="tel" defaultValue="+263 77 123 4567" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Address</label>
                  <input type="text" defaultValue="Harare, Zimbabwe" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Website</label>
                  <input type="url" defaultValue="https://kuwexstudios.com" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Currency</label>
                  <select className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50">
                    <option>USD ($)</option>
                    <option>ZWL (ZWL$)</option>
                    <option>ZAR (R)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 bg-kuwex-cyan text-black px-6 py-3 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl">
                  <div>
                    <h3 className="font-medium text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive email updates about your projects</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#2F3336] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kuwex-cyan"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl">
                  <div>
                    <h3 className="font-medium text-white">New Lead Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified when new leads come in</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#2F3336] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kuwex-cyan"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl">
                  <div>
                    <h3 className="font-medium text-white">Project Deadlines</h3>
                    <p className="text-sm text-gray-500">Reminders for upcoming deadlines</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#2F3336] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kuwex-cyan"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl">
                  <div>
                    <h3 className="font-medium text-white">Payment Notifications</h3>
                    <p className="text-sm text-gray-500">Updates on invoice payments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#2F3336] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kuwex-cyan"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl">
                  <div>
                    <h3 className="font-medium text-white">AI Insights</h3>
                    <p className="text-sm text-gray-500">Smart recommendations and alerts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#2F3336] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kuwex-cyan"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                      <input type="password" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">New Password</label>
                      <input type="password" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                      <input type="password" className="w-full bg-[#0A0A0A] border border-[#2F3336] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kuwex-cyan/50" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#2F3336]">
                  <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl">
                    <div>
                      <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <button className="px-4 py-2 bg-[#2F3336] text-white rounded-xl hover:bg-[#3F4346] transition-colors">Enable</button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 bg-kuwex-cyan text-black px-6 py-3 rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">
                  <Save size={20} />
                  Update Password
                </button>
              </div>
            </motion.div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Billing & Subscription</h2>
              
              <div className="p-6 bg-gradient-to-r from-kuwex-cyan/10 to-kuwex-blue/10 border border-kuwex-cyan/20 rounded-xl mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Current Plan</p>
                    <h3 className="text-2xl font-bold text-white">Free Trial</h3>
                    <p className="text-sm text-gray-500 mt-1">14 days remaining</p>
                  </div>
                  <button className="px-6 py-3 bg-kuwex-cyan text-black rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">Upgrade Plan</button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-white">Payment Method</h3>
                <div className="p-4 bg-[#0A0A0A] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-[#2F3336] rounded flex items-center justify-center text-xs text-gray-400">VISA</div>
                    <div>
                      <p className="text-white">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <button className="text-kuwex-cyan hover:underline text-sm">Edit</button>
                </div>
                <button className="w-full p-4 border border-dashed border-[#2F3336] rounded-xl text-gray-400 hover:text-white hover:border-[#3F4346] transition-colors">+ Add Payment Method</button>
              </div>
            </motion.div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Team Members</h2>
                <button className="px-4 py-2 bg-kuwex-cyan text-black rounded-xl font-semibold hover:bg-kuwex-cyan/90 transition-colors">Invite Member</button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#0A0A0A] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kuwex-cyan to-kuwex-blue flex items-center justify-center text-black font-bold">K</div>
                    <div>
                      <p className="font-medium text-white">Kuda</p>
                      <p className="text-sm text-gray-500">kuda@kuwexstudios.com</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-kuwex-cyan/20 text-kuwex-cyan text-sm rounded-full">Owner</span>
                </div>
                <div className="p-4 bg-[#0A0A0A] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">W</div>
                    <div>
                      <p className="font-medium text-white">Weston</p>
                      <p className="text-sm text-gray-500">weston@kuwexstudios.com</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full">Admin</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
