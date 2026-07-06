"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";

const ASSISTENZA_EMAIL = "commerciale@medical-support.org";

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
/*  COMPONENTE                                                     */
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

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const errs = validate();

		if (Object.keys(errs).length > 0) {
			setErrors(errs);
			return;
		}

		setErrors({});
		setLoading(true);

		try {
			const response = await fetch("/api/support", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nome: form.referente,
					cognome: form.cliente,
					email: form.email,
					telefono: form.telefono,
					cliente: form.cliente,
					referente: form.referente,
					sistema: form.sistema,
					messaggio: [
						"Nuova richiesta dal modulo assistenza tecnica",
						"",
						`Data richiesta: ${form.dataRichiesta || "-"}`,
						`Codice cliente: ${form.codiceCliente || "-"}`,
						`Cliente / Ragione sociale: ${form.cliente || "-"}`,
						`Referente: ${form.referente || "-"}`,
						`Telefono: ${form.telefono || "-"}`,
						`Email: ${form.email || "-"}`,
						`Orari di contatto: ${form.orariContatto || "-"}`,
						`Sistema: ${form.sistema || "-"}`,
						`Tipologia / Modello: ${form.tipologiaModello || "-"}`,
						`Software: ${form.software || "-"}`,
						`Marca computer: ${form.marcaComputer || "-"}`,
						`Versione Windows: ${form.versioneWindows || "-"}`,
						`Numero telecamere: ${form.numTelecamere || "-"}`,
						`Contratto assistenza: ${form.contrattoAssistenza || "-"}`,
						`Autorizza Supremo: ${form.autorizzaSupremo ? "Sì" : "No"}`,
						`Dichiarazione EOL: ${form.dichiarazioneEol ? "Sì" : "No"}`,
						"",
						"Descrizione problematica:",
						form.descrizione,
						"",
						`Destinatario previsto: ${ASSISTENZA_EMAIL}`,
					].join("\n"),
				}),
			});

			if (!response.ok) {
				throw new Error("Invio non riuscito");
			}

			setSuccess(true);
			setForm(initialState);
		} catch {
			setErrors({ submit: true });
		} finally {
			setLoading(false);
		}
	}

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

								{errors.submit && (
									<p
										style={{
											color: "#fff",
											background: "rgba(220, 38, 38, 0.18)",
											border: "1px solid rgba(220, 38, 38, 0.45)",
											padding: "12px 16px",
											fontSize: "var(--text-sm)",
											margin: 0,
										}}
									>
										Si è verificato un errore durante l’invio. Scrivi
										direttamente a{" "}
										<a
											href={`mailto:${ASSISTENZA_EMAIL}`}
											style={{ color: "white", textDecoration: "underline" }}
										>
											{ASSISTENZA_EMAIL}
										</a>
										.
									</p>
								)}

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
												↻
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

				<div style={{ display: "grid", gap: 24 }}>
					<div
						style={{
							background: "rgba(255,255,255,0.04)",
							border: "1px solid rgba(255,255,255,0.08)",
							padding: "clamp(24px,3vw,32px)",
						}}
					>
						<SplitText
							text="Supporto rapido, gestione precisa."
							tag="h2"
							style={{
								fontSize: "clamp(28px,4vw,48px)",
								lineHeight: 1.05,
								margin: 0,
								color: "white",
								fontWeight: 500,
								maxWidth: 12,
							}}
						/>
					</div>

					<div
						style={{
							background: "rgba(255,255,255,0.03)",
							border: "1px solid rgba(255,255,255,0.08)",
							padding: "clamp(24px,3vw,32px)",
							color: "rgba(255,255,255,0.82)",
							fontSize: "var(--text-sm)",
							lineHeight: 1.7,
						}}
					>
						<p style={{ margin: 0 }}>
							Compila il modulo con tutti i dettagli tecnici disponibili. La
							richiesta verrà inoltrata al reparto commerciale e assistenza per
							la presa in carico.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
