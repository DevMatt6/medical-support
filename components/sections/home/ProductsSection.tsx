"use client";

import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useMemo,
} from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SplitText } from "@/components/ui/SplitText";
import type { Product } from "@/types/index";
import { localize } from "@/lib/i18n";
import { useRouteLocale } from "@/lib/route-locale";

interface ProductsHeaderProps {
	onPrev: () => void;
	onNext: () => void;
	locale: "it" | "en";
}

const ProductsHeader = React.memo(function ProductsHeader({
	onPrev,
	onNext,
	locale,
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
					{locale === "it" ? "Linea Cristal" : "Cristal Line"}
				</span>
				<SplitText
					text={locale === "it" ? "Cinque strumenti per una diagnostica completa." : "Five tools for complete diagnostics."}
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
					aria-label={locale === "it" ? "Prodotto precedente" : "Previous product"}
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
					aria-label={locale === "it" ? "Prodotto successivo" : "Next product"}
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

function ProductCard({ product, index, locale }: { product: Product; index: number; locale: "it" | "en" }) {
	const [hovered, setHovered] = useState(false);

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

			{/* Numero progressivo  - nome prodotto */}
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
				{locale === "it" ? "Cristal" : "Cristal"}
			</span>

			{/* Nome prodotto */}
			<h3
				style={{
					fontSize: "var(--text-xl)",
					fontWeight: 500,
					color: "var(--primary)",
					margin: "12px 0 0",
				}}
			>
				{localize(product.name)}
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
				{product.badges.slice(0, 3).map((badge, badgeIndex) => (
					<span
						key={`${product.id}-badge-${badgeIndex}`}
						style={{
							display: "inline-flex",
							padding: "4px 10px",
							backgroundColor: "var(--background)",
							fontSize: "var(--text-xs)",
							color: "var(--primary)",
						}}
					>
						{typeof badge === "string" ? badge : localize(badge, locale)}
					</span>
				))}
			</div>

			{/* Link Scopri */}
			<Link
				href={`/${locale}/prodotti/${product.slug}`}
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
				{locale === "it" ? "Scopri" : "Discover"}
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
	const locale = useRouteLocale();
	const products = useMemo(
		() =>
			siteConfig.products.map((product) => ({
				...product,
				badges: product.badges.map((badge) => localize(badge, locale)),
			})),
		[locale],
	);
	const CARD_WIDTH = 420;
	const GAP = 24;
	const COUNT = products.length;

	// Triplo array per l'effetto infinito
	const loopedProducts = useMemo(
		() => [...products, ...products, ...products, ...products, ...products],
		[products],
	);

	const [step, setStep] = useState(CARD_WIDTH + GAP);
	const stepRef = useRef(CARD_WIDTH + GAP);
	const cardRef = useRef<HTMLDivElement>(null);

	const x = useMotionValue(-(COUNT * (CARD_WIDTH + GAP))); // inizia alla copia centrale
	const [isDragging, setIsDragging] = useState(false);
	const [, setActiveIndex] = useState(0);
	const virtualRef = useRef<number>(COUNT); // posizione virtuale nel triplo array
	const [hintVisible, setHintVisible] = useState(true);

	// Hide drag hint after 2s
	useEffect(() => {
		const id = setTimeout(() => setHintVisible(false), 2000);
		return () => clearTimeout(id);
	}, []);

	// Aggiorna il dot attivo durante il drag
	useEffect(() => {
		const unsubscribe = x.on("change", (val) => {
			const idx = Math.round(-val / stepRef.current);
			const logical = ((idx % COUNT) + COUNT) % COUNT;
			setActiveIndex(logical);
		});
		return () => unsubscribe();
	}, [x, COUNT]);

	// Misura la larghezza reale della card e ricalcola lo step al resize
	useEffect(() => {
		if (!cardRef.current) return;
		const measure = () => {
			if (!cardRef.current) return;
			const w = cardRef.current.offsetWidth + GAP;
			stepRef.current = w;
			setStep(w);
			const logical = ((virtualRef.current % COUNT) + COUNT) % COUNT;
			const normalized = COUNT + logical;
			virtualRef.current = normalized;
			x.set(-(normalized * w));
		};
		const ro = new ResizeObserver(measure);
		ro.observe(cardRef.current);
		return () => ro.disconnect();
	}, [x, COUNT, GAP]);

	// Dopo ogni navigazione, teletrasporta silenziosamente alla copia centrale
	const normalizeToMiddle = useCallback(() => {
		const rawIdx = Math.round(-x.get() / stepRef.current);
		const logical = ((rawIdx % COUNT) + COUNT) % COUNT;
		const normalized = COUNT + logical;
		if (rawIdx !== normalized) {
			x.set(-(normalized * stepRef.current));
			virtualRef.current = normalized;
		}
	}, [x, COUNT]);

	const goToVirtual = useCallback(
		(virtualIdx: number) => {
			virtualRef.current = virtualIdx;
			const logical = ((virtualIdx % COUNT) + COUNT) % COUNT;
			setActiveIndex(logical);
			animate(x, -(virtualIdx * stepRef.current), {
				type: "spring",
				stiffness: 300,
				damping: 30,
				onComplete: normalizeToMiddle,
			});
		},
		[x, COUNT, normalizeToMiddle],
	);

	const handlePrev = useCallback(
		() => goToVirtual(virtualRef.current - 1),
		[goToVirtual],
	);
	const handleNext = useCallback(
		() => goToVirtual(virtualRef.current + 1),
		[goToVirtual],
	);

	const handleDragEnd = useCallback(() => {
		setIsDragging(false);
		const rawIdx = Math.round(-x.get() / stepRef.current);
		const clamped = Math.max(0, Math.min(loopedProducts.length - 1, rawIdx));
		virtualRef.current = clamped;
		animate(x, -(clamped * stepRef.current), {
			type: "spring",
			stiffness: 300,
			damping: 30,
			onComplete: normalizeToMiddle,
		});
	}, [x, loopedProducts.length, normalizeToMiddle]);

	return (
		<>
			<style>{`
				.products-drag-track { cursor: grab; }
				.products-drag-track:active { cursor: grabbing; }
				.product-card-wrapper { width: clamp(280px,35vw,420px); }
				@media (max-width: 768px) {
					.product-card-wrapper { width: calc(100vw - clamp(24px,5vw,80px)); }
				}
			`}</style>
			<section
				style={{
					padding: "0 0 clamp(80px,10vw,140px) clamp(24px,5vw,80px)",
					background: "var(--background)",
					overflow: "hidden",
				}}
			>
				{/* Header */}
				<ProductsHeader onPrev={handlePrev} onNext={handleNext} locale={locale} />

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
							left: -((loopedProducts.length - 1) * step),
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
						onDragEnd={handleDragEnd}
					>
						{loopedProducts.map((product, i) => (
							<div
								key={`${product.id}-${Math.floor(i / COUNT)}`}
								ref={i === 0 ? cardRef : undefined}
								className="product-card-wrapper"
								style={{
									flexShrink: 0,
									pointerEvents: isDragging ? "none" : "auto",
								}}
							>
								<ProductCard product={product} index={i % COUNT} locale={locale} />
							</div>
						))}
					</motion.div>
				</div>
			</section>
		</>
	);
}
