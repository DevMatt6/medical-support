import type { SiteConfig } from "@/types/index";

export const siteConfig = {
	name: "Medical Support",
	description: "Biometria Digitalizzata — Diagnosi e trattamento della postura",
	url: "https://medical-support.it",

	nav: [
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
		//{ label: "Ambiti", href: "/ambiti-applicazione" },
		{ label: "Assistenza", href: "/assistenza" },
		{ label: "Contatti", href: "/contatti" },
	],

	products: [
		{
			id: "baropodometro",
			name: "Baropodometro 3D U.S.",
			slug: "baropodometro",
			tagline: "Pressioni plantari ad altissima risoluzione",
			description:
				"Piattaforma baropodometrica statica e dinamica con acquisizione 3D in tempo reale per un'analisi clinica del passo e della distribuzione del carico plantare.",
			badges: ["7+ sensori/cm²", "Certificazione CE", "Up to 200 fps"],
			category: "diagnostica",
			image: "/images/products/cristal-sport.png",
		},
		{
			id: "body-scan",
			name: "Body-Scan 3D",
			slug: "body-scan",
			tagline: "Postura globale misurata in pochi secondi",
			description:
				"Sistema optoelettronico per la valutazione posturale tridimensionale del rachide e degli arti, con analisi morfometrica automatica e reportistica clinica.",
			badges: ["Optoelettronico", "Analisi 3D completa", "Report PDF/DICOM"],
			category: "diagnostica",
			image: "/images/products/bodyscan3d.png",
		},
		{
			id: "podo-scan",
			name: "PodoScan 3D",
			slug: "podo-scan",
			tagline: "Dal piede piatto al modello 3D in secondi",
			description:
				"Scanner plantare computerizzato che converte impronte 2D in modelli 3D precisi, integrabile con software CAD per la progettazione di ortesi su misura.",
			badges: ["Risoluzione 0,1 mm", "Export STL/OBJ", "Acquisizione < 3 s"],
			category: "diagnostica",
			image: "/images/products/podoscan3d.png",
		},
		{
			id: "plantarcam",
			name: "PlantarCam",
			slug: "plantarcam",
			tagline: "Ortesi personalizzate in soli 7 minuti",
			description:
				"Fresatrice CNC a 5 assi dedicata alla produzione di solette ortopediche su misura direttamente dallo studio, partendo dal modello 3D del paziente.",
			badges: ["Fresatura 5 assi", "Ciclo in 7 min", "Certificazione CE IIa"],
			category: "produzione",
			image: "/images/products/plantarcam.png",
		},
		{
			id: "pressure-runner",
			name: "Pressure Runner",
			slug: "pressure-runner",
			tagline: "Analisi del passo durante la corsa",
			description:
				"Tapis roulant clinico con piattaforma baropodometrica integrata per l'analisi dinamica della deambulazione e della corsa in condizioni controllate.",
			badges: [
				"0–20 km/h",
				"Baropodometria integrata",
				"Software gait analysis",
			],
			category: "riabilitazione",
			image: "/images/products/pressure-runner.png",
		},
	],
} as const satisfies SiteConfig;
