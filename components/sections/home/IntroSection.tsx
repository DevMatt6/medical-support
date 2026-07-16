"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouteLocale } from "@/lib/route-locale";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { homeCopy } from "@/lib/home-copy";
import { SplitText } from "@/components/ui/SplitText";

export function IntroSection() {
	const locale = useRouteLocale();
	const copy = homeCopy.intro[locale];
	const sectionRef = useRef<HTMLElement>(null);
	const [underlineHovered, setUnderlineHovered] = useState(false);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

	return (
		<section
			ref={sectionRef}
			style={{
				padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px)",
				background: "var(--background)",
			}}
		>
			<div style={{ marginInline: "auto", width: "100%" }}>
				{/* Top row — 2 colonne */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
						gap: "clamp(32px,5vw,80px)",
						alignItems: "start",
					}}
				>
					{/* Sinistra: eyebrow + heading */}
					<div style={{ display: "flex", flexDirection: "column" }}>
						<ScrollReveal variant="fadeIn" delay={0.05}>
							<span
								style={{
									fontSize: "var(--text-xs)",
									letterSpacing: "0.08em",
									textTransform: "uppercase",
									color: "white",
									backgroundColor: "var(--secondary)",
									padding: "6px 14px",
								}}
							>
								{locale === "it" ? "Chi siamo" : "About us"}
							</span>
						</ScrollReveal>

						<div style={{ marginTop: 24 }}>
							<SplitText
								tag="h2"
								text={copy.headline}
								stagger={0.03}
								delay={0.2}
								style={{
									fontSize: "var(--text-3xl)",
									maxWidth: 500,
									fontWeight: 500,
									lineHeight: 1.05,
									margin: 0,
									color: "var(--primary)",
								}}
							/>
						</div>
					</div>

					{/* Destra: paragrafi + link */}
					<div style={{ display: "flex", flexDirection: "column" }}>
						{/* Paragrafo 1 */}
						<ScrollReveal variant="fadeUp" delay={0.4}>
							<p
								style={{
									marginTop: 32,
									marginBottom: 0,
									fontSize: "var(--text-base)",
									color: "var(--muted-foreground)",
									lineHeight: 1.5,
								}}
							>
								{copy.subheadline}
							</p>
						</ScrollReveal>

						{/* Paragrafo 2 
					<ScrollReveal variant="fadeUp" delay={0.55}>
						<p
							style={{
								marginTop: 20,
								marginBottom: 0,
								fontSize: "var(--text-base)",
								color: "var(--muted-foreground)",
								lineHeight: 1.7,
								maxWidth: 560,
							}}
						>
							Ogni dispositivo è certificato CE secondo la Direttiva MDR
							2017/745 ed è progettato per integrarsi nel workflow ambulatoriale
							senza frizione, restituendo referti digitali in tempo reale
							condivisibili sulla piattaforma cloud TELEPOSTUROLOGIA.
						</p>
					</ScrollReveal>*/}

						{/* Link con underline animata */}
						<ScrollReveal variant="fadeUp" delay={0.7}>
							<div style={{ marginTop: 32 }}>
								<Link
									href={`/${locale}/chi-siamo`}
									style={{
										position: "relative",
										display: "inline-block",
										color: "var(--primary)",
										fontSize: "var(--text-sm)",
										fontWeight: 600,
										textDecoration: "none",
									}}
									onMouseEnter={() => setUnderlineHovered(true)}
									onMouseLeave={() => setUnderlineHovered(false)}
								>
									{copy.ctaPrimary}
									<motion.span
										aria-hidden
										style={{
											position: "absolute",
											left: 0,
											bottom: -2,
											height: 1,
											width: "100%",
											background: "var(--primary)",
											transformOrigin: "left",
											display: "block",
										}}
										animate={{ scaleX: underlineHovered ? 1 : 0 }}
										transition={{ duration: 0.3, ease: "easeInOut" }}
										initial={{ scaleX: 0 }}
									/>
								</Link>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</div>

			{/* Immagine full-width */}
			<motion.div
				style={{
					marginTop: "clamp(48px,6vw,80px)",
					marginLeft: "calc(-1 * clamp(24px,5vw,80px))",
					marginRight: "calc(-1 * clamp(24px,5vw,80px))",
					height: "clamp(280px,40vw,1000px)",
					backgroundImage: "url(/images/products/esame-pedana.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "bottom",
					overflow: "hidden",
					y: parallaxY,
				}}
			/>
		</section>
	);
}
