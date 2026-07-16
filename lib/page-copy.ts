import type { Locale } from "@/lib/i18n";

type Copy = {
	title: string;
	description: string;
};

export const pageCopy: Record<string, Record<Locale, Copy>> = {
	"chi-siamo": {
		it: {
			title: "Chi Siamo — Medical Support",
			description: "Innovazione italiana al servizio della posturologia clinica da oltre 20 anni.",
		},
		en: {
			title: "About Us — Medical Support",
			description: "Italian innovation serving clinical posturology for more than 20 years.",
		},
	},
	contatti: {
		it: {
			title: "Contatti — Medical Support",
			description: "Richiedi una demo o parla con il team Medical Support.",
		},
		en: {
			title: "Contact — Medical Support",
			description: "Request a demo or speak with the Medical Support team.",
		},
	},
	software: {
		it: {
			title: "Software — Medical Support",
			description: "Piattaforma per analisi, teleposturologia e refertazione.",
		},
		en: {
			title: "Software — Medical Support",
			description: "Platform for analysis, teleposturology, and reporting.",
		},
	},
	news: {
		it: {
			title: "News — Medical Support",
			description: "Novità, aggiornamenti e approfondimenti Medical Support.",
		},
		en: {
			title: "News — Medical Support",
			description: "Medical Support news, updates, and insights.",
		},
	},
};
