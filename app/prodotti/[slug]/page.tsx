import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
	ProductPageTemplate,
	type ProductPageProps,
} from "@/components/templates/ProductPageTemplate";
import type { Product } from "@/types";
import { localize, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
	return siteConfig.products.flatMap((p) => [
		{ slug: p.slug, locale: "it" },
		{ slug: p.slug, locale: "en" },
	]);
}

/* ─── Metadata ─────────────────────────────────────────────────── */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string; locale?: Locale }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const product = siteConfig.products.find((p) => p.slug === slug);
	if (!product) return {};
	return {
		title: `${localize(product.name)} — Medical Support`,
		description: localize(product.tagline),
	};
}

/* ─── Per-product data ─────────────────────────────────────────── */
type PageData = Omit<ProductPageProps, "product"> & {
	descriptionTitle?: string;
	ebdSection?: {
		title: string;
		subtitle: string;
		description: string;
		items: Array<{ icon: string; title: string; description: string }>;
	};
};

const PRODUCT_DATA: Record<string, Record<Locale, PageData>> = {
	baropodometro: {
		it: {
			descriptionTitle:
				"Tecnologia ULTRASENSOR brevettata: 7 sensori/cm² per l'analisi più precisa delle pressioni plantari.",
			heroTagline:
				"Piattaforma baropodometrica ad alta risoluzione per l'analisi statica e dinamica del passo.",
			description: [
				"Il Baropodometro 3D U.S. è la piattaforma di riferimento per la misurazione clinica della distribuzione del carico plantare. La tecnologia ULTRASENSOR garantisce 7 sensori per cm² — 7 volte superiore alla concorrenza — con un disturbo elettrico di appena 0,80% rispetto al 22% degli altri sistemi.",
				"La superficie rigida (nessun tappetino in gomma) garantisce acquisizioni ripetibili nelle 4 direzioni, validate scientificamente. Il sistema è espandibile fino a 200 × 50 cm ed è compatibile sia con calzature che senza. Integrazione nativa con il software New BMS e certificazione CE MDR 2017/745.",
			],
			features: [
				{ icon: "BarChart3", title: "7 Sensori/cm² ULTRASENSOR", description: "Densità sensoriale 7× superiore alla concorrenza. Disturbo elettrico 0,80% vs 22% degli altri sistemi per dati clinicamente affidabili." },
				{ icon: "Layers", title: "Superficie Rigida Espandibile", description: "Nessun tappetino in gomma: acquisizioni stabili e ripetibili nelle 4 direzioni. Espandibile fino a 200 × 50 cm." },
				{ icon: "Activity", title: "5 Protocolli di Test", description: "Test Statico, Dinamico/Gait Cycle, Stabilometrico, Confronto Statico/Dinamico e valutazione con/senza calzature." },
				{ icon: "Shield", title: "Validazione Scientifica", description: "Acquisizioni nelle 4 direzioni validate con 20 anni di ricerca e pubblicazioni su riviste internazionali indicizzate." },
				{ icon: "Wifi", title: "Connettività Cloud", description: "Trasmissione dati in tempo reale verso la piattaforma TELEPOSTUROLOGIA per la gestione remota." },
				{ icon: "Cpu", title: "Compatibilità Calzature", description: "Test eseguibili con e senza calzature. Ideale per protocolli sportivi e clinici differenziati." },
			],
			specs: [
				{ label: "Tecnologia sensori", value: "ULTRASENSOR — 7/cm²" },
				{ label: "Disturbo elettrico", value: "0,80%" },
				{ label: "Superficie", value: "Rigida — no gomma" },
				{ label: "Direzioni acquisizione", value: "4 (validate scientificamente)" },
				{ label: "Connessione", value: "USB 3.0 / Wi-Fi" },
				{ label: "Software", value: "New BMS (incluso)" },
				{ label: "Certificazione", value: "CE MDR 2017/745" },
			],
			models: [
				{ name: "CRISTAL 1", dimensions: "50 × 50 cm", sensors: 16384, use: "Stabilometria clinica" },
				{ name: "CRISTAL 2", dimensions: "100 × 50 cm", sensors: 32768, use: "Rotolamento podalico dinamico" },
				{ name: "CRISTAL SP", dimensions: "150 × 50 cm", sensors: 49152, use: "Approfondimento sportivo" },
				{ name: "CRISTAL 3", dimensions: "200 × 50 cm", sensors: 65536, use: "Valori dinamici del passo" },
			],
			ebdSection: {
				title: "Sistema EBD - Esame Biometrico Digitalizzato",
				subtitle: "Il protocollo diagnostico standardizzato validato da 20 anni di ricerca scientifica.",
				description: "Il Sistema EBD integra il Baropodometro 3D U.S. in un protocollo diagnostico completo. Ogni esame produce un Indice Biomeccanico Posturale (IBP) su scala 0–3 e un referto descrittivo automatico (ReBioDes), conforme alle linee guida del Ministero della Salute.",
				items: [
					{ icon: "BarChart3", title: "Indice Biomeccanico Posturale (IBP)", description: "Scala standardizzata 0–3 per la classificazione oggettiva dello stato posturale del paziente." },
					{ icon: "Database", title: "Report ReBioDes", description: "Referto descrittivo automatico generato al termine di ogni esame, pronto per la cartella clinica." },
					{ icon: "Heart", title: "Questionario Posturologico", description: "Modulo anamnestico integrato per la raccolta standardizzata dei dati clinici del paziente." },
					{ icon: "Shield", title: "Validazione Scientifica", description: "20 anni di ricerca, pubblicazioni su riviste internazionali indicizzate e conformità alle linee guida del Ministero della Salute." },
				],
			},
		},
		en: {
			descriptionTitle:
				"Patented ULTRASENSOR technology: 7 sensors/cm² for the most precise plantar pressure analysis.",
			heroTagline:
				"High-resolution baropodometric platform for static and dynamic gait analysis.",
			description: [
				"The 3D U.S. Baropodometer is the reference platform for clinical measurement of plantar load distribution. ULTRASENSOR technology delivers 7 sensors per cm² — 7 times denser than the competition — with electrical disturbance as low as 0.80% compared with 22% on other systems.",
				"The rigid surface (no rubber mat) ensures repeatable acquisitions in all 4 directions, scientifically validated. The system is expandable up to 200 × 50 cm and works both with and without shoes. Native integration with New BMS software and CE MDR 2017/745 certification.",
			],
			features: [
				{ icon: "BarChart3", title: "7 Sensors/cm² ULTRASENSOR", description: "Sensor density 7× higher than the competition. Electrical disturbance of 0.80% vs 22% for clinically reliable data." },
				{ icon: "Layers", title: "Expandable Rigid Surface", description: "No rubber mat: stable and repeatable acquisitions in all four directions. Expandable up to 200 × 50 cm." },
				{ icon: "Activity", title: "5 Test Protocols", description: "Static Test, Dynamic/Gait Cycle, Stabilometric, Static/Dynamic Comparison, and with/without shoes evaluation." },
				{ icon: "Shield", title: "Scientific Validation", description: "Acquisitions in 4 directions validated by 20 years of research and publications in indexed international journals." },
				{ icon: "Wifi", title: "Cloud Connectivity", description: "Real-time data transmission to the TELEPOSTUROLOGY platform for remote management." },
				{ icon: "Cpu", title: "Shoe Compatibility", description: "Tests can be performed with and without shoes. Ideal for differentiated sports and clinical protocols." },
			],
			specs: [
				{ label: "Sensor technology", value: "ULTRASENSOR — 7/cm²" },
				{ label: "Electrical disturbance", value: "0.80%" },
				{ label: "Surface", value: "Rigid — no rubber" },
				{ label: "Acquisition directions", value: "4 (scientifically validated)" },
				{ label: "Connection", value: "USB 3.0 / Wi‑Fi" },
				{ label: "Software", value: "New BMS (included)" },
				{ label: "Certification", value: "CE MDR 2017/745" },
			],
			models: [
				{ name: "CRISTAL 1", dimensions: "50 × 50 cm", sensors: 16384, use: "Clinical stabilometry" },
				{ name: "CRISTAL 2", dimensions: "100 × 50 cm", sensors: 32768, use: "Dynamic plantar roll-off" },
				{ name: "CRISTAL SP", dimensions: "150 × 50 cm", sensors: 49152, use: "Sports analysis" },
				{ name: "CRISTAL 3", dimensions: "200 × 50 cm", sensors: 65536, use: "Dynamic gait metrics" },
			],
			ebdSection: {
				title: "EBD System - Digital Biometrics Exam",
				subtitle: "A standardized diagnostic protocol validated by 20 years of scientific research.",
				description: "The EBD System integrates the 3D U.S. Baropodometer into a complete diagnostic workflow. Each exam produces a Postural Biomechanical Index (IBP) on a 0–3 scale and an automatic descriptive report (ReBioDes), aligned with Ministry of Health guidelines.",
				items: [
					{ icon: "BarChart3", title: "Postural Biomechanical Index (IBP)", description: "Standardized 0–3 scale for objective classification of the patient's postural status." },
					{ icon: "Database", title: "ReBioDes Report", description: "Automatic descriptive report generated at the end of each exam, ready for the clinical record." },
					{ icon: "Heart", title: "Posturology Questionnaire", description: "Integrated anamnesis form for standardized collection of patient clinical data." },
					{ icon: "Shield", title: "Scientific Validation", description: "20 years of research, publications in indexed international journals, and compliance with Ministry of Health guidelines." },
				],
			},
		},
	},
	"body-scan": {
		it: {
			descriptionTitle: "La più completa valutazione Posturale Globale per diagnosticare con precisione gli scompensi del corpo.",
			heroTagline: "Valutazione posturale globale in 3D con proiezione frontale, sagittale e trasversale.",
			description: [
				"Il Body-Scan 3D è un sistema optoelettronico per l'analisi posturale tridimensionale del rachide e degli arti. In pochi secondi acquisisce oltre 200 punti di repere anatomico, restituendo una mappa posturale completa con angoli, disassamenti e sbilanciamenti.",
				"Il sistema genera automaticamente report clinici con valori normativi di riferimento, supportando il professionista nella diagnosi e nel monitoraggio del paziente nel tempo. Compatibile con tutti i principali sistemi informativi clinici.",
			],
			features: [
				{ icon: "Monitor", title: "Visualizzazione 3D", description: "Rappresentazione tridimensionale interattiva della postura del paziente con rotazione a 360°." },
				{ icon: "Activity", title: "Analisi Morfometrica", description: "Calcolo automatico di tutti i principali parametri posturali secondo i protocolli clinici internazionali." },
				{ icon: "Settings", title: "Protocolli Personalizzabili", description: "Configurazione adattabile a diversi protocolli di valutazione e specialità cliniche." },
				{ icon: "Cloud", title: "Report Cloud", description: "Archiviazione e condivisione dei report attraverso la piattaforma cloud integrata." },
			],
			specs: [
				{ label: "Punti anatomici", value: "> 200" },
				{ label: "Tempo acquisizione", value: "< 5 s" },
				{ label: "Output", value: "Report 3D + PDF" },
				{ label: "Connessione", value: "USB / Ethernet" },
				{ label: "Software", value: "New BMS (incluso)" },
			],
			models: [
				{ name: "Body-Scan Core", dimensions: "2400 × 1200 × 2200 mm", sensors: 0, use: "Studio specialistico" },
				{ name: "Body-Scan Pro", dimensions: "2600 × 1400 × 2200 mm", sensors: 0, use: "Ambulatori e centri medici" },
			],
		},
		en: {
			descriptionTitle: "The most complete global postural assessment for precisely diagnosing body imbalances.",
			heroTagline: "3D global postural assessment with frontal, sagittal and transverse projection.",
			description: [
				"The 3D Body-Scan is an optoelectronic system for three-dimensional postural analysis of the spine and limbs. In just a few seconds it acquires more than 200 anatomical landmarks, delivering a complete postural map with angles, offsets and asymmetries.",
				"The system automatically generates clinical reports with reference normative values, supporting the professional in diagnosis and in monitoring the patient over time. Compatible with all major clinical information systems.",
			],
			features: [
				{ icon: "Monitor", title: "3D Visualization", description: "Interactive three-dimensional representation of the patient's posture with 360° rotation." },
				{ icon: "Activity", title: "Morphometric Analysis", description: "Automatic calculation of all major postural parameters according to international clinical protocols." },
				{ icon: "Settings", title: "Customizable Protocols", description: "Configuration adaptable to different assessment protocols and clinical specialties." },
				{ icon: "Cloud", title: "Cloud Reports", description: "Storage and sharing of reports through the integrated cloud platform." },
			],
			specs: [
				{ label: "Anatomical points", value: "> 200" },
				{ label: "Acquisition time", value: "< 5 s" },
				{ label: "Output", value: "3D report + PDF" },
				{ label: "Connection", value: "USB / Ethernet" },
				{ label: "Software", value: "New BMS (included)" },
			],
			models: [
				{ name: "Body-Scan Core", dimensions: "2400 × 1200 × 2200 mm", sensors: 0, use: "Specialist clinic" },
				{ name: "Body-Scan Pro", dimensions: "2600 × 1400 × 2200 mm", sensors: 0, use: "Outpatient and medical centers" },
			],
		},
	},
	"podo-scan": {
		it: {
			descriptionTitle: "Scanner 2D→3D per l'analisi plantare computerizzata con precisione millimetrica.",
			heroTagline: "Acquisizione delle impronte plantari in pochi secondi con conversione automatica 2D→3D.",
			description: [
				"PodoScan 3D è uno scanner plantare computerizzato per la rilevazione del profilo del piede e della distribuzione pressoria. Il sistema acquisisce l'immagine plantare in tempo reale e genera automaticamente mappe 2D e modelli 3D per la valutazione clinica.",
				"Grazie al flusso di lavoro integrato, il professionista può passare rapidamente dalla scansione alla refertazione, con export diretto verso il software gestionale e i moduli diagnostici Medical Support.",
			],
			features: [
				{ icon: "Monitor", title: "Scansione Rapida", description: "Acquisizione plantare in pochi secondi con allineamento automatico." },
				{ icon: "Layers", title: "Mappatura 2D/3D", description: "Generazione di mappe planari e modelli tridimensionali per l'analisi comparativa." },
				{ icon: "Database", title: "Archivio Pazienti", description: "Archiviazione storica delle scansioni e confronto nel tempo." },
				{ icon: "Wifi", title: "Sincronizzazione Cloud", description: "Condivisione sicura dei dati tra studi e workstation abilitate." },
			],
			specs: [
				{ label: "Risoluzione", value: "0,1 mm" },
				{ label: "Tempo acquisizione", value: "< 3 s" },
				{ label: "Formato export", value: "STL / OBJ / PLY" },
				{ label: "Connessione", value: "USB 3.0" },
				{ label: "Software", value: "New BMS (incluso)" },
			],
		},
		en: {
			descriptionTitle: "2D→3D scanner for computerized plantar analysis with millimeter precision.",
			heroTagline: "Capture plantar impressions in seconds with automatic 2D→3D conversion.",
			description: [
				"PodoScan 3D is a computerized plantar scanner for capturing the foot profile and pressure distribution. The system acquires the plantar image in real time and automatically generates 2D maps and 3D models for clinical assessment.",
				"With its integrated workflow, professionals can move quickly from scanning to reporting, with direct export to practice management software and Medical Support diagnostic modules.",
			],
			features: [
				{ icon: "Monitor", title: "Fast Scanning", description: "Plantar acquisition in seconds with automatic alignment." },
				{ icon: "Layers", title: "2D/3D Mapping", description: "Generation of planar maps and three-dimensional models for comparative analysis." },
				{ icon: "Database", title: "Patient Archive", description: "Historical storage of scans and comparison over time." },
				{ icon: "Wifi", title: "Cloud Sync", description: "Secure sharing of data between connected clinics and workstations." },
			],
			specs: [
				{ label: "Resolution", value: "0.1 mm" },
				{ label: "Acquisition time", value: "< 3 s" },
				{ label: "Export format", value: "STL / OBJ / PLY" },
				{ label: "Connection", value: "USB 3.0" },
				{ label: "Software", value: "New BMS (included)" },
			],
		},
	},
	plantarcam: {
		it: {
			descriptionTitle: "Un sistema integrato per la produzione di ortesi podaliche ad alta precisione.",
			heroTagline: "Sistema di acquisizione plantare con tecnologia a luce strutturata.",
			description: [
				"PlantarCam è un sistema di acquisizione e analisi dell'impronta plantare basato su tecnologia a luce strutturata. Permette di ottenere immagini ad alta definizione del profilo plantare in condizioni di carico reale, fornendo dati morfologici e pressori in un unico flusso di lavoro.",
				"Il sistema si integra perfettamente con la fresatrice CNC per la produzione di ortesi, consentendo di passare dall'acquisizione alla consegna del dispositivo finito in meno di 15 minuti.",
			],
			features: [
				{ icon: "Zap", title: "Acquisizione Istantanea", description: "Tecnologia a luce strutturata per l'acquisizione dell'impronta in condizioni di carico statico e dinamico." },
				{ icon: "Heart", title: "Comfort Paziente", description: "Superficie di calpestio ergonomica e processo completamente non invasivo per la massima aderenza del paziente." },
				{ icon: "Cloud", title: "Workflow Integrato", description: "Collegamento diretto con il sistema di fresatura CNC per la produzione immediata dell'ortesi prescritta." },
			],
			specs: [
				{ label: "Risoluzione immagine", value: "12 MP" },
				{ label: "Area rilevazione", value: "350 × 250 mm" },
				{ label: "Tecnologia", value: "Luce strutturata" },
				{ label: "Connessione", value: "USB-C" },
				{ label: "Software", value: "New BMS (incluso)" },
			],
		},
		en: {
			descriptionTitle: "Integrated system for high-precision foot orthoses production.",
			heroTagline: "Plantar acquisition system with structured light technology.",
			description: [
				"PlantarCam is a plantar imaging and analysis system based on structured light technology. It captures high-definition images of the foot profile under real load conditions, providing morphological and pressure data in a single workflow.",
				"The system integrates seamlessly with the CNC milling machine for orthosis production, allowing the finished device to be delivered in under 15 minutes from acquisition to completion.",
			],
			features: [
				{ icon: "Zap", title: "Instant Acquisition", description: "Structured light technology for imprint acquisition under static and dynamic load conditions." },
				{ icon: "Heart", title: "Patient Comfort", description: "Ergonomic support surface and a completely non-invasive process for maximum patient compliance." },
				{ icon: "Cloud", title: "Integrated Workflow", description: "Direct connection to the CNC milling system for immediate production of the prescribed orthosis." },
			],
			specs: [
				{ label: "Image resolution", value: "12 MP" },
				{ label: "Capture area", value: "350 × 250 mm" },
				{ label: "Technology", value: "Structured light" },
				{ label: "Connection", value: "USB-C" },
				{ label: "Software", value: "New BMS (included)" },
			],
		},
	},
	"pressure-runner": {
		it: {
			descriptionTitle: "Tecnologia all'avanguardia progettata su una struttura solida, affidabile e sicura.",
			heroTagline: "Tapis roulant con sensori di pressione integrati per l'analisi dinamica del passo.",
			description: [
				"Il Pressure Runner è un tapis roulant clinico dotato di piattaforma baropodometrica integrata che consente di analizzare la distribuzione del carico plantare durante la deambulazione e la corsa a velocità controllata. La velocità è regolabile da 0 a 20 km/h con incrementi di 0,1 km/h.",
				"La struttura robusta, il piano di corsa ammortizzato e l'integrazione con software Medical Support consentono test riproducibili in ambienti clinici e sportivi. Il sistema è predisposto per acquisizioni sincronizzate e reportistica automatica.",
			],
			features: [
				{ icon: "Activity", title: "Analisi Dinamica", description: "Valutazione continua della distribuzione pressoria durante cammino e corsa." },
				{ icon: "Settings", title: "Velocità Regolabile", description: "Controllo fine da 0 a 20 km/h con step minimi da 0,1 km/h." },
				{ icon: "Cloud", title: "Integrazione Dati", description: "Esportazione automatica verso software clinico e report digitali." },
				{ icon: "Shield", title: "Struttura Sicura", description: "Telaio stabile progettato per ambienti medici ad uso intensivo." },
			],
			specs: [
				{ label: "Velocità", value: "0 – 20 km/h" },
				{ label: "Sensori", value: "> 4.000 celle di carico" },
				{ label: "Dimensioni piano", value: "1600 × 600 mm" },
				{ label: "Connessione", value: "Ethernet / Wi-Fi" },
				{ label: "Software", value: "New BMS (incluso)" },
			],
			models: [
				{ name: "Pressure Runner Standard", dimensions: "1600 × 600 × 1200 mm", sensors: 4096, use: "Analisi deambulazione clinica" },
				{ name: "Pressure Runner Pro", dimensions: "1800 × 700 × 1200 mm", sensors: 6144, use: "Analisi corsa e sport performance" },
			],
		},
		en: {
			descriptionTitle: "Cutting-edge technology built on a solid, reliable and safe structure.",
			heroTagline: "Treadmill with integrated pressure sensors for dynamic gait analysis.",
			description: [
				"The Pressure Runner is a clinical treadmill with an integrated baropodometric platform that analyses plantar load distribution during walking and running at controlled speeds. Speed is adjustable from 0 to 20 km/h in 0.1 km/h increments.",
				"Its robust structure, cushioned running deck and integration with Medical Support software make reproducible testing possible in clinical and sports settings. The system is ready for synchronized acquisition and automatic reporting.",
			],
			features: [
				{ icon: "Activity", title: "Dynamic Analysis", description: "Continuous assessment of pressure distribution during walking and running." },
				{ icon: "Settings", title: "Adjustable Speed", description: "Fine control from 0 to 20 km/h with minimum 0.1 km/h increments." },
				{ icon: "Cloud", title: "Data Integration", description: "Automatic export to clinical software and digital reports." },
				{ icon: "Shield", title: "Safe Structure", description: "Stable frame designed for intensive medical environments." },
			],
			specs: [
				{ label: "Speed", value: "0 – 20 km/h" },
				{ label: "Sensors", value: "> 4,000 load cells" },
				{ label: "Deck size", value: "1600 × 600 mm" },
				{ label: "Connection", value: "Ethernet / Wi‑Fi" },
				{ label: "Software", value: "New BMS (included)" },
			],
			models: [
				{ name: "Pressure Runner Standard", dimensions: "1600 × 600 × 1200 mm", sensors: 4096, use: "Clinical gait analysis" },
				{ name: "Pressure Runner Pro", dimensions: "1800 × 700 × 1200 mm", sensors: 6144, use: "Running and sports performance analysis" },
			],
		},
	},
};
/* ─── Page ─────────────────────────────────────────────────────── */
export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string; locale?: Locale }>;
}) {
	const { slug, locale = "it" } = await params;

	const product = siteConfig.products.find((p) => p.slug === slug) as
		| Product
		| undefined;

	if (!product) notFound();

	const data = PRODUCT_DATA[slug]?.[locale as Locale] ?? PRODUCT_DATA[slug]?.it;
	if (!data) notFound();

	return (
		<>
						<ProductPageTemplate
				locale={locale}
				product={{
				...product,
				name: localize(product.name),
				tagline: localize(product.tagline),
				description: localize(product.description),
				category: localize(product.category),
				badges: product.badges.map((badge) => localize(badge, locale)),
			}}
				heroTagline={data.heroTagline}
				description={data.description}
				descriptionTitle={data.descriptionTitle}
				features={data.features}
				specs={data.specs}
				models={data.models}
				ebdSection={data.ebdSection}
			/>
		</>
	);
}
