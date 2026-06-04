import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
	try {
		const { nome, cognome, professione, email, messaggio } = await req.json();

		if (!nome || !email || !messaggio) {
			return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
		}

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT || 587),
			secure: Number(process.env.SMTP_PORT || 587) === 465,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: process.env.CONTACT_TO || "commerciale@medical-support.org",
			subject: `Nuovo messaggio dal form contatti: ${nome} ${cognome || ""}`.trim(),
			text: [
				`Nome: ${nome}`,
				`Cognome: ${cognome || "-"}`,
				`Professione: ${professione || "-"}`,
				`Email: ${email}`,
				"",
				"Messaggio:",
				messaggio,
			].join("\n"),
			html: `
				<h2>Nuovo messaggio dal form contatti</h2>
				<p><strong>Nome:</strong> ${nome}</p>
				<p><strong>Cognome:</strong> ${cognome || "-"}</p>
				<p><strong>Professione:</strong> ${professione || "-"}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Messaggio:</strong></p>
				<p>${String(messaggio).replace(/\n/g, "<br />")}</p>
			`,
		});

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("/api/contact error:", error);
		return NextResponse.json({ error: "Errore durante l'invio" }, { status: 500 });
	}
}
