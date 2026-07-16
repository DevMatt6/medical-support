import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { SupportForm } from "./_SupportForm";
import { type Locale } from "@/lib/i18n";

/* ─── Metadata ─────────────────────────────────────────────────── */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const copy = ASSISTENZA_COPY[locale] ?? ASSISTENZA_COPY.it;
	return {
		title: `${copy.meta.title} — Medical Support`,
		description: copy.meta.description,
	};
}

const ASSISTENZA_COPY = {
	it: {
		meta: {
			title: "Assistenza tecnica",
			description: "Richiedi supporto tecnico per i sistemi Medical Support.",
		},
		hero: {
			title: "Richiedi assistenza tecnica per la tua strumentazione.",
			description:
				"Compila il modulo per segnalare anomalie, malfunzionamenti o richieste di supporto operativo. Il nostro reparto tecnico ti ricontatterà per pianificare l’intervento.",
		},
	},
	en: {
		meta: {
			title: "Technical support",
			description: "Request technical support for Medical Support systems.",
		},
		hero: {
			title: "Request technical support for your equipment.",
			description:
				"Fill out the form to report issues, malfunctions, or operational support requests. Our technical team will contact you to schedule the intervention.",
		},
	},
} as const;

const sectionPad: React.CSSProperties = {
	paddingInline: "clamp(24px,5vw,80px)",
};

function AssistenzaHero({ locale }: { locale: Locale }) {
	const copy = ASSISTENZA_COPY[locale] ?? ASSISTENZA_COPY.it;
	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(140px,18vw,200px)",
				background: "var(--primary)",
				position: "relative",
			}}
		>
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: "60%",
					background: "linear-gradient(to top, var(--accent) 0%, transparent 100%)",
					zIndex: 1,
					pointerEvents: "none",
				}}
			/>
			<div style={{ position: "relative", zIndex: 2 }}>
				<SplitText
					text={copy.hero.title}
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
					accentWords={locale === "en" ? ["technical", "support"] : ["assistenza", "tecnica"]}
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
						{copy.hero.description}
					</p>
				</ScrollReveal>
			</div>
		</section>
	);
}

function SupportSection({ locale }: { locale: Locale }) {
	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(80px,10vw,120px)",
				background: "white",
			}}
		>
			<SupportForm locale={locale} />
		</section>
	);
}

export default async function AssistenzaPage({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}) {
	const { locale } = await params;
	return (
		<>
			<AssistenzaHero locale={locale} />
			<SupportSection locale={locale} />
		</>
	);
}
