import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TabSwitcher } from "./_TabSwitcher";
import { type Locale } from "@/lib/i18n";

/* ─── Metadata ─────────────────────────────────────────────────── */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const copy = SOFTWARE_COPY[locale] ?? SOFTWARE_COPY.it;
	return {
		title: `${copy.meta.title} — Medical Support`,
		description: copy.meta.description,
	};
}

/* ─── Shared ────────────────────────────────────────────────────── */
const SOFTWARE_COPY = {
	it: {
		meta: {
			title: "New BMS Software",
			description: "Il software diagnostico per la posturologia clinica. Analisi 3D, cloud, multilingue.",
		},
		hero: {
			badge: "Software Diagnostico",
			title: "Il software che trasforma i dati in diagnosi",
			subtitle: "New BMS integra analisi 3D, gestione cloud e strumenti di biofeedback in un'unica piattaforma progettata per i professionisti della posturologia clinica.",
		},
		analysisSection: {
			label: "Analisi Disponibili",
			title: "10 analisi in un unico software",
			items: [
				"Baropodometria Statica",
				"Baropodometria Dinamica",
				"Stabilometria",
				"Analisi del Passo",
				"Posturografia 3D",
				"Scanner Plantare",
				"Gait Analysis",
				"Biofeedback Posturale",
				"Analisi della Colonna",
				"Valutazione Ortesica",
			],
		},
		cta: {
			title: "Pronto a portare la diagnostica nel futuro?",
			body: "Richiedi una dimostrazione personalizzata o contattaci per scoprire come New BMS può trasformare il tuo studio.",
			primary: "Richiedi una Demo",
			secondary: "Contattaci",
		},
	},
	en: {
		meta: {
			title: "New BMS Software",
			description: "Diagnostic software for clinical posturology. 3D analysis, cloud, and multilingual workflows.",
		},
		hero: {
			badge: "Diagnostic Software",
			title: "The software that turns data into diagnosis",
			subtitle: "New BMS combines 3D analysis, cloud management, and biofeedback tools in a single platform designed for clinical posturology professionals.",
		},
		analysisSection: {
			label: "Available Analyses",
			title: "10 analyses in one software platform",
			items: [
				"Static Baropodometry",
				"Dynamic Baropodometry",
				"Stabilometry",
				"Gait Analysis",
				"3D Posturography",
				"Plantar Scan",
				"Postural Biofeedback",
				"Spinal Analysis",
				"Orthotic Assessment",
				"Clinical Evaluation",
			],
		},
		cta: {
			title: "Ready to bring diagnostics into the future?",
			body: "Request a personalized demo or contact us to discover how New BMS can transform your practice.",
			primary: "Request a Demo",
			secondary: "Contact us",
		},
	},
} as const;

const sectionPad: React.CSSProperties = {
	paddingInline: "clamp(24px,5vw,80px)",
};

/* ════════════════════════════════════════════════════════════════ */
/*  1. HERO                                                         */
/* ════════════════════════════════════════════════════════════════ */
function SoftwareHero({ locale }: { locale: Locale }) {
	const copy = SOFTWARE_COPY[locale] ?? SOFTWARE_COPY.it;
	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(140px,18vw,200px)",
				backgroundImage: "url(/images/software/bms2.png)",
				backgroundSize: "cover",
				backgroundColor: "var(--primary)",
				backgroundPosition: "center",
				position: "relative",
			}}
		>
			{/* Gradient overlay */}
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: "60%",
					background:
						"linear-gradient(to top, var(--accent) 0%, transparent 60%)",
					zIndex: 1,
					pointerEvents: "none",
				}}
			/>
			{/* Content */}
			<div style={{ position: "relative", zIndex: 2 }}>
				{/* Eyebrow badge */}
				<ScrollReveal variant="fadeIn" delay={0}>
					<span
						style={{
							display: "inline-block",
							padding: "6px 14px",
							background: "var(--secondary)",
							color: "white",
							fontSize: "var(--text-xs)",
							textTransform: "uppercase",
							letterSpacing: "0.1em",
						}}
					>
						{copy.hero.badge}
					</span>
				</ScrollReveal>

				{/* H1 */}
				<SplitText
					text={copy.hero.title}
					tag="h1"
					stagger={0.03}
					delay={0.15}
					style={{
						marginTop: 20,
						fontSize: "clamp(var(--text-3xl), 5vw, 3.5rem)",
						fontWeight: 500,
						lineHeight: 1.05,
						color: "white",
						maxWidth: 700,
					}}
					accentWords={locale === "en" ? ["software", "diagnosis"] : ["diagnosi", "software"]}
					accentColor="var(--accent)"
				/>

				{/* Sottotitolo */}
				<ScrollReveal variant="fadeUp" delay={0.4}>
					<p
						style={{
							marginTop: 24,
							fontSize: "var(--text-lg)",
							color: "rgba(255,255,255,0.75)",
							maxWidth: 560,
							lineHeight: 1.65,
						}}
					>
						{copy.hero.subtitle}
					</p>
				</ScrollReveal>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  3. ANALYSIS LIST                                                */
/* ════════════════════════════════════════════════════════════════ */
function AnalysisList({ locale }: { locale: Locale }) {
	const copy = SOFTWARE_COPY[locale] ?? SOFTWARE_COPY.it;
	return (
		<>
			<style>{`
				@media (min-width: 768px) {
					.analyses-grid { grid-template-columns: repeat(2, 1fr) !important; }
				}
			`}</style>
			<section
				style={{
					...sectionPad,
					paddingBlock: "clamp(80px,10vw,120px)",
					background: "var(--background)",
				}}
			>
				{/* Eyebrow */}
				<ScrollReveal variant="fadeIn" delay={0}>
					<span
						style={{
							display: "inline-block",
							padding: "6px 14px",
							background: "var(--accent)",
							color: "white",
							fontSize: "var(--text-xs)",
							textTransform: "uppercase",
							letterSpacing: "0.1em",
						}}
					>
						{copy.analysisSection.label}
					</span>
				</ScrollReveal>

				{/* H2 */}
				<SplitText
					text={copy.analysisSection.title}
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
					className="analyses-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "1fr",
						gap: "clamp(2px,1vw,12px)",
						marginTop: "clamp(40px,5vw,64px)",
					}}
				>
					{copy.analysisSection.items.map((label, i) => (
						<ScrollReveal key={label} variant="fadeUp" delay={0.05 + i * 0.07}>
							<div
								style={{
									padding: 20,
									border: "1px solid var(--accent)",
									display: "flex",
									alignItems: "center",
									gap: 16,
								}}
							>
								<span
									style={{
										fontSize: "var(--text-md)",
										fontWeight: 700,
										color: "var(--accent)",
										fontVariantNumeric: "tabular-nums",
										minWidth: 24,
									}}
								>
									{String(i + 1).padStart(2, "0")}
								</span>
								<span
									style={{
										fontSize: "var(--text-base)",
										fontWeight: 500,
										color: "var(--foreground)",
									}}
								>
									{label}
								</span>
							</div>
						</ScrollReveal>
					))}
				</div>
			</section>
		</>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  4. SOFTWARE CTA                                                 */
/* ════════════════════════════════════════════════════════════════ */
function SoftwareCTA({ locale }: { locale: Locale }) {
	const copy = SOFTWARE_COPY[locale] ?? SOFTWARE_COPY.it;
	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(80px,10vw,120px)",
				background: "var(--primary)",
				textAlign: "center",
				position: "relative",
			}}
		>
			{/* Gradient overlay */}
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: "60%",
					background:
						"linear-gradient(to top, var(--accent) 0%, transparent 100%)",
					zIndex: 1,
					pointerEvents: "none",
				}}
			/>
			{/* Content */}
			<div style={{ position: "relative", zIndex: 2 }}>
				<ScrollReveal variant="fadeUp" delay={0.05}>
					<SplitText
						text={copy.cta.title}
						tag="h2"
						stagger={0.03}
						delay={0.1}
						style={{
							fontSize: "var(--text-3xl)",
							fontWeight: 500,
							color: "white",
							margin: 0,
						}}
					/>
				</ScrollReveal>

				<ScrollReveal variant="fadeUp" delay={0.25}>
					<p
						style={{
							marginTop: 16,
							fontSize: "var(--text-base)",
							color: "rgba(255,255,255,0.75)",
							maxWidth: 480,
							marginInline: "auto",
							lineHeight: 1.65,
						}}
					>
						{copy.cta.body}
					</p>
				</ScrollReveal>

				<ScrollReveal variant="fadeUp" delay={0.4}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							gap: 16,
							marginTop: 40,
							flexWrap: "wrap",
						}}
					>
						<MagneticButton
							as="a"
							href={`/${locale}/contatti?subject=demo`}
							style={{
								padding: "14px 40px",
								background: "white",
								color: "var(--primary)",
								fontSize: "var(--text-sm)",
								fontWeight: 600,
								textDecoration: "none",
							}}
						>
							{copy.cta.primary}
						</MagneticButton>
						<MagneticButton
							as="a"
							href={`/${locale}/contatti`}
							style={{
								padding: "14px 40px",
								border: "1px solid rgba(255,255,255,0.5)",
								color: "white",
								fontSize: "var(--text-sm)",
								fontWeight: 600,
								textDecoration: "none",
								background: "transparent",
							}}
						>
							{copy.cta.secondary}
						</MagneticButton>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  PAGE                                                            */
/* ════════════════════════════════════════════════════════════════ */
export default async function SoftwarePage({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}) {
	const { locale } = await params;
	return (
		<>
			<SoftwareHero locale={locale} />
			<TabSwitcher locale={locale} />
			<AnalysisList locale={locale} />
			<SoftwareCTA locale={locale} />
		</>
	);
}
