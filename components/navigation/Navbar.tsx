"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { MobileDrawer } from "@/components/navigation/MobileDrawer";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useNavbarTheme } from "@/providers/NavbarThemeProvider";
import { defaultLocale, getDictionary, locales, type Locale } from "@/lib/i18n";

const localizedPath = (locale: Locale, href: string) => {
	if (href === "/") return `/${locale}`;
	if (href.startsWith(`/${locale}/`)) return href;
	if (href === `/${locale}`) return href;
	if (href.startsWith("/")) return `/${locale}${href}`;
	return href;
};
type NavbarProps = {
	initialLocale?: Locale;
};

export function Navbar({ initialLocale = defaultLocale }: NavbarProps) {
	const { scrollY } = useScroll();
	const pathname = usePathname();
	const router = useRouter();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [demoBg, setDemoBg] = useState(false);
	const [locale, setLocale] = useState<Locale>(initialLocale);
	const { navbarTheme } = useNavbarTheme();
	const isHome = pathname === "/" || pathname === `/${locale}`;
	const forceLightOnTop = !isHome;
	const lightContent = !isHome && (navbarTheme === "light-on-dark" || forceLightOnTop) && !scrolled;
	const dictionary = getDictionary(locale);
	const navItems = dictionary.navigation;

	useMotionValueEvent(scrollY, "change", (val) => {
		setScrolled(val > 50);
	});

	return (
		<>
			<motion.header
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 50,
					height: 72,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 clamp(24px, 5vw, 80px)",
					background: scrolled ? "var(--background)" : "transparent",
					transition: "background 300ms ease, border-color 300ms ease",
				}}
			>
				<Link href={`/${locale}`}>
					<Logo
						variant={lightContent ? "light" : "dark"}
						width={160}
						height={60}
					/>
				</Link>

				<nav
					className={cn("hidden md:flex")}
					aria-label={dictionary.common.navigationMenu}
					style={{ alignItems: "center", gap: 0 }}
				>
					{navItems.map((item) => {
						const hasChildren = Array.isArray(item.children) && item.children.length > 0;

						if (hasChildren) {
							return (
								<div
									key={item.href}
									style={{ position: "relative" }}
									onMouseEnter={() => setMenuOpen(true)}
									onMouseLeave={() => setMenuOpen(false)}
								>
									<button
										style={{
											padding: "8px 16px",
											fontSize: "var(--text-md)",
											color: lightContent ? "#ffffff" : "var(--color-text)",
											background: "none",
											border: "none",
											cursor: "pointer",
											fontFamily: "inherit",
											fontWeight: 500,
											opacity: menuOpen ? 0.7 : 1,
											transition: "opacity 200ms",
										}}
									>
										{item.label}
									</button>
									<MegaMenu
										isOpen={menuOpen}
										items={item.children ?? []}
										locale={locale}
									/>
								</div>
							);
						}

						return (
							<Link
								key={item.href}
								href={localizedPath(locale, item.href)}
								style={{
									padding: "8px 16px",
									fontSize: "var(--text-md)",
									fontWeight: 500,
									color: lightContent ? "#ffffff" : "var(--color-text)",
									textDecoration: "none",
									opacity: 1,
									transition: "opacity 200ms",
								}}
								onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
								onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>

				<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
					<div
						className={cn("hidden md:inline-flex")}
						style={{ alignItems: "center", gap: 6 }}
						aria-label={dictionary.common.languageSwitcherLabel}
					>
						{locales.map((nextLocale) => {
							const active = nextLocale === locale;

							return (
								<button
									key={nextLocale}
									type="button"
									onClick={() => {
							setLocale(nextLocale);
							const segments = pathname.split("/").filter(Boolean);
							if (segments[0] === "it" || segments[0] === "en") segments[0] = nextLocale;
							else segments.unshift(nextLocale);
							router.push(`/${segments.join("/")}`);
						}}
									style={{
										padding: "6px 10px",
										fontSize: "var(--text-xs)",
										fontWeight: 600,
										letterSpacing: "0.08em",
										textTransform: "uppercase",
										border: "1px solid var(--border)",
										background: active ? "var(--foreground)" : "transparent",
										color: active ? "var(--background)" : lightContent ? "#ffffff" : "var(--foreground)",
										transition: "background 200ms, color 200ms, border-color 200ms",
									}}
									aria-pressed={active}
								>
									{nextLocale}
								</button>
							);
						})}
					</div>


					<Link
						href={`/${locale}/contatti`}
						className={cn("hidden md:inline-flex")}
						style={{
							padding: "10px 24px",
							background: demoBg ? "var(--accent)" : "var(--primary)",
							color: demoBg
								? "var(--accent-foreground)"
								: "var(--primary-foreground)",
							fontSize: "var(--text-sm)",
							fontWeight: 500,
							textDecoration: "none",
							borderRadius: 0,
							border: "none",
							cursor: "pointer",
							transition: "background 200ms, color 200ms",
							alignItems: "center",
							justifyContent: "center",
						}}
						onMouseEnter={() => setDemoBg(true)}
						onMouseLeave={() => setDemoBg(false)}
					>
						{dictionary.common.requestDemo}
					</Link>

					<button
						className={cn("flex md:hidden")}
						aria-label={dictionary.navbar.openMenu}
						onClick={() => setDrawerOpen(true)}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							padding: 0,
							color: lightContent ? "#ffffff" : "var(--foreground)",
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Menu size={22} />
					</button>
				</div>
			</motion.header>

			<MobileDrawer
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				locale={locale}
				onLocaleChange={setLocale}
			/>
		</>
	);
}
