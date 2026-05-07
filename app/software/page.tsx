import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TabSwitcher } from "./_TabSwitcher";
import { NavbarDark } from "@/components/ui/NavbarDark";

/* ─── Metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
	title: "New BMS Software — Medical Support",
	description:
		"Il software diagnostico per la posturologia clinica. Analisi 3D, cloud, multilingue.",
};

/* ─── Shared ────────────────────────────────────────────────────── */
const sectionPad: React.CSSProperties = {
	paddingInline: "clamp(24px,5vw,80px)",
};

/* ════════════════════════════════════════════════════════════════ */
/*  1. HERO                                                         */
/* ════════════════════════════════════════════════════════════════ */
function SoftwareHero() {
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
						Software Diagnostico
					</span>
				</ScrollReveal>

				{/* H1 */}
				<SplitText
					text="Il software che trasforma i dati in diagnosi"
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
					accentWords={["diagnosi", "software"]}
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
						New BMS integra analisi 3D, gestione cloud e strumenti di
						biofeedback in un&apos;unica piattaforma progettata per i
						professionisti della posturologia clinica.
					</p>
				</ScrollReveal>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  3. ANALYSIS LIST                                                */
/* ════════════════════════════════════════════════════════════════ */
const ANALYSES = [
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
];

function AnalysisList() {
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
						Analisi Disponibili
					</span>
				</ScrollReveal>

				{/* H2 */}
				<SplitText
					text="10 analisi in un unico software"
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
					{ANALYSES.map((label, i) => (
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
function SoftwareCTA() {
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
						text="Pronto a portare la diagnostica nel futuro?"
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
						Richiedi una dimostrazione personalizzata o contattaci per scoprire
						come New BMS può trasformare il tuo studio.
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
							href="/contatti?subject=demo"
							style={{
								padding: "14px 40px",
								background: "white",
								color: "var(--primary)",
								fontSize: "var(--text-sm)",
								fontWeight: 600,
								textDecoration: "none",
							}}
						>
							Richiedi una Demo
						</MagneticButton>
						<MagneticButton
							as="a"
							href="/contatti"
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
							Contattaci
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
export default function SoftwarePage() {
	return (
		<>
			<NavbarDark />
			<SoftwareHero />
			<TabSwitcher />
			<AnalysisList />
			<SoftwareCTA />
		</>
	);
}
