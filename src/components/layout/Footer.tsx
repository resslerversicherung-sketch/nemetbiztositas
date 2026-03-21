"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "hu";

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">{tc("brandShort")}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{t("about")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${currentLocale}/products`} className="hover:text-white transition-colors">{tc("products")}</Link></li>
              <li><Link href={`/${currentLocale}/calculator`} className="hover:text-white transition-colors">{tc("calculator")}</Link></li>
              <li><Link href={`/${currentLocale}/evb`} className="hover:text-white transition-colors">{tc("evb")}</Link></li>
              <li><Link href={`/${currentLocale}/sepa`} className="hover:text-white transition-colors">{tc("sepa")}</Link></li>
              <li><Link href={`/${currentLocale}/claims`} className="hover:text-white transition-colors">{tc("claims")}</Link></li>
              <li><Link href={`/${currentLocale}/portal`} className="hover:text-white transition-colors">{tc("portal")}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${currentLocale}/about`} className="hover:text-white transition-colors">{tc("about")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("privacy")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("imprint")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("terms")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("contact")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent-500" />
                <span>+49 (0) 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent-500" />
                <span>info@nb24.de</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-accent-500 mt-0.5" />
                <span>Musterstraße 1<br />12345 Berlin</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
