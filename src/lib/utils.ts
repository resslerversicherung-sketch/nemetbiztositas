import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale: string = "de-DE"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDate(date: Date | string, locale: string = "de-DE"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export function generateId(prefix: string = ""): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = prefix;
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const statusColors: Record<string, string> = {
  open: "bg-accent-500 text-white",
  in_progress: "bg-warning-500 text-white",
  success: "bg-success-500 text-white",
  failed: "bg-danger-500 text-white",
  active: "bg-success-500 text-white",
  cancelled: "bg-danger-500 text-white",
  pending: "bg-warning-500 text-white",
  submitted: "bg-primary-500 text-white",
  in_review: "bg-warning-500 text-white",
  approved: "bg-success-500 text-white",
  rejected: "bg-danger-500 text-white",
  closed: "bg-gray-500 text-white",
};

export const priorityColors: Record<string, string> = {
  low: "bg-gray-200 text-gray-700",
  medium: "bg-warning-100 text-warning-600",
  high: "bg-accent-100 text-accent-600",
  urgent: "bg-danger-100 text-danger-600",
};
