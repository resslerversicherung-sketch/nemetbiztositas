"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Scale,
  ArrowLeft,
  Calendar,
  FileText,
  Send,
  Users,
  AlertCircle,
  User,
} from "lucide-react";

export default function LegalClaimPage() {
  const t = useTranslations("claims");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    incidentDate: "",
    disputeType: "",
    description: "",
    opposingParty: "",
    lawyerInfo: "",
    urgency: "",
    contractNumber: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "legal",
          ...form,
        }),
      });

      if (!res.ok) throw new Error();
      toast.success(t("submitSuccess"));
      setForm({
        incidentDate: "",
        disputeType: "",
        description: "",
        opposingParty: "",
        lawyerInfo: "",
        urgency: "",
        contractNumber: "",
        name: "",
        email: "",
        phone: "",
      });
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="gradient-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Scale className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("legal.title")}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">{t("legal.description")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Back link */}
        <Link
          href="/claims"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToClaims")}
        </Link>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Incident Date */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("incidentDate")}
              </h2>
            </div>
            <div>
              <label className="input-label">{t("incidentDate")}</label>
              <div className="relative max-w-sm">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  name="incidentDate"
                  value={form.incidentDate}
                  onChange={handleChange}
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>

          {/* Dispute Type */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Scale className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("disputeType")}
              </h2>
            </div>
            <select
              name="disputeType"
              value={form.disputeType}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">{t("disputeType")}...</option>
              <option value="employment">{t("disputeTypeEmployment")}</option>
              <option value="traffic">{t("disputeTypeTraffic")}</option>
              <option value="private">{t("disputeTypePrivate")}</option>
              <option value="other">{t("disputeTypeOther")}</option>
            </select>
          </div>

          {/* Description */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-50 rounded-lg">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("description")}
              </h2>
            </div>
            <div>
              <label className="input-label">{t("descriptionHelp")}</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                className="input-field resize-none"
              />
            </div>
          </div>

          {/* Opposing Party */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-50 rounded-lg">
                <User className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("opposingParty")}
              </h2>
            </div>
            <div>
              <label className="input-label">{t("opposingParty")}</label>
              <input
                type="text"
                name="opposingParty"
                value={form.opposingParty}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          {/* Lawyer Info */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Scale className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("lawyerInfo")}
              </h2>
            </div>
            <div>
              <label className="input-label">{t("lawyerInfo")}</label>
              <textarea
                name="lawyerInfo"
                value={form.lawyerInfo}
                onChange={handleChange}
                rows={3}
                className="input-field resize-none"
              />
            </div>
          </div>

          {/* Urgency */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("urgency")}
              </h2>
            </div>
            <select
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">{t("urgency")}...</option>
              <option value="low">{t("urgencyLow")}</option>
              <option value="medium">{t("urgencyMedium")}</option>
              <option value="high">{t("urgencyHigh")}</option>
              <option value="urgent">{t("urgencyUrgent")}</option>
            </select>
          </div>

          {/* Contract Number */}
          <div className="card">
            <div>
              <label className="input-label">{t("contractNumber")}</label>
              <input
                type="text"
                name="contractNumber"
                value={form.contractNumber}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          {/* Personal Data */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-50 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("personalData")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="input-label">{tc("name")}</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">{tc("email")}</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">{tc("phone")}</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {loading ? tc("loading") : t("submitButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
