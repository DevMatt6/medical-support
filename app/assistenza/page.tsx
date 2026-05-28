import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { SupportForm } from "./_SupportForm";
import { NavbarDark } from "@/components/ui/NavbarDark";

/* ─── Metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
	title: "Assistenza tecnica — Medical Support",
	description: "Richiedi supporto tecnico per i sistemi Medical Support.",
};

/* ─── Shared ────────────────────────────────────────────────────── */
const sectionPad: React.CSSProperties = {
	paddingInline: "clamp(24px,5vw,80px)",
};

/* ════════════════════════════════════════════════════════════════ */
/*  1. HERO                                                         */
/* ════════════════════════════════════════════════════════════════ */
function AssistenzaHero() {
	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(140px,18vw,200px)",
				background: "var(--primary)",
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
				<SplitText
					text="Richiedi assistenza tecnica per la tua strumentazione."
					tag="h1"
					stagger={0.03}
					delay={0.1}
					style={{
						fontSize: "clamp(var(--text-3xl), 5vw, 3.5rem)",
						fontWeight: 500,
						lineHeight: 1.05,
						color: "white",
						margin: 0,
						maxWidth: 850,
					}}
					accentWords={["assistenza", "tecnica"]}
					accentColor="var(--accent)"
				/>
				<ScrollReveal variant="fadeUp" delay={0.4}>
					<p
						style={{
							marginTop: 24,
							fontSize: "var(--text-md)",
							color: "rgba(255,255,255,0.75)",
							maxWidth: 700,
							lineHeight: 1.65,
						}}
					>
						Compila il modulo per segnalare anomalie, malfunzionamenti o
						richieste di supporto operativo. Il nostro reparto tecnico ti
						ricontatterà per pianificare l&apos;intervento.
					</p>
				</ScrollReveal>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  2. SUPPORT SECTION                                              */
/* ════════════════════════════════════════════════════════════════ */
function SupportSection() {
	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(80px,10vw,120px)",
				background: "white",
			}}
		>
			<SupportForm />
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  PAGE                                                            */
/* ════════════════════════════════════════════════════════════════ */
export default function AssistenzaPage() {
	return (
		<>
			<NavbarDark />
			<AssistenzaHero />
			<SupportSection />
		</>
	);
}
