"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Gauge,
  AlertTriangle,
  FolderOpen,
  MessageCircle,
  LayoutDashboard,
  User,
  ChevronRight,
  Download,
  File,
} from "lucide-react";

const sidebarItems = [
  { key: "dashboard", icon: LayoutDashboard, href: "/portal" },
  { key: "contracts", icon: FileText, href: "/portal/contracts" },
  { key: "mileage", icon: Gauge, href: "/portal/mileage" },
  { key: "claims", icon: AlertTriangle, href: "/portal/claims" },
  { key: "documents", icon: FolderOpen, href: "/portal/documents" },
  { key: "chat", icon: MessageCircle, href: "/portal/chat" },
  { key: "profile", icon: User, href: "/portal/profile" },
];

const mockDocuments = [
  { id: "1", name: "Versicherungsschein_KFZ_2024.pdf", type: "Versicherungsschein", date: "2024-01-15", size: "245 KB" },
  { id: "2", name: "EVB_Bescheinigung_Golf.pdf", type: "EVB", date: "2024-01-10", size: "142 KB" },
  { id: "3", name: "Beitragsrechnung_Q1_2026.pdf", type: "Rechnung", date: "2026-01-05", size: "98 KB" },
  { id: "4", name: "Schadenmeldung_K2024001.pdf", type: "Schaden", date: "2026-03-10", size: "185 KB" },
  { id: "5", name: "SEPA_Lastschriftmandat.pdf", type: "SEPA", date: "2024-01-15", size: "95 KB" },
  { id: "6", name: "Versicherungsschein_Hausrat.pdf", type: "Versicherungsschein", date: "2024-03-15", size: "312 KB" },
  { id: "7", name: "Beitragsrechnung_Q4_2025.pdf", type: "Rechnung", date: "2025-10-05", size: "102 KB" },
];

const typeColors: Record<string, string> = {
  Versicherungsschein: "bg-primary-100 text-primary-700",
  EVB: "bg-accent-100 text-accent-700",
  Rechnung: "bg-warning-100 text-warning-600",
  Schaden: "bg-danger-100 text-danger-700",
  SEPA: "bg-success-100 text-success-700",
};

export default function PortalDocumentsPage() {
  const t = useTranslations("portal");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary-600">{tc("brandShort")} {t("title")}</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const fullHref = `/${locale}${item.href}`;
            const isActive = item.href === "/portal" ? pathname === fullHref : pathname.startsWith(fullHref);
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
        <div className="lg:hidden mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const fullHref = `/${locale}${item.href}`;
              const isActive = item.href === "/portal" ? pathname === fullHref : pathname.startsWith(fullHref);
              return (
                <Link key={item.key} href={fullHref} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${isActive ? "bg-primary-50 text-primary-700" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                  <Icon className="w-4 h-4" />
                  {t(item.key)}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Link href={`/${locale}/portal`} className="hover:text-primary-500">{t("dashboard")}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-700">{t("documents")}</span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">{t("documents")}</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dokument</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Typ</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Datum</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Größe</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <File className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[doc.type] || "bg-gray-100 text-gray-600"}`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{doc.date}</td>
                    <td className="px-6 py-4 text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4">
                      <button className="text-primary-600 hover:text-primary-700 flex items-center gap-1.5 text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
