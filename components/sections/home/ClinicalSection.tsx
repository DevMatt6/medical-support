"use client";

import Image from "next/image";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";

const STATS = [
	{ value: "20+", label: "anni di R&D" },
	{ value: "5.000+", label: "professionisti" },
	{ value: "CE", label: "MDR 2017/745" },
];

export function ClinicalSection() {
	return (
		<>
			<style>{`
        @media (min-width: 1024px) {
          .clinical-grid { grid-template-columns: 45fr 55fr !important; }
        }
      `}</style>
			<section
				style={{
					background: "white",
					paddingBlock: "clamp(80px,10vw,140px)",
					paddingInline: "clamp(24px,5vw,80px)",
				}}
			>
				<div style={{ marginInline: "auto", width: "100%" }}>
					<div
						className="clinical-grid"
						style={{
							display: "grid",
							gridTemplateColumns: "1fr",
							gap: "clamp(48px,6vw,80px)",
						}}
					>
						{/* COLONNA DESTRA — testo */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							{/* 1. Eyebrow */}
							<ScrollReveal variant="fadeIn" delay={0.05}>
								<p
									style={{
										margin: 0,
										textTransform: "uppercase",
										fontSize: "var(--text-xs)",
										letterSpacing: "0.08em",
										color: "white",
										backgroundColor: "var(--accent)",
										display: "inline-block",
										padding: "6px 14px",
									}}
								>
									Ricerca &amp; Sviluppo
								</p>
							</ScrollReveal>

							{/* 2. H2 con SplitText */}
							<SplitText
								text="Vent'anni di ricerca clinica"
								tag="h2"
								stagger={0.03}
								delay={0.2}
								style={{
									marginTop: 24,
									fontSize: "var(--text-3xl)",
									fontWeight: 500,
									lineHeight: 1.05,
									color: "var(--primary)",
								}}
							/>

							{/* 3. Paragrafo 1 */}
							<ScrollReveal variant="fadeUp" delay={0.4}>
								<p
									style={{
										margin: 0,
										marginTop: 20,
										fontSize: "var(--text-base)",
										color: "var(--muted-foreground)",
										lineHeight: 1.5,
									}}
								>
									Da oltre vent&apos;anni collaboriamo con università, ospedali
									e centri di ricerca per validare ogni algoritmo diagnostico su
									casistiche reali. I nostri protocolli sono pubblicati su
									riviste scientifiche internazionali.
								</p>
							</ScrollReveal>

							{/* 3. Paragrafo 2 */}
							<ScrollReveal variant="fadeUp" delay={0.55}>
								<p
									style={{
										margin: 0,
										marginTop: 20,
										fontSize: "var(--text-base)",
										color: "var(--muted-foreground)",
										lineHeight: 1.5,
									}}
								>
									La certificazione CE MDR 2017/745 non è un traguardo ma un
									punto di partenza: ogni aggiornamento software passa per un
									ciclo di validazione clinica prima del rilascio.
								</p>
							</ScrollReveal>

							{/* 4. Stat Row */}
							<ScrollReveal variant="fadeUp" delay={0.7}>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(3,1fr)",
										gap: 24,
										marginTop: 60,
									}}
								>
									{STATS.map((stat) => (
										<div
											key={stat.value}
											style={{
												textAlign: "center",
												backgroundColor: "var(--muted)",
												padding: "24px 0",
											}}
										>
											<p
												style={{
													margin: 0,
													fontSize: "var(--text-3xl)",
													fontWeight: 700,
													color: "var(--accent)",
												}}
											>
												{stat.value}
											</p>
											<p
												style={{
													margin: 0,
													marginTop: 4,
													fontSize: "var(--text-xs)",
													color: "var(--muted-foreground)",
													textTransform: "uppercase",
													letterSpacing: "0.06em",
												}}
											>
												{stat.label}
											</p>
										</div>
									))}
								</div>
							</ScrollReveal>

							{/* 5. Link CTA */}
							<ScrollReveal variant="fadeUp" delay={0.85}>
								<Link
									href="/casi-clinici"
									style={{
										display: "inline-block",
										marginTop: 60,
										color: "var(--primary)",
										fontSize: "var(--text-sm)",
										fontWeight: 600,
										textDecoration: "none",
									}}
								>
									Casi Clinici &amp; Ricerca →
								</Link>
							</ScrollReveal>
						</div>

						{/* COLONNA SINISTRA — immagine */}
						<ScrollReveal variant="fadeIn" delay={0.1}>
							<div style={{ position: "relative", aspectRatio: "4/3" }}>
								<Image
									src="/images/products/esame-postura-cammino.jpg"
									alt="Ricerca clinica Medical Support"
									fill
									style={{ objectFit: "cover", objectPosition: "center" }}
								/>
							</div>
						</ScrollReveal>
					</div>
				</div>{" "}
			</section>
		</>
	);
}
