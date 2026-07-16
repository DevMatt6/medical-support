import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/navigation/Footer";
import { locales, type Locale } from "@/lib/i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <>
      {children}
      <Footer locale={locale as Locale} />
    </>
  );
}
