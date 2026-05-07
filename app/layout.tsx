import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LenisProvider } from "@/providers/LenisProvider";
import { NavbarThemeProvider } from "@/providers/NavbarThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/ui/PageTransition";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

const figtree = Figtree({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-figtree",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="it" suppressHydrationWarning>
			<body
				className={figtree.variable}
				style={{ fontFamily: "var(--font-figtree), sans-serif" }}
			>
				<ThemeProvider>
					<LenisProvider>
						<NavbarThemeProvider>
							<Navbar />
							<PageTransition>{children}</PageTransition>
							<Footer />
						</NavbarThemeProvider>
					</LenisProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
