"use client";

import Image from "next/image";
import { BarChart3, Cloud, Globe } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { homeCopy } from "@/lib/home-copy";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRouteLocale } from "@/lib/route-locale";

const FEATURES = {
	it: [
		{
			icon: <BarChart3 size={28} strokeWidth={1.5} />,
			title: "Analisi 3D",
			body: "Pressione statica, dinamica e stabilometria in un'unica piattaforma.",
		},
		{
			icon: <Cloud size={28} strokeWidth={1.5} />,
			title: "Cloud Ready",
			body: "Accesso ai dati via TELEPOSTUROLOGIA da qualsiasi dispositivo.",
		},
		{
			icon: <Globe size={28} strokeWidth={1.5} />,
			title: "Multilingue",
			body: "Adottato da migliaia di professionisti in Italia e in tutto il mondo.",
		},
	],
	en: [
		{
			icon: <BarChart3 size={28} strokeWidth={1.5} />,
			title: "3D Analysis",
			body: "Static pressure, dynamic pressure, and stabilometry in a single platform.",
		},
		{
			icon: <Cloud size={28} strokeWidth={1.5} />,
			title: "Cloud Ready",
			body: "Access data through TELEPOSTUROLOGY from any device.",
		},
		{
			icon: <Globe size={28} strokeWidth={1.5} />,
			title: "Multilingual",
			body: "Adopted by thousands of professionals in Italy and around the world.",
		},
	],
};

export function SoftwareSection() {
	const locale = useRouteLocale();
	const copy = homeCopy.software[locale];
	const features = FEATURES[locale];
	return (
		<section
			style={{
				padding: "clamp(80px,10vw,120px) clamp(24px,5vw,80px)",
				background: "var(--background)",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Contenuto */}
			<div
				style={{
					position: "relative",
					zIndex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<ScrollReveal variant="fadeIn" delay={0.05}>
					<span
						style={{
							fontSize: "var(--text-xs)",
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							color: "white",
							display: "inline-block",
							backgroundColor: "var(--secondary)",
							padding: "6px 14px",
						}}
					>
						new bms
					</span>
				</ScrollReveal>
				{/* Heading */}
				<ScrollReveal variant="fadeUp" delay={0.05}>
					<div style={{ textAlign: "center" }}>
						<SplitText
							text={copy.headline}
							tag="h2"
							stagger={0.03}
							delay={0.1}
							style={{
								fontSize: "var(--text-3xl)",
								fontWeight: 500,
								color: "var(--primary)",
								margin: 0,
							}}
						/>
					</div>
				</ScrollReveal>

				{/* Sottotitolo */}
				<ScrollReveal variant="fadeUp" delay={0.2}>
					<p
						style={{
							textAlign: "center",
							maxWidth: 600,
							margin: "16px auto 0",
							color: "var(--muted-foreground)",
							fontSize: "var(--text-base)",
							lineHeight: 1.5,
						}}
					>
						{copy.subheadline}
					</p>
				</ScrollReveal>
			</div>

			<div style={{ position: "relative", zIndex: 1 }}>
				{/* 2-column grid: immagine + feature */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
						gap: "clamp(24px, 4vw, 64px)",
						alignItems: "start",
						marginTop: "clamp(40px, 5vw, 64px)",
					}}
				>
					{/* Left — immagine */}
					<ScrollReveal variant="fadeUp" delay={0.3}>
						<div
							style={{
								position: "relative",
								width: "100%",
								height: "clamp(280px, 40vw, 520px)",
								overflow: "hidden",
							}}
						>
							<Image
								src="/images/products/newbms.png"
								alt={locale === "it" ? "Software New BMS" : "New BMS software"}
								fill
								style={{ objectFit: "cover", objectPosition: "center" }}
							/>
						</div>
					</ScrollReveal>

					{/* Right — 3 feature in colonna */}
					<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
						{features.map((feature, i) => (
							<div key={feature.title}>
								<ScrollReveal variant="fadeUp" delay={0.1 + i * 0.12}>
									<div
										style={{
											padding: "clamp(20px, 2vw, 32px)",
											display: "flex",
											flexDirection: "column",
											gap: 12,
											backgroundColor: "white",
										}}
									>
										<span style={{ color: "var(--accent)" }}>
											{feature.icon}
										</span>
										<p
											style={{
												margin: 0,
												fontSize: "var(--text-base)",
												fontWeight: 600,
												color: "var(--foreground)",
											}}
										>
											{feature.title}
										</p>
										<p
											style={{
												margin: 0,
												fontSize: "var(--text-sm)",
												color: "var(--muted-foreground)",
												lineHeight: 1.6,
											}}
										>
											{locale === "it"
												? "Adottato da migliaia di professionisti in Italia e in tutto il mondo."
												: "Adopted by thousands of professionals in Italy and around the world."}
										</p>
									</div>
								</ScrollReveal>
							</div>
						))}
					</div>
				</div>

				{/* CTA */}
				<ScrollReveal variant="fadeUp" delay={0.5}>
					<div
						style={{ textAlign: "center", marginTop: "clamp(40px,5vw,64px)" }}
					>
						<MagneticButton
							as="a"
							href={`/${locale}/software`}
							style={{
								padding: "14px 40px",
								background: "var(--primary)",
								color: "var(--primary-foreground)",
								fontSize: "var(--text-sm)",
								fontWeight: 600,
								textDecoration: "none",
							}}
						>
							{copy.ctaPrimary}
						</MagneticButton>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}