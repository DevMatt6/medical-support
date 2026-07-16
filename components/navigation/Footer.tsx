"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getDictionary, type Locale } from "@/lib/i18n";

const CERTS = {
	it: ["Dispositivo Medico CE", "ISO 13485", "Conforme MDR 2017/745"],
	en: ["CE Medical Device", "ISO 13485", "MDR 2017/745 Compliant"],
} as const;

const linkStyle: React.CSSProperties = {
	color: "inherit",
	opacity: 0.6,
	fontSize: "var(--text-sm)",
	textDecoration: "none",
	display: "block",
	padding: "4px 0",
	transition: "opacity 200ms",
};

export function Footer({ locale = "it" as Locale }: { locale?: Locale }) {
	const dictionary = getDictionary(locale);
	const primaryNav = dictionary.navigation.filter((item) => !(Array.isArray(item.children) && item.children.length > 0));

	return (
		<footer
			style={{
				background: "var(--foreground)",
				color: "var(--background)",
				padding: "clamp(48px,8vw,96px) clamp(24px,5vw,80px) 32px",
			}}
		>
			<style>{`
				@media (max-width: 768px) {
					.footer-grid { grid-template-columns: 1fr 1fr !important; }
				}
				@media (max-width: 480px) {
					.footer-grid { grid-template-columns: 1fr !important; }
				}
			`}</style>
			<div
				className="footer-grid"
				style={{
					display: "grid",
					gridTemplateColumns: "2fr 1fr 1fr 1fr",
					gap: "clamp(32px, 4vw, 48px)",
				}}
			>
				<ScrollReveal variant="fadeUp" delay={0}>
					<Logo variant="light" width={160} height={60} />
					<p
						style={{
							fontSize: "var(--text-sm)",
							opacity: 0.6,
							maxWidth: 320,
							marginTop: 12,
							marginBottom: 0,
						}}
					>
						{dictionary.footer.tagline}
					</p>
					<div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 2 }}>
						<span style={{ fontSize: "var(--text-xs)", opacity: 0.5 }}>Via Ippolito Nievo, 61 — 00153 Roma</span>
						<Link href="mailto:info@medical-support.it" style={{ fontSize: "var(--text-xs)", opacity: 0.5, color: "inherit", textDecoration: "none" }}>
							info@medical-support.it
						</Link>
						<Link href="tel:+393475183978" style={{ fontSize: "var(--text-xs)", opacity: 0.5, color: "inherit", textDecoration: "none" }}>
							+39 347 518 3978
						</Link>
					</div>
				</ScrollReveal>

				<ScrollReveal variant="fadeUp" delay={0.1}>
					<p style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginTop: 0, marginBottom: 16 }}>
						{dictionary.footer.productsTitle}
					</p>
					{dictionary.navigation.find((item) => item.href === "/prodotti")?.children?.map((product) => (
						<Link key={product.href} href={product.href} style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}>
							{product.label}
						</Link>
					))}
				</ScrollReveal>

				<ScrollReveal variant="fadeUp" delay={0.2}>
					<p style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginTop: 0, marginBottom: 16 }}>
						{dictionary.footer.navigationTitle}
					</p>
					{primaryNav.map((item) => (
						<Link key={item.href} href={item.href} style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}>
							{item.label}
						</Link>
					))}
				</ScrollReveal>

				<ScrollReveal variant="fadeUp" delay={0.3}>
					<p style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginTop: 0, marginBottom: 16 }}>
						{dictionary.footer.certificationsTitle}
					</p>
					{CERTS[locale].map((cert) => (
						<span key={cert} style={{ display: "block", padding: "6px 0", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "var(--text-xs)", opacity: 0.7 }}>
							{cert}
						</span>
					))}
				</ScrollReveal>
			</div>

			<div style={{ marginTop: 48, borderTop: "1px solid rgba(255,255,255,0.1)" }} />

			<div style={{ paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
				<span style={{ fontSize: "var(--text-xs)", opacity: 1 }}>© 2026 Medical Support S.r.l.</span>
				<span style={{ fontSize: "var(--text-xs)", opacity: 1 }}>
					{dictionary.footer.builtBy} {" "}
					<a href="https://www.mira-portfolio.it" style={{ color: "var(--accent)", textDecoration: "underline" }}>
						Mira
					</a>
				</span>
				<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
					{(["it", "en"] as const).map((nextLocale) => {
						const active = nextLocale === locale;
						return (
							<button
								key={nextLocale}
								type="button"
								style={{ padding: "6px 10px", fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.2)", background: active ? "var(--background)" : "transparent", color: active ? "var(--foreground)" : "var(--background)" }}
								aria-pressed={active}
							>
								{nextLocale}
							</button>
						);
					})}
				</div>
				<span style={{ fontSize: "var(--text-xs)", opacity: 1 }}>P.IVA IT12345678901</span>
			</div>
		</footer>
	);
}
