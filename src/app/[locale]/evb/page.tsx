"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Shield, FileText, Car, User, Calendar, Send } from "lucide-react";

export default function EvbPage() {
  const t = useTranslations("evb");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    purpose: "",
    vehicleType: "",
    manufacturer: "",
    model: "",
    licensePlate: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    desiredStart: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/evb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      toast.success(t("submitSuccess"));
      setForm({
        purpose: "",
        vehicleType: "",
        manufacturer: "",
        model: "",
        licensePlate: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        desiredStart: "",
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
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Info card */}
        <div className="card border-l-4 border-primary-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-50 rounded-lg">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {t("what")}
              </h2>
              <p className="text-gray-600 leading-relaxed">{t("whatText")}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Purpose */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-50 rounded-lg">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("purpose")}
              </h2>
            </div>
            <select
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">{t("purpose")}...</option>
              <option value="newRegistration">{t("newRegistration")}</option>
              <option value="transfer">{t("transfer")}</option>
              <option value="insuranceChange">{t("insuranceChange")}</option>
            </select>
          </div>

          {/* Vehicle data */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Car className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("vehicleData")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">{tc("evb") === "eVB szám" ? "Jármű típusa" : "Fahrzeugtyp"}</label>
                <select
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">---</option>
                  <option value="car">PKW</option>
                  <option value="motorcycle">Motorrad</option>
                  <option value="truck">LKW</option>
                  <option value="camper">Wohnmobil</option>
                  <option value="trailer">Anhänger</option>
                </select>
              </div>
              <div>
                <label className="input-label">{tc("evb") === "eVB szám" ? "Gyártó" : "Hersteller"}</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={form.manufacturer}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="z.B. Volkswagen"
                />
              </div>
              <div>
                <label className="input-label">{tc("evb") === "eVB szám" ? "Modell" : "Modell"}</label>
                <input
                  type="text"
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="z.B. Golf"
                />
              </div>
              <div>
                <label className="input-label">{tc("evb") === "eVB szám" ? "Rendszám" : "Kennzeichen"}</label>
                <input
                  type="text"
                  name="licensePlate"
                  value={form.licensePlate}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="z.B. M-AB 1234"
                />
              </div>
            </div>
          </div>

          {/* Personal data */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-50 rounded-lg">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("personalData")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">{tc("evb") === "eVB szám" ? "Keresztnév" : "Vorname"}</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">{tc("evb") === "eVB szám" ? "Vezetéknév" : "Nachname"}</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
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
              <div className="md:col-span-2">
                <label className="input-label">{tc("address")}</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Desired start date */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("desiredStart")}
              </h2>
            </div>
            <input
              type="date"
              name="desiredStart"
              value={form.desiredStart}
              onChange={handleChange}
              required
              className="input-field"
            />
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
