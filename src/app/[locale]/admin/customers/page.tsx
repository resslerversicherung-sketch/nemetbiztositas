"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  Users,
  AlertCircle,
  LayoutDashboard,
  FileText,
  Settings,
  Search,
  Mail,
  Phone,
  ChevronRight,
  Eye,
} from "lucide-react";

const sidebarItems = [
  { key: "dashboard", icon: LayoutDashboard, href: "/admin" },
  { key: "leads", icon: AlertCircle, href: "/admin/leads" },
  { key: "customers", icon: Users, href: "/admin/customers" },
  { key: "analytics", icon: BarChart3, href: "/admin/analytics" },
  { key: "documents", icon: FileText, href: "/admin/documents" },
  { key: "settings", icon: Settings, href: "/admin/settings" },
];

const mockCustomers = [
  { id: "C-001", name: "Kovács János", email: "kovacs@email.com", phone: "+49 170 1234567", language: "hu", contracts: 3, registeredAt: "2024-01-15", status: "active" as const },
  { id: "C-002", name: "Nagy Mária", email: "nagy.m@email.com", phone: "+49 171 2345678", language: "hu", contracts: 1, registeredAt: "2024-03-20", status: "active" as const },
  { id: "C-003", name: "Szabó Péter", email: "szabo.p@email.com", phone: "+49 172 3456789", language: "hu", contracts: 2, registeredAt: "2024-05-10", status: "active" as const },
  { id: "C-004", name: "Tóth Anna", email: "toth.a@email.com", phone: "+49 173 4567890", language: "de", contracts: 1, registeredAt: "2024-06-01", status: "inactive" as const },
  { id: "C-005", name: "Kiss László", email: "kiss.l@email.com", phone: "+49 174 5678901", language: "hu", contracts: 4, registeredAt: "2023-11-05", status: "active" as const },
  { id: "C-006", name: "Molnár Éva", email: "molnar.e@email.com", phone: "+49 175 6789012", language: "ro", contracts: 2, registeredAt: "2024-02-28", status: "active" as const },
  { id: "C-007", name: "Horváth Gábor", email: "horvath.g@email.com", phone: "+49 176 7890123", language: "hu", contracts: 1, registeredAt: "2024-08-12", status: "active" as const },
  { id: "C-008", name: "Varga Katalin", email: "varga.k@email.com", phone: "+49 177 8901234", language: "de", contracts: 2, registeredAt: "2024-04-18", status: "inactive" as const },
];

const statusColors: Record<string, string> = {
  active: "bg-success-100 text-success-700",
  inactive: "bg-gray-100 text-gray-600",
};

export default function CustomersPage() {
  const t = useTranslations("admin");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  const [searchQuery, setSearchQuery] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = mockCustomers.filter((c) => {
    if (filterLanguage !== "all" && c.language !== filterLanguage) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary-600">{tc("brandShort")} Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const fullHref = `/${locale}${item.href}`;
            const isActive = item.href === "/admin" ? pathname === fullHref : pathname.startsWith(fullHref);
            return (
              <Link key={item.key} href={fullHref} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                <Icon className="w-5 h-5" />
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-4 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Link href={`/${locale}/admin`} className="hover:text-primary-500">{t("dashboard")}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700">{t("customers")}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{t("customers")}</h1>
          <p className="text-gray-500 mt-1">{filtered.length} Kunden</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder={`${tc("search")}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <select value={filterLanguage} onChange={(e) => setFilterLanguage(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="all">Sprache: Alle</option>
              <option value="hu">Magyar</option>
              <option value="de">Deutsch</option>
              <option value="ro">Română</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{tc("name")}</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{tc("email")}</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{tc("phone")}</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sprache</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Verträge</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("status")}</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((customer) => (
                  <tr key={customer.id} className={`hover:bg-gray-50 transition-colors ${expandedId === customer.id ? "bg-primary-50" : ""}`}>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{customer.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{customer.name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 uppercase text-xs font-medium">{customer.language}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{customer.contracts}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[customer.status]}`}>
                        {customer.status === "active" ? "Aktiv" : "Inaktiv"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setExpandedId(expandedId === customer.id ? null : customer.id)} className="text-primary-600 hover:text-primary-700">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400">Keine Ergebnisse</div>}
        </div>
      </main>
    </div>
  );
}
