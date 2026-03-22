"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  Lock,
  ExternalLink,
} from "lucide-react";

const insuranceLinks = [
  { key: "kfz", href: "/products" },
  { key: "liability", href: "/products" },
  { key: "household", href: "/products" },
  { key: "legal", href: "/products" },
  { key: "dental", href: "/products" },
  { key: "life", href: "/products" },
  { key: "accident", href: "/products" },
  { key: "disability", href: "/products" },
] as const;

const serviceLinks = [
  { key: "cancel", href: "/products" },
  { key: "mandate", href: "/products" },
  { key: "evb", href: "/evb" },
  { key: "claimReport", href: "/claims" },
  { key: "sepa", href: "/sepa" },
  { key: "contractChange", href: "/portal" },
] as const;

const quickLinks = [
  { tKey: "calculator", href: "/calculator" },
  { tKey: "products", href: "/products" },
  { tKey: "contact", href: "/contact" },
  { tKey: "about", href: "/about" },
  { tKey: "portal", href: "/portal" },
] as const;

const legalLinks = [
  { tKey: "privacy", href: "/privacy" },
  { tKey: "imprint", href: "/imprint" },
  { tKey: "terms", href: "/terms" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "hu";

  const localePath = (path: string) => `/${currentLocale}${path}`;

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-white leading-tight">
                {tc("brandFull")}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              {t("about")}
            </p>
            {/* Contact info inline for brand column */}
            <div className="space-y-3 text-sm">
              <a
                href="tel:+490123456789"
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-accent-500 flex-shrink-0" />
                <span>+49 (0) 123 456 789</span>
              </a>
              <a
                href="mailto:info@nb24.de"
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-accent-500 flex-shrink-0" />
                <span>info@nb24.de</span>
              </a>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                <span>
                  Musterstraße 1
                  <br />
                  12345 Berlin
                </span>
              </div>
            </div>
          </div>

          {/* Insurance Products Column */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("insuranceProducts")}
            </h3>
            <ul className="space-y-2 text-sm">
              {insuranceLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={localePath(href)}
                    className="hover:text-white transition-colors"
                  >
                    {tn(`insurance.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("services")}
            </h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={localePath(href)}
                    className="hover:text-white transition-colors"
                  >
                    {tn(`service.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(({ tKey, href }) => (
                <li key={tKey}>
                  <Link
                    href={localePath(href)}
                    className="hover:text-white transition-colors"
                  >
                    {tc(tKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("legal")}
            </h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map(({ tKey, href }) => (
                <li key={tKey}>
                  <Link
                    href={localePath(href)}
                    className="hover:text-white transition-colors"
                  >
                    {t(tKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-gray-500">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <p>{t("copyright")}</p>
              <span className="hidden sm:inline text-gray-700">|</span>
              <p>{t("regulated")}</p>
              <span className="hidden sm:inline text-gray-700">|</span>
              <p>{t("languages")}</p>
            </div>
            <Link
              href={localePath("/auth/admin-login")}
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-400 transition-colors w-fit"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
