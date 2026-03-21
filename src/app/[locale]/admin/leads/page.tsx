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
  ChevronDown,
  ChevronUp,
  Plus,
  X,
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

// --- Types ---
interface LeadNote {
  id: number;
  author: string;
  date: string;
  content: string;
}

interface Lead {
  id: string;
  date: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  priority: string;
  status: string;
  assignedTo: string;
  formData: Record<string, string>;
  notes: LeadNote[];
}

// --- Mock Leads Data ---
const mockLeads: Lead[] = [
  {
    id: "L-001",
    date: "2026-03-20",
    type: "kfz",
    name: "Kovács János",
    email: "kovacs@email.com",
    phone: "+49 170 1234567",
    priority: "high" as const,
    status: "open" as const,
    assignedTo: "Admin",
    formData: {
      vehicleType: "Pkw",
      manufacturer: "BMW",
      model: "320i",
      firstRegistration: "2022-06-15",
      coverageType: "Vollkasko",
      mileage: "15000",
      usage: "Privat",
    },
    notes: [
      { id: 1, author: "Admin", date: "2026-03-20 10:30", content: "Erster Kontakt per E-Mail aufgenommen." },
    ],
  },
  {
    id: "L-002",
    date: "2026-03-19",
    type: "liability",
    name: "Nagy Mária",
    email: "nagy.m@email.com",
    phone: "+49 171 2345678",
    priority: "medium" as const,
    status: "in_progress" as const,
    assignedTo: "Mitarbeiter A",
    formData: {
      coverageType: "Privathaftpflicht",
      numberOfPersons: "2",
      startDate: "2026-04-01",
    },
    notes: [
      { id: 1, author: "Mitarbeiter A", date: "2026-03-19 14:00", content: "Angebot erstellt und gesendet." },
      { id: 2, author: "Admin", date: "2026-03-19 16:00", content: "Kundin hat Rückfragen zum Selbstbehalt." },
    ],
  },
  {
    id: "L-003",
    date: "2026-03-19",
    type: "household",
    name: "Szabó Péter",
    email: "szabo.p@email.com",
    phone: "+49 172 3456789",
    priority: "low" as const,
    status: "success" as const,
    assignedTo: "Mitarbeiter B",
    formData: {
      livingSpace: "75 m²",
      floor: "3. OG",
      buildingType: "Mehrfamilienhaus",
      startDate: "2026-03-01",
    },
    notes: [
      { id: 1, author: "Mitarbeiter B", date: "2026-03-18 09:00", content: "Vertrag abgeschlossen." },
    ],
  },
  {
    id: "L-004",
    date: "2026-03-18",
    type: "kfz",
    name: "Tóth Anna",
    email: "toth.a@email.com",
    phone: "+49 173 4567890",
    priority: "urgent" as const,
    status: "open" as const,
    assignedTo: "",
    formData: {
      vehicleType: "Pkw",
      manufacturer: "Audi",
      model: "A4",
      firstRegistration: "2024-01-10",
      coverageType: "Haftpflicht",
      mileage: "20000",
      usage: "Arbeitsweg",
    },
    notes: [],
  },
  {
    id: "L-005",
    date: "2026-03-18",
    type: "health",
    name: "Kiss László",
    email: "kiss.l@email.com",
    phone: "+49 174 5678901",
    priority: "medium" as const,
    status: "failed" as const,
    assignedTo: "Admin",
    formData: {
      insuranceType: "Zahnzusatzversicherung",
      currentInsurer: "AOK",
      startDate: "2026-04-01",
    },
    notes: [
      { id: 1, author: "Admin", date: "2026-03-17 11:00", content: "Kunde hat sich für anderen Anbieter entschieden." },
    ],
  },
  {
    id: "L-006",
    date: "2026-03-17",
    type: "legal",
    name: "Molnár Éva",
    email: "molnar.e@email.com",
    phone: "+49 175 6789012",
    priority: "high" as const,
    status: "in_progress" as const,
    assignedTo: "Mitarbeiter A",
    formData: {
      disputeType: "Arbeitsrecht",
      description: "Kündigung angefochten",
      startDate: "2026-04-01",
    },
    notes: [
      { id: 1, author: "Mitarbeiter A", date: "2026-03-17 15:00", content: "Beratungsgespräch vereinbart." },
    ],
  },
  {
    id: "L-007",
    date: "2026-03-17",
    type: "kfz",
    name: "Horváth Gábor",
    email: "horvath.g@email.com",
    phone: "+49 176 7890123",
    priority: "low" as const,
    status: "success" as const,
    assignedTo: "Mitarbeiter B",
    formData: {
      vehicleType: "Motorrad",
      manufacturer: "Honda",
      model: "CB650R",
      firstRegistration: "2023-05-20",
      coverageType: "Teilkasko",
      mileage: "8000",
      usage: "Privat",
    },
    notes: [
      { id: 1, author: "Mitarbeiter B", date: "2026-03-16 10:00", content: "Vertrag abgeschlossen." },
    ],
  },
  {
    id: "L-008",
    date: "2026-03-16",
    type: "household",
    name: "Varga Katalin",
    email: "varga.k@email.com",
    phone: "+49 177 8901234",
    priority: "medium" as const,
    status: "open" as const,
    assignedTo: "",
    formData: {
      livingSpace: "90 m²",
      floor: "EG",
      buildingType: "Einfamilienhaus",
      startDate: "2026-05-01",
    },
    notes: [],
  },
  {
    id: "L-009",
    date: "2026-03-16",
    type: "kfz",
    name: "Fekete András",
    email: "fekete.a@email.com",
    phone: "+49 178 9012345",
    priority: "high" as const,
    status: "success" as const,
    assignedTo: "Admin",
    formData: {
      vehicleType: "Pkw",
      manufacturer: "VW",
      model: "Golf 8",
      firstRegistration: "2025-01-15",
      coverageType: "Vollkasko",
      mileage: "12000",
      usage: "Arbeitsweg",
    },
    notes: [
      { id: 1, author: "Admin", date: "2026-03-15 09:00", content: "Vertrag abgeschlossen. Kunde sehr zufrieden." },
    ],
  },
  {
    id: "L-010",
    date: "2026-03-15",
    type: "liability",
    name: "Balogh Zsófia",
    email: "balogh.zs@email.com",
    phone: "+49 179 0123456",
    priority: "urgent" as const,
    status: "in_progress" as const,
    assignedTo: "Mitarbeiter A",
    formData: {
      coverageType: "Familienhaftpflicht",
      numberOfPersons: "4",
      startDate: "2026-03-20",
    },
    notes: [
      { id: 1, author: "Mitarbeiter A", date: "2026-03-15 12:00", content: "Dringend: Kundin braucht Schutz ab sofort." },
    ],
  },
  {
    id: "L-011",
    date: "2026-03-15",
    type: "health",
    name: "Papp Tamás",
    email: "papp.t@email.com",
    phone: "+49 170 1122334",
    priority: "low" as const,
    status: "failed" as const,
    assignedTo: "Mitarbeiter B",
    formData: {
      insuranceType: "Brillenversicherung",
      currentInsurer: "TK",
      startDate: "2026-05-01",
    },
    notes: [
      { id: 1, author: "Mitarbeiter B", date: "2026-03-14 16:00", content: "Kunde nicht erreichbar. Mehrere Versuche." },
    ],
  },
  {
    id: "L-012",
    date: "2026-03-14",
    type: "kfz",
    name: "Lakatos Dóra",
    email: "lakatos.d@email.com",
    phone: "+49 171 2233445",
    priority: "medium" as const,
    status: "open" as const,
    assignedTo: "",
    formData: {
      vehicleType: "Pkw",
      manufacturer: "Opel",
      model: "Corsa",
      firstRegistration: "2021-09-01",
      coverageType: "Haftpflicht",
      mileage: "10000",
      usage: "Privat",
    },
    notes: [],
  },
  {
    id: "L-013",
    date: "2026-03-14",
    type: "legal",
    name: "Szilágyi Béla",
    email: "szilagyi.b@email.com",
    phone: "+49 172 3344556",
    priority: "high" as const,
    status: "in_progress" as const,
    assignedTo: "Admin",
    formData: {
      disputeType: "Verkehrsrecht",
      description: "Bußgeldbescheid anfechten",
      startDate: "2026-03-25",
    },
    notes: [
      { id: 1, author: "Admin", date: "2026-03-14 10:00", content: "Unterlagen angefordert." },
    ],
  },
  {
    id: "L-014",
    date: "2026-03-13",
    type: "household",
    name: "Németh Ildikó",
    email: "nemeth.i@email.com",
    phone: "+49 173 4455667",
    priority: "low" as const,
    status: "success" as const,
    assignedTo: "Mitarbeiter A",
    formData: {
      livingSpace: "60 m²",
      floor: "2. OG",
      buildingType: "Mehrfamilienhaus",
      startDate: "2026-03-15",
    },
    notes: [
      { id: 1, author: "Mitarbeiter A", date: "2026-03-13 14:00", content: "Vertrag unterschrieben." },
    ],
  },
  {
    id: "L-015",
    date: "2026-03-13",
    type: "kfz",
    name: "Farkas Zoltán",
    email: "farkas.z@email.com",
    phone: "+49 174 5566778",
    priority: "medium" as const,
    status: "open" as const,
    assignedTo: "",
    formData: {
      vehicleType: "Lkw",
      manufacturer: "Mercedes",
      model: "Sprinter",
      firstRegistration: "2020-03-01",
      coverageType: "Haftpflicht",
      mileage: "40000",
      usage: "Gewerblich",
    },
    notes: [],
  },
  {
    id: "L-016",
    date: "2026-03-12",
    type: "liability",
    name: "Juhász Réka",
    email: "juhasz.r@email.com",
    phone: "+49 175 6677889",
    priority: "medium" as const,
    status: "in_progress" as const,
    assignedTo: "Mitarbeiter B",
    formData: {
      coverageType: "Privathaftpflicht",
      numberOfPersons: "1",
      startDate: "2026-04-15",
    },
    notes: [
      { id: 1, author: "Mitarbeiter B", date: "2026-03-12 11:00", content: "Angebot erstellt." },
    ],
  },
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

const statusDotColors: Record<string, string> = {
  open: "bg-warning-500",
  in_progress: "bg-accent-500",
  success: "bg-success-500",
  failed: "bg-danger-500",
};

const teamMembers = ["Admin", "Mitarbeiter A", "Mitarbeiter B", "Mitarbeiter C"];

export default function LeadsPage() {
  const t = useTranslations("admin");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const [leads, setLeads] = useState(mockLeads);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    if (filterStatus !== "all" && lead.status !== filterStatus) return false;
    if (filterType !== "all" && lead.type !== filterType) return false;
    if (filterPriority !== "all" && lead.priority !== filterPriority) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = (leadId: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const handlePriorityChange = (leadId: string, newPriority: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, priority: newPriority } : l))
    );
  };

  const handleAssignChange = (leadId: string, assignee: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, assignedTo: assignee } : l))
    );
  };

  const handleAddNote = (leadId: string) => {
    if (!newNote.trim()) return;
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId) return l;
        return {
          ...l,
          notes: [
            ...l.notes,
            {
              id: l.notes.length + 1,
              author: "Admin",
              date: new Date().toISOString().slice(0, 16).replace("T", " "),
              content: newNote.trim(),
            },
          ],
        };
      })
    );
    setNewNote("");
  };

  const expandedLead = leads.find((l) => l.id === expandedLeadId);

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
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{t("leads")}</h1>
          <p className="text-gray-500 mt-1">{t("totalLeads")}: {leads.length}</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={`${tc("search")}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">{t("status")}: Alle</option>
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
              <option value="all">{t("type")}: Alle</option>
              <option value="kfz">Kfz</option>
              <option value="liability">Haftpflicht</option>
              <option value="household">Hausrat</option>
              <option value="health">Kranken</option>
              <option value="legal">Rechtsschutz</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">{t("priority")}: Alle</option>
              <option value="low">{t("low")}</option>
              <option value="medium">{t("medium")}</option>
              <option value="high">{t("high")}</option>
              <option value="urgent">{t("urgent")}</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Leads Table */}
          <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${expandedLeadId ? "flex-1" : "w-full"}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("createdAt")}</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("type")}</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{tc("name")}</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{tc("email")}</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("priority")}</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("status")}</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("assignTo")}</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${expandedLeadId === lead.id ? "bg-primary-50" : ""}`}
                      onClick={() => setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id)}
                    >
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs whitespace-nowrap">{lead.id}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="capitalize font-medium text-gray-800">{lead.type}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{lead.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-500">{lead.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[lead.priority]}`}>
                          {t(lead.priority)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDotColors[lead.status]}`}></span>
                          {lead.status === "in_progress" ? t("inProgress") : t(lead.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-500 text-xs">
                        {lead.assignedTo || "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {expandedLeadId === lead.id ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredLeads.length === 0 && (
              <div className="text-center py-12 text-gray-400">Keine Ergebnisse</div>
            )}
          </div>

          {/* Detail Panel */}
          {expandedLead && (
            <div className="w-full lg:w-[480px] shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto max-h-[calc(100vh-12rem)]">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{expandedLead.name}</h3>
                  <p className="text-sm text-gray-500">{expandedLead.id} &middot; {expandedLead.email}</p>
                  {expandedLead.phone && (
                    <p className="text-sm text-gray-500">{expandedLead.phone}</p>
                  )}
                </div>
                <button
                  onClick={() => setExpandedLeadId(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status & Priority Controls */}
              <div className="p-6 border-b border-gray-100 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">{t("status")}</label>
                    <select
                      value={expandedLead.status}
                      onChange={(e) => handleStatusChange(expandedLead.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="open">{t("open")}</option>
                      <option value="in_progress">{t("inProgress")}</option>
                      <option value="success">{t("success")}</option>
                      <option value="failed">{t("failed")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">{t("priority")}</label>
                    <select
                      value={expandedLead.priority}
                      onChange={(e) => handlePriorityChange(expandedLead.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="low">{t("low")}</option>
                      <option value="medium">{t("medium")}</option>
                      <option value="high">{t("high")}</option>
                      <option value="urgent">{t("urgent")}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">{t("assignTo")}</label>
                  <select
                    value={expandedLead.assignedTo}
                    onChange={(e) => handleAssignChange(expandedLead.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">-- {t("assignTo")} --</option>
                    {teamMembers.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Form Data */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">Formulardaten</h4>
                <div className="space-y-2">
                  {Object.entries(expandedLead.formData).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span className="text-gray-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3">
                  Notizen ({expandedLead.notes.length})
                </h4>
                <div className="space-y-3 mb-4">
                  {expandedLead.notes.length === 0 && (
                    <p className="text-sm text-gray-400">Keine Notizen vorhanden.</p>
                  )}
                  {expandedLead.notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700">{note.author}</span>
                        <span className="text-xs text-gray-400">{note.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{note.content}</p>
                    </div>
                  ))}
                </div>

                {/* Add Note */}
                <div className="space-y-2">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder={`${t("addNote")}...`}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                  <button
                    onClick={() => handleAddNote(expandedLead.id)}
                    disabled={!newNote.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    {t("addNote")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
