"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Car,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Shield,
  Users,
  Camera,
  Send,
  Plus,
  X,
  Upload,
} from "lucide-react";

interface Witness {
  name: string;
  phone: string;
}

export default function KfzClaimPage() {
  const t = useTranslations("claims");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    description: "",
    policeReport: false,
    policeReportNumber: "",
    otherPartyName: "",
    otherPartyInsurance: "",
    otherPartyPlate: "",
    damageAmount: "",
    contractNumber: "",
    name: "",
    email: "",
    phone: "",
  });

  const [witnesses, setWitnesses] = useState<Witness[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addWitness = () => {
    setWitnesses([...witnesses, { name: "", phone: "" }]);
  };

  const removeWitness = (index: number) => {
    setWitnesses(witnesses.filter((_, i) => i !== index));
  };

  const updateWitness = (index: number, field: keyof Witness, value: string) => {
    const updated = [...witnesses];
    updated[index][field] = value;
    setWitnesses(updated);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "kfz",
          ...form,
          witnesses,
        }),
      });

      if (!res.ok) throw new Error();
      toast.success(t("submitSuccess"));
      setForm({
        incidentDate: "",
        incidentTime: "",
        incidentLocation: "",
        description: "",
        policeReport: false,
        policeReportNumber: "",
        otherPartyName: "",
        otherPartyInsurance: "",
        otherPartyPlate: "",
        damageAmount: "",
        contractNumber: "",
        name: "",
        email: "",
        phone: "",
      });
      setWitnesses([]);
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
          <Car className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("kfz.title")}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">{t("kfz.description")}</p>
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
          {/* Incident Details */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("incidentDate")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="input-label">{t("incidentDate")}</label>
                <div className="relative">
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
              <div>
                <label className="input-label">{t("incidentTime")}</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    name="incidentTime"
                    value={form.incidentTime}
                    onChange={handleChange}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="input-label">{t("incidentLocation")}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="incidentLocation"
                    value={form.incidentLocation}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>
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

          {/* Police Report */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-50 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("policeReport")}
              </h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="policeReport"
                  checked={form.policeReport}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">{t("policeReport")}</span>
              </label>
              {form.policeReport && (
                <div>
                  <label className="input-label">{t("policeReportNumber")}</label>
                  <input
                    type="text"
                    name="policeReportNumber"
                    value={form.policeReportNumber}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Witnesses */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Users className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("witnesses")}
                </h2>
              </div>
              <button
                type="button"
                onClick={addWitness}
                className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                {t("addWitness")}
              </button>
            </div>
            {witnesses.length === 0 && (
              <p className="text-gray-500 text-sm italic">---</p>
            )}
            <div className="space-y-4">
              {witnesses.map((witness, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    <div>
                      <label className="input-label">{t("witnessName")}</label>
                      <input
                        type="text"
                        value={witness.name}
                        onChange={(e) => updateWitness(index, "name", e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="input-label">{t("witnessPhone")}</label>
                      <input
                        type="tel"
                        value={witness.phone}
                        onChange={(e) => updateWitness(index, "phone", e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWitness(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors mt-6"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Other Party */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Car className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("otherParty")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="input-label">{t("otherPartyName")}</label>
                <input
                  type="text"
                  name="otherPartyName"
                  value={form.otherPartyName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">{t("otherPartyInsurance")}</label>
                <input
                  type="text"
                  name="otherPartyInsurance"
                  value={form.otherPartyInsurance}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">{t("otherPartyPlate")}</label>
                <input
                  type="text"
                  name="otherPartyPlate"
                  value={form.otherPartyPlate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Damage Amount & Contract */}
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">{t("damageAmount")}</label>
                <input
                  type="number"
                  name="damageAmount"
                  value={form.damageAmount}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  step="0.01"
                />
              </div>
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
          </div>

          {/* Photos */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Camera className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("photos")}
              </h2>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">{t("dragDropPhotos")}</p>
              <p className="text-gray-400 text-sm mt-1">{t("photosHelp")}</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="photos"
              />
              <label
                htmlFor="photos"
                className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm cursor-pointer"
              >
                {tc("upload")}
              </label>
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
