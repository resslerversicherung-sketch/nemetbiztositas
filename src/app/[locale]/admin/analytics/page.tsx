"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  AlertCircle,
  LayoutDashboard,
  FileText,
  Settings,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react";

const sidebarItems = [
  { key: "dashboard", icon: LayoutDashboard, href: "/admin" },
  { key: "leads", icon: AlertCircle, href: "/admin/leads" },
  { key: "customers", icon: Users, href: "/admin/customers" },
  { key: "analytics", icon: BarChart3, href: "/admin/analytics" },
  { key: "documents", icon: FileText, href: "/admin/documents" },
  { key: "settings", icon: Settings, href: "/admin/settings" },
];

const monthlyData = [
  { month: "Okt", leads: 18, conversions: 7 },
  { month: "Nov", leads: 24, conversions: 10 },
  { month: "Dez", leads: 20, conversions: 8 },
  { month: "Jan", leads: 30, conversions: 14 },
  { month: "Feb", leads: 28, conversions: 12 },
  { month: "Mär", leads: 35, conversions: 16 },
];

const topProducts = [
  { name: "Kfz-Versicherung", leads: 45, percentage: 38 },
  { name: "Haftpflicht", leads: 28, percentage: 24 },
  { name: "Hausrat", leads: 22, percentage: 19 },
  { name: "Rechtsschutz", leads: 12, percentage: 10 },
  { name: "Kranken", leads: 11, percentage: 9 },
];

const kpis = [
  { label: "Leads diesen Monat", value: "35", change: "+25%", positive: true },
  { label: "Conversion Rate", value: "45.7%", change: "+3.2%", positive: true },
  { label: "Avg. Response Time", value: "2.4h", change: "-18%", positive: true },
  { label: "Offene Leads", value: "8", change: "+2", positive: false },
];

const maxLeads = Math.max(...monthlyData.map((d) => d.leads));

export default function AnalyticsPage() {
  const t = useTranslations("admin");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

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
            <span className="text-gray-700">{t("analytics")}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{t("analytics")}</h1>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500 mb-2">{kpi.label}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
              <div className={`flex items-center gap-1 text-sm font-medium ${kpi.positive ? "text-success-600" : "text-danger-600"}`}>
                {kpi.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {kpi.change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Simple Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Leads & Conversions (6 Monate)</h2>
            <div className="space-y-4">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex items-center gap-3">
                  <span className="w-8 text-sm text-gray-500 font-medium">{d.month}</span>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="h-5 rounded bg-primary-400" style={{ width: `${(d.leads / maxLeads) * 100}%` }} />
                      <span className="text-xs text-gray-500">{d.leads}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 rounded bg-success-400" style={{ width: `${(d.conversions / maxLeads) * 100}%` }} />
                      <span className="text-xs text-gray-500">{d.conversions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary-400" /> Leads</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-success-400" /> Conversions</div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Produkte</h2>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-800">{product.name}</span>
                    <span className="text-gray-500">{product.leads} Leads ({product.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-primary-500 h-2.5 rounded-full transition-all" style={{ width: `${product.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
