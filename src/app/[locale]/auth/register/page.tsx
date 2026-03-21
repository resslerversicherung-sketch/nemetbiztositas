"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, Phone, Globe } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "hu";
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    language: locale,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error(t("passwordMismatch"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          language: form.language,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success(t("registerSuccess"));
      window.location.href = `/${locale}/auth/login`;
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
              <UserPlus className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("registerTitle")}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="input-label">
                {tc("name")}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder={tc("name")}
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="input-label">
                {tc("phone")}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder={tc("phone")}
                />
              </div>
            </div>

            {/* Password */}
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
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder={t("password")}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="input-label">
                {t("confirmPassword")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={6}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder={t("confirmPassword")}
                />
              </div>
            </div>

            {/* Language */}
            <div>
              <label htmlFor="language" className="input-label">
                {tc("language")}
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="language"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="input-field pl-10"
                >
                  <option value="hu">Magyar</option>
                  <option value="de">Deutsch</option>
                  <option value="ro">Romana</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              {loading ? tc("loading") : t("registerButton")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              {t("hasAccount")}{" "}
              <Link
                href={`/${locale}/auth/login`}
                className="text-primary-500 hover:text-primary-600 font-semibold"
              >
                {t("loginButton")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
