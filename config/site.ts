import type { SiteConfig } from "@/types/index";

export const siteConfig = {
	name: "Medical Support",
	description: {
		it: "Biometria Digitalizzata — Diagnosi e trattamento della postura",
		en: "Digital Biometry — Posture diagnosis and treatment",
	},
	url: "https://medical-support.it",

	nav: [
		{ label: { it: "Home", en: "Home" }, href: "/" },
		{
			label: { it: "Prodotti", en: "Products" },
			href: "/prodotti",
			children: [
				{
					label: { it: "Baropodometro 3D U.S.", en: "3D U.S. Baropodometer" },
					href: "/prodotti/baropodometro",
					description: {
						it: "Piattaforma ad alta risoluzione con 7+ sensori/cm²",
						en: "High-resolution platform with 7+ sensors/cm²",
					},
				},
				{
					label: { it: "Body-Scan 3D", en: "3D Body Scan" },
					href: "/prodotti/body-scan",
					description: {
						it: "Valutazione posturale globale optoelettronica",
						en: "Optoelectronic global postural assessment",
					},
				},
				{
					label: { it: "PodoScan 3D", en: "3D PodoScan" },
					href: "/prodotti/podo-scan",
					description: {
						it: "Scanner plantare computerizzato 2D→3D",
						en: "Computerized plantar scanner, 2D to 3D",
					},
				},
				{
					label: { it: "PlantarCam", en: "PlantarCam" },
					href: "/prodotti/plantarcam",
					description: {
						it: "Fresatrice CNC per ortesi in 7 minuti",
						en: "CNC milling machine for orthoses in 7 minutes",
					},
				},
				{
					label: { it: "Pressure Runner", en: "Pressure Runner" },
					href: "/prodotti/pressure-runner",
					description: {
						it: "Tapis roulant con baropodometria integrata",
						en: "Treadmill with integrated baropodometry",
					},
				},
			],
		},
		{ label: { it: "Software", en: "Software" }, href: "/software" },
		//{ label: { it: "Ambiti", en: "Applications" }, href: "/ambiti-applicazione" },
		{ label: { it: "Assistenza", en: "Support" }, href: "/assistenza" },
		{ label: { it: "Contatti", en: "Contacts" }, href: "/contatti" },
	],

	products: [
		{
			id: "baropodometro",
			name: { it: "Baropodometro 3D U.S.", en: "3D U.S. Baropodometer" },
			slug: "baropodometro",
			tagline: {
				it: "Pressioni plantari ad altissima risoluzione",
				en: "Ultra-high-resolution plantar pressures",
			},
			description: {
				it: "Piattaforma baropodometrica statica e dinamica con acquisizione 3D in tempo reale per un'analisi clinica del passo e della distribuzione del carico plantare.",
				en: "Static and dynamic baropodometric platform with real-time 3D acquisition for clinical gait analysis and plantar load distribution.",
			},
			badges: [{ it: "7+ sensori/cm²", en: "7+ sensors/cm²" }, { it: "Certificazione CE", en: "CE Certified" }, { it: "Fino a 200 fps", en: "Up to 200 fps" }],
			category: { it: "diagnostica", en: "diagnostics" },
			image: "/images/products/cristal-sport.png",
		},
		{
			id: "body-scan",
			name: { it: "Body-Scan 3D", en: "3D Body Scan" },
			slug: "body-scan",
			tagline: {
				it: "Postura globale misurata in pochi secondi",
				en: "Global posture measured in seconds",
			},
			description: {
				it: "Sistema optoelettronico per la valutazione posturale tridimensionale del rachide e degli arti, con analisi morfometrica automatica e reportistica clinica.",
				en: "Optoelectronic system for three-dimensional postural assessment of the spine and limbs, with automatic morphometric analysis and clinical reporting.",
			},
			badges: [{ it: "Optoelettronico", en: "Optoelectronic" }, { it: "Analisi 3D completa", en: "Complete 3D analysis" }, { it: "Report PDF/DICOM", en: "PDF/DICOM reports" }],
			category: { it: "diagnostica", en: "diagnostics" },
			image: "/images/products/bodyscan3d.png",
		},
		{
			id: "podo-scan",
			name: { it: "PodoScan 3D", en: "3D PodoScan" },
			slug: "podo-scan",
			tagline: {
				it: "Dal piede piatto al modello 3D in secondi",
				en: "From flat foot to 3D model in seconds",
			},
			description: {
				it: "Scanner plantare computerizzato che converte impronte 2D in modelli 3D precisi, integrabile con software CAD per la progettazione di ortesi su misura.",
				en: "Computerized plantar scanner that converts 2D footprints into precise 3D models, integrable with CAD software for custom orthoses design.",
			},
			badges: [{ it: "Risoluzione 0,1 mm", en: "0.1 mm resolution" }, { it: "Export STL/OBJ", en: "STL/OBJ export" }, { it: "Acquisizione < 3 s", en: "Capture < 3 s" }],
			category: { it: "diagnostica", en: "diagnostics" },
			image: "/images/products/podoscan3d.png",
		},
		{
			id: "plantarcam",
			name: { it: "PlantarCam", en: "PlantarCam" },
			slug: "plantarcam",
			tagline: {
				it: "Ortesi personalizzate in soli 7 minuti",
				en: "Custom orthoses in only 7 minutes",
			},
			description: {
				it: "Fresatrice CNC a 5 assi dedicata alla produzione di solette ortopediche su misura direttamente dallo studio, partendo dal modello 3D del paziente.",
				en: "5-axis CNC milling machine dedicated to custom orthotic insole production directly in the clinic, starting from the patient's 3D model.",
			},
			badges: [{ it: "Fresatura 5 assi", en: "5-axis milling" }, { it: "Ciclo in 7 min", en: "7-minute cycle" }, { it: "Certificazione CE IIa", en: "CE Class IIa certified" }],
			category: { it: "produzione", en: "production" },
			image: "/images/products/plantarcam.png",
		},
		{
			id: "pressure-runner",
			name: { it: "Pressure Runner", en: "Pressure Runner" },
			slug: "pressure-runner",
			tagline: {
				it: "Analisi del passo durante la corsa",
				en: "Gait analysis during running",
			},
			description: {
				it: "Tapis roulant clinico con piattaforma baropodometrica integrata per l'analisi dinamica della deambulazione e della corsa in condizioni controllate.",
				en: "Clinical treadmill with integrated baropodometric platform for dynamic gait and running analysis in controlled conditions.",
			},
			badges: [{ it: "0–20 km/h", en: "0–20 km/h" }, { it: "Baropodometria integrata", en: "Integrated baropodometry" }, { it: "Software gait analysis", en: "Gait analysis software" }],
			category: { it: "riabilitazione", en: "rehabilitation" },
			image: "/images/products/pressure-runner.png",
		},
	],
} as const satisfies SiteConfig;
