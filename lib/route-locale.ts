"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

export function useRouteLocale(): Locale {
	const pathname = usePathname() || "";
	const match = locales.find((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
	return match ?? defaultLocale;
}
