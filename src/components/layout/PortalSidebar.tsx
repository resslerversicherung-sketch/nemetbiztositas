"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Gauge, AlertTriangle, FolderOpen, MessageCircle, User, Shield } from "lucide-react";

export default function PortalSidebar() {
  const t = useTranslations("portal");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";
  const basePath = `/${locale}/portal`;

  const links = [
    { href: basePath, label: t("dashboard"), icon: LayoutDashboard },
    { href: `${basePath}/contracts`, label: t("contracts"), icon: FileText },
    { href: `${basePath}/mileage`, label: t("mileage"), icon: Gauge },
    { href: `${basePath}/claims`, label: t("claims"), icon: AlertTriangle },
    { href: `${basePath}/documents`, label: t("documents"), icon: FolderOpen },
    { href: `${basePath}/chat`, label: t("chat"), icon: MessageCircle },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen flex-shrink-0 hidden lg:block">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-primary-600">{t("title")}</div>
          </div>
        </div>
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
