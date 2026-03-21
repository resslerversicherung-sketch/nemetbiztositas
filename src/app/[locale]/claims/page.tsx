"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Car, Users, Home, Scale, AlertTriangle, ArrowRight } from "lucide-react";

const claimTypes = [
  {
    key: "kfz" as const,
    href: "/claims/kfz",
    icon: Car,
    color: "blue",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    hoverBorder: "hover:border-blue-400",
  },
  {
    key: "liability" as const,
    href: "/claims/liability",
    icon: Users,
    color: "green",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "border-green-200",
    hoverBorder: "hover:border-green-400",
  },
  {
    key: "household" as const,
    href: "/claims/household",
    icon: Home,
    color: "orange",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    borderColor: "border-orange-200",
    hoverBorder: "hover:border-orange-400",
  },
  {
    key: "legal" as const,
    href: "/claims/legal",
    icon: Scale,
    color: "purple",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
    hoverBorder: "hover:border-purple-400",
  },
];

export default function ClaimsPage() {
  const t = useTranslations("claims");
  const tc = useTranslations("common");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Claim Type Cards */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          {t("selectType")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {claimTypes.map(({ key, href, icon: Icon, bgColor, iconColor, borderColor, hoverBorder }) => (
            <Link key={key} href={href}>
              <div
                className={`card-hover border-2 ${borderColor} ${hoverBorder} transition-all duration-300 group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${bgColor} rounded-lg shrink-0`}>
                    <Icon className={`w-8 h-8 ${iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {t(`${key}.description`)}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
