"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(t("sendSuccess"));
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="gradient-bg py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-blue-100">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="card flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{t("callUs")}</h3>
                <p className="text-gray-600 mt-1">+49 (0) 123 456 789</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Mo-Fr 9:00-18:00
                </p>
              </div>
            </div>

            <div className="card flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{t("emailUs")}</h3>
                <p className="text-gray-600 mt-1">info@nb24.de</p>
                <p className="text-gray-600">support@nb24.de</p>
              </div>
            </div>

            <div className="card flex items-start space-x-4">
              <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{t("visitUs")}</h3>
                <p className="text-gray-600 mt-1">Musterstraße 1</p>
                <p className="text-gray-600">12345 Berlin</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("formTitle")}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">{tc("name")} *</label>
                    <input
                      type="text"
                      className="input-field"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">{tc("email")} *</label>
                    <input
                      type="email"
                      className="input-field"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="input-label">{t("subject")} *</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="input-label">{t("message")} *</label>
                  <textarea
                    className="input-field min-h-[150px] resize-y"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" disabled={sending} className="btn-primary flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  {sending ? tc("loading") : t("sendButton")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
