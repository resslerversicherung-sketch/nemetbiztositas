import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["hu", "de", "ro"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "hu";

export const localeNames: Record<Locale, string> = {
  hu: "Magyar",
  de: "Deutsch",
  ro: "Română",
};

export const brandNames: Record<Locale, { full: string; short: string }> = {
  hu: { full: "Német Biztosítás 24", short: "NB24" },
  de: { full: "Check Vroni 24", short: "CV24" },
  ro: { full: "Asigurări Germania 24", short: "AG24" },
};

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
