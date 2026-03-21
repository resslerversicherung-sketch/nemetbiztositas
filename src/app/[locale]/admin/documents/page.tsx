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
  Download,
  Eye,
  ChevronRight,
  File,
  Upload,
} from "lucide-react";

const sidebarItems = [
  { key: "dashboard", icon: LayoutDashboard, href: "/admin" },
  { key: "leads", icon: AlertCircle, href: "/admin/leads" },
  { key: "customers", icon: Users, href: "/admin/customers" },
  { key: "analytics", icon: BarChart3, href: "/admin/analytics" },
  { key: "documents", icon: FileText, href: "/admin/documents" },
  { key: "settings", icon: Settings, href: "/admin/settings" },
];

const mockDocuments = [
  { id: "D-001", name: "EVB_Kovacs_Janos_KFZ.pdf", type: "EVB", customer: "Kovács János", createdAt: "2026-03-20", size: "142 KB" },
  { id: "D-002", name: "SEPA_Mandat_Nagy_Maria.pdf", type: "SEPA", customer: "Nagy Mária", createdAt: "2026-03-19", size: "98 KB" },
  { id: "D-003", name: "Vertrag_NB24-KFZ-2024-001.pdf", type: "Vertrag", customer: "Kovács János", createdAt: "2026-03-18", size: "256 KB" },
  { id: "D-004", name: "Schadensmeldung_K2024001.pdf", type: "Schaden", customer: "Szabó Péter", createdAt: "2026-03-17", size: "185 KB" },
  { id: "D-005", name: "EVB_Toth_Anna_KFZ.pdf", type: "EVB", customer: "Tóth Anna", createdAt: "2026-03-16", size: "140 KB" },
  { id: "D-006", name: "Versicherungsschein_NB24-HAU-2024-015.pdf", type: "Vertrag", customer: "Nagy Mária", createdAt: "2026-03-15", size: "312 KB" },
  { id: "D-007", name: "SEPA_Mandat_Kiss_Laszlo.pdf", type: "SEPA", customer: "Kiss László", createdAt: "2026-03-14", size: "95 KB" },
  { id: "D-008", name: "Kuendigung_Horvath_Gabor.pdf", type: "Kündigung", customer: "Horváth Gábor", createdAt: "2026-03-13", size: "78 KB" },
];

const typeColors: Record<string, string> = {
  EVB: "bg-primary-100 text-primary-700",
  SEPA: "bg-accent-100 text-accent-700",
  Vertrag: "bg-success-100 text-success-700",
  Schaden: "bg-warning-100 text-warning-600",
  Kündigung: "bg-danger-100 text-danger-700",
};

export default function DocumentsPage() {
  const t = useTranslations("admin");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filtered = mockDocuments.filter((doc) => {
    if (filterType !== "all" && doc.type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return doc.name.toLowerCase().includes(q) || doc.customer.toLowerCase().includes(q);
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
            <span className="text-gray-700">{t("documents")}</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{t("documents")}</h1>
            <button className="btn-primary flex items-center gap-2 text-sm">
              <Upload className="w-4 h-4" />
              Hochladen
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder={`${tc("search")}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="all">Typ: Alle</option>
              <option value="EVB">EVB</option>
              <option value="SEPA">SEPA</option>
              <option value="Vertrag">Vertrag</option>
              <option value="Schaden">Schaden</option>
              <option value="Kündigung">Kündigung</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dokument</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Typ</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kunde</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Datum</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Größe</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <File className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[doc.type] || "bg-gray-100 text-gray-600"}`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{doc.customer}</td>
                    <td className="px-4 py-3 text-gray-600">{doc.createdAt}</td>
                    <td className="px-4 py-3 text-gray-500">{doc.size}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-primary-600 hover:text-primary-700"><Eye className="w-4 h-4" /></button>
                        <button className="text-gray-400 hover:text-gray-600"><Download className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400">Keine Dokumente gefunden</div>}
        </div>
      </main>
    </div>
  );
}
