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
  X,
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

// --- Mock Contracts ---
const mockContracts = [
  {
    id: "1",
    contractNumber: "NB24-KFZ-2024-001",
    type: "Kfz-Haftpflicht",
    status: "active" as const,
    premium: "€ 89,50 / hó",
    validFrom: "2024-01-01",
    validTo: "2025-01-01",
    vehicle: "Volkswagen Golf VII",
  },
  {
    id: "2",
    contractNumber: "NB24-HAU-2024-015",
    type: "Hausratversicherung",
    status: "active" as const,
    premium: "€ 34,20 / hó",
    validFrom: "2024-03-15",
    validTo: "2025-03-15",
    vehicle: null,
  },
  {
    id: "3",
    contractNumber: "NB24-KFZ-2023-042",
    type: "Kfz-Vollkasko",
    status: "cancelled" as const,
    premium: "€ 145,00 / hó",
    validFrom: "2023-06-01",
    validTo: "2024-06-01",
    vehicle: "BMW 320d",
  },
  {
    id: "4",
    contractNumber: "NB24-HAF-2025-003",
    type: "Haftpflichtversicherung",
    status: "pending" as const,
    premium: "€ 52,80 / hó",
    validFrom: "2025-04-01",
    validTo: "2026-04-01",
    vehicle: null,
  },
];

const statusColors: Record<string, string> = {
  active: "bg-success-100 text-success-700",
  cancelled: "bg-danger-100 text-danger-700",
  pending: "bg-warning-100 text-warning-600",
};

export default function ContractsPage() {
  const t = useTranslations("portal");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [changeType, setChangeType] = useState("");
  const [changeDescription, setChangeDescription] = useState("");

  const handleRequestChange = (contractId: string) => {
    setSelectedContract(contractId);
    setShowModal(true);
  };

  const handleSubmitChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Would POST to /api/portal/contracts/change
    alert(`Módosítási kérelem elküldve: ${selectedContract}`);
    setShowModal(false);
    setChangeType("");
    setChangeDescription("");
    setSelectedContract(null);
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

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Link href={`/${locale}/portal`} className="hover:text-primary-500">
              {t("dashboard")}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700">{t("contracts")}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {t("contracts")}
          </h1>
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          {mockContracts.map((contract) => (
            <div
              key={contract.id}
              className="card border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {contract.type}
                    </h3>
                    <span
                      className={`badge ${statusColors[contract.status]}`}
                    >
                      {t(contract.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">
                        {t("contractNumber")}
                      </span>
                      <p className="font-medium text-gray-800">
                        {contract.contractNumber}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">{t("premium")}</span>
                      <p className="font-medium text-gray-800">
                        {contract.premium}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">{t("validFrom")}</span>
                      <p className="font-medium text-gray-800">
                        {contract.validFrom}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">{t("validTo")}</span>
                      <p className="font-medium text-gray-800">
                        {contract.validTo}
                      </p>
                    </div>
                  </div>
                  {contract.vehicle && (
                    <p className="text-sm text-gray-500 mt-2">
                      {contract.vehicle}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {contract.status !== "cancelled" && (
                    <button
                      onClick={() => handleRequestChange(contract.contractNumber)}
                      className="btn-secondary text-sm py-2 px-4"
                    >
                      {t("requestChange")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Change Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("requestChange")}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitChange} className="p-6 space-y-4">
              <div>
                <label className="input-label">{t("contractNumber")}</label>
                <input
                  type="text"
                  value={selectedContract || ""}
                  readOnly
                  className="input-field bg-gray-50"
                />
              </div>
              <div>
                <label className="input-label">Módosítás típusa</label>
                <select
                  value={changeType}
                  onChange={(e) => setChangeType(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Válassz...</option>
                  <option value="address">Címváltozás</option>
                  <option value="coverage">Fedezet módosítás</option>
                  <option value="vehicle">Jármű csere</option>
                  <option value="payment">Fizetési mód</option>
                  <option value="cancel">Felmondás</option>
                  <option value="other">Egyéb</option>
                </select>
              </div>
              <div>
                <label className="input-label">Leírás</label>
                <textarea
                  value={changeDescription}
                  onChange={(e) => setChangeDescription(e.target.value)}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Írd le a kért módosítás részleteit..."
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1">
                  {tc("submit")}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  {tc("cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
