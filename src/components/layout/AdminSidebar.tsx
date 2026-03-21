"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BarChart3, FolderOpen, Settings, Shield, Inbox } from "lucide-react";

export default function AdminSidebar() {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";
  const basePath = `/${locale}/admin`;

  const links = [
    { href: basePath, label: t("dashboard"), icon: LayoutDashboard },
    { href: `${basePath}/leads`, label: t("leads"), icon: Inbox },
    { href: `${basePath}/customers`, label: t("customers"), icon: Users },
    { href: `${basePath}/analytics`, label: t("analytics"), icon: BarChart3 },
    { href: `${basePath}/documents`, label: t("documents"), icon: FolderOpen },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex-shrink-0 hidden lg:block">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-white">CRM Admin</div>
            <div className="text-xs text-gray-400">{t("title")}</div>
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
                    ? "bg-gray-800 text-accent-400"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
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
