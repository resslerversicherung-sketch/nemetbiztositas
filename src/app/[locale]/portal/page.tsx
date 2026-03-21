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
} from "lucide-react";

// --- Sidebar Navigation ---
const sidebarItems = [
  { key: "dashboard", icon: LayoutDashboard, href: "/portal" },
  { key: "contracts", icon: FileText, href: "/portal/contracts" },
  { key: "mileage", icon: Gauge, href: "/portal/mileage" },
  { key: "claims", icon: AlertTriangle, href: "/portal/claims" },
  { key: "documents", icon: FolderOpen, href: "/portal/documents" },
  { key: "chat", icon: MessageCircle, href: "/portal/chat" },
  { key: "profile", icon: User, href: "/portal/profile" },
];

// --- Mock User Data ---
const mockUser = {
  name: "Kovács János",
  email: "kovacs.janos@email.com",
};

// --- Quick Action Cards ---
const quickActions = [
  {
    key: "contracts",
    icon: FileText,
    count: "3",
    color: "text-primary-500",
    bg: "bg-primary-50",
    href: "/portal/contracts",
  },
  {
    key: "mileage",
    icon: Gauge,
    count: "12 450 km",
    color: "text-accent-500",
    bg: "bg-accent-50",
    href: "/portal/mileage",
  },
  {
    key: "claims",
    icon: AlertTriangle,
    count: "1",
    color: "text-warning-500",
    bg: "bg-warning-50",
    href: "/portal/claims",
  },
  {
    key: "documents",
    icon: FolderOpen,
    count: "7",
    color: "text-success-500",
    bg: "bg-success-50",
    href: "/portal/documents",
  },
  {
    key: "chat",
    icon: MessageCircle,
    count: "2 új",
    color: "text-purple-500",
    bg: "bg-purple-50",
    href: "/portal/chat",
  },
];

export default function PortalDashboardPage() {
  const t = useTranslations("portal");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary-600">
            {tc("brandShort")} {t("title")}
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const fullHref = `/${locale}${item.href}`;
            const isActive =
              item.href === "/portal"
                ? pathname === fullHref || pathname === `/${locale}/portal`
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
        {/* Mobile Nav */}
        <div className="lg:hidden mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const fullHref = `/${locale}${item.href}`;
              const isActive =
                item.href === "/portal"
                  ? pathname === fullHref
                  : pathname.startsWith(fullHref);
              return (
                <Link
                  key={item.key}
                  href={fullHref}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(item.key)}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {t("welcome")}, {mockUser.name}!
          </h1>
          <p className="text-gray-500 mt-1">{t("title")}</p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const fullHref = `/${locale}${action.href}`;
            return (
              <Link key={action.key} href={fullHref}>
                <div className="card-hover group">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${action.bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {action.count}
                  </div>
                  <div className="text-sm text-gray-500">{t(action.key)}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Legutóbbi tevékenységek
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: FileText,
                text: "Kfz biztosítás szerződés megújítva",
                date: "2026-03-18",
                color: "text-primary-500",
                bg: "bg-primary-50",
              },
              {
                icon: Gauge,
                text: "Kilométeróra állás bejelentve: 12 450 km",
                date: "2026-03-15",
                color: "text-accent-500",
                bg: "bg-accent-50",
              },
              {
                icon: AlertTriangle,
                text: "Kárbejelentés #K-2024-001 elbírálás alatt",
                date: "2026-03-10",
                color: "text-warning-500",
                bg: "bg-warning-50",
              },
              {
                icon: FolderOpen,
                text: "Új dokumentum feltöltve: Biztosítási igazolás",
                date: "2026-03-08",
                color: "text-success-500",
                bg: "bg-success-50",
              },
              {
                icon: MessageCircle,
                text: "Új üzenet az ügyintézőtől",
                date: "2026-03-05",
                color: "text-purple-500",
                bg: "bg-purple-50",
              },
            ].map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${activity.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {activity.text}
                    </p>
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
