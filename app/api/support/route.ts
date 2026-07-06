import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
	try {
		const {
			nome,
			cognome,
			email,
			messaggio,
			telefono,
			cliente,
			referente,
			sistema,
		} = await req.json();

		if (!nome || !email || !messaggio) {
			return NextResponse.json(
				{ error: "Campi obbligatori mancanti" },
				{ status: 400 },
			);
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
			subject: `Nuova richiesta assistenza tecnica: ${cliente || nome}`.trim(),
			text: [
				`Cliente: ${cliente || "-"}`,
				`Referente: ${referente || nome}`,
				`Telefono: ${telefono || "-"}`,
				`Email: ${email}`,
				`Sistema: ${sistema || "-"}`,
				"",
				"Dettagli richiesta:",
				messaggio,
			].join("\n"),
			html: `
				<h2>Nuova richiesta assistenza tecnica</h2>
				<p><strong>Cliente:</strong> ${cliente || "-"}</p>
				<p><strong>Referente:</strong> ${referente || nome}</p>
				<p><strong>Telefono:</strong> ${telefono || "-"}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Sistema:</strong> ${sistema || "-"}</p>
				<p><strong>Dettagli richiesta:</strong></p>
				<p>${String(messaggio).replace(/\n/g, "<br />")}</p>
			`,
		});

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("/api/support error:", error);
		return NextResponse.json(
			{ error: "Errore durante l'invio" },
			{ status: 500 },
		);
	}
}
