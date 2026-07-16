import type { Locale } from "@/lib/i18n";

type SectionCopy = {
	headline: string;
	subheadline: string;
	ctaPrimary: string;
	ctaSecondary?: string;
};

type TrustBarItem = {
	value: string;
	label: string;
	numericTarget?: number;
	numericPrefix?: string;
	numericSuffix?: string;
};

type TrustBarCopy = {
	items: TrustBarItem[];
};

export const homeCopy: {
	hero: Record<Locale, SectionCopy>;
	intro: Record<Locale, SectionCopy>;
	software: Record<Locale, SectionCopy>;
	trustbar: Record<Locale, TrustBarCopy>;
	cta: Record<Locale, SectionCopy>;
} = {
	hero: {
		it: {
			headline: "L'innovazione della diagnostica 3D",
			subheadline:
				"Sistemi biometrici certificati CE per fisiatri, ortopedici e podologi. Dai dati alla diagnosi, in tempo reale.",
			ctaPrimary: "Richiedi una Demo",
			ctaSecondary: "Esplora i prodotti →",
		},
		en: {
			headline: "Innovation in 3D diagnostics",
			subheadline:
				"CE-certified biometric systems for physiatrists, orthopedists, and podiatrists. From data to diagnosis, in real time.",
			ctaPrimary: "Request a Demo",
			ctaSecondary: "Explore products →",
		},
	},
	intro: {
		it: {
			headline: "Tecnologia al servizio della diagnosi clinica",
			subheadline:
				"Medical Support nasce dall'incontro tra ingegneria biomedica e clinica posturale. I nostri sistemi acquisiscono dati tridimensionali ad alta risoluzione per supportare il clinico in ogni fase diagnostica: dall'analisi del passo alla mappatura plantare, fino all'elaborazione della colonna vertebrale.",
			ctaPrimary: "Scopri la nostra storia →",
		},
		en: {
			headline: "Technology in the service of clinical diagnosis",
			subheadline:
				"Medical Support was born from the meeting of biomedical engineering and postural care. Our systems capture high-resolution 3D data to support clinicians at every diagnostic step: from gait analysis to plantar mapping and spinal assessment.",
			ctaPrimary: "Discover our story →",
		},
	},
	software: {
		it: {
			headline: "Il software che dà voce ai dati",
			subheadline:
				"Una piattaforma diagnostica completa per raccogliere, analizzare e condividere i dati posturali dei tuoi pazienti in modo semplice e preciso.",
			ctaPrimary: "Scopri New BMS",
		},
		en: {
			headline: "Software that gives data a voice",
			subheadline:
				"A complete diagnostic platform to collect, analyze, and share your patients' postural data with simplicity and precision.",
			ctaPrimary: "Discover New BMS",
		},
	},
	cta: {
		it: {
			headline: "Porta la diagnostica posturale al livello successivo.",
			subheadline:
				"Scopri come i sistemi Medical Support possono trasformare il tuo studio o reparto clinico.",
			ctaPrimary: "Richiedi una Demo",
			ctaSecondary: "Esplora i Prodotti",
		},
		en: {
			headline: "Take postural diagnostics to the next level.",
			subheadline:
				"Discover how Medical Support systems can transform your clinic or department.",
			ctaPrimary: "Request a Demo",
			ctaSecondary: "Explore Products",
		},
	},
	trustbar: {
		it: {
			items: [
				{
					value: "+20 anni",
					label: "di esperienza",
					numericTarget: 20,
					numericPrefix: "+",
					numericSuffix: " anni",
				},
				{ value: "Certificazione CE", label: "Direttiva 93/42/CEE" },
				{ value: "5 sistemi integrati", label: "Linea Cristal" },
				{ value: "1 Software", label: "New BMS" },
				{ value: "15 Analisi", label: "Diagnostica di precisione" },
			],
		},
		en: {
			items: [
				{
					value: "+20 years",
					label: "of experience",
					numericTarget: 20,
					numericPrefix: "+",
					numericSuffix: " years",
				},
				{ value: "CE certified", label: "Directive 93/42/EEC" },
				{ value: "5 integrated systems", label: "Cristal line" },
				{ value: "1 software", label: "New BMS" },
				{ value: "15 analyses", label: "Precision diagnostics" },
			],
		},
	},
};
