"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

import Image from "next/image";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useRouteLocale } from "@/lib/route-locale";
import { homeCopy } from "@/lib/home-copy";

export function HeroSection() {
	const locale = useRouteLocale();
	const copy = homeCopy.hero[locale];
	const { scrollY } = useScroll();
	const bgY = useTransform(scrollY, [0, 600], ["0%", "5%"]);
	return (
		<section
			style={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-end",
				padding:
					"clamp(120px,15vw,180px) clamp(24px,5vw,80px) clamp(48px,6vw,80px)",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<motion.div
				style={{
					position: "absolute",
					inset: "-5%",
					zIndex: 0,
					y: bgY,
				}}
			>
				<Image
					src="/images/hero-bg.jpg"
					alt=""
					fill
					priority
					style={{ objectFit: "cover", objectPosition: "center" }}
				/>
			</motion.div>
			<div style={{ position: "relative", zIndex: 1 }}>
				{/* 1. Badge 
				<ScrollReveal variant="fadeIn" delay={0.1}>
					<span
						style={{
							padding: "6px 14px",
							border: "1px solid var(--border)",
							fontSize: "var(--text-xs)",
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							color: "white",
							backgroundColor: "var(--secondary)",
						}}
					>
						Biometria Digitalizzata
					</span>
				</ScrollReveal> */}

				{/* 2. Heading */}
				<div style={{ marginTop: 32 }}>
					<SplitText
						tag="h1"
						stagger={0.03}
						delay={0.2}
						style={{
							fontSize: "var(--text-hero)",
							fontWeight: 500,
							lineHeight: 1,
							color: "var(--primary)",
							maxWidth: 900,
							margin: 0,
						}}
						accentWords={["diagnostica", "3D"]}
						accentColor="var(--accent)"
					>
						{copy.headline}
					</SplitText>
				</div>

				{/* 3. Subheading */}
				<ScrollReveal variant="fadeUp" delay={0.5}>
					<p
						style={{
							marginTop: 32,
							marginBottom: 0,
							fontSize: "var(--text-lg)",
							color: "var(--muted-foreground)",
							maxWidth: 560,
							lineHeight: 1.6,
						}}
					>
						{copy.subheadline}
					</p>
				</ScrollReveal>

				{/* 4. CTA Row */}
				<ScrollReveal variant="fadeUp" delay={0.65}>
					<div
						style={{
							marginTop: 48,
							display: "flex",
							gap: 16,
							alignItems: "center",
						}}
					>
						<MagneticButton
							as="a"
							href={`/${locale}/contatti`}
							style={{
								padding: "14px 36px",
								background: "var(--primary)",
								color: "var(--primary-foreground)",
								fontSize: "var(--text-sm)",
								fontWeight: 600,
							}}
						>
							{copy.ctaPrimary}
						</MagneticButton>
						<Link
							href={`/${locale}/prodotti`}
							style={{
								fontSize: "var(--text-sm)",
								color: "var(--secondary)",
								textDecoration: "none",
								fontWeight: 500,
							}}
						>
							{copy.ctaSecondary}
						</Link>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}
