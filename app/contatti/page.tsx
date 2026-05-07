import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { ContactForm } from "./_ContactForm";
import { NavbarDark } from "@/components/ui/NavbarDark";

/* ─── Metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
	title: "Contatti — Medical Support",
	description:
		"Contattaci per una dimostrazione personalizzata dei sistemi Medical Support.",
};

/* ─── Shared ────────────────────────────────────────────────────── */
const sectionPad: React.CSSProperties = {
	paddingInline: "clamp(24px,5vw,80px)",
};

/* ════════════════════════════════════════════════════════════════ */
/*  1. HERO                                                         */
/* ════════════════════════════════════════════════════════════════ */
function ContattiHero() {
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
					text="Parlaci del tuo progetto diagnostico."
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
					accentWords={["progetto"]}
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
						Siamo a disposizione per rispondere a qualsiasi domanda sui nostri
						sistemi diagnostici e per organizzare una dimostrazione
						personalizzata nel tuo studio.
					</p>
				</ScrollReveal>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  2. CONTACT SECTION                                              */
/* ════════════════════════════════════════════════════════════════ */
function ContactSection() {
	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(80px,10vw,120px)",
				background: "white",
			}}
		>
			<ContactForm />
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  3. MAP PLACEHOLDER                                              */
/* ════════════════════════════════════════════════════════════════ */
function MapPlaceholder() {
	return (
		<div
			style={{
				width: "100%",
				height: "clamp(200px,30vw,320px)",
				background: "color-mix(in srgb, var(--primary) 6%, white)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.123!2d12.4559!3d41.8892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6063b1b4b6b3%3A0x1e2a3b4c5d6e7f8a!2sVia%20Ippolito%20Nievo%2C%2061%2C%2000153%20Roma%20RM!5e0!3m2!1sit!2sit!4v1699900000000!5m2!1sit!2sit"
				width="100%"
				height="100%"
				style={{ border: 0, display: "block", minHeight: "400px" }}
				allowFullScreen
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				title="Medical Support — Via Ippolito Nievo 61, Roma"
			/>
		</div>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  PAGE                                                            */
/* ════════════════════════════════════════════════════════════════ */
export default function ContattiPage() {
	return (
		<>
			<NavbarDark />
			<ContattiHero />
			<ContactSection />
			<MapPlaceholder />
		</>
	);
}
