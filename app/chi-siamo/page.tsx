import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getDictionary, localize, type Locale } from "@/lib/i18n";

const ABOUT_COPY = {
	it: {
		h1: "Innovazione al servizio della posturologia clinica",
		subtitle:
			"Da oltre vent'anni progettiamo e produciamo dispositivi medici per la diagnostica posturale, con un impegno costante verso la validazione clinica e la ricerca scientifica.",
		values: [
			{
				num: "01",
				title: "Innovazione",
				body: "Da 20 anni sviluppiamo tecnologie diagnostiche d'avanguardia per i professionisti della salute.",
			},
			{
				num: "02",
				title: "Qualità",
				body: "Ogni dispositivo è certificato CE MDR 2017/745 e validato clinicamente prima del rilascio.",
			},
			{
				num: "03",
				title: "Accessibilità",
				body: "Rendiamo la diagnostica avanzata accessibile a ogni studio medico, indipendentemente dalla dimensione.",
			},
		],
		technologies: [
			{ title: "IoT Medicale", body: "Dispositivi interconnessi per la raccolta dati in tempo reale." },
			{ title: "Intelligenza Artificiale", body: "Algoritmi di supporto decisionale clinico basati su machine learning." },
			{ title: "Scansione 3D", body: "Acquisizione morfologica ad alta precisione con luce strutturata." },
			{ title: "Sensori Oro-Platino", body: "Celle di carico di alta qualità per la massima accuratezza pressoria." },
			{ title: "IBP Index", body: "Indice brevettato per la valutazione del bilanciamento posturale." },
			{ title: "Cloud TELEPOSTUROLOGIA", body: "Piattaforma cloud per la gestione e la condivisione remota dei dati." },
		],
		techSectionLabel: "Tecnologie",
		techSectionTitle: "Il motore della nostra diagnostica",
		contact: {
			label: "Dove siamo",
			title: "Vieni a trovarci",
			button: "Contattaci",
			addressLines: ["Via Ippolito Nievo, 61", "00153 Roma (RM)"],
		},
	},
	en: {
		h1: "Innovation for clinical posturology",
		subtitle:
			"For more than twenty years, we have designed and manufactured medical devices for postural diagnostics, with a constant commitment to clinical validation and scientific research.",
		values: [
			{ num: "01", title: "Innovation", body: "For 20 years we have developed cutting-edge diagnostic technologies for healthcare professionals." },
			{ num: "02", title: "Quality", body: "Every device is CE MDR 2017/745 certified and clinically validated before release." },
			{ num: "03", title: "Accessibility", body: "We make advanced diagnostics accessible to every medical practice, regardless of size." },
		],
		techSectionLabel: "Technologies",
		techSectionTitle: "The engine behind our diagnostics",
		technologies: [
			{ title: "Medical IoT", body: "Connected devices for real-time data collection." },
			{ title: "Artificial Intelligence", body: "Clinical decision-support algorithms powered by machine learning." },
			{ title: "3D Scanning", body: "High-precision morphological acquisition with structured light." },
			{ title: "Gold-Platinum Sensors", body: "High-quality load cells for maximum pressure accuracy." },
			{ title: "IBP Index", body: "Patented index for postural balance assessment." },
			{ title: "Cloud TELEPOSTUROLOGIA", body: "Cloud platform for remote data management and sharing." },
		],
		contact: {
			label: "Where we are",
			title: "Visit us",
			button: "Contact us",
			addressLines: ["Via Ippolito Nievo, 61", "00153 Rome, Italy"],
		},
	},
} as const;

/* ─── Metadata ─────────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
	const { locale } = await params;
	await getDictionary(locale);
	return {
		title: `${localize({ it: "Chi Siamo", en: "About Us" }, locale)} — Medical Support`,
		description: localize(
			{
				it: "Innovazione italiana al servizio della posturologia clinica da oltre 20 anni.",
				en: "Italian innovation serving clinical posturology for over 20 years.",
			},
			locale,
		),
	};
}

/* ─── Shared ────────────────────────────────────────────────────── */
const sectionPad: React.CSSProperties = {
	paddingInline: "clamp(24px,5vw,80px)",
};

/* ════════════════════════════════════════════════════════════════ */
/*  1. HERO                                                         */
/* ════════════════════════════════════════════════════════════════ */
function HeroAbout({ locale }: { locale: Locale }) {
	const copy = ABOUT_COPY[locale] ?? ABOUT_COPY.it;
	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(140px,18vw,200px)",
				background: "var(--primary)",
			}}
		>
			<SplitText
				text={copy.h1}
				tag="h1"
				stagger={0.03}
				delay={0.1}
				style={{
					fontSize: "clamp(var(--text-3xl), 5vw, 3.5rem)",
					fontWeight: 500,
					lineHeight: 1.05,
					color: "white",
					margin: 0,
					maxWidth: 760,
				}}
				accentWords={["posturologia", "clinica"]}
				accentColor="var(--accent)"
			/>

			<ScrollReveal variant="fadeUp" delay={0.35}>
				<p
					style={{
						marginTop: 24,
						fontSize: "var(--text-lg)",
						color: "rgba(255,255,255,0.75)",
						maxWidth: 560,
						lineHeight: 1.65,
					}}
				>
					{copy.subtitle}
				</p>
			</ScrollReveal>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  2. MISSION & VALUES                                             */
/* ════════════════════════════════════════════════════════════════ */
function MissionValues({ locale }: { locale: Locale }) {
	const copy = ABOUT_COPY[locale] ?? ABOUT_COPY.it;
	return (
		<>
			<style>{`
        @media (min-width: 768px) {
          .values-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
			<section
				style={{
					...sectionPad,
					paddingBlock: "clamp(80px,10vw,140px)",
					background: "white",
				}}
			>
				<div
					className="values-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "1fr",
						gap: 10,
					}}
				>
					{copy.values.map((v, i) => (
						<ScrollReveal key={v.num} variant="fadeUp" delay={0.1 + i * 0.12}>
							<div
								style={{
									padding: "clamp(32px,4vw,50px)",
									border: "1px solid var(--accent)",
									backgroundColor: "var(--background)",
									position: "relative",
									overflow: "hidden",
								}}
							>
								{/* Numero decorativo */}
								<span
									aria-hidden
									style={{
										position: "absolute",
										top: -8,
										right: 16,
										fontSize: "clamp(80px,12vw,120px)",
										fontWeight: 800,
										color: "var(--primary)",
										opacity: 0.06,
										lineHeight: 1,
										userSelect: "none",
										pointerEvents: "none",
									}}
								>
									{v.num}
								</span>

								<h3
									style={{
										margin: 0,
										fontSize: "var(--text-xl)",
										fontWeight: 600,
										color: "var(--accent)",
									}}
								>
									{v.title}
								</h3>
								<p
									style={{
										margin: 0,
										marginTop: 16,
										fontSize: "var(--text-base)",
										color: "var(--muted-foreground)",
										lineHeight: 1.7,
									}}
								>
									{v.body}
								</p>
							</div>
						</ScrollReveal>
					))}
				</div>
			</section>
		</>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  3. TECHNOLOGIES                                                 */
/* ════════════════════════════════════════════════════════════════ */
function Technologies({ locale }: { locale: Locale }) {
	const copy = ABOUT_COPY[locale] ?? ABOUT_COPY.it;
	return (
		<>
			<style>{`
        @media (min-width: 640px) {
          .tech-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .tech-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
			<section
				style={{
					...sectionPad,
					paddingBlock: "clamp(80px,10vw,140px)",
					background: "var(--background)",
				}}
			>
				{/* Eyebrow */}
				<ScrollReveal variant="fadeIn" delay={0}>
					<p
						style={{
							margin: 0,
							textTransform: "uppercase",
							fontSize: "var(--text-xs)",
							letterSpacing: "0.1em",
							color: "white",
							backgroundColor: "var(--accent)",
							display: "inline-block",
							padding: "6px 14px",
						}}
					>
						{copy.techSectionLabel}
					</p>
				</ScrollReveal>

				{/* H2 */}
				<SplitText
					text={copy.techSectionTitle}
					tag="h2"
					stagger={0.03}
					delay={0.1}
					style={{
						marginTop: 20,
						fontSize: "var(--text-3xl)",
						fontWeight: 500,
						color: "var(--primary)",
					}}
				/>

				{/* Grid */}
				<div
					className="tech-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "1fr",
						gap: 10,
						marginTop: "clamp(40px,5vw,64px)",
					}}
				>
					{copy.technologies.map((tech, i) => (
						<ScrollReveal
							key={tech.title}
							variant="fadeUp"
							delay={0.1 + i * 0.08}
						>
							<div
								style={{
									padding: "clamp(20px,2vw,32px)",
									border: "1px solid var(--accent)",
								}}
							>
								<p
									style={{
										margin: 0,
										fontSize: "var(--text-lg)",
										fontWeight: 500,
										color: "var(--primary)",
									}}
								>
									{tech.title}
								</p>
								<p
									style={{
										margin: 0,
										marginTop: 8,
										fontSize: "var(--text-sm)",
										color: "var(--muted-foreground)",
										lineHeight: 1.6,
									}}
								>
									{tech.body}
								</p>
							</div>
						</ScrollReveal>
					))}
				</div>
			</section>
		</>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  4. MAP + CONTACT                                                */
/* ════════════════════════════════════════════════════════════════ */
function MapContact({ locale }: { locale: Locale }) {
	const copy = ABOUT_COPY[locale] ?? ABOUT_COPY.it;
	const { contact } = copy;
	return (
		<>
			<style>{`
        @media (min-width: 1024px) {
          .map-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
			<section
				style={{
					...sectionPad,
					paddingBlock: "clamp(80px,10vw,140px)",
					background: "white",
				}}
			>
				<div
					className="map-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "1fr",
						gap: "clamp(48px,6vw,80px)",
						alignItems: "center",
					}}
				>
					{/* Sinistra — testo */}
					<div>
						<ScrollReveal variant="fadeIn" delay={0}>
							<p
								style={{
									margin: 0,
									textTransform: "uppercase",
									fontSize: "var(--text-xs)",
									letterSpacing: "0.1em",
									color: "var(--muted-foreground)",
								}}
							>
								{contact.label}
							</p>
						</ScrollReveal>

						<SplitText
							text={contact.title}
							tag="h2"
							stagger={0.04}
							delay={0.1}
							style={{
								marginTop: 16,
								fontSize: "var(--text-3xl)",
								fontWeight: 400,
								color: "var(--foreground)",
							}}
						/>

						<ScrollReveal variant="fadeUp" delay={0.3}>
							<div
								style={{
									marginTop: 32,
									display: "flex",
									flexDirection: "column",
									gap: 12,
								}}
							>
								<p
									style={{
										margin: 0,
										fontSize: "var(--text-base)",
										color: "var(--foreground)",
										lineHeight: 1.6,
									}}
								>
									{contact.addressLines.map((line) => (
										<span key={line}>
											{line}
											<br />
										</span>
									))}
								</p>
								<a
									href="tel:+393475183978"
									style={{
										color: "var(--primary)",
										fontSize: "var(--text-base)",
										textDecoration: "none",
										fontWeight: 600,
									}}
								>
									+39 347 518 3978
								</a>
								<a
									href="mailto:info@medical-support.it"
									style={{
										color: "var(--primary)",
										fontSize: "var(--text-base)",
										textDecoration: "none",
										fontWeight: 600,
									}}
								>
									info@medical-support.it
								</a>
							</div>
						</ScrollReveal>

						<ScrollReveal variant="fadeUp" delay={0.45}>
							<div style={{ marginTop: 32 }}>
								<MagneticButton
									as="a"
									href={`/${locale}/contatti`}
									style={{
										padding: "14px 40px",
										background: "var(--primary)",
										color: "var(--primary-foreground)",
										fontSize: "var(--text-sm)",
										fontWeight: 600,
										textDecoration: "none",
									}}
								>
									{contact.button}
								</MagneticButton>
							</div>
						</ScrollReveal>
					</div>

					{/* Destra — mappa placeholder */}
					<ScrollReveal variant="fadeIn" delay={0.2}>
						<div
							style={{
								aspectRatio: "4/3",
								background: "color-mix(in srgb, var(--primary) 8%, white)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<p
								style={{
									margin: 0,
									fontSize: "var(--text-sm)",
									color: "var(--foreground)",
									opacity: 0.4,
									textAlign: "center",
								}}
							>
								Via Ippolito Nievo, 61 — Roma
							</p>
						</div>
					</ScrollReveal>
				</div>
			</section>
		</>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  PAGE                                                            */
/* ════════════════════════════════════════════════════════════════ */
export default async function ChiSiamoPage({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}) {
	const { locale } = await params;
	return (
		<>
			<HeroAbout locale={locale} />
			<MissionValues locale={locale} />
			<Technologies locale={locale} />
			<MapContact locale={locale} />
		</>
	);
}
