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
			{/* Left: testo */}
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

			{/* Right: frecce */}
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
						transition: "background 0.2s, border-color 0.2s",
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
						transition: "background 0.2s, border-color 0.2s",
					}}
				>
					→
				</button>
			</div>
		</div>
	);
});

function ProductCard({ product, index }: { product: Product; index: number }) {
	const [hovered, setHovered] = useState(false);
	const num = String(index + 1).padStart(2, "0");

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.1 }}
			transition={{ duration: 0.5, delay: index * 0.08 }}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				backgroundColor: "white",
				padding: "clamp(12px,2vw,20px)",
				/*background: hovered
					? "color-mix(in srgb, var(--primary) 5%, var(--background))"
					: "var(--background)",
				border: hovered
					? "1px solid color-mix(in srgb, var(--primary) 30%, transparent)"
					: "0px solid var(--border)",
				transition: "background 0.2s, border-color 0.2s",*/
				display: "flex",
				flexDirection: "column",
			}}
		>
			{/* Immagine placeholder */}
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

			{/* Numero progressivo 
			<span
				style={{
					fontSize: "var(--text-xs)",
					fontWeight: 600,
					color: "var(--primary)",
					textTransform: "uppercase",
					letterSpacing: "0.08em",
				}}
			>
				{num}
			</span>*/}

			{/* Nome prodotto */}
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

			{/* Descrizione 
			<p
				style={{
					fontSize: "var(--text-sm)",
					color: "var(--muted-foreground)",
					marginTop: 8,
					marginBottom: 0,
					lineHeight: 1.6,
				}}
			>
				{product.description}
			</p>*/}

			{/* Badge tecnici */}
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: 8,
					marginTop: 16,
				}}
			>
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

			{/* Link Scopri */}
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
				<motion.span
					animate={{ x: hovered ? 6 : 0 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					style={{ display: "inline-flex" }}
				>
					→
				</motion.span>
			</Link>
		</motion.div>
	);
}

export function ProductsSection() {
	const products = siteConfig.products;
	const CARD_WIDTH = 420;
	const GAP = 24;

	const constraintsRef = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const [isDragging, setIsDragging] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const activeIndexRef = useRef(0);
	const [hintVisible, setHintVisible] = useState(true);

	// Hide drag hint after 2s
	useEffect(() => {
		const id = setTimeout(() => setHintVisible(false), 2000);
		return () => clearTimeout(id);
	}, []);

	// Track active dot from x position
	useEffect(() => {
		const unsubscribe = x.on("change", (val) => {
			const step = CARD_WIDTH + GAP;
			const idx = Math.round(-val / step);
			const clamped = Math.max(0, Math.min(products.length - 1, idx));
			activeIndexRef.current = clamped;
			setActiveIndex(clamped);
		});
		return () => unsubscribe();
	}, [x, products.length]);

	const goToIndex = useCallback(
		(i: number) => {
			const step = CARD_WIDTH + GAP;
			const target = -i * step;
			animate(x, target, { type: "spring", stiffness: 300, damping: 30 });
			activeIndexRef.current = i;
			setActiveIndex(i);
		},
		[x],
	);

	const handlePrev = useCallback(
		() => goToIndex(Math.max(0, activeIndexRef.current - 1)),
		[goToIndex],
	);
	const handleNext = useCallback(
		() => goToIndex(Math.min(products.length - 1, activeIndexRef.current + 1)),
		[goToIndex, products.length],
	);

	return (
		<>
			<style>{`
				.products-drag-track { cursor: grab; }
				.products-drag-track:active { cursor: grabbing; }
			`}</style>
			<section
				style={{
					padding:
						"clamp(80px,10vw,140px) 0 clamp(80px,10vw,140px) clamp(24px,5vw,80px)",
					background: "var(--background)",
					overflow: "hidden",
				}}
			>
				{/* Header */}
				<ProductsHeader onPrev={handlePrev} onNext={handleNext} />

				{/* Drag hint */}
				<motion.div
					animate={{ opacity: hintVisible ? 1 : 0 }}
					transition={{ duration: 0.6 }}
					style={{
						marginTop: 24,
						display: "flex",
						alignItems: "center",
						gap: 6,
						fontSize: "var(--text-xs)",
						color: "var(--muted-foreground)",
						pointerEvents: "none",
						userSelect: "none",
					}}
				>
					<span>←</span>
					<span>trascina</span>
					<span>→</span>
				</motion.div>

				{/* Carousel outer */}
				<div
					ref={constraintsRef}
					style={{
						overflow: "hidden",
						marginTop: 32,
					}}
				>
					{/* Draggable track */}
					<motion.div
						className="products-drag-track"
						drag="x"
						dragConstraints={{
							left: -((products.length - 1) * (CARD_WIDTH + GAP)),
							right: 0,
						}}
						dragElastic={0.05}
						dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
						style={{
							display: "flex",
							gap: "clamp(16px,2vw,24px)",
							width: "fit-content",
							x,
						}}
						data-cursor="drag"
						onDragStart={() => setIsDragging(true)}
						onDragEnd={() => setIsDragging(false)}
					>
						{products.map((product, i) => (
							<div
								key={product.id}
								style={{
									width: "clamp(280px,35vw,420px)",
									flexShrink: 0,
									pointerEvents: isDragging ? "none" : "auto",
								}}
							>
								<ProductCard product={product} index={i} />
							</div>
						))}
					</motion.div>
				</div>
			</section>
		</>
	);
}
