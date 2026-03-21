"use client";

import { useTranslations } from "next-intl";
import { Globe, Monitor, Phone, Shield, Users, Star, CheckCircle } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");
  const tc = useTranslations("common");

  const reasons = [
    { icon: Globe, title: t("reason1"), text: t("reason1Text"), color: "bg-primary-100 text-primary-600" },
    { icon: Monitor, title: t("reason2"), text: t("reason2Text"), color: "bg-accent-100 text-accent-600" },
    { icon: Phone, title: t("reason3"), text: t("reason3Text"), color: "bg-success-50 text-success-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="gradient-bg py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-blue-100">{t("subtitle")}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="card">
          <Shield className="w-16 h-16 text-primary-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("mission")}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{t("missionText")}</p>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t("whyUs")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <div key={i} className="card text-center">
              <div className={`w-16 h-16 rounded-xl ${reason.color} flex items-center justify-center mx-auto mb-6`}>
                <reason.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "5000+", label: "Kunden / Ügyfelek" },
            { value: "3", label: "Sprachen / Nyelv" },
            { value: "24/7", label: "Online Portal" },
            { value: "98%", label: "Zufriedenheit / Elégedettség" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold text-primary-600">{stat.value}</div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Values */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Transparent & fair",
            "Digital & schnell",
            "Mehrsprachig / Többnyelvű",
            "Persönlich & zuverlässig",
          ].map((value, i) => (
            <div key={i} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0" />
              <span className="font-medium text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
