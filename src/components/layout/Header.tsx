"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown, Globe, Shield } from "lucide-react";

const localeConfig: Record<string, { flag: string; name: string; brand: string }> = {
  hu: { flag: "🇭🇺", name: "Magyar", brand: "NB24" },
  de: { flag: "🇩🇪", name: "Deutsch", brand: "CV24" },
  ro: { flag: "🇷🇴", name: "Română", brand: "AG24" },
};

export default function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLocale = pathname.split("/")[1] || "hu";
  const config = localeConfig[currentLocale] || localeConfig.hu;

  const switchLocale = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const navLinks = [
    { href: `/${currentLocale}`, label: t("home") },
    { href: `/${currentLocale}/products`, label: t("products") },
    { href: `/${currentLocale}/calculator`, label: t("calculator") },
    { href: `/${currentLocale}/evb`, label: t("evb") },
    { href: `/${currentLocale}/sepa`, label: t("sepa") },
    { href: `/${currentLocale}/claims`, label: t("claims") },
    { href: `/${currentLocale}/contact`, label: t("contact") },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-primary-600">{config.brand}</span>
              <span className="hidden sm:inline text-xs text-gray-500 ml-2">{t("brandFull")}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <Globe className="w-4 h-4" />
                <span>{config.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                  {Object.entries(localeConfig).map(([locale, cfg]) => (
                    <Link
                      key={locale}
                      href={switchLocale(locale)}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-50 ${
                        currentLocale === locale ? "bg-primary-50 text-primary-600" : "text-gray-700"
                      }`}
                    >
                      <span>{cfg.flag}</span>
                      <span>{cfg.name}</span>
                      <span className="text-gray-400 text-xs ml-auto">{cfg.brand}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Portal / Login */}
            <Link
              href={`/${currentLocale}/portal`}
              className="hidden sm:inline-flex btn-primary text-sm !py-2 !px-4"
            >
              {t("portal")}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${currentLocale}/portal`}
              onClick={() => setMobileOpen(false)}
              className="block mt-2 text-center btn-primary text-sm"
            >
              {t("portal")}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
