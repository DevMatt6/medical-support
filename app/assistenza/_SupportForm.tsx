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
				<div style="margin:0;padding:0;background:#f4f7fb;">
					<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f7fb;padding:32px 16px;">
						<tr>
							<td align="center">
								<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:700px;background:#ffffff;border-collapse:collapse;border:1px solid #e5e7eb;font-family:Arial,Helvetica,sans-serif;">
									<tr>
										<td style="background:#0f3b46;padding:28px 32px;">
											<div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#9fd3dd;margin-bottom:8px;">
												Medical Support
											</div>
											<h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.2;font-weight:700;">
												Nuova richiesta assistenza tecnica
											</h1>
										</td>
									</tr>

									<tr>
										<td style="padding:32px;">
											<p style="margin:0 0 24px 0;color:#334155;font-size:15px;line-height:1.6;">
												È stata inviata una nuova richiesta dal modulo di assistenza tecnica del sito.
											</p>

											<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin-bottom:24px;">
												<tr>
													<td style="padding:12px 14px;border:1px solid #e5e7eb;background:#f8fafc;width:220px;color:#0f172a;font-size:14px;font-weight:700;">
														Cliente
													</td>
													<td style="padding:12px 14px;border:1px solid #e5e7eb;color:#334155;font-size:14px;">
														${cliente || "-"}
													</td>
												</tr>
												<tr>
													<td style="padding:12px 14px;border:1px solid #e5e7eb;background:#f8fafc;color:#0f172a;font-size:14px;font-weight:700;">
														Referente
													</td>
													<td style="padding:12px 14px;border:1px solid #e5e7eb;color:#334155;font-size:14px;">
														${referente || nome}
													</td>
												</tr>
												<tr>
													<td style="padding:12px 14px;border:1px solid #e5e7eb;background:#f8fafc;color:#0f172a;font-size:14px;font-weight:700;">
														Telefono
													</td>
													<td style="padding:12px 14px;border:1px solid #e5e7eb;color:#334155;font-size:14px;">
														${telefono || "-"}
													</td>
												</tr>
												<tr>
													<td style="padding:12px 14px;border:1px solid #e5e7eb;background:#f8fafc;color:#0f172a;font-size:14px;font-weight:700;">
														Email
													</td>
													<td style="padding:12px 14px;border:1px solid #e5e7eb;color:#334155;font-size:14px;">
														${email}
													</td>
												</tr>
												<tr>
													<td style="padding:12px 14px;border:1px solid #e5e7eb;background:#f8fafc;color:#0f172a;font-size:14px;font-weight:700;">
														Sistema
													</td>
													<td style="padding:12px 14px;border:1px solid #e5e7eb;color:#334155;font-size:14px;">
														${sistema || "-"}
													</td>
												</tr>
											</table>

											<div style="margin-bottom:12px;color:#0f172a;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">
												Dettagli richiesta
											</div>

											<div style="padding:18px 20px;border:1px solid #dbe3ea;background:#f8fafc;color:#334155;font-size:14px;line-height:1.7;">
												${String(messaggio).replace(/\n/g, "<br />")}
											</div>
										</td>
									</tr>

									<tr>
										<td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e5e7eb;color:#64748b;font-size:12px;line-height:1.6;">
											Email generata automaticamente dal modulo assistenza del sito medical-support.org
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
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
