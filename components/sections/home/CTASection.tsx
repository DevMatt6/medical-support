"use client";

import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRouteLocale } from "@/lib/route-locale";
import { homeCopy } from "@/lib/home-copy";

export function CTASection() {
	const locale = useRouteLocale();
	const copy = homeCopy.cta[locale];
	return (
		<motion.section
			variants={scaleIn}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			style={{
				background: "var(--primary, #1a3a4d)",
				paddingTop: 160,
				paddingBottom: 160,
				paddingLeft: "clamp(24px, 5vw, 80px)",
				paddingRight: "clamp(24px, 5vw, 80px)",
				position: "relative",
				overflow: "hidden",
				textAlign: "center",
			}}
		>
			{/* Decorative circles 
			<span
				aria-hidden="true"
				style={{
					position: "absolute",
					width: 600,
					height: 600,
					border: "1px solid var(--accent)",
					borderRadius: "50%",
					top: -200,
					right: -200,
					pointerEvents: "none",
					zIndex: 0,
				}}
			/>
			<span
				aria-hidden="true"
				style={{
					position: "absolute",
					width: 400,
					height: 400,
					border: "2px solid var(--accent)",
					borderRadius: "50%",
					bottom: -150,
					left: -100,
					pointerEvents: "none",
					zIndex: 0,
				}}
			/>*/}

			{/* Gradient overlay */}
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: "60%",
					background:
						"linear-gradient(to top, var(--accent) 0%, transparent 100%)",
					zIndex: 1,
					pointerEvents: "none",
				}}
			/>

			{/* Content */}
			<div
				style={{
					position: "relative",
					zIndex: 2,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{/* Eyebrow */}
				<ScrollReveal variant="fadeIn" delay={0.05}>
					<span
						style={{
							textTransform: "uppercase",
							fontSize: "var(--text-xs)",
							letterSpacing: "0.08em",
							color: "white",
							backgroundColor: "var(--accent)",
							padding: "6px 14px",
						}}
					>
						{locale === "it" ? "Scopri di più" : "Learn more"}
					</span>
				</ScrollReveal>

				{/* Heading */}
				<SplitText
					text={copy.headline}
					tag="h2"
					stagger={0.03}
					delay={0.2}
					style={{
						marginTop: 24,
						fontSize: "clamp(2.5rem, 5vw, 3rem)",
						fontWeight: 400,
						lineHeight: 1.05,
						color: "white",
						maxWidth: 800,
					}}
				/>

				{/* Paragraph */}
				<ScrollReveal variant="fadeUp" delay={0.5}>
					<p
						style={{
							marginTop: 24,
							fontSize: "var(--text-base)",
							color: "white",
							opacity: 0.75,
							maxWidth: 480,
							lineHeight: 1.7,
						}}
					>
						{copy.subheadline}
					</p>
				</ScrollReveal>

				{/* CTA row */}
				<ScrollReveal variant="fadeUp" delay={0.65}>
					<div
						style={{
							marginTop: 48,
							display: "flex",
							gap: 16,
							flexWrap: "wrap",
							justifyContent: "center",
						}}
					>
						<MagneticButton
							as="a"
							href={`/${locale}/contatti`}
							style={{
								padding: "14px 40px",
								background: "white",
								color: "#1a3a4d",
								fontSize: "var(--text-sm)",
								fontWeight: 700,
								textDecoration: "none",
							}}
						>
							{copy.ctaPrimary}
						</MagneticButton>

						<MagneticButton
							as="a"
							href={`/${locale}/prodotti`}
							style={{
								padding: "14px 40px",
								border: "1px solid rgba(255,255,255,0.3)",
								color: "white",
								background: "transparent",
								fontSize: "var(--text-sm)",
								fontWeight: 600,
								textDecoration: "none",
							}}
						>
							{copy.ctaSecondary}
						</MagneticButton>
					</div>
				</ScrollReveal>
			</div>
		</motion.section>
	);
}