"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
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
  HeartPulse,
  AlertTriangle,
  Briefcase,
  ShieldCheck,
  FileCheck,
  Clock,
  ThumbsUp,
  MessageCircle,
  BadgeCheck,
} from "lucide-react";

const products = [
  { key: "kfz", icon: Car, color: "from-blue-500 to-blue-700", href: "/calculator" },
  { key: "liability", icon: Shield, color: "from-green-500 to-green-700", href: "/products" },
  { key: "household", icon: Home, color: "from-orange-500 to-orange-700", href: "/products" },
  { key: "legal", icon: Scale, color: "from-purple-500 to-purple-700", href: "/products" },
  { key: "health", icon: Heart, color: "from-red-500 to-red-700", href: "/products" },
  { key: "life", icon: HeartPulse, color: "from-pink-500 to-pink-700", href: "/products" },
  { key: "accident", icon: AlertTriangle, color: "from-amber-500 to-amber-700", href: "/products" },
  { key: "disability", icon: Briefcase, color: "from-indigo-500 to-indigo-700", href: "/products" },
] as const;

const trustBadges = [
  { icon: Zap, key: "trust1" },
  { icon: Globe, key: "trust2" },
  { icon: CheckCircle, key: "trust3" },
  { icon: BadgeCheck, key: "trust4" },
] as const;

function TypingEffect({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const fullText = texts[currentIndex] || "";

    if (!isDeleting) {
      setDisplayText(fullText.substring(0, displayText.length + 1));
      if (displayText.length === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      setDisplayText(fullText.substring(0, displayText.length - 1));
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        return;
      }
    }
  }, [currentIndex, displayText, isDeleting, texts]);

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className="inline-block min-w-[1ch]">
      {displayText}
      <span className="inline-block w-[3px] h-[1em] bg-white ml-1 animate-pulse align-middle" />
    </span>
  );
}

export default function HomePage() {
  const t = useTranslations("hero");
  const tp = useTranslations("products");
  const tc = useTranslations("common");
  const ta = useTranslations("about");
  const tr = useTranslations("reviews");
  const ti = useTranslations("insurers");
  const tk = useTranslations("kfzDetail");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "de";

  const typingTexts = t("typingTexts").split("|");
  const insurerList = ti("list");

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative gradient-bg overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full" />
          <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-float" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-white/15 rounded-full animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center max-w-4xl mx-auto">
            {/* Typing animation headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight animate-slide-up">
              {t("title")}
            </h1>
            <div
              className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-accent-400 h-[1.4em] animate-slide-up"
              style={{ animationDelay: "0.05s" }}
            >
              <TypingEffect texts={typingTexts} />
            </div>
            <p
              className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Link
                href={`/${locale}/calculator`}
                className="btn-primary text-lg px-8 py-4 shadow-xl shadow-accent-900/30 hover:shadow-2xl hover:shadow-accent-900/40 transition-all duration-300 flex items-center gap-2 group"
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

            {/* No Spam text */}
            <p
              className="mt-4 text-sm text-blue-200/70 animate-slide-up"
              style={{ animationDelay: "0.25s" }}
            >
              {t("noSpam")}
            </p>
          </div>

          {/* Trust Badges */}
          <div
            className="mt-16 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-12 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            {trustBadges.map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="flex items-center gap-3 text-white/90 bg-white/[0.08] backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
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
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ===== INSURANCE PARTNERS MARQUEE ===== */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
            {ti("title")}
          </p>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
              {/* Duplicate the list for seamless loop */}
              {[...insurerList.split(" · "), ...insurerList.split(" · ")].map(
                (name, i) => (
                  <span
                    key={i}
                    className="inline-block text-lg font-semibold text-gray-400 hover:text-primary-600 transition-colors duration-200 px-2"
                  >
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS GRID SECTION ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">{tp("title")}</h2>
            <p className="section-subtitle">{tp("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(({ key, icon: Icon, color, href }, index) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {tp(`${key}.title`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {tp(`${key}.description`)}
                </p>

                {/* CTA */}
                <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors">
                  <span>{tp(`${key}.cta`)}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Hover accent bar */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
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
            <div className="absolute top-1/2 right-0 w-40 h-40 bg-accent-500/20 rounded-full blur-3xl" />

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
                <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent-400" />
                    <span>{tk("haftpflichtTitle")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent-400" />
                    <span>{tk("teilkaskoTitle")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent-400" />
                    <span>{tk("vollkaskoTitle")}</span>
                  </div>
                </div>
              </div>

              {/* Right side - CTA card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center min-w-[280px]">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <p className="text-white/80 text-sm mb-6">{t("subtitle")}</p>
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

      {/* ===== REVIEWS SECTION ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">{tr("title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(["review1", "review2", "review3"] as const).map((key, index) => (
              <div
                key={key}
                className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 text-accent-500 fill-accent-500"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{tr(`${key}.text`)}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {tr(`${key}.name`)}
                    </p>
                    <p className="text-gray-500 text-xs">{tr(`${key}.role`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US SECTION ===== */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">{ta("whyUs")}</h2>
            <p className="section-subtitle">{ta("missionText")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Reason 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-primary-50 to-white border border-primary-100 card-hover animate-slide-up">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {ta("reason1")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {ta("reason1Text")}
              </p>
            </div>

            {/* Reason 2 */}
            <div
              className="text-center p-8 rounded-2xl bg-gradient-to-b from-accent-50 to-white border border-accent-100 card-hover animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-accent-100 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {ta("reason2")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {ta("reason2Text")}
              </p>
            </div>

            {/* Reason 3 */}
            <div
              className="text-center p-8 rounded-2xl bg-gradient-to-b from-green-50 to-white border border-green-100 card-hover animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {ta("reason3")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {ta("reason3Text")}
              </p>
            </div>

            {/* Reason 4 */}
            <div
              className="text-center p-8 rounded-2xl bg-gradient-to-b from-purple-50 to-white border border-purple-100 card-hover animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {ta("reason4")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {ta("reason4Text")}
              </p>
            </div>
          </div>

          {/* Stats - icon-based, no language-specific labels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "5000+", icon: Users, color: "text-primary-600" },
              { value: "98%", icon: ThumbsUp, color: "text-green-600" },
              { value: "24h", icon: Clock, color: "text-accent-600" },
              { value: "70+", icon: FileCheck, color: "text-purple-600" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-extrabold text-gray-900">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KFZ DETAIL SECTION ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">{tk("title")}</h2>
            <p className="section-subtitle">{tk("subtitle")}</p>
          </div>

          {/* Coverage types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Haftpflicht */}
            <div className="relative rounded-2xl border-2 border-primary-200 bg-gradient-to-b from-primary-50 to-white p-8 animate-slide-up">
              <div className="absolute -top-3 left-6">
                <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Pflicht
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {tk("haftpflichtTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tk("haftpflichtText")}
              </p>
            </div>

            {/* Teilkasko */}
            <div
              className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {tk("teilkaskoTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tk("teilkaskoText")}
              </p>
            </div>

            {/* Vollkasko */}
            <div
              className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-5">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {tk("vollkaskoTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tk("vollkaskoText")}
              </p>
            </div>
          </div>

          {/* SF-Klasse and EVB info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SF-Klasse */}
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-8 animate-slide-up">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {tk("sfTitle")}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {tk("sfText")}
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-primary-100">
                    <h4 className="font-semibold text-primary-700 text-sm mb-2">
                      {tk("foreignSfTitle")}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tk("foreignSfText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* EVB */}
            <div
              className="rounded-2xl bg-gray-50 border border-gray-100 p-8 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {tk("evbTitle")}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {tk("evbText")}
                  </p>
                  <Link
                    href={`/${locale}/evb`}
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
                  >
                    <span>EVB-Nummer beantragen</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
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
