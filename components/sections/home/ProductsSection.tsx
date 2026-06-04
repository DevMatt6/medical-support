"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import type { Product } from "@/types/index";

interface ProductsHeaderProps {
	onPrev: () => void;
	onNext: () => void;
}

const ProductsHeader = React.memo(function ProductsHeader({
	onPrev,
	onNext,
}: ProductsHeaderProps) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "flex-end",
				paddingRight: "clamp(24px,5vw,80px)",
			}}
		>
			<div>
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
					Linea Cristal
				</span>
				<SplitText
					text="Cinque strumenti per una diagnostica completa."
					tag="h2"
					stagger={0.04}
					delay={0.15}
					immediate
					style={{
						fontSize: "var(--text-3xl)",
						fontWeight: 500,
						lineHeight: 1.05,
						marginTop: 16,
						marginBottom: 0,
						maxWidth: 600,
						color: "var(--primary)",
					}}
				/>
			</div>
			<div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
				<button
					onClick={onPrev}
					aria-label="Prodotto precedente"
					style={{
						width: 48,
						height: 48,
						border: "1px solid var(--primary)",
						background: "var(--background)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						fontSize: "var(--text-base)",
						color: "var(--primary)",
					}}
				>
					←
				</button>
				<button
					onClick={onNext}
					aria-label="Prodotto successivo"
					style={{
						width: 48,
						height: 48,
						border: "1px solid var(--primary)",
						background: "var(--background)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						fontSize: "var(--text-base)",
						color: "var(--primary)",
					}}
				>
					→
				</button>
			</div>
		</div>
	);
});

function ProductCard({ product }: { product: Product }) {
	const [hovered, setHovered] = useState(false);
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.1 }}
			transition={{ duration: 0.5 }}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				backgroundColor: "white",
				padding: "clamp(12px,2vw,20px)",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					aspectRatio: "1/1",
					backgroundImage: `url(${product.image ?? "/images/products/placeholder.jpg"})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					marginBottom: 20,
				}}
			/>
			<span
				style={{
					fontSize: "var(--text-xs)",
					letterSpacing: "0.08em",
					textTransform: "uppercase",
					color: "white",
					backgroundColor: "var(--secondary)",
					padding: "6px 14px",
					display: "inline-block",
					alignSelf: "flex-start",
				}}
			>
				Cristal
			</span>
			<h3
				style={{
					fontSize: "var(--text-xl)",
					fontWeight: 500,
					color: "var(--primary)",
					margin: "12px 0 0",
				}}
			>
				{product.name}
			</h3>
			<div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
				{product.badges.slice(0, 3).map((badge) => (
					<span
						key={badge}
						style={{
							display: "inline-flex",
							padding: "4px 10px",
							backgroundColor: "var(--background)",
							fontSize: "var(--text-xs)",
							color: "var(--primary)",
						}}
					>
						{badge}
					</span>
				))}
			</div>
			<Link
				href={`/prodotti/${product.slug}`}
				style={{
					marginTop: 24,
					display: "inline-flex",
					alignItems: "center",
					gap: 8,
					fontSize: "var(--text-sm)",
					fontWeight: 600,
					color: "var(--primary)",
					textDecoration: "none",
				}}
			>
				Scopri
				<span
					style={{
						display: "inline-flex",
						transform: hovered ? "translateX(2px)" : "none",
						transition: "transform 0.2s",
					}}
				>
					→
				</span>
			</Link>
		</motion.div>
	);
}

export function ProductsSection() {
	const [activeIndex, setActiveIndex] = useState(0);
	const products = siteConfig.products;
	const current = products[activeIndex];

	return (
		<section
			style={{
				padding: "0 0 clamp(80px,10vw,140px) clamp(24px,5vw,80px)",
				background: "var(--background)",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
					paddingRight: "clamp(24px,5vw,80px)",
				}}
			>
				<div>
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
						Linea Cristal
					</span>
					<SplitText
						text="Cinque strumenti per una diagnostica completa."
						tag="h2"
						stagger={0.04}
						delay={0.15}
						immediate
						style={{
							fontSize: "var(--text-3xl)",
							fontWeight: 500,
							lineHeight: 1.05,
							marginTop: 16,
							marginBottom: 0,
							maxWidth: 600,
							color: "var(--primary)",
						}}
					/>
				</div>
				<div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
					<button
						onClick={() =>
							setActiveIndex((i) => (i - 1 + products.length) % products.length)
						}
						aria-label="Prodotto precedente"
						style={{
							width: 48,
							height: 48,
							border: "1px solid var(--primary)",
							background: "var(--background)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							fontSize: "var(--text-base)",
							color: "var(--primary)",
							transition: "background 0.2s, border-color 0.2s",
						}}
					>
						←
					</button>
					<button
						onClick={() => setActiveIndex((i) => (i + 1) % products.length)}
						aria-label="Prodotto successivo"
						style={{
							width: 48,
							height: 48,
							border: "1px solid var(--primary)",
							background: "var(--background)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							fontSize: "var(--text-base)",
							color: "var(--primary)",
							transition: "background 0.2s, border-color 0.2s",
						}}
					>
						→
					</button>
				</div>
			</div>

			<div
				style={{
					marginTop: 24,
					display: "flex",
					alignItems: "center",
					gap: 6,
					fontSize: "var(--text-xs)",
					color: "var(--muted-foreground)",
					pointerEvents: "none",
					userSelect: "none",
					opacity: 0,
				}}
			>
				<span>←</span>
				<span>trascina</span>
				<span>→</span>
			</div>

			<div style={{ overflow: "hidden", marginTop: 32 }}>
				<div
					className="products-drag-track"
					data-cursor="drag"
					draggable={false}
					style={{
						display: "flex",
						gap: "clamp(16px,2vw,24px)",
						width: "fit-content",
						transform: "none",
						WebkitTouchCallout: "none",
						userSelect: "none",
						touchAction: "pan-y",
					}}
				>
					{products.map((product, index) => (
						<div
							key={product.slug}
							style={{
								width: "clamp(280px,35vw,420px)",
								flexShrink: 0,
								pointerEvents: "auto",
							}}
						>
							<ProductCard product={product} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
