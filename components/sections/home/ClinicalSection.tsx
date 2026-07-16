"use client";

import Image from "next/image";
import { useRouteLocale } from "@/lib/route-locale";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";

const CLINICAL_COPY = {
	it: {
		eyebrow: "Ricerca & Sviluppo",
		title: "Vent'anni di ricerca clinica",
		paragraph1:
			"Da oltre vent'anni collaboriamo con università, ospedali e centri di ricerca per validare ogni algoritmo diagnostico su casistiche reali. I nostri protocolli sono pubblicati su riviste scientifiche internazionali.",
		paragraph2:
			"La certificazione CE MDR 2017/745 non è un traguardo ma un punto di partenza: ogni aggiornamento software passa per un ciclo di validazione clinica prima del rilascio.",
	},
	en: {
		eyebrow: "Research & Development",
		title: "Twenty years of clinical research",
		paragraph1:
			"For more than twenty years, we have worked with universities, hospitals, and research centers to validate every diagnostic algorithm on real-world cases. Our protocols are published in international scientific journals.",
		paragraph2:
			"CE MDR 2017/745 certification is not a finish line but a starting point: every software update goes through a clinical validation cycle before release.",
	},
} as const;

const STATS = {
	it: [
		{ value: "20+", label: "anni di R&D" },
		{ value: "5.000+", label: "professionisti" },
		{ value: "CE", label: "MDR 2017/745" },
	],
	en: [
		{ value: "20+", label: "years of R&D" },
		{ value: "5,000+", label: "professionals" },
		{ value: "CE", label: "MDR 2017/745" },
	],
} as const;

export function ClinicalSection() {
	const locale = useRouteLocale();
	const copy = CLINICAL_COPY[locale];
	const stats = STATS[locale];

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
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
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
									{copy.eyebrow}
								</p>
							</ScrollReveal>

							<SplitText
								text={copy.title}
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
									{copy.paragraph1}
								</p>
							</ScrollReveal>

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
									{copy.paragraph2}
								</p>
							</ScrollReveal>

							<ScrollReveal variant="fadeUp" delay={0.7}>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(3,1fr)",
										gap: 24,
										marginTop: 60,
									}}
								>
									{stats.map((stat) => (
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
						</div>

						<div
							style={{
								position: "relative",
								minHeight: "clamp(420px,52vw,720px)",
								borderRadius: 0,
								overflow: "hidden",
								backgroundColor: "var(--muted)",
							}}
						>
							<Image
								src="/images/ricerca.png"
								alt={locale === "it" ? "Ricerca clinica Cristal presso un centro specialistico" : "Cristal clinical research in a specialist center"}
								fill
								sizes="(min-width: 1024px) 55vw, 100vw"
								style={{ objectFit: "cover" }}
								priority={false}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
