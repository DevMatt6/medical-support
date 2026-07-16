"use client";

import {
	Hospital,
	GraduationCap,
	Stethoscope,
	Activity,
	Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { useRouteLocale } from "@/lib/route-locale";

interface AppItem {
	icon: LucideIcon;
	label: string;
}

const APPLICATIONS: Record<"it" | "en", AppItem[]> = {
	it: [
		{ icon: Hospital, label: "Cliniche e Ospedali" },
		{ icon: GraduationCap, label: "Università e Ricerca" },
		{ icon: Stethoscope, label: "Studi Medici Specialistici" },
		{ icon: Activity, label: "Centri Sportivi e Riabilitativi" },
		{ icon: Building2, label: "Centri Podologici" },
	],
	en: [
		{ icon: Hospital, label: "Clinics and Hospitals" },
		{ icon: GraduationCap, label: "Universities and Research" },
		{ icon: Stethoscope, label: "Specialist Medical Practices" },
		{ icon: Activity, label: "Sports and Rehabilitation Centers" },
		{ icon: Building2, label: "Podiatry Centers" },
	],
};

export function ApplicationsSection() {
	const locale = useRouteLocale();
	const apps = APPLICATIONS[locale];
	const marqueeItems = [...apps, ...apps, ...apps];

	return (
		<>
			<style>{`
				@keyframes apps-marquee {
					0% { transform: translate3d(0, 0, 0); }
					100% { transform: translate3d(-33.333%, 0, 0); }
				}
				.applications-marquee {
					animation: apps-marquee 24s linear infinite;
					will-change: transform;
				}
				.applications-marquee:hover {
					animation-play-state: paused;
				}
				@media (max-width: 767px) {
					.applications-header {
						grid-template-columns: 1fr !important;
					}
					.applications-right {
						margin-top: 20px !important;
					}
					.applications-card {
						min-width: 220px !important;
					}
				}
			`}</style>
			<section
				style={{
					background: "var(--primary)",
					padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px)",
					position: "relative",
				}}
			>
				<div
					className="applications-header"
					style={{
						display: "grid",
						gridTemplateColumns: "1.1fr 0.9fr",
						gap: "clamp(24px,4vw,48px)",
						alignItems: "end",
					}}
				>
					<div style={{ position: "relative" }}>
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
								{locale === "it" ? "Ambiti di Applicazione" : "Application Areas"}
							</span>
						</ScrollReveal>

						<div style={{ marginTop: 24 }}>
							<SplitText
								tag="h2"
								text={
									locale === "it"
										? "Dove viene utilizzata la tecnologia Medical Support"
										: "Where Medical Support technology is used"
								}
								stagger={0.03}
								delay={0.2}
								style={{
									fontSize: "var(--text-3xl)",
									fontWeight: 500,
									lineHeight: 1.05,
									color: "white",
									margin: 0,
									maxWidth: 600,
								}}
							/>
						</div>
					</div>

					<div className="applications-right" style={{ paddingTop: 14 }}>
						<ScrollReveal variant="fadeUp" delay={0.5}>
							<p
								style={{
									marginTop: 0,
									marginBottom: 0,
									fontSize: "var(--text-base)",
									color: "white",
									opacity: 0.75,
									lineHeight: 1.3,
								}}
							>
								{locale === "it"
									? "Adottata da oltre 5.000 professionisti in tutto il mondo, la Linea Cristal è il riferimento per fisiatri, ortopedici, podologi e centri sportivi d'élite."
									: "Adopted by more than 5,000 professionals worldwide, the Cristal line is the reference point for physiatrists, orthopedists, podiatrists, and elite sports centers."}
							</p>
						</ScrollReveal>
					</div>
				</div>

				<div style={{ marginTop: 32, overflow: "hidden" }}>
					<ScrollReveal variant="fadeIn" delay={0.15}>
						<div
							className="applications-marquee"
							style={{ display: "flex", width: "max-content", gap: 14 }}
						>
							{marqueeItems.map((item, i) => {
								const Icon = item.icon;
								return (
									<div
										key={`${item.label}-${i}`}
										className="applications-card"
										style={{
											minWidth: 240,
											minHeight: 200,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											gap: 12,
											padding: "clamp(16px,2vw,24px)",
											background: "color-mix(in srgb, white 8%, transparent)",
											flexShrink: 0,
										}}
									>
										<Icon
											size={48}
											style={{ color: "var(--accent)", flexShrink: 0 }}
										/>
										<span
											style={{
												fontSize: "var(--text-sm)",
												fontWeight: 500,
												color: "white",
												lineHeight: 1.4,
											}}
										>
											{item.label}
										</span>
									</div>
								);
							})}
						</div>
					</ScrollReveal>
				</div>
			</section>
		</>
	);
}
