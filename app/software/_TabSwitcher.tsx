"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TABS = [
	{
		id: "new-bms",
		label: "New BMS",
		image: "/images/software/new-bms.jpg",
		title: "Piattaforma diagnostica integrata",
		description:
			"New BMS è il cuore del sistema Medical Support: una piattaforma software che unifica tutti i moduli diagnostici in un unico ambiente di lavoro, progettata per la clinica moderna.",
		features: [
			"Analisi statica e dinamica del carico plantare",
			"Report clinici in formato PDF e DICOM",
			"Sincronizzazione cloud con TELEPOSTUROLOGIA",
		],
	},
	{
		id: "rebiodes",
		label: "RebioDes",
		image: "/images/software/rebiodes.jpg",
		title: "Rieducazione biofeedback",
		description:
			"RebioDes è il modulo dedicato alla riabilitazione posturale attraverso protocolli di biofeedback personalizzabili, con visualizzazione in tempo reale dei parametri pressori.",
		features: [
			"Protocolli di training personalizzabili per ogni paziente",
			"Display real-time della distribuzione di carico",
			"Export dei dati di sessione in CSV e PDF",
		],
	},
	{
		id: "teleposturologia",
		label: "TELEPOSTUROLOGIA",
		image: "/images/software/teleposturologia.jpg",
		title: "Cloud per la posturologia",
		description:
			"TELEPOSTUROLOGIA è la piattaforma cloud che consente l'accesso remoto ai dati clinici, la condivisione dei referti tra professionisti e la gestione sicura delle cartelle pazienti.",
		features: [
			"Accesso remoto ai referti da qualsiasi dispositivo",
			"Condivisione sicura dei referti con colleghi o pazienti",
			"Infrastruttura GDPR compliant con cifratura end-to-end",
		],
	},
	{
		id: "biofeedback",
		label: "Biofeedback",
		image: "/images/software/biofeedback.jpg",
		title: "Feedback visivo in tempo reale",
		description:
			"Il modulo Biofeedback fornisce al paziente un ritorno visivo immediato della propria postura durante il training, favorendo la correzione attiva degli squilibri.",
		features: [
			"Training posturale con feedback visivo istantaneo",
			"Modalità gamification per aumentare la compliance del paziente",
			"Storico completo delle sessioni con andamento nel tempo",
		],
	},
] as const;

export function TabSwitcher() {
	const [active, setActive] = useState<string>(TABS[0].id);
	const current = TABS.find((t) => t.id === active)!;

	return (
		<>
			<style>{`
				@media (min-width: 768px) {
					.tab-content-grid { grid-template-columns: 45fr 55fr !important; }
				}
			`}</style>
			<section
				style={{
					background: "white",
					paddingBlock: "clamp(80px,10vw,120px)",
					paddingInline: "clamp(24px,5vw,80px)",
				}}
			>
				{/* Tab bar */}
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						borderBottom: "1px solid var(--border)",
						gap: 0,
						marginBottom: "clamp(40px,5vw,64px)",
					}}
				>
					{TABS.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActive(tab.id)}
							style={{
								background: "none",
								border: "none",
								borderBottom: `2px solid ${active === tab.id ? "var(--accent)" : "transparent"}`,
								padding: "12px 24px",
								fontSize: "var(--text-sm)",
								fontWeight: active === tab.id ? 600 : 500,
								color:
									active === tab.id
										? "var(--primary)"
										: "var(--muted-foreground)",
								cursor: "pointer",
								marginBottom: -1,
								transition: "color 200ms, border-color 200ms",
							}}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Tab content grid */}
				<div
					className="tab-content-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "1fr",
						gap: "clamp(32px,5vw,64px)",
						alignItems: "center",
					}}
				>
					{/* LEFT — image */}
					<div
						style={{
							aspectRatio: "4/3",
							overflow: "hidden",
							position: "relative",
						}}
					>
						<AnimatePresence mode="wait">
							<motion.div
								key={current.id}
								initial={{ opacity: 0, scale: 1.04 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 1.04 }}
								transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
								style={{
									width: "100%",
									height: "100%",
									position: "absolute",
									inset: 0,
								}}
							>
								{current.image ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={current.image}
										alt={current.title}
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
											display: "block",
										}}
										onError={(e) => {
											(e.currentTarget as HTMLImageElement).style.display =
												"none";
											const placeholder = e.currentTarget
												.nextSibling as HTMLElement | null;
											if (placeholder) placeholder.style.display = "block";
										}}
									/>
								) : null}
								<div
									style={{
										display: current.image ? "none" : "block",
										width: "100%",
										height: "100%",
										background:
											"linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 50%, white) 100%)",
									}}
								/>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* RIGHT — text */}
					<AnimatePresence mode="wait">
						<motion.div
							key={active}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<h3
								style={{
									margin: 0,
									fontSize: "var(--text-2xl)",
									fontWeight: 500,
									color: "var(--primary)",
								}}
							>
								{current.title}
							</h3>
							<p
								style={{
									marginTop: 16,
									fontSize: "var(--text-base)",
									color: "var(--muted-foreground)",
									lineHeight: 1.75,
									maxWidth: 640,
								}}
							>
								{current.description}
							</p>
							<ul
								style={{
									marginTop: 24,
									paddingLeft: 0,
									listStyle: "none",
									display: "flex",
									flexDirection: "column",
									gap: 12,
								}}
							>
								{current.features.map((feat) => (
									<li
										key={feat}
										style={{
											display: "flex",
											alignItems: "flex-start",
											gap: 12,
											fontSize: "var(--text-sm)",
											color: "var(--primary)",
										}}
									>
										<span
											style={{
												width: 6,
												height: 6,
												background: "var(--accent)",
												marginTop: 6,
												flexShrink: 0,
											}}
										/>
										{feat}
									</li>
								))}
							</ul>
						</motion.div>
					</AnimatePresence>
				</div>
			</section>
		</>
	);
}
