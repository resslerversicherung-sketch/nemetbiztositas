"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  Shield,
  Home,
  Scale,
  Heart,
  ArrowRight,
  CheckCircle,
  Calculator,
} from "lucide-react";

const insuranceProducts = [
  {
    key: "kfz",
    icon: Car,
    color: "from-blue-500 to-blue-700",
    lightBg: "bg-blue-50",
    lightBorder: "border-blue-100",
    accentText: "text-blue-600",
    href: "/calculator",
    features: [
      "Haftpflicht (Kotelező felelősségbiztosítás)",
      "Teilkasko (Részkasko)",
      "Vollkasko (Teljes kasko)",
      "eVB szám igénylés",
      "SF-osztály átvétel",
      "Online kárbejelentés",
    ],
  },
  {
    key: "liability",
    icon: Shield,
    color: "from-green-500 to-green-700",
    lightBg: "bg-green-50",
    lightBorder: "border-green-100",
    accentText: "text-green-600",
    href: "/contact",
    features: [
      "Személyi sérülés fedezet",
      "Dologi kár fedezet",
      "Bérelt lakás kár",
      "Kulcsvesztés fedezet",
      "Világszerte érvényes",
      "Családtagokra is kiterjed",
    ],
  },
  {
    key: "household",
    icon: Home,
    color: "from-orange-500 to-orange-700",
    lightBg: "bg-orange-50",
    lightBorder: "border-orange-100",
    accentText: "text-orange-600",
    href: "/contact",
    features: [
      "Tűzkár védelem",
      "Betörésvédelem",
      "Vízkár fedezet",
      "Vihar és jégkár",
      "Elektronikai eszközök",
      "Kerékpár védelem",
    ],
  },
  {
    key: "legal",
    icon: Scale,
    color: "from-purple-500 to-purple-700",
    lightBg: "bg-purple-50",
    lightBorder: "border-purple-100",
    accentText: "text-purple-600",
    href: "/contact",
    features: [
      "Munkaügyi jogvédelem",
      "Közlekedési jogvédelem",
      "Magánjogi védelem",
      "Büntetőjogi védelem",
      "Ügyvédi költségek fedezése",
      "Bírósági költségek fedezése",
    ],
  },
  {
    key: "health",
    icon: Heart,
    color: "from-red-500 to-red-700",
    lightBg: "bg-red-50",
    lightBorder: "border-red-100",
    accentText: "text-red-600",
    href: "/contact",
    features: [
      "Fogászati kiegészítő",
      "Szemészeti fedezet",
      "Természetgyógyászat",
      "Egyágyas kórházi szoba",
      "Főorvosi ellátás",
      "Külföldi betegellátás",
    ],
  },
] as const;

export default function ProductsPage() {
  const t = useTranslations("products");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative gradient-bg overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight animate-slide-up">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,38 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== PRODUCTS DETAIL SECTION ===== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {insuranceProducts.map((product, index) => {
              const Icon = product.icon;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={product.key}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`flex flex-col ${
                      isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                    } gap-10 lg:gap-16 items-center`}
                  >
                    {/* Left/Right - Visual card */}
                    <div className="w-full lg:w-5/12">
                      <div className={`relative rounded-3xl ${product.lightBg} ${product.lightBorder} border p-10 sm:p-12`}>
                        {/* Decorative background */}
                        <div className={`absolute top-4 right-4 w-32 h-32 bg-gradient-to-br ${product.color} opacity-10 rounded-full blur-2xl`} />

                        <div className="relative text-center">
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mx-auto mb-6 shadow-lg animate-float`}>
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {t(`${product.key}.title`)}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {t(`${product.key}.description`)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right/Left - Features & CTA */}
                    <div className="w-full lg:w-7/12">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 lg:hidden">
                        {t(`${product.key}.title`)}
                      </h3>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 group">
                            <CheckCircle className={`w-5 h-5 ${product.accentText} mt-0.5 flex-shrink-0`} />
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/${locale}${product.href}`}
                        className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r ${product.color} text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group`}
                      >
                        {product.key === "kfz" && <Calculator className="w-5 h-5" />}
                        {t(`${product.key}.cta`)}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Divider between products (except last) */}
                  {index < insuranceProducts.length - 1 && (
                    <div className="mt-16 lg:mt-24 border-t border-gray-100" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <h2 className="section-title mb-4">{tc("contact")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/calculator`}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                {tc("calculator")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="btn-secondary text-lg px-8 py-4 flex items-center gap-2 border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
              >
                {tc("contact")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
