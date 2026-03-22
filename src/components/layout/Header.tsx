"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronDown, Globe, Shield, Car, Scale, Heart,
  Home, Umbrella, Dog, Building2, Landmark, PiggyBank,
  Calculator, FileText, Pen, ClipboardList, Phone, CalendarDays,
  AlertTriangle, Users, Handshake, CreditCard, Bike, Skull,
  BriefcaseMedical, HardHat, Building, Key, Banknote, BadgeCheck,
} from "lucide-react";

const localeConfig: Record<string, { flag: string; name: string; brand: string; brandFull: string }> = {
  de: { flag: "🇩🇪", name: "Deutsch", brand: "Vroni", brandFull: "Versicherung mit Vroni" },
  hu: { flag: "🇭🇺", name: "Magyar", brand: "NB24", brandFull: "német biztosítás 24" },
  ro: { flag: "🇷🇴", name: "Română", brand: "AG24", brandFull: "Asigurare Germania 24" },
};

type InsuranceItem = {
  key: string;
  icon: React.ElementType;
  href: string;
  star?: boolean;
};

const insuranceProducts: InsuranceItem[] = [
  { key: "kfz", icon: Car, href: "/products/kfz", star: true },
  { key: "roller", icon: Bike, href: "/products/roller" },
  { key: "legal", icon: Scale, href: "/products/legal" },
  { key: "dental", icon: Heart, href: "/products/dental" },
  { key: "life", icon: Skull, href: "/products/life" },
  { key: "funeral", icon: Landmark, href: "/products/funeral" },
  { key: "accident", icon: BriefcaseMedical, href: "/products/accident" },
  { key: "disability", icon: HardHat, href: "/products/disability" },
  { key: "liability", icon: Shield, href: "/products/liability" },
  { key: "companyLiability", icon: Building2, href: "/products/company-liability" },
  { key: "household", icon: Home, href: "/products/household" },
  { key: "building", icon: Building, href: "/products/building" },
  { key: "deposit", icon: Key, href: "/products/deposit" },
  { key: "dog", icon: Dog, href: "/products/dog" },
  { key: "financing", icon: Banknote, href: "/products/financing" },
  { key: "companyPension", icon: PiggyBank, href: "/products/company-pension" },
  { key: "riester", icon: Umbrella, href: "/products/riester" },
  { key: "privatePension", icon: BadgeCheck, href: "/products/private-pension" },
];

type ServiceItem = {
  key: string;
  icon: React.ElementType;
  href: string;
};

const serviceItems: ServiceItem[] = [
  { key: "cancel", icon: FileText, href: "/services/cancel" },
  { key: "mandate", icon: Pen, href: "/services/mandate" },
  { key: "mabisz", icon: ClipboardList, href: "/services/mabisz" },
  { key: "vehicleData", icon: Car, href: "/services/vehicle-data" },
  { key: "evb", icon: BadgeCheck, href: "/evb" },
  { key: "registration", icon: Landmark, href: "/services/registration" },
  { key: "claimReport", icon: AlertTriangle, href: "/claims" },
  { key: "expert", icon: Users, href: "/services/expert" },
  { key: "lawyer", icon: Handshake, href: "/services/lawyer" },
  { key: "contractChange", icon: ClipboardList, href: "/services/contract-change" },
  { key: "sepa", icon: CreditCard, href: "/sepa" },
];

export default function Header() {
  const t = useTranslations("common");
  const tn = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentLocale = pathname.split("/")[1] || "de";
  const config = localeConfig[currentLocale] || localeConfig.de;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-sm"}`}>
      {/* Top bar */}
      <div className="bg-primary-500 text-white text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              +49 (0) 123 456 789
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              info@versicherung-vroni.de
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>🇩🇪 DE</span>
            <span>|</span>
            <span>🇭🇺 HU</span>
            <span>|</span>
            <span>🇷🇴 RO</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-primary-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-heading font-bold text-primary-500 leading-tight">
                {config.brandFull}
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
                {tn("independentBroker")}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Home */}
            <Link
              href={`/${currentLocale}`}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`
                  ? "text-primary-500"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              {t("home")}
            </Link>

            {/* Versicherungen Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("insurance")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-primary-500 transition-colors">
                {t("products")}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "insurance" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "insurance" && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[700px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 dropdown-enter">
                  <div className="grid grid-cols-3 gap-1">
                    {insuranceProducts.map(({ key, icon: Icon, href, star }) => (
                      <Link
                        key={key}
                        href={`/${currentLocale}${href}`}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-primary-50 transition-colors group ${star ? "col-span-3 bg-primary-50 border border-primary-100 mb-2" : ""}`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <Icon className={`w-4 h-4 ${star ? "text-accent-500" : "text-primary-400"} group-hover:text-primary-500`} />
                        <span className={`font-medium ${star ? "text-primary-600 font-bold" : "text-gray-700"} group-hover:text-primary-600`}>
                          {tn(`insurance.${key}`)}
                        </span>
                        {star && <span className="ml-auto text-xs bg-accent-500 text-white px-2 py-0.5 rounded-full">TOP</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Kalkulatoren */}
            <Link
              href={`/${currentLocale}/calculator`}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname.includes("/calculator")
                  ? "text-primary-500"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              {t("calculator")}
            </Link>

            {/* Service Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("service")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-primary-500 transition-colors">
                {tn("service")}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "service" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "service" && (
                <div className="absolute right-0 top-full mt-1 w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 dropdown-enter">
                  <div className="space-y-0.5">
                    {serviceItems.map(({ key, icon: Icon, href }) => (
                      <Link
                        key={key}
                        href={`/${currentLocale}${href}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-primary-50 transition-colors group"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <Icon className="w-4 h-4 text-primary-400 group-hover:text-primary-500" />
                        <span className="font-medium text-gray-700 group-hover:text-primary-600">
                          {tn(`service.${key}`)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Kontakt */}
            <Link
              href={`/${currentLocale}/contact`}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname.includes("/contact")
                  ? "text-primary-500"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setActiveDropdown(null); }}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200"
              >
                <span className="text-base">{config.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border py-1 z-50 dropdown-enter">
                  {Object.entries(localeConfig).map(([locale, cfg]) => (
                    <Link
                      key={locale}
                      href={switchLocale(locale)}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-primary-50 ${
                        currentLocale === locale ? "bg-primary-50 text-primary-600" : "text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{cfg.flag}</span>
                      <div>
                        <div className="font-medium">{cfg.name}</div>
                        <div className="text-xs text-gray-400">{cfg.brandFull}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href={`/${currentLocale}/calculator`}
              className="hidden sm:inline-flex btn-primary text-sm !py-2.5 !px-5"
            >
              {tn("getQuote")}
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
          <div className="lg:hidden py-4 border-t animate-fade-in max-h-[80vh] overflow-y-auto">
            <Link href={`/${currentLocale}`} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
              {t("home")}
            </Link>

            {/* Mobile Insurance */}
            <div className="px-4 py-2">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t("products")}</div>
              {insuranceProducts.slice(0, 8).map(({ key, icon: Icon, href }) => (
                <Link
                  key={key}
                  href={`/${currentLocale}${href}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-gray-700 hover:bg-primary-50"
                >
                  <Icon className="w-4 h-4 text-primary-400" />
                  {tn(`insurance.${key}`)}
                </Link>
              ))}
              <Link href={`/${currentLocale}/products`} onClick={() => setMobileOpen(false)} className="block px-2 py-2 text-sm text-primary-500 font-medium">
                {tn("allProducts")} →
              </Link>
            </div>

            <Link href={`/${currentLocale}/calculator`} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
              {t("calculator")}
            </Link>

            {/* Mobile Service */}
            <div className="px-4 py-2">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{tn("service")}</div>
              {serviceItems.slice(0, 6).map(({ key, icon: Icon, href }) => (
                <Link
                  key={key}
                  href={`/${currentLocale}${href}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-gray-700 hover:bg-primary-50"
                >
                  <Icon className="w-4 h-4 text-primary-400" />
                  {tn(`service.${key}`)}
                </Link>
              ))}
            </div>

            <Link href={`/${currentLocale}/contact`} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
              {t("contact")}
            </Link>

            <div className="px-4 pt-3">
              <Link
                href={`/${currentLocale}/calculator`}
                onClick={() => setMobileOpen(false)}
                className="block text-center btn-primary text-sm"
              >
                {tn("getQuote")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
