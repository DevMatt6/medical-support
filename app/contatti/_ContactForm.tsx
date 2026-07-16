/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";
import { type Locale } from "@/lib/i18n";

const CONTACT_COPY = {
	it: {
		writeUs: "Scrivici",
		success: "✓ Messaggio inviato. Ti contatteremo presto.",
		name: "Nome",
		surname: "Cognome",
		profession: "Professione",
		email: "Email",
		message: "Messaggio",
		submit: "Invia messaggio",
		sending: "{copy.sending}",
		selectPlaceholder: "Seleziona",
		infoTitle: "Contattaci per maggiori informazioni sui nostri prodotti",
		infoAccentWords: ["Contattaci", "per", "maggiori", "informazioni"],
		partnerLabel: "Partner",
		helper: "Compila il modulo per richiedere informazioni, una demo o un contatto diretto con il nostro team.",
		placeholders: {
			name: "Il tuo nome",
			surname: "Il tuo cognome",
			email: "La tua email",
			message: "Raccontaci cosa ti serve",
		},
	},
	en: {
		writeUs: "Write to us",
		success: "✓ Message sent. We will contact you soon.",
		name: "First name",
		surname: "Last name",
		profession: "Profession",
		email: "Email",
		message: "Message",
		submit: "Send message",
		sending: "Sending...",
		selectPlaceholder: "Select",
		infoTitle: "Contact us for more information about our products",
		infoAccentWords: ["Contact", "more", "information"],
		partnerLabel: "Partner",
		helper: "Fill out the form to request information, a demo, or direct contact with our team.",
		placeholders: {
			name: "Your first name",
			surname: "Your last name",
			email: "Your email",
			message: "Tell us what you need",
		},
	},
} as const;

const PROFESSIONI = {
	it: [
		"Fisiatra",
		"Ortopedico",
		"Podologo",
		"Fisioterapista",
		"Neurologo",
		"Medico dello Sport",
		"Odontoiatra",
		"Osteopata",
		"Ortottista",
		"Altro",
	],
	en: [
		"Physiatrist",
		"Orthopedist",
		"Podiatrist",
		"Physiotherapist",
		"Neurologist",
		"Sports physician",
		"Dentist",
		"Osteopath",
		"Orthoptist",
		"Other",
	],
} as const;

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
			: "1px solid var(--border)",
		padding: "12px 16px",
		fontSize: "var(--text-sm)",
		background: "white",
		outline: "none",
		boxSizing: "border-box",
		fontFamily: "inherit",
	};
}

export function ContactForm({ locale }: { locale: Locale }) {
	const copy = CONTACT_COPY[locale] ?? CONTACT_COPY.it;
	const professioni = PROFESSIONI[locale] ?? PROFESSIONI.it;
	const [nome, setNome] = useState("");
	const [cognome, setCognome] = useState("");
	const [professione, setProfessione] = useState("");
	const [email, setEmail] = useState("");
	const [messaggio, setMessaggio] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState<Record<string, boolean>>({});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const newErrors: Record<string, boolean> = {};
		if (!nome.trim()) newErrors.nome = true;
		if (!email.trim()) newErrors.email = true;
		if (!messaggio.trim()) newErrors.messaggio = true;
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		setErrors({});
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSuccess(true);
		}, 1500);
	}

	return (
		<>
			<style>{`
				@media (min-width: 768px) {
					.contact-grid { grid-template-columns: 1fr 1fr !important; }
					.name-row { grid-template-columns: 1fr 1fr !important; }
				}
			`}</style>
			<div
				className="contact-grid"
				style={{
					display: "grid",
					gridTemplateColumns: "1fr",
					gap: "clamp(32px,5vw,64px)",
					alignItems: "start",
				}}
			>
				{/* SINISTRA — form */}
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
						{copy.writeUs}
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
									color: "var(--primary)",
									fontSize: "var(--text-base)",
									fontWeight: 500,
									paddingBlock: 32,
								}}
							>
								{copy.success}
							</motion.div>
						) : (
							<motion.form
								key="form"
								onSubmit={handleSubmit}
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 20,
								}}
								initial={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{/* Nome + Cognome */}
								<div
									className="name-row"
									style={{
										display: "grid",
										gridTemplateColumns: "1fr",
										gap: 20,
									}}
								>
									<div>
										<label style={labelStyle}>{copy.name}</label>
										<input
											type="text"
											value={nome}
											onChange={(e) => setNome(e.target.value)}
											placeholder={copy.placeholders.name}
											style={fieldStyle(!!errors.nome)}
										/>
									</div>
									<div>
										<label style={labelStyle}>{copy.surname}</label>
										<input
											type="text"
											value={cognome}
											onChange={(e) => setCognome(e.target.value)}
											placeholder={copy.placeholders.surname}
											style={fieldStyle(false)}
										/>
									</div>
								</div>

								{/* Professione */}
								<div>
									<label style={labelStyle}>{copy.profession}</label>
									<select
										value={professione}
										onChange={(e) => setProfessione(e.target.value)}
										style={fieldStyle(false)}
									>
										<option value="">{copy.selectPlaceholder}</option>
										{professioni.map((p) => (
											<option key={p} value={p}>
												{p}
											</option>
										))}
									</select>
								</div>

								{/* Email */}
								<div>
									<label style={labelStyle}>{copy.email}</label>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder={copy.placeholders.email}
										style={fieldStyle(!!errors.email)}
									/>
								</div>

								{/* Messaggio */}
								<div>
									<label style={labelStyle}>{copy.message}</label>
									<textarea
										value={messaggio}
										onChange={(e) => setMessaggio(e.target.value)}
										style={{
											...fieldStyle(!!errors.messaggio),
											minHeight: 120,
											resize: "vertical",
										}}
									/>
								</div>

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
											{copy.sending}
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
										copy.submit
									)}
								</button>
							</motion.form>
						)}
					</AnimatePresence>
				</div>

				{/* DESTRA — info card */}
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
						accentWords={copy.infoAccentWords}
						accentColor="var(--accent)"
					>
						{copy.infoTitle}
					</SplitText>
					<p
						style={{
							fontSize: "var(--text-sm)",
							color: "var(--muted-foreground)",
							display: "block",
							padding: "16px 0",
							borderBottom: "1px solid var(--border)",
							margin: 0,
						}}
					>
						Via Ippolito Nievo, 61 — 00153 Roma
					</p>
					<a
						href="tel:+393475183978"
						style={{
							fontSize: "var(--text-sm)",
							color: "var(--muted-foreground)",
							display: "block",
							padding: "16px 0",
							borderBottom: "1px solid var(--border)",
							textDecoration: "none",
						}}
					>
						+39 347 518 3978
					</a>
					<a
						href="mailto:commerciale@medical-support.it"
						style={{
							fontSize: "var(--text-sm)",
							color: "var(--muted-foreground)",
							display: "block",
							padding: "16px 0",
							borderBottom: "1px solid var(--border)",
							textDecoration: "none",
						}}
					>
						commerciale@medical-support.it
					</a>
					<span
						style={{
							marginTop: 24,
							display: "block",
							fontSize: "var(--text-xs)",
							textTransform: "uppercase",
							letterSpacing: "0.08em",
							color: "var(--muted-foreground)",
							marginBottom: 8,
						}}
					>
						{copy.partnerLabel}
					</span>
					<img
						src="/images/partner/logo-confimea.svg"
						alt="Partner CONFIMEA Sanità"
						style={{ display: "block", height: 50 }}
					/>
				</div>
			</div>
		</>
	);
}
