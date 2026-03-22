"use client";

import { useState, FormEvent } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { Shield, User, Lock } from "lucide-react";

const ADMIN_USERNAME = "User";
const ADMIN_PASSWORD = "1234";

export default function AdminLoginPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "de";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.username === ADMIN_USERNAME && form.password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuth", "true");
      toast.success("Login erfolgreich!");
      window.location.href = `/${locale}/admin`;
    } else {
      setError("Falscher Benutzername oder Passwort.");
      toast.error("Login fehlgeschlagen");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 text-white mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-sm text-gray-500 mt-1">Zugang zum Verwaltungsbereich</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="input-label">
                Benutzername
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={form.username}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Benutzername"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="input-label">
                Passwort
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
                  placeholder="Passwort"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <Shield className="w-5 h-5" />
              {loading ? "Laden..." : "Admin Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
