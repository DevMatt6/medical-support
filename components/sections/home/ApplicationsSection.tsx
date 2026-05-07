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

interface AppItem {
	icon: LucideIcon;
	label: string;
}

const APPS: AppItem[] = [
	{ icon: Hospital, label: "Cliniche e Ospedali" },
	{ icon: GraduationCap, label: "Università e Ricerca" },
	{ icon: Stethoscope, label: "Studi Medici Specialistici" },
	{ icon: Activity, label: "Centri Sportivi e Riabilitativi" },
	{ icon: Building2, label: "Centri Podologici" },
];

export function ApplicationsSection() {
	return (
		<>
			<style>{`
				@media (min-width: 1024px) {
					.applications-grid { grid-template-columns: 40fr 60fr !important; }
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
					className="applications-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "1fr",
						gap: "clamp(48px,6vw,80px)",
					}}
				>
					{/* Colonna sinistra */}
					<div style={{ position: "relative", paddingLeft: 24 }}>
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
								Ambiti di Applicazione
							</span>
						</ScrollReveal>

						<div style={{ marginTop: 24 }}>
							<SplitText
								tag="h2"
								text="Dove viene utilizzata la tecnologia Medical Support"
								stagger={0.03}
								delay={0.2}
								style={{
									fontSize: "var(--text-3xl)",
									fontWeight: 500,
									lineHeight: 1.05,
									color: "white",
									margin: 0,
								}}
							/>
						</div>

						<ScrollReveal variant="fadeUp" delay={0.5}>
							<p
								style={{
									marginTop: 24,
									marginBottom: 0,
									fontSize: "var(--text-base)",
									color: "white",
									opacity: 0.75,
									lineHeight: 1.7,
								}}
							>
								Adottata da oltre 5.000 professionisti in tutto il mondo, la
								Linea Cristal è il riferimento per fisiatri, ortopedici,
								podologi e centri sportivi d&apos;élite.
							</p>
						</ScrollReveal>
					</div>

					{/* Colonna destra */}
					<div>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: 14,
							}}
						>
							{APPS.map((item, i) => {
								const Icon = item.icon;
								return (
									<ScrollReveal
										key={item.label}
										variant="fadeUp"
										delay={i * 0.08}
									>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "flex-start",
												gap: 12,
												padding: "clamp(16px,2vw,24px)",
												background: "color-mix(in srgb, white 8%, transparent)",
											}}
										>
											<Icon
												size={32}
												style={{
													color: "var(--accent)",
													flexShrink: 0,
												}}
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
									</ScrollReveal>
								);
							})}
						</div>

						<ScrollReveal variant="fadeIn" delay={0.6}>
							<p
								style={{
									marginTop: 24,
									marginBottom: 0,
									fontSize: "var(--text-xs)",
									color: "white",
									letterSpacing: "0.04em",
								}}
							>
								Fisiatri · Ortopedici · Podologi · Fisioterapisti · Neurologi ·
								Medici dello Sport
							</p>
						</ScrollReveal>
					</div>
				</div>
			</section>
		</>
	);
}
