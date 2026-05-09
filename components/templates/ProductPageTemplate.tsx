"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
	Activity,
	BarChart3,
	Cloud,
	Cpu,
	Database,
	Globe,
	Heart,
	Layers,
	Monitor,
	Settings,
	Shield,
	Wifi,
	Zap,
	type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Product } from "@/types";

/* ─── Lucide icon resolver ─────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
	Activity,
	BarChart3,
	Cloud,
	Cpu,
	Database,
	Globe,
	Heart,
	Layers,
	Monitor,
	Settings,
	Shield,
	Wifi,
	Zap,
};

function DynamicIcon({ name, size = 28 }: { name: string; size?: number }) {
	const Icon = ICON_MAP[name] ?? Activity;
	return <Icon size={size} strokeWidth={1.5} />;
}

/* ─── Props ────────────────────────────────────────────────────── */
export interface ProductPageProps {
	product: Product;
	heroTagline: string;
	description: string[];
	features: Array<{ title: string; description: string; icon: string }>;
	specs: Array<{ label: string; value: string }>;
	models?: Array<{
		name: string;
		dimensions: string;
		sensors: number;
		use: string;
	}>;
	descriptionTitle?: string;
	ebdSection?: {
		title: string;
		subtitle: string;
		description: string;
		items: Array<{ icon: string; title: string; description: string }>;
	};
}

/* ─── Section styles ───────────────────────────────────────────── */
const sectionPad: React.CSSProperties = {
	paddingBlock: "clamp(80px,10vw,140px)",
	paddingInline: "clamp(24px,5vw,80px)",
};

/* ════════════════════════════════════════════════════════════════ */
/*  1. HERO                                                         */
/* ════════════════════════════════════════════════════════════════ */
function ProductHero({
	product,
	heroTagline,
}: Pick<ProductPageProps, "product" | "heroTagline">) {
	return (
		<section
			style={{
				...sectionPad,
				background: `url(/images/products-hero/${product.slug}.png) right/cover no-repeat var(--primary)`,
				position: "relative",
			}}
		>
			{/* Gradient overlay */}
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: "60%",
					background:
						"linear-gradient(to top, var(--accent) 0%, transparent 50%)",
					zIndex: 1,
					pointerEvents: "none",
				}}
			/>
			{/* Content */}
			<div style={{ position: "relative", zIndex: 2 }}>
				{/* Eyebrow */}
				<ScrollReveal variant="fadeIn" delay={0}>
					<p
						style={{
							margin: 0,
							textTransform: "uppercase",
							fontSize: "var(--text-xs)",
							letterSpacing: "0.1em",
							color: "white",
							backgroundColor: "var(--secondary)",
							display: "inline-block",
							padding: "6px 14px",
						}}
					>
						Linea Cristal
					</p>
				</ScrollReveal>

				{/* H1 */}
				<SplitText
					text={product.name}
					tag="h1"
					stagger={0.04}
					delay={0.1}
					style={{
						marginTop: 16,
						fontSize: "clamp(var(--text-3xl), 6vw, 3.5rem)",
						fontWeight: 400,
						lineHeight: 1,
						color: "white",
					}}
				/>

				{/* Tagline */}
				<ScrollReveal variant="fadeUp" delay={0.3}>
					<p
						style={{
							marginTop: 20,
							fontSize: "var(--text-lg)",
							color: "rgba(255,255,255,0.75)",
							maxWidth: 560,
							lineHeight: 1.6,
						}}
					>
						{heroTagline}
					</p>
				</ScrollReveal>

				{/* Badges */}
				{product.badges.length > 0 && (
					<ScrollReveal variant="fadeUp" delay={0.45}>
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: 8,
								marginTop: 24,
							}}
						>
							{product.badges.map((badge) => (
								<span
									key={badge}
									style={{
										display: "inline-block",
										padding: "5px 14px",
										border: "1px solid var(--accent)",
										fontSize: "var(--text-xs)",
										textTransform: "uppercase",
										letterSpacing: "0.07em",
										color: "white",
									}}
								>
									{badge}
								</span>
							))}
						</div>
					</ScrollReveal>
				)}

				{/* CTAs */}
				<ScrollReveal variant="fadeUp" delay={0.6}>
					<div
						style={{
							display: "flex",
							gap: 16,
							marginTop: 32,
							flexWrap: "wrap",
						}}
					>
						<MagneticButton
							as="a"
							href="/contatti"
							style={{
								padding: "14px 40px",
								background: "white",
								color: "var(--primary)",
								fontSize: "var(--text-sm)",
								fontWeight: 600,
								textDecoration: "none",
							}}
						>
							Richiedi Info
						</MagneticButton>
						<MagneticButton
							as="a"
							href={`/schede-tecniche/${product.slug}.pdf`}
							style={{
								padding: "14px 40px",
								border: "1px solid white",
								color: "white",
								fontSize: "var(--text-sm)",
								fontWeight: 600,
								textDecoration: "none",
								background: "transparent",
							}}
						>
							Scarica Scheda Tecnica
						</MagneticButton>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  2. DESCRIPTION                                                  */
/* ════════════════════════════════════════════════════════════════ */
function ProductDescription({
	description,
	product,
	descriptionTitle,
}: Pick<ProductPageProps, "description" | "product" | "descriptionTitle">) {
	const imageRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: imageRef,
		offset: ["start end", "end start"],
	});
	const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

	return (
		<>
			<style>{`
        @media (min-width: 1024px) {
          .desc-grid { grid-template-columns: 55fr 45fr !important; }
        }
      `}</style>
			<section style={{ ...sectionPad, background: "white" }}>
				<div
					className="desc-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "1fr",
						gap: "clamp(48px,6vw,80px)",
						alignItems: "center",
					}}
				>
					{/* Testo */}
					<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
						{" "}
						{/* Eyebrow */}
						<ScrollReveal variant="fadeIn" delay={0}>
							<p
								style={{
									margin: 0,
									textTransform: "uppercase",
									fontSize: "var(--text-xs)",
									letterSpacing: "0.1em",
									color: "white",
									backgroundColor: "var(--secondary)",
									display: "inline-block",
									padding: "6px 14px",
								}}
							>
								Linea Cristal
							</p>
						</ScrollReveal>{" "}
						{descriptionTitle && (
							<ScrollReveal variant="fadeUp" delay={0.05}>
								<h2
									style={{
										margin: 0,
										fontSize: "var(--text-3xl)",
										fontWeight: 500,
										color: "var(--primary)",
										lineHeight: 1.3,
										maxWidth: 700,
									}}
								>
									{descriptionTitle}
								</h2>
							</ScrollReveal>
						)}
						{description.map((para, i) => (
							<ScrollReveal key={i} variant="fadeUp" delay={0.1 + i * 0.12}>
								<p
									style={{
										margin: 0,
										fontSize: "var(--text-base)",
										color: "var(--muted-foreground)",
										lineHeight: 1.75,
									}}
								>
									{para}
								</p>
							</ScrollReveal>
						))}
					</div>

					{/* Immagine con parallax */}
					<ScrollReveal variant="fadeIn" delay={0.2}>
						<div
							ref={imageRef}
							style={{ overflow: "hidden", aspectRatio: "1/1" }}
						>
							<motion.div
								style={{
									y,
									width: "100%",
									height: "100%",
									background: product.image
										? `url(${product.image}) center/contain no-repeat`
										: "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 50%, white) 100%)",
									marginTop: "-8%",
									backgroundColor: "var(--background)",
								}}
							/>
						</div>
					</ScrollReveal>
				</div>
			</section>
		</>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  3. FEATURES / MODELS TABLE                                      */
/* ════════════════════════════════════════════════════════════════ */
function ProductFeatures({
	features,
	models,
}: Pick<ProductPageProps, "features" | "models">) {
	return (
		<section style={{ ...sectionPad, background: "var(--primary" }}>
			<ScrollReveal variant="fadeUp" delay={0.05}>
				<SplitText
					text="Caratteristiche"
					tag="h2"
					stagger={0.03}
					delay={0.1}
					style={{
						fontSize: "var(--text-3xl)",
						fontWeight: 500,
						color: "white",
						margin: 0,
					}}
				/>
			</ScrollReveal>

			{models && models.length > 0 ? (
				/* Tabella comparativa modelli */
				<ScrollReveal variant="fadeUp" delay={0.2}>
					<div
						style={{
							marginTop: "clamp(32px,4vw,56px)",
							overflowX: "auto",
						}}
					>
						<table
							style={{
								width: "100%",
								borderCollapse: "collapse",
								fontSize: "var(--text-sm)",
							}}
						>
							<thead>
								<tr>
									{["Modello", "Dimensioni", "Sensori", "Utilizzo"].map((h) => (
										<th
											key={h}
											style={{
												textAlign: "left",
												padding: "12px 16px",
												borderBottom: "2px solid var(--accent)",
												fontWeight: 600,
												fontSize: "var(--text-md)",
												textTransform: "uppercase",
												letterSpacing: "0.07em",
												color: "var(--accent)",
												whiteSpace: "nowrap",
											}}
										>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{models.map((m) => (
									<tr key={m.name}>
										<td
											style={{
												padding: "14px 16px",
												borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
												fontWeight: 600,
												color: "white",
											}}
										>
											{m.name}
										</td>
										<td
											style={{
												padding: "14px 16px",
												borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
												color: "rgba(255, 255, 255, 0.6)",
											}}
										>
											{m.dimensions}
										</td>
										<td
											style={{
												padding: "14px 16px",
												borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
												color: "rgba(255, 255, 255, 0.6)",
											}}
										>
											{m.sensors}
										</td>
										<td
											style={{
												padding: "14px 16px",
												borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
												color: "rgba(255, 255, 255, 0.6)",
											}}
										>
											{m.use}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</ScrollReveal>
			) : (
				/* Feature grid 3 colonne */
				<>
					<style>{`
            @media (min-width: 768px) {
              .features-grid { grid-template-columns: repeat(3, 1fr) !important; }
            }
          `}</style>
					<div
						className="features-grid"
						style={{
							display: "grid",
							gridTemplateColumns: "1fr",
							gap: "clamp(1px,0.5vw,25px)",
							marginTop: "clamp(32px,4vw,56px)",
						}}
					>
						{features.map((feat, i) => (
							<ScrollReveal
								key={feat.title}
								variant="fadeUp"
								delay={0.1 + i * 0.1}
							>
								<div
									style={{
										padding: "clamp(24px,3vw,40px)",
										background: "color-mix(in srgb, white 8%, transparent)",
										border: "1.5px solid var(--accent)",
										display: "flex",
										flexDirection: "column",
										gap: 16,
									}}
								>
									<span style={{ color: "var(--accent)" }}>
										<DynamicIcon name={feat.icon} />
									</span>
									<p
										style={{
											margin: 0,
											fontSize: "var(--text-base)",
											fontWeight: 600,
											color: "white",
										}}
									>
										{feat.title}
									</p>
									<p
										style={{
											margin: 0,
											fontSize: "var(--text-sm)",
											color: "white",
											opacity: 0.5,
											lineHeight: 1.65,
										}}
									>
										{feat.description}
									</p>
								</div>
							</ScrollReveal>
						))}
					</div>
				</>
			)}
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  4. EBD SECTION                                                  */
/* ════════════════════════════════════════════════════════════════ */
function ProductEbdSection({
	ebdSection,
}: {
	ebdSection: NonNullable<ProductPageProps["ebdSection"]>;
}) {
	return (
		<section style={{ ...sectionPad, background: "var(--accent)" }}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "clamp(32px, 5vw, 80px)",
					alignItems: "end",
					marginBottom: "clamp(40px, 6vw, 80px)",
				}}
			>
				<div>
					<ScrollReveal delay={0}>
						<p
							style={{
								fontSize: "var(--text-xs)",
								fontWeight: 600,
								letterSpacing: "0.12em",
								backgroundColor: "var(--primary)",
								display: "inline-block",
								padding: "4px 12px",
								textTransform: "uppercase",
								color: "white",
								marginBottom: "var(--space-3)",
							}}
						>
							Protocollo Diagnostico
						</p>
					</ScrollReveal>
					<ScrollReveal delay={0.05}>
						<h2
							style={{
								fontSize: "var(--text-3xl)",
								fontWeight: 500,
								color: "white",
								marginBottom: "var(--space-4)",
								lineHeight: 1.15,
							}}
						>
							{ebdSection.title}
						</h2>
					</ScrollReveal>
					<ScrollReveal delay={0.1}>
						<p
							style={{
								fontSize: "var(--text-lg)",
								color: "white",
								opacity: 0.75,
								fontWeight: 500,
								margin: 0,
							}}
						>
							{ebdSection.subtitle}
						</p>
					</ScrollReveal>
				</div>
				<ScrollReveal delay={0.15}>
					<p
						style={{
							fontSize: "var(--text-base)",
							color: "white",
							opacity: 0.75,
							lineHeight: 1.7,
							margin: 0,
						}}
					>
						{ebdSection.description}
					</p>
				</ScrollReveal>
			</div>
			<>
				<style>{`
            @media (min-width: 768px) {
              .ebd-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (min-width: 1024px) {
              .ebd-grid { grid-template-columns: repeat(4, 1fr) !important; }
            }
          `}</style>
				<div
					className="ebd-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "1fr",
						gap: "clamp(1px,0.5vw,25px)",
						marginTop: "clamp(32px,4vw,56px)",
					}}
				>
					{ebdSection.items.map((item, i) => (
						<ScrollReveal
							key={item.title}
							variant="fadeUp"
							delay={0.1 + i * 0.1}
						>
							<div
								style={{
									padding: "clamp(24px,3vw,40px)",
									background: "white",
									border: "1.5px solid var(--border)",
									display: "flex",
									flexDirection: "column",
									gap: 16,
								}}
							>
								<span style={{ color: "var(--secondary)" }}>
									<DynamicIcon name={item.icon} />
								</span>
								<p
									style={{
										margin: 0,
										fontSize: "var(--text-base)",
										fontWeight: 600,
										color: "var(--primary)",
									}}
								>
									{item.title}
								</p>
								<p
									style={{
										margin: 0,
										fontSize: "var(--text-sm)",
										color: "var(--muted-foreground)",
										lineHeight: 1.65,
									}}
								>
									{item.description}
								</p>
							</div>
						</ScrollReveal>
					))}
				</div>
			</>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  5. SPECS                                                        */
/* ════════════════════════════════════════════════════════════════ */
function ProductSpecs({ specs }: Pick<ProductPageProps, "specs">) {
	return (
		<section style={{ ...sectionPad, background: "white" }}>
			<ScrollReveal variant="fadeUp" delay={0.05}>
				<SplitText
					text="Specifiche Tecniche"
					tag="h2"
					stagger={0.03}
					delay={0.1}
					style={{
						fontSize: "var(--text-3xl)",
						fontWeight: 500,
						color: "var(--primary)",
						margin: 0,
					}}
				/>
			</ScrollReveal>

			<div
				style={{
					marginTop: "clamp(32px,4vw,56px)",
				}}
			>
				{specs.map((spec, i) => (
					<ScrollReveal
						key={spec.label}
						variant="fadeUp"
						delay={0.1 + i * 0.06}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "baseline",
								padding: "16px 0",
								borderBottom: "1px solid var(--border)",
								gap: 16,
							}}
						>
							<span
								style={{
									fontSize: "var(--text-sm)",
									color: "var(--muted-foreground)",
									textTransform: "uppercase",
									letterSpacing: "0.06em",
									flexShrink: 0,
								}}
							>
								{spec.label}
							</span>
							<span
								style={{
									fontSize: "var(--text-sm)",
									fontWeight: 500,
									color: "var(--foreground)",
									textAlign: "right",
								}}
							>
								{spec.value}
							</span>
						</div>
					</ScrollReveal>
				))}
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  5. CTA                                                          */
/* ════════════════════════════════════════════════════════════════ */
function ProductCTA({ product }: Pick<ProductPageProps, "product">) {
	return (
		<section
			style={{
				...sectionPad,
				background: "var(--primary)",
				color: "var(--primary-foreground)",
				textAlign: "center",
				position: "relative",
			}}
		>
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
			<div style={{ position: "relative", zIndex: 2 }}>
				<ScrollReveal variant="fadeUp" delay={0.05}>
					<SplitText
						text={`Inizia con ${product.name}`}
						tag="h2"
						stagger={0.04}
						delay={0.1}
						style={{
							fontSize: "var(--text-3xl)",
							fontWeight: 400,
							color: "white",
							margin: 0,
						}}
					/>
				</ScrollReveal>

				<ScrollReveal variant="fadeUp" delay={0.25}>
					<p
						style={{
							marginTop: 16,
							fontSize: "var(--text-base)",
							color: "rgba(255,255,255,0.7)",
							maxWidth: 480,
							marginInline: "auto",
							lineHeight: 1.65,
						}}
					>
						Contattaci per una dimostrazione personalizzata o scarica la scheda
						tecnica completa.
					</p>
				</ScrollReveal>

				<ScrollReveal variant="fadeUp" delay={0.4}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							gap: 16,
							marginTop: 40,
							flexWrap: "wrap",
						}}
					>
						<MagneticButton
							as="a"
							href="/contatti"
							style={{
								padding: "14px 40px",
								background: "white",
								color: "var(--primary)",
								fontSize: "var(--text-sm)",
								fontWeight: 600,
								textDecoration: "none",
							}}
						>
							Richiedi Info
						</MagneticButton>
						<MagneticButton
							as="a"
							href={`/schede-tecniche/${product.slug}.pdf`}
							style={{
								padding: "14px 40px",
								border: "1px solid rgba(255,255,255,0.5)",
								color: "white",
								fontSize: "var(--text-sm)",
								fontWeight: 600,
								textDecoration: "none",
								background: "transparent",
							}}
						>
							Scarica Scheda Tecnica
						</MagneticButton>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  ROOT TEMPLATE                                                   */
/* ════════════════════════════════════════════════════════════════ */
export function ProductPageTemplate({
	product,
	heroTagline,
	description,
	descriptionTitle,
	features,
	specs,
	models,
	ebdSection,
}: ProductPageProps) {
	return (
		<>
			<ProductHero product={product} heroTagline={heroTagline} />
			<ProductDescription
				description={description}
				product={product}
				descriptionTitle={descriptionTitle}
			/>
			<ProductFeatures features={features} models={models} />
			{ebdSection && <ProductEbdSection ebdSection={ebdSection} />}
			<ProductSpecs specs={specs} />
			<ProductCTA product={product} />
		</>
	);
}
