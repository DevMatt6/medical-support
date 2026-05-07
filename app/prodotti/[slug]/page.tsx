import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NavbarDark } from "@/components/ui/NavbarDark";
import { siteConfig } from "@/config/site";
import {
	ProductPageTemplate,
	type ProductPageProps,
} from "@/components/templates/ProductPageTemplate";
import type { Product } from "@/types";

/* ─── Static params ────────────────────────────────────────────── */
export function generateStaticParams() {
	return siteConfig.products.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ─────────────────────────────────────────────────── */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const product = siteConfig.products.find((p) => p.slug === slug);
	if (!product) return {};
	return {
		title: `${product.name} — Medical Support`,
		description: product.tagline,
	};
}

/* ─── Per-product data ─────────────────────────────────────────── */
type PageData = Omit<ProductPageProps, "product"> & {
	descriptionTitle?: string;
};

const PRODUCT_DATA: Record<string, PageData> = {
	baropodometro: {
		descriptionTitle:
			"Tecnologia brevettata, progettata per l'analisi avanzata delle pressioni plantari e della postura.",
		heroTagline:
			"Piattaforma baropodometrica ad alta risoluzione per l'analisi statica e dinamica del passo.",
		description: [
			"Il Baropodometro 3D U.S. è la soluzione di riferimento per la misurazione clinica della distribuzione del carico plantare. Con oltre 7 sensori per cm² e una frequenza di acquisizione fino a 200 fps, offre dati in tempo reale sia in posizione statica che durante la deambulazione o la corsa.",
			"Progettato per integrarsi nativamente con il software New BMS, consente di generare report clinici dettagliati in formato PDF e DICOM, condivisibili via cloud con il paziente o con altri specialisti. Certificazione CE MDR 2017/745.",
		],
		features: [
			{
				icon: "BarChart3",
				title: "Analisi Statica e Dinamica",
				description:
					"Rileva la distribuzione del carico in stazione eretta e durante il cammino con precisione millimetrica.",
			},
			{
				icon: "Layers",
				title: "Acquisizione Multistrato",
				description:
					"Tecnologia a strati sovrapposti per una mappatura tridimensionale della pressione plantare.",
			},
			{
				icon: "Wifi",
				title: "Connettività Cloud",
				description:
					"Trasmissione dati in tempo reale verso la piattaforma TELEPOSTUROLOGIA per la gestione remota.",
			},
		],
		specs: [
			{ label: "Sensori", value: "> 7 per cm²" },
			{ label: "Risoluzione", value: "0,5 mm" },
			{ label: "Dimensioni", value: "560 × 380 × 12 mm" },
			{ label: "Connessione", value: "USB 3.0 / Wi-Fi" },
			{ label: "Software", value: "New BMS (incluso)" },
		],
	},

	"body-scan": {
		descriptionTitle:
			"La più completa valutazione Posturale Globale per diagnosticare con precisione gli scompensi del corpo.",
		heroTagline:
			"Valutazione posturale globale in 3D con proiezione frontale, sagittale e trasversale.",
		description: [
			"Il Body-Scan 3D è un sistema optoelettronico per l'analisi posturale tridimensionale del rachide e degli arti. In pochi secondi acquisisce oltre 200 punti di repere anatomico, restituendo una mappa posturale completa con angoli, disassamenti e sbilanciamenti.",
			"Il sistema genera automaticamente report clinici con valori normativi di riferimento, supportando il professionista nella diagnosi e nel monitoraggio del paziente nel tempo. Compatibile con tutti i principali sistemi informativi clinici.",
		],
		features: [
			{
				icon: "Monitor",
				title: "Visualizzazione 3D",
				description:
					"Rappresentazione tridimensionale interattiva della postura del paziente con rotazione a 360°.",
			},
			{
				icon: "Activity",
				title: "Analisi Morfometrica",
				description:
					"Calcolo automatico di tutti i principali parametri posturali secondo i protocolli clinici internazionali.",
			},
			{
				icon: "Shield",
				title: "Certificazione MDR",
				description:
					"Dispositivo medico certificato CE MDR 2017/745, con tracciabilità completa delle misurazioni.",
			},
		],
		specs: [
			{ label: "Punti di repere", value: "> 200" },
			{ label: "Tempo acquisizione", value: "< 5 s" },
			{ label: "Output", value: "PDF / DICOM / CSV" },
			{ label: "Connessione", value: "Ethernet / Wi-Fi" },
			{ label: "Software", value: "New BMS (incluso)" },
		],
	},

	"podo-scan": {
		descriptionTitle:
			"La morfometria computerizzata dell'appoggio plantare misura l'effettiva condizione dell'arco plantare.",
		heroTagline:
			"Scanner plantare computerizzato per la rilevazione morfologica del piede.",
		description: [
			"Il PodoScan 3D converte l'impronta plantare bidimensionale in un modello tridimensionale ad alta precisione con risoluzione di 0,1 mm. Il processo di acquisizione richiede meno di 3 secondi e restituisce un file STL o OBJ immediatamente utilizzabile per la progettazione CAD di ortesi su misura.",
			"Integrato con il software New BMS, consente di correlare la morfologia plantare con i dati baropodometrici per una prescrizione ortesica scientificamente fondata.",
		],
		features: [
			{
				icon: "Cpu",
				title: "Scansione Ultra-Rapida",
				description:
					"Acquisizione completa del piede in meno di 3 secondi grazie alla tecnologia a luce strutturata.",
			},
			{
				icon: "Database",
				title: "Archivio Pazienti",
				description:
					"Gestione centralizzata di tutti i modelli 3D con storico delle scansioni e confronto temporale.",
			},
			{
				icon: "Globe",
				title: "Export Universale",
				description:
					"Esportazione nei formati STL, OBJ e PLY compatibili con tutti i principali software CAD/CAM.",
			},
		],
		specs: [
			{ label: "Risoluzione", value: "0,1 mm" },
			{ label: "Tempo acquisizione", value: "< 3 s" },
			{ label: "Formato export", value: "STL / OBJ / PLY" },
			{ label: "Connessione", value: "USB 3.0" },
			{ label: "Software", value: "New BMS (incluso)" },
		],
	},

	plantarcam: {
		descriptionTitle:
			"Un sistema integrato per la produzione di ortesi podaliche ad alta precisione.",
		heroTagline:
			"Sistema di acquisizione plantare con tecnologia a luce strutturata.",
		description: [
			"PlantarCam è un sistema di acquisizione e analisi dell'impronta plantare basato su tecnologia a luce strutturata. Permette di ottenere immagini ad alta definizione del profilo plantare in condizioni di carico reale, fornendo dati morfologici e pressori in un unico flusso di lavoro.",
			"Il sistema si integra perfettamente con la fresatrice CNC per la produzione di ortesi, consentendo di passare dall'acquisizione alla consegna del dispositivo finito in meno di 15 minuti.",
		],
		features: [
			{
				icon: "Zap",
				title: "Acquisizione Istantanea",
				description:
					"Tecnologia a luce strutturata per l'acquisizione dell'impronta in condizioni di carico statico e dinamico.",
			},
			{
				icon: "Heart",
				title: "Comfort Paziente",
				description:
					"Superficie di calpestio ergonomica e processo completamente non invasivo per la massima aderenza del paziente.",
			},
			{
				icon: "Cloud",
				title: "Workflow Integrato",
				description:
					"Collegamento diretto con il sistema di fresatura CNC per la produzione immediata dell'ortesi prescritta.",
			},
		],
		specs: [
			{ label: "Risoluzione immagine", value: "12 MP" },
			{ label: "Area rilevazione", value: "350 × 250 mm" },
			{ label: "Tecnologia", value: "Luce strutturata" },
			{ label: "Connessione", value: "USB-C" },
			{ label: "Software", value: "New BMS (incluso)" },
		],
	},

	"pressure-runner": {
		descriptionTitle:
			"Tecnologia all'avanguardia progettata su una struttura solida, affidabile e sicura.",
		heroTagline:
			"Tapis roulant con sensori di pressione integrati per l'analisi dinamica del passo.",
		description: [
			"Il Pressure Runner è un tapis roulant clinico dotato di piattaforma baropodometrica integrata che consente di analizzare la distribuzione del carico plantare durante la deambulazione e la corsa a velocità controllata. La velocità è regolabile da 0 a 20 km/h con incrementi di 0,1 km/h.",
			"I dati acquisiti vengono elaborati in tempo reale dal software New BMS per la generazione di reportistica clinica sulla gait analysis, inclusi i parametri di simmetria, cadenza, lunghezza del passo e distribuzione pressoria.",
		],
		features: [
			{
				icon: "Activity",
				title: "Gait Analysis in Tempo Reale",
				description:
					"Analisi completa del ciclo del passo con visualizzazione istantanea dei parametri spazio-temporali.",
			},
			{
				icon: "Settings",
				title: "Velocità Variabile",
				description:
					"Controllo preciso della velocità da 0 a 20 km/h con gradini di 0,1 km/h per protocolli clinici standardizzati.",
			},
			{
				icon: "Wifi",
				title: "Streaming Dati",
				description:
					"Trasmissione continua dei dati pressori verso workstation esterna tramite connessione cablata o wireless.",
			},
		],
		specs: [
			{ label: "Velocità", value: "0 – 20 km/h" },
			{ label: "Sensori", value: "> 4.000 celle di carico" },
			{ label: "Dimensioni piano", value: "1600 × 600 mm" },
			{ label: "Connessione", value: "Ethernet / Wi-Fi" },
			{ label: "Software", value: "New BMS (incluso)" },
		],
		models: [
			{
				name: "Pressure Runner Standard",
				dimensions: "1600 × 600 × 1200 mm",
				sensors: 4096,
				use: "Analisi deambulazione clinica",
			},
			{
				name: "Pressure Runner Pro",
				dimensions: "1800 × 700 × 1200 mm",
				sensors: 6144,
				use: "Analisi corsa e sport performance",
			},
		],
	},
};

/* ─── Page ─────────────────────────────────────────────────────── */
export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const product = siteConfig.products.find((p) => p.slug === slug) as
		| Product
		| undefined;

	if (!product) notFound();

	const data = PRODUCT_DATA[slug];
	if (!data) notFound();

	return (
		<>
			<NavbarDark />
			<ProductPageTemplate
				product={product}
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
