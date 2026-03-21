"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  LayoutDashboard,
  FileText,
  Settings,
  ChevronRight,
  Eye,
} from "lucide-react";

// --- Sidebar Navigation ---
const sidebarItems = [
  { key: "dashboard", icon: LayoutDashboard, href: "/admin" },
  { key: "leads", icon: AlertCircle, href: "/admin/leads" },
  { key: "customers", icon: Users, href: "/admin/customers" },
  { key: "analytics", icon: BarChart3, href: "/admin/analytics" },
  { key: "documents", icon: FileText, href: "/admin/documents" },
  { key: "settings", icon: Settings, href: "/admin/settings" },
];

// --- Mock Leads Data ---
const mockLeads = [
  { id: "L-001", date: "2026-03-20", type: "kfz", name: "Kovács János", email: "kovacs@email.com", priority: "high" as const, status: "open" as const },
  { id: "L-002", date: "2026-03-19", type: "liability", name: "Nagy Mária", email: "nagy.m@email.com", priority: "medium" as const, status: "in_progress" as const },
  { id: "L-003", date: "2026-03-19", type: "household", name: "Szabó Péter", email: "szabo.p@email.com", priority: "low" as const, status: "success" as const },
  { id: "L-004", date: "2026-03-18", type: "kfz", name: "Tóth Anna", email: "toth.a@email.com", priority: "urgent" as const, status: "open" as const },
  { id: "L-005", date: "2026-03-18", type: "health", name: "Kiss László", email: "kiss.l@email.com", priority: "medium" as const, status: "failed" as const },
  { id: "L-006", date: "2026-03-17", type: "legal", name: "Molnár Éva", email: "molnar.e@email.com", priority: "high" as const, status: "in_progress" as const },
  { id: "L-007", date: "2026-03-17", type: "kfz", name: "Horváth Gábor", email: "horvath.g@email.com", priority: "low" as const, status: "success" as const },
  { id: "L-008", date: "2026-03-16", type: "household", name: "Varga Katalin", email: "varga.k@email.com", priority: "medium" as const, status: "open" as const },
  { id: "L-009", date: "2026-03-16", type: "kfz", name: "Fekete András", email: "fekete.a@email.com", priority: "high" as const, status: "success" as const },
  { id: "L-010", date: "2026-03-15", type: "liability", name: "Balogh Zsófia", email: "balogh.zs@email.com", priority: "urgent" as const, status: "in_progress" as const },
  { id: "L-011", date: "2026-03-15", type: "health", name: "Papp Tamás", email: "papp.t@email.com", priority: "low" as const, status: "failed" as const },
  { id: "L-012", date: "2026-03-14", type: "kfz", name: "Lakatos Dóra", email: "lakatos.d@email.com", priority: "medium" as const, status: "open" as const },
];

const priorityColors: Record<string, string> = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-warning-100 text-warning-600",
  high: "bg-accent-100 text-accent-700",
  urgent: "bg-danger-100 text-danger-700",
};

const statusColors: Record<string, string> = {
  open: "bg-accent-100 text-accent-700",
  in_progress: "bg-warning-100 text-warning-600",
  success: "bg-success-100 text-success-700",
  failed: "bg-danger-100 text-danger-700",
};

export default function AdminDashboardPage() {
  const t = useTranslations("admin");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  // Compute stats
  const totalLeads = mockLeads.length;
  const openLeads = mockLeads.filter((l) => l.status === "open").length;
  const successLeads = mockLeads.filter((l) => l.status === "success").length;
  const failedLeads = mockLeads.filter((l) => l.status === "failed").length;
  const conversionRate = totalLeads > 0 ? Math.round((successLeads / totalLeads) * 100) : 0;

  // Filter leads
  const filteredLeads = mockLeads.filter((lead) => {
    if (filterStatus !== "all" && lead.status !== filterStatus) return false;
    if (filterType !== "all" && lead.type !== filterType) return false;
    return true;
  });

  const statCards = [
    { label: t("totalLeads"), value: totalLeads, icon: Users, color: "text-primary-500", bg: "bg-primary-50" },
    { label: t("openLeads"), value: openLeads, icon: Clock, color: "text-accent-500", bg: "bg-accent-50" },
    { label: t("successLeads"), value: successLeads, icon: CheckCircle, color: "text-success-500", bg: "bg-success-50" },
    { label: t("failedLeads"), value: failedLeads, icon: XCircle, color: "text-danger-500", bg: "bg-danger-50" },
    { label: t("conversionRate"), value: `${conversionRate}%`, icon: TrendingUp, color: "text-primary-500", bg: "bg-primary-50" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary-600">{tc("brandShort")} Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const fullHref = `/${locale}${item.href}`;
            const isActive =
              item.href === "/admin"
                ? pathname === fullHref || pathname === `/${locale}/admin`
                : pathname.startsWith(fullHref);
            return (
              <Link
                key={item.key}
                href={fullHref}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{t("dashboard")}</h1>
          <p className="text-gray-500 mt-1">{t("title")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl p-4 lg:p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{t("status")}: Mind</option>
            <option value="open">{t("open")}</option>
            <option value="in_progress">{t("inProgress")}</option>
            <option value="success">{t("success")}</option>
            <option value="failed">{t("failed")}</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{t("type")}: Mind</option>
            <option value="kfz">Kfz</option>
            <option value="liability">Liability</option>
            <option value="household">Household</option>
            <option value="health">Health</option>
            <option value="legal">Legal</option>
          </select>
        </div>

        {/* Recent Leads Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{t("recentLeads")}</h2>
            <Link
              href={`/${locale}/admin/leads`}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              Mind <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("createdAt")}</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("type")}</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{tc("name")}</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("priority")}</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("status")}</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{lead.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize font-medium text-gray-800">{lead.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-400">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[lead.priority]}`}>
                        {t(lead.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                        {lead.status === "in_progress" ? t("inProgress") : t(lead.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/${locale}/admin/leads?id=${lead.id}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-gray-400">Nincs találat</div>
          )}
        </div>
      </main>
    </div>
  );
}
