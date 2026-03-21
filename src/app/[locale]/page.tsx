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
  Phone,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  Calculator,
  Users,
  Star,
} from "lucide-react";

const products = [
  { key: "kfz", icon: Car, color: "from-blue-500 to-blue-700", href: "/calculator" },
  { key: "liability", icon: Shield, color: "from-green-500 to-green-700", href: "/products" },
  { key: "household", icon: Home, color: "from-orange-500 to-orange-700", href: "/products" },
  { key: "legal", icon: Scale, color: "from-purple-500 to-purple-700", href: "/products" },
  { key: "health", icon: Heart, color: "from-red-500 to-red-700", href: "/products" },
] as const;

const trustBadges = [
  { icon: Zap, key: "trust1" },
  { icon: Globe, key: "trust2" },
  { icon: CheckCircle, key: "trust3" },
] as const;

export default function HomePage() {
  const t = useTranslations("hero");
  const tp = useTranslations("products");
  const tc = useTranslations("common");
  const ta = useTranslations("about");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative gradient-bg overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight animate-slide-up">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link
                href={`/${locale}/calculator`}
                className="btn-primary text-lg px-8 py-4 shadow-xl shadow-primary-900/30 hover:shadow-2xl hover:shadow-primary-900/40 transition-all duration-300 flex items-center gap-2 group"
              >
                <Calculator className="w-5 h-5" />
                {t("cta")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${locale}/products`}
                className="btn-secondary text-lg px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
              >
                {t("ctaSecondary")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {trustBadges.map(({ icon: Icon, key }) => (
              <div key={key} className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== PRODUCTS GRID SECTION ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">{tp("title")}</h2>
            <p className="section-subtitle">{tp("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map(({ key, icon: Icon, color, href }, index) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                className="card-hover group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {tp(`${key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {tp(`${key}.description`)}
                </p>

                {/* CTA */}
                <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                  <span>{tp(`${key}.cta`)}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Hover accent bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MINI KFZ CALCULATOR CTA ===== */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden gradient-bg p-10 sm:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl" />

            <div className="relative flex flex-col lg:flex-row items-center gap-10">
              {/* Left side */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/90 mb-6">
                  <Car className="w-4 h-4" />
                  <span>Kfz-Versicherung</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {tp("kfz.title")}
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed max-w-xl">
                  {tp("kfz.description")}
                </p>
              </div>

              {/* Right side - CTA card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center min-w-[280px]">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <p className="text-white/80 text-sm mb-6">
                  {t("subtitle")}
                </p>
                <Link
                  href={`/${locale}/calculator`}
                  className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg group"
                >
                  <Calculator className="w-5 h-5" />
                  {t("cta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY US / TESTIMONIALS SECTION ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">{ta("whyUs")}</h2>
            <p className="section-subtitle">{ta("missionText")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Reason 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-primary-50 to-white border border-primary-100 card-hover animate-slide-up">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{ta("reason1")}</h3>
              <p className="text-gray-600 leading-relaxed">{ta("reason1Text")}</p>
            </div>

            {/* Reason 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-accent-50 to-white border border-accent-100 card-hover animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 rounded-2xl bg-accent-100 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{ta("reason2")}</h3>
              <p className="text-gray-600 leading-relaxed">{ta("reason2Text")}</p>
            </div>

            {/* Reason 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-green-50 to-white border border-green-100 card-hover animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{ta("reason3")}</h3>
              <p className="text-gray-600 leading-relaxed">{ta("reason3Text")}</p>
            </div>
          </div>

          {/* Testimonial-style stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "5000+", label: "Ügyfél" },
              { value: "98%", label: "Elégedettség" },
              { value: "24h", label: "Válaszidő" },
              { value: "3", label: "Nyelv" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-xl bg-gray-50 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent-500 fill-accent-500" />
                  ))}
                </div>
                <div className="text-3xl font-extrabold text-primary-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA SECTION ===== */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-8 animate-float">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h2 className="section-title">{tc("contact")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              {ta("missionText")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {tc("contact")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+49123456789"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold text-lg hover:text-primary-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                +49 (0) 123 456 789
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
