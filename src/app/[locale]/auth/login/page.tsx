"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { LogIn, Mail, Lock, Globe } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Static export: authentication handled client-side
      toast.success(t("loginSuccess"));
      window.location.href = `/${locale}/portal`;
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
              <LogIn className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("loginTitle")}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="input-label">
                {t("email")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder={t("email")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="input-label">
                {t("password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder={t("password")}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              {loading ? tc("loading") : t("loginButton")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              {t("noAccount")}{" "}
              <Link
                href={`/${locale}/auth/register`}
                className="text-primary-500 hover:text-primary-600 font-semibold"
              >
                {t("registerButton")}
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              href={`/${locale === "hu" ? "de" : locale === "de" ? "ro" : "hu"}/auth/login`}
              className="text-sm text-gray-500 hover:text-primary-500 flex items-center justify-center gap-1"
            >
              <Globe className="w-4 h-4" />
              {tc("language")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
