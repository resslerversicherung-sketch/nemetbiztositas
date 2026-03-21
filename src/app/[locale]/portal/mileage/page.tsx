"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FileText,
  Gauge,
  AlertTriangle,
  FolderOpen,
  MessageCircle,
  LayoutDashboard,
  User,
  ChevronRight,
  Send,
  CheckCircle,
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

// --- Mock Contracts for Selector ---
const mockContracts = [
  { id: "NB24-KFZ-2024-001", label: "NB24-KFZ-2024-001 - Volkswagen Golf VII" },
  { id: "NB24-KFZ-2023-042", label: "NB24-KFZ-2023-042 - BMW 320d" },
];

// --- Mock Mileage History ---
const mockHistory = [
  {
    id: "1",
    contract: "NB24-KFZ-2024-001",
    mileage: 12450,
    date: "2026-03-15",
    status: "accepted",
  },
  {
    id: "2",
    contract: "NB24-KFZ-2024-001",
    mileage: 11200,
    date: "2026-01-10",
    status: "accepted",
  },
  {
    id: "3",
    contract: "NB24-KFZ-2024-001",
    mileage: 9800,
    date: "2025-10-05",
    status: "accepted",
  },
  {
    id: "4",
    contract: "NB24-KFZ-2023-042",
    mileage: 45600,
    date: "2025-12-20",
    status: "accepted",
  },
  {
    id: "5",
    contract: "NB24-KFZ-2023-042",
    mileage: 42100,
    date: "2025-09-15",
    status: "accepted",
  },
];

export default function MileagePage() {
  const t = useTranslations("portal");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  const [selectedContract, setSelectedContract] = useState("");
  const [mileage, setMileage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/portal/mileage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractId: selectedContract,
          mileage: parseInt(mileage),
          date: new Date().toISOString(),
        }),
      });
    } catch {
      // Demo mode - no actual API
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
    setMileage("");
  };

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
                ? pathname === fullHref
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

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Link href={`/${locale}/portal`} className="hover:text-primary-500">
            {t("dashboard")}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-700">{t("mileage")}</span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
          {t("reportMileage")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submission Form */}
          <div className="card border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {t("reportMileage")}
            </h2>

            {submitSuccess && (
              <div className="flex items-center gap-2 bg-success-50 text-success-700 px-4 py-3 rounded-lg mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{tc("success")}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="input-label">{t("contractNumber")}</label>
                <select
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Válassz szerződést...</option>
                  {mockContracts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="input-label">{t("currentMileage")}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="pl. 15000"
                    className="input-field pr-16"
                    min="0"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    km
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  tc("loading")
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {tc("submit")}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Mileage Info Card */}
          <div className="card border border-gray-100 bg-primary-50/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Gauge className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Utolsó bejelentés
                </h3>
                <p className="text-sm text-gray-500">2026-03-15</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              12 450 km
            </div>
            <p className="text-sm text-gray-500">
              NB24-KFZ-2024-001 - Volkswagen Golf VII
            </p>
          </div>
        </div>

        {/* History Table */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t("mileageHistory")}
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t("contractNumber")}
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t("currentMileage")}
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Dátum
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t("claimStatus")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockHistory.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {entry.contract}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {entry.mileage.toLocaleString("hu-HU")} km
                      </td>
                      <td className="px-6 py-4 text-gray-600">{entry.date}</td>
                      <td className="px-6 py-4">
                        <span className="badge bg-success-100 text-success-700">
                          Elfogadva
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
