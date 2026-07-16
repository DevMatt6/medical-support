export const locales = ["it", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

export type LocalizedValue<T> = Record<Locale, T>;

export function localize<T>(value: T | LocalizedValue<T>, locale: Locale = defaultLocale): T {
	if (value && typeof value === "object" && locale in value) {
		return (value as LocalizedValue<T>)[locale];
	}

	return value as T;
}

type NavChild = {
	label: string;
	href: string;
	description?: string;
};

type NavItem = {
	label: string;
	href: string;
	children?: NavChild[];
};

type Dictionary = {
	common: {
		requestDemo: string;
		discover: string;
		navigationMenu: string;
		languageSwitcherLabel: string;
	};
	navbar: {
		openMenu: string;
	};
	footer: {
		tagline: string;
		productsTitle: string;
		navigationTitle: string;
		certificationsTitle: string;
		builtBy: string;
		copyright: string;
	};
	navigation: NavItem[];
};

const dictionaries: Record<Locale, Dictionary> = {
	it: {
		common: {
			requestDemo: "Richiedi Demo",
			discover: "Scopri",
			navigationMenu: "Menu di navigazione",
			languageSwitcherLabel: "Selettore lingua",
		},
		navbar: {
			openMenu: "Apri menu",
		},
		footer: {
			tagline: "Biometria Digitalizzata per la diagnosi e il trattamento posturale.",
			productsTitle: "Prodotti",
			navigationTitle: "Navigazione",
			certificationsTitle: "Certificazioni",
			builtBy: "Progettato e sviluppato da",
			copyright: "Tutti i diritti riservati.",
		},
		navigation: [
			{ label: "Home", href: "/" },
			{
				label: "Prodotti",
				href: "/prodotti",
				children: [
					{
						label: "Baropodometro 3D U.S.",
						href: "/prodotti/baropodometro",
						description: "Piattaforma ad alta risoluzione con 7+ sensori/cm²",
					},
					{
						label: "Body-Scan 3D",
						href: "/prodotti/body-scan",
						description: "Valutazione posturale globale optoelettronica",
					},
					{
						label: "PodoScan 3D",
						href: "/prodotti/podo-scan",
						description: "Scanner plantare computerizzato 2D→3D",
					},
					{
						label: "PlantarCam",
						href: "/prodotti/plantarcam",
						description: "Fresatrice CNC per ortesi in 7 minuti",
					},
					{
						label: "Pressure Runner",
						href: "/prodotti/pressure-runner",
						description: "Tapis roulant con baropodometria integrata",
					},
				],
			},
			{ label: "Software", href: "/software" },
			{ label: "Assistenza", href: "/assistenza" },
			{ label: "Contatti", href: "/contatti" },
		],
	},
	en: {
		common: {
			requestDemo: "Request Demo",
			discover: "Discover",
			navigationMenu: "Navigation menu",
			languageSwitcherLabel: "Language switcher",
		},
		navbar: {
			openMenu: "Open menu",
		},
		footer: {
			tagline: "Digital biometrics for postural diagnosis and treatment.",
			productsTitle: "Products",
			navigationTitle: "Navigation",
			certificationsTitle: "Certifications",
			builtBy: "Designed and developed by",
			copyright: "All rights reserved.",
		},
		navigation: [
			{ label: "Home", href: "/" },
			{
				label: "Products",
				href: "/prodotti",
				children: [
					{
						label: "Baropodometer 3D U.S.",
						href: "/prodotti/baropodometro",
						description: "High-resolution platform with 7+ sensors/cm²",
					},
					{
						label: "Body-Scan 3D",
						href: "/prodotti/body-scan",
						description: "Optoelectronic full-body postural assessment",
					},
					{
						label: "PodoScan 3D",
						href: "/prodotti/podo-scan",
						description: "Computerized plantar scanner from 2D to 3D",
					},
					{
						label: "PlantarCam",
						href: "/prodotti/plantarcam",
						description: "CNC milling machine for orthotics in 7 minutes",
					},
					{
						label: "Pressure Runner",
						href: "/prodotti/pressure-runner",
						description: "Treadmill with integrated baropodometry",
					},
				],
			},
			{ label: "Software", href: "/software" },
			{ label: "Support", href: "/assistenza" },
			{ label: "Contact", href: "/contatti" },
		],
	},
};

export function getDictionary(locale: Locale = defaultLocale) {
	return dictionaries[locale] ?? dictionaries[defaultLocale];
}
