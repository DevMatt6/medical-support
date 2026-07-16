import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LenisProvider } from "@/providers/LenisProvider";
import { NavbarThemeProvider } from "@/providers/NavbarThemeProvider";
import { PageTransition } from "@/components/ui/PageTransition";
import { Navbar } from "@/components/navigation/Navbar";
import { siteConfig } from "@/config/site";
import { localize, defaultLocale } from "@/lib/i18n";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: localize(siteConfig.description, defaultLocale),
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang={defaultLocale} suppressHydrationWarning>
			<body>
				<ThemeProvider>
					<LenisProvider>
						<NavbarThemeProvider>
							<Navbar />
							<PageTransition>{children}</PageTransition>
						</NavbarThemeProvider>
					</LenisProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
