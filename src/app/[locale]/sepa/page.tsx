"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { CreditCard, PenTool, FileText, Check } from "lucide-react";
import dynamic from "next/dynamic";

export default function SepaPage() {
  const t = useTranslations("sepa");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<any>(null);

  const [form, setForm] = useState({
    accountHolder: "",
    iban: "",
    bic: "",
    bankName: "",
    email: "",
    phone: "",
    address: "",
    place: "",
    date: "",
  });

  useEffect(() => {
    let pad: any = null;

    const initPad = async () => {
      if (!canvasRef.current) return;
      const SignaturePad = (await import("signature_pad")).default;
      pad = new SignaturePad(canvasRef.current, {
        backgroundColor: "rgb(255, 255, 255)",
      });
      signaturePadRef.current = pad;

      // Make canvas responsive
      const resizeCanvas = () => {
        if (!canvasRef.current || !pad) return;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d")?.scale(ratio, ratio);
        pad.clear();
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    };

    initPad();

    return () => {
      if (pad) {
        pad.off();
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!consent) {
      toast.error(t("consentRequired"));
      return;
    }

    if (signaturePadRef.current?.isEmpty()) {
      toast.error(t("signatureRequired"));
      return;
    }

    setLoading(true);

    try {
      const signatureData = signaturePadRef.current.toDataURL("image/png");

      const res = await fetch("/api/sepa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, signatureData }),
      });

      if (!res.ok) throw new Error();
      toast.success(t("submitSuccess"));
      setForm({
        accountHolder: "",
        iban: "",
        bic: "",
        bankName: "",
        email: "",
        phone: "",
        address: "",
        place: "",
        date: "",
      });
      setConsent(false);
      clearSignature();
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
          <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Info banner */}
        <div className="card border-l-4 border-primary-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-50 rounded-lg">
              <FileText className="w-6 h-6 text-primary-600" />
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
          {/* Bank details */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-50 rounded-lg">
                <CreditCard className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("bankDetails")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="input-label">{t("accountHolder")}</label>
                <input
                  type="text"
                  name="accountHolder"
                  value={form.accountHolder}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <label className="input-label">{t("iban")}</label>
                <input
                  type="text"
                  name="iban"
                  value={form.iban}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="DE89 3704 0044 0532 0130 00"
                />
              </div>
              <div>
                <label className="input-label">{t("bic")}</label>
                <input
                  type="text"
                  name="bic"
                  value={form.bic}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="COBADEFFXXX"
                />
              </div>
              <div>
                <label className="input-label">{t("bankName")}</label>
                <input
                  type="text"
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Contact details */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-50 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("contactDetails")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Signature */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <PenTool className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t("signature")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="input-label">{t("place")}</label>
                <input
                  type="text"
                  name="place"
                  value={form.place}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">{t("date")}</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full cursor-crosshair"
                style={{ height: "200px" }}
              />
            </div>
            <div className="flex justify-end mt-3">
              <button
                type="button"
                onClick={clearSignature}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                {t("clearSignature")}
              </button>
            </div>
          </div>

          {/* Consent */}
          <div className="card">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="consent"
                className="text-gray-700 leading-relaxed cursor-pointer"
              >
                {t("consentText")}
              </label>
            </div>
          </div>

          {/* PDF info */}
          <div className="card bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-blue-800 text-sm leading-relaxed">
                {t("pdfInfo")}
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || !consent}
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard className="w-5 h-5" />
              {loading ? tc("loading") : t("submitButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
