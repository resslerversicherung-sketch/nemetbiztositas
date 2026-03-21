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

interface Message {
  id: number;
  sender: "user" | "agent";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, sender: "agent", text: "Üdvözöljük! Miben segíthetek Önnek ma?", time: "10:00" },
  { id: 2, sender: "user", text: "Szeretném módosítani a Kfz biztosításom fedezeti körét.", time: "10:02" },
  { id: 3, sender: "agent", text: "Természetesen, szívesen segítek! Melyik szerződésről van szó? Kérem adja meg a szerződésszámot.", time: "10:03" },
  { id: 4, sender: "user", text: "NB24-KFZ-2024-001", time: "10:05" },
  { id: 5, sender: "agent", text: "Köszönöm! Megtaláltam a szerződést (Volkswagen Golf VII). Milyen módosítást szeretne? Jelenleg Haftpflicht fedezete van.", time: "10:06" },
];

export default function ChatPage() {
  const t = useTranslations("portal");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = {
      id: messages.length + 1,
      sender: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate agent response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "agent",
          text: "Köszönöm az üzenetet! Kollégánk hamarosan válaszol Önnek.",
          time: new Date().toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1500);
  };

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

      <main className="flex-1 p-4 lg:p-8 flex flex-col">
        <div className="lg:hidden mb-4 overflow-x-auto">
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
          <span className="text-gray-700">{t("chat")}</span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{t("chat")}</h1>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[500px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.sender === "user" ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-primary-200" : "text-gray-400"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-gray-100 p-4 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Üzenet írása..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button type="submit" disabled={!input.trim()} className="btn-primary px-4 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
