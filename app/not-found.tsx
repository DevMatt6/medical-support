"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				background: "var(--background)",
				textAlign: "center",
				paddingInline: "clamp(24px,5vw,80px)",
				position: "relative",
			}}
		>
			{/* Background 404 */}
			<span
				aria-hidden
				style={{
					position: "absolute",
					fontSize: "clamp(15rem,30vw,25rem)",
					fontWeight: 800,
					color: "var(--foreground)",
					opacity: 0.04,
					userSelect: "none",
					pointerEvents: "none",
					zIndex: 0,
					lineHeight: 1,
				}}
			>
				404
			</span>

			{/* Content */}
			<div style={{ position: "relative", zIndex: 1 }}>
				<SplitText
					text="Pagina non trovata"
					tag="h1"
					stagger={0.03}
					delay={0.1}
					style={{
						fontSize: "var(--text-3xl)",
						fontWeight: 400,
						color: "var(--foreground)",
						margin: 0,
					}}
				/>

				<ScrollReveal variant="fadeUp" delay={0.3}>
					<p
						style={{
							fontSize: "var(--text-base)",
							color: "var(--muted-foreground)",
							marginTop: 16,
						}}
					>
						La pagina che cerchi non esiste o è stata spostata.
					</p>
				</ScrollReveal>

				<ScrollReveal variant="fadeUp" delay={0.5}>
					<MagneticButton
						as="a"
						href="/"
						style={{
							padding: "14px 40px",
							background: "var(--primary)",
							color: "white",
							fontSize: "var(--text-sm)",
							fontWeight: 600,
							marginTop: 40,
							display: "inline-block",
							textDecoration: "none",
						}}
					>
						Torna alla Home
					</MagneticButton>
				</ScrollReveal>
			</div>
		</div>
	);
}
