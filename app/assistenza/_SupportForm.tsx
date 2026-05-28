"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";

/* ─── Opzioni select ────────────────────────────────────────────── */
const SISTEMI = [
	"",
	"Baropodometro 2D Sensor One",
	"Baropodometro 2D Multisensor",
	"Baropodometro 3D Ultrasensor",
	"Baropodometro Diagnostico 3D LAC",
	"Body Analysis Capture",
	"Podoscanalyzer",
	"Plantarcam",
	"Personal Computer",
	"Altro",
];

/* ─── Stili condivisi ───────────────────────────────────────────── */
const labelStyle: React.CSSProperties = {
	display: "block",
	fontSize: "var(--text-xs)",
	textTransform: "uppercase",
	letterSpacing: "0.08em",
	marginBottom: 6,
	color: "var(--accent)",
};

function fieldStyle(hasError: boolean): React.CSSProperties {
	return {
		width: "100%",
		border: hasError
			? "1px solid var(--destructive)"
			: "1px solid rgba(255,255,255,0.2)",
		padding: "12px 16px",
		fontSize: "var(--text-sm)",
		background: "rgba(255,255,255,0.05)",
		color: "white",
		outline: "none",
		boxSizing: "border-box",
		fontFamily: "inherit",
	};
}

/* ─── Tipi ──────────────────────────────────────────────────────── */
interface FormState {
	dataRichiesta: string;
	codiceCliente: string;
	cliente: string;
	referente: string;
	telefono: string;
	email: string;
	orariContatto: string;
	sistema: string;
	tipologiaModello: string;
	software: string;
	marcaComputer: string;
	versioneWindows: string;
	numTelecamere: string;
	descrizione: string;
	autorizzaSupremo: boolean;
	dichiarazioneEol: boolean;
	contrattoAssistenza: string;
}

const initialState: FormState = {
	dataRichiesta: "",
	codiceCliente: "",
	cliente: "",
	referente: "",
	telefono: "",
	email: "",
	orariContatto: "",
	sistema: "",
	tipologiaModello: "",
	software: "",
	marcaComputer: "",
	versioneWindows: "",
	numTelecamere: "",
	descrizione: "",
	autorizzaSupremo: false,
	dichiarazioneEol: false,
	contrattoAssistenza: "",
};

/* ════════════════════════════════════════════════════════════════ */
/*  COMPONENTE                                                      */
/* ════════════════════════════════════════════════════════════════ */
export function SupportForm() {
	const [form, setForm] = useState<FormState>(initialState);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState<Record<string, boolean>>({});

	function handleChange(
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) {
		const { name, value, type } = e.target;
		setForm((prev) => ({
			...prev,
			[name]:
				type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
		}));
	}

	function validate(): Record<string, boolean> {
		const errs: Record<string, boolean> = {};
		if (!form.cliente.trim()) errs.cliente = true;
		if (!form.referente.trim()) errs.referente = true;
		if (!form.telefono.trim()) errs.telefono = true;
		if (!form.email.trim()) errs.email = true;
		if (!form.sistema) errs.sistema = true;
		if (!form.descrizione.trim()) errs.descrizione = true;
		if (!form.autorizzaSupremo) errs.autorizzaSupremo = true;
		return errs;
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const errs = validate();
		if (Object.keys(errs).length > 0) {
			setErrors(errs);
			return;
		}
		setErrors({});
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSuccess(true);
		}, 1500);
	}

	/* ── Stile checkbox row ────────────────────────────────────────── */
	const checkboxRowStyle: React.CSSProperties = {
		display: "flex",
		alignItems: "flex-start",
		gap: 10,
		cursor: "pointer",
	};

	const checkboxLabelStyle: React.CSSProperties = {
		fontSize: "var(--text-xs)",
		color: "rgba(255,255,255,0.8)",
		lineHeight: 1.5,
		userSelect: "none",
	};

	return (
		<>
			<style>{`
				@media (min-width: 768px) {
					.support-grid { grid-template-columns: 1fr 1fr !important; }
					.support-form-row { grid-template-columns: 1fr 1fr !important; }
				}
				.support-grid input::placeholder,
				.support-grid select::placeholder,
				.support-grid textarea::placeholder {
					color: rgba(255,255,255,0.35);
				}
				.support-grid select option {
					background: var(--primary);
					color: white;
				}
			`}</style>
			<div
				className="support-grid"
				style={{
					display: "grid",
					gridTemplateColumns: "1fr",
					gap: "clamp(32px,5vw,64px)",
					alignItems: "start",
				}}
			>
				{/* ── SINISTRA — form ──────────────────────────────────────── */}
				<div
					style={{
						padding: "clamp(32px,4vw,48px)",
						backgroundColor: "var(--primary)",
					}}
				>
					<p
						style={{
							fontSize: "var(--text-xl)",
							fontWeight: 500,
							margin: 0,
							marginBottom: 32,
							color: "white",
						}}
					>
						Modulo di assistenza tecnica
					</p>

					<AnimatePresence mode="wait">
						{success ? (
							<motion.div
								key="success"
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
								style={{
									color: "var(--accent)",
									fontSize: "var(--text-base)",
									fontWeight: 500,
									paddingBlock: 32,
								}}
							>
								✓ Richiesta inviata. Il reparto tecnico ti contatterà al più
								presto.
							</motion.div>
						) : (
							<motion.form
								key="form"
								onSubmit={handleSubmit}
								style={{ display: "flex", flexDirection: "column", gap: 20 }}
								initial={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{/* Riga: data + codice cliente */}
								<div
									className="support-form-row"
									style={{
										display: "grid",
										gridTemplateColumns: "1fr",
										gap: 20,
									}}
								>
									<div>
										<label style={labelStyle}>Data richiesta</label>
										<input
											type="date"
											name="dataRichiesta"
											value={form.dataRichiesta}
											onChange={handleChange}
											style={{
												...fieldStyle(false),
												colorScheme: "dark",
											}}
										/>
									</div>
									<div>
										<label style={labelStyle}>Codice cliente</label>
										<input
											type="text"
											name="codiceCliente"
											value={form.codiceCliente}
											onChange={handleChange}
											style={fieldStyle(false)}
										/>
									</div>
								</div>

								{/* Cliente / Ragione sociale */}
								<div>
									<label style={labelStyle}>
										Cliente / Ragione sociale{" "}
										<span style={{ color: "var(--destructive)" }}>*</span>
									</label>
									<input
										type="text"
										name="cliente"
										value={form.cliente}
										onChange={handleChange}
										style={fieldStyle(!!errors.cliente)}
									/>
								</div>

								{/* Riga: referente + telefono */}
								<div
									className="support-form-row"
									style={{
										display: "grid",
										gridTemplateColumns: "1fr",
										gap: 20,
									}}
								>
									<div>
										<label style={labelStyle}>
											Referente{" "}
											<span style={{ color: "var(--destructive)" }}>*</span>
										</label>
										<input
											type="text"
											name="referente"
											value={form.referente}
											onChange={handleChange}
											style={fieldStyle(!!errors.referente)}
										/>
									</div>
									<div>
										<label style={labelStyle}>
											Recapito telefonico{" "}
											<span style={{ color: "var(--destructive)" }}>*</span>
										</label>
										<input
											type="tel"
											name="telefono"
											value={form.telefono}
											onChange={handleChange}
											style={fieldStyle(!!errors.telefono)}
										/>
									</div>
								</div>

								{/* Riga: email + orari */}
								<div
									className="support-form-row"
									style={{
										display: "grid",
										gridTemplateColumns: "1fr",
										gap: 20,
									}}
								>
									<div>
										<label style={labelStyle}>
											Email{" "}
											<span style={{ color: "var(--destructive)" }}>*</span>
										</label>
										<input
											type="email"
											name="email"
											value={form.email}
											onChange={handleChange}
											style={fieldStyle(!!errors.email)}
										/>
									</div>
									<div>
										<label style={labelStyle}>Orari di contatto</label>
										<input
											type="text"
											name="orariContatto"
											placeholder="es. 9:00–13:00"
											value={form.orariContatto}
											onChange={handleChange}
											style={fieldStyle(false)}
										/>
									</div>
								</div>

								{/* Sistema */}
								<div>
									<label style={labelStyle}>
										Sistema{" "}
										<span style={{ color: "var(--destructive)" }}>*</span>
									</label>
									<select
										name="sistema"
										value={form.sistema}
										onChange={handleChange}
										style={fieldStyle(!!errors.sistema)}
									>
										<option value="">Seleziona sistema</option>
										{SISTEMI.filter((s) => s !== "").map((s) => (
											<option key={s} value={s}>
												{s}
											</option>
										))}
									</select>
								</div>

								{/* Riga: tipologia + software */}
								<div
									className="support-form-row"
									style={{
										display: "grid",
										gridTemplateColumns: "1fr",
										gap: 20,
									}}
								>
									<div>
										<label style={labelStyle}>Tipologia / Modello</label>
										<input
											type="text"
											name="tipologiaModello"
											value={form.tipologiaModello}
											onChange={handleChange}
											style={fieldStyle(false)}
										/>
									</div>
									<div>
										<label style={labelStyle}>Software</label>
										<input
											type="text"
											name="software"
											value={form.software}
											onChange={handleChange}
											style={fieldStyle(false)}
										/>
									</div>
								</div>

								{/* Riga: marca computer + versione Windows */}
								<div
									className="support-form-row"
									style={{
										display: "grid",
										gridTemplateColumns: "1fr",
										gap: 20,
									}}
								>
									<div>
										<label style={labelStyle}>Marca computer</label>
										<input
											type="text"
											name="marcaComputer"
											value={form.marcaComputer}
											onChange={handleChange}
											style={fieldStyle(false)}
										/>
									</div>
									<div>
										<label style={labelStyle}>Versione Windows</label>
										<input
											type="text"
											name="versioneWindows"
											placeholder="es. Windows 11 Pro"
											value={form.versioneWindows}
											onChange={handleChange}
											style={fieldStyle(false)}
										/>
									</div>
								</div>

								{/* Numero telecamere — visibile solo per Body Analysis Capture */}
								{form.sistema === "Body Analysis Capture" && (
									<div>
										<label style={labelStyle}>Numero telecamere</label>
										<select
											name="numTelecamere"
											value={form.numTelecamere}
											onChange={handleChange}
											style={fieldStyle(false)}
										>
											<option value="">—</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="4">4</option>
										</select>
									</div>
								)}

								{/* Descrizione problematica */}
								<div>
									<label style={labelStyle}>
										Descrizione problematica{" "}
										<span style={{ color: "var(--destructive)" }}>*</span>
									</label>
									<textarea
										name="descrizione"
										value={form.descrizione}
										onChange={handleChange}
										style={{
											...fieldStyle(!!errors.descrizione),
											minHeight: 140,
											resize: "vertical",
										}}
									/>
								</div>

								{/* Contratto assistenza */}
								<div>
									<label style={labelStyle}>
										Possiedo un contratto annuale di assistenza tecnica
									</label>
									<select
										name="contrattoAssistenza"
										value={form.contrattoAssistenza}
										onChange={handleChange}
										style={fieldStyle(false)}
									>
										<option value="">—</option>
										<option value="si">Sì</option>
										<option value="no">No</option>
									</select>
								</div>

								{/* Checkbox: autorizzazione Supremo */}
								<label style={checkboxRowStyle}>
									<input
										type="checkbox"
										name="autorizzaSupremo"
										checked={form.autorizzaSupremo}
										onChange={handleChange}
										style={{
											marginTop: 2,
											flexShrink: 0,
											accentColor: errors.autorizzaSupremo
												? "var(--destructive)"
												: "var(--accent)",
										}}
									/>
									<span
										style={{
											...checkboxLabelStyle,
											color: errors.autorizzaSupremo
												? "var(--destructive)"
												: checkboxLabelStyle.color,
										}}
									>
										Autorizzo l&apos;assistenza remota tramite Supremo{" "}
										<span style={{ color: "var(--destructive)" }}>*</span>
									</span>
								</label>

								{/* Checkbox: dichiarazione EOL */}
								<label style={checkboxRowStyle}>
									<input
										type="checkbox"
										name="dichiarazioneEol"
										checked={form.dichiarazioneEol}
										onChange={handleChange}
										style={{
											marginTop: 2,
											flexShrink: 0,
											accentColor: "var(--accent)",
										}}
									/>
									<span style={checkboxLabelStyle}>
										Dichiaro di aver preso visione delle limitazioni per
										tecnologie fuori produzione
									</span>
								</label>

								{/* Submit */}
								<button
									type="submit"
									disabled={loading}
									style={{
										padding: "14px 40px",
										background: "var(--accent)",
										color: "white",
										fontSize: "var(--text-sm)",
										fontWeight: 600,
										width: "100%",
										marginTop: 8,
										border: "none",
										cursor: loading ? "not-allowed" : "pointer",
										fontFamily: "inherit",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: 8,
									}}
								>
									{loading ? (
										<>
											Invio in corso...
											<motion.span
												animate={{ rotate: 360 }}
												transition={{
													repeat: Infinity,
													duration: 0.8,
													ease: "linear",
												}}
												style={{ display: "inline-block", marginLeft: 8 }}
											>
												⟳
											</motion.span>
										</>
									) : (
										"Invia richiesta"
									)}
								</button>
							</motion.form>
						)}
					</AnimatePresence>
				</div>

				{/* ── DESTRA — pannello informativo ──────────────────────── */}
				<div
					style={{
						padding: "clamp(32px,4vw,48px)",
					}}
				>
					<SplitText
						tag="h3"
						style={{
							fontWeight: 500,
							fontSize: "var(--text-3xl)",
							lineHeight: 1.2,
							margin: 0,
							marginBottom: 24,
							color: "var(--primary)",
						}}
						accentWords={["Assistenza", "tecnica"]}
						accentColor="var(--accent)"
					>
						Assistenza tecnica Medical Support
					</SplitText>

					<p
						style={{
							fontSize: "var(--text-sm)",
							color: "var(--muted-foreground)",
							lineHeight: 1.65,
							marginBottom: 24,
						}}
					>
						Utilizza questo modulo per segnalare anomalie su sistemi hardware e
						software Medical Support. Il nostro reparto tecnico prenderà in
						carico la richiesta e ti ricontatterà per pianificare
						l&apos;intervento più adeguato.
					</p>

					<ul
						style={{
							listStyle: "none",
							padding: 0,
							margin: 0,
							display: "flex",
							flexDirection: "column",
							gap: 0,
						}}
					>
						{[
							"Supporto remoto tramite Supremo",
							"Verifica configurazione software",
							"Segnalazione malfunzionamenti hardware",
							"Presa in carico dal reparto tecnico",
						].map((item) => (
							<li
								key={item}
								style={{
									fontSize: "var(--text-sm)",
									color: "var(--muted-foreground)",
									padding: "14px 0",
									borderBottom: "1px solid var(--border)",
									display: "flex",
									alignItems: "center",
									gap: 10,
								}}
							>
								<span
									style={{
										width: 6,
										height: 6,
										borderRadius: "50%",
										background: "var(--accent)",
										flexShrink: 0,
									}}
								/>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
