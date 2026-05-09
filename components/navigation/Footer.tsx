"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CERTS = ["Dispositivo Medico CE", "ISO 13485", "Conforme MDR 2017/745"];

const linkStyle: React.CSSProperties = {
	color: "inherit",
	opacity: 0.6,
	fontSize: "var(--text-sm)",
	textDecoration: "none",
	display: "block",
	padding: "4px 0",
	transition: "opacity 200ms",
};

export function Footer() {
	const primaryNav = siteConfig.nav.filter(
		(item) =>
			!(
				"children" in item &&
				Array.isArray(item.children) &&
				item.children.length > 0
			),
	);

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
			{/* Grid */}
			<div
				className="footer-grid"
				style={{
					display: "grid",
					gridTemplateColumns: "2fr 1fr 1fr 1fr",
					gap: "clamp(32px, 4vw, 48px)",
				}}
			>
				{/* Col 1 — brand */}
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
						Biometria Digitalizzata per la diagnosi e il trattamento posturale.
					</p>
					<div
						style={{
							marginTop: 24,
							display: "flex",
							flexDirection: "column",
							gap: 2,
						}}
					>
						<span style={{ fontSize: "var(--text-xs)", opacity: 0.5 }}>
							Via Ippolito Nievo, 61 — 00153 Roma
						</span>
						<Link
							href="mailto:info@medical-support.it"
							style={{
								fontSize: "var(--text-xs)",
								opacity: 0.5,
								color: "inherit",
								textDecoration: "none",
							}}
						>
							info@medical-support.it
						</Link>
						<Link
							href="tel:+393475183978"
							style={{
								fontSize: "var(--text-xs)",
								opacity: 0.5,
								color: "inherit",
								textDecoration: "none",
							}}
						>
							+39 347 518 3978
						</Link>
					</div>
				</ScrollReveal>

				{/* Col 2 — prodotti */}
				<ScrollReveal variant="fadeUp" delay={0.1}>
					<p
						style={{
							fontWeight: 600,
							fontSize: "var(--text-sm)",
							marginTop: 0,
							marginBottom: 16,
						}}
					>
						Prodotti
					</p>
					{siteConfig.products.map((product) => (
						<Link
							key={product.slug}
							href={`/prodotti/${product.slug}`}
							style={linkStyle}
							onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
							onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
						>
							{product.name}
						</Link>
					))}
				</ScrollReveal>

				{/* Col 3 — navigazione */}
				<ScrollReveal variant="fadeUp" delay={0.2}>
					<p
						style={{
							fontWeight: 600,
							fontSize: "var(--text-sm)",
							marginTop: 0,
							marginBottom: 16,
						}}
					>
						Navigazione
					</p>
					{primaryNav.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							style={linkStyle}
							onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
							onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
						>
							{item.label}
						</Link>
					))}
				</ScrollReveal>

				{/* Col 4 — certificazioni */}
				<ScrollReveal variant="fadeUp" delay={0.3}>
					<p
						style={{
							fontWeight: 600,
							fontSize: "var(--text-sm)",
							marginTop: 0,
							marginBottom: 16,
						}}
					>
						Certificazioni
					</p>
					{CERTS.map((cert) => (
						<span
							key={cert}
							style={{
								display: "block",
								padding: "6px 0",
								borderTop: "1px solid rgba(255,255,255,0.1)",
								fontSize: "var(--text-xs)",
								opacity: 0.7,
							}}
						>
							{cert}
						</span>
					))}
				</ScrollReveal>
			</div>

			{/* Divider */}
			<div
				style={{ marginTop: 48, borderTop: "1px solid rgba(255,255,255,0.1)" }}
			/>

			{/* Bottom bar */}
			<div
				style={{
					paddingTop: 24,
					display: "flex",
					justifyContent: "space-between",
					flexWrap: "wrap",
					gap: 8,
				}}
			>
				<span style={{ fontSize: "var(--text-xs)", opacity: 1 }}>
					© 2026 Medical Support S.r.l.
				</span>
				<span
					style={{
						fontSize: "var(--text-xs)",
						opacity: 1,
					}}
				>
					Designed and developed by{" "}
					<a
						href="https://www.mira-portfolio.it"
						style={{ color: "var(--accent)", textDecoration: "underline" }}
					>
						Mira
					</a>
				</span>
				<span style={{ fontSize: "var(--text-xs)", opacity: 1 }}>
					P.IVA IT12345678901
				</span>
			</div>
		</footer>
	);
}
