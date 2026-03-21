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
  Clock,
  CheckCircle,
  XCircle,
  Plus,
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

const mockClaims = [
  {
    id: "K-2024-001",
    type: "Kfz-Schaden",
    date: "2026-03-10",
    contract: "NB24-KFZ-2024-001",
    description: "Parkschaden an der Fahrertür",
    status: "in_review" as const,
    amount: "€ 1.250,00",
  },
  {
    id: "K-2023-015",
    type: "Hausrat",
    date: "2025-11-20",
    contract: "NB24-HAU-2024-015",
    description: "Wasserschaden in der Küche",
    status: "approved" as const,
    amount: "€ 3.800,00",
  },
  {
    id: "K-2023-008",
    type: "Kfz-Schaden",
    date: "2025-06-05",
    contract: "NB24-KFZ-2023-042",
    description: "Auffahrunfall auf der Autobahn",
    status: "rejected" as const,
    amount: "€ 5.200,00",
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  in_review: { label: "In Bearbeitung", color: "bg-warning-100 text-warning-600", icon: Clock },
  approved: { label: "Genehmigt", color: "bg-success-100 text-success-700", icon: CheckCircle },
  rejected: { label: "Abgelehnt", color: "bg-danger-100 text-danger-700", icon: XCircle },
};

export default function PortalClaimsPage() {
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
          <span className="text-gray-700">{t("claims")}</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{t("claims")}</h1>
          <Link href={`/${locale}/claims`} className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            {t("newClaim")}
          </Link>
        </div>

        <div className="space-y-4">
          {mockClaims.map((claim) => {
            const status = statusConfig[claim.status];
            const StatusIcon = status.icon;
            return (
              <div key={claim.id} className="card border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{claim.type}</h3>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{claim.description}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-400">Schadennr.</span>
                        <p className="font-medium text-gray-800">{claim.id}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Vertrag</span>
                        <p className="font-medium text-gray-800">{claim.contract}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Datum</span>
                        <p className="font-medium text-gray-800">{claim.date}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Betrag</span>
                        <p className="font-medium text-gray-800">{claim.amount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
