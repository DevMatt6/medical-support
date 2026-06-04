"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NEWS_DATA } from "@/lib/news";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";

const sectionPad: React.CSSProperties = {
	paddingInline: "clamp(24px,5vw,80px)",
};

export function NewsCarousel() {
	const items = Object.values(NEWS_DATA).sort((a, b) => (a.date < b.date ? 1 : -1));

	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(80px,10vw,140px)",
				background: "var(--background)",
				overflow: "hidden",
			}}
		>
			<div style={{ maxWidth: 1400, marginInline: "auto", width: "100%" }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-end",
						gap: 24,
						marginBottom: 28,
						flexWrap: "wrap",
					}}
				>
					<div style={{ minWidth: 0 }}>
						<ScrollReveal variant="fadeIn" delay={0.05}>
							<span
								style={{
									display: "inline-block",
									padding: "6px 14px",
									background: "var(--secondary)",
									color: "white",
									fontSize: "var(--text-xs)",
									letterSpacing: "0.08em",
									textTransform: "uppercase",
								}}
							>
								Aggiornamenti
							</span>
						</ScrollReveal>
						<SplitText
							text="News & Eventi"
							tag="h2"
							stagger={0.03}
							delay={0.12}
							immediate
							style={{
								marginTop: 16,
								fontSize: "var(--text-3xl)",
								fontWeight: 500,
								lineHeight: 1.05,
								color: "var(--primary)",
							}}
						/>
					</div>
					<div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
						<button aria-label="News precedenti" style={{ width: 48, height: 48, border: "1px solid var(--primary)", background: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--primary)" }}>
							<ChevronLeft size={18} />
						</button>
						<button aria-label="News successive" style={{ width: 48, height: 48, border: "1px solid var(--primary)", background: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--primary)" }}>
							<ChevronRight size={18} />
						</button>
					</div>
				</div>

				<div style={{ overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
						style={{
							display: "flex",
							gap: 24,
							width: "fit-content",
						}}
					>
						{items.map((item) => (
							<Link key={item.id} href={`/news/${item.slug}`} style={{ textDecoration: "none", color: "inherit", flex: "0 0 clamp(280px, 85vw, 420px)" }}>
								<article style={{ backgroundColor: "white", padding: "clamp(12px, 2vw, 20px)", display: "flex", flexDirection: "column" }}>
									<div style={{ aspectRatio: "1 / 1", backgroundImage: item.image ? `url(${item.image})` : undefined, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", marginBottom: 20 }} />
									<span style={{ fontSize: "var(--text-xs)", letterSpacing: "0.08em", textTransform: "uppercase", color: "white", backgroundColor: "var(--secondary)", padding: "6px 14px", display: "inline-block", alignSelf: "flex-start" }}>{item.category}</span>
									<h3 style={{ fontSize: "var(--text-xl)", fontWeight: 500, color: "var(--primary)", margin: "12px 0px 0px" }}>{item.title}</h3>
									<p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.6, color: "var(--muted-foreground)", marginTop: 16 }}>{item.excerpt}</p>
									<div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8, fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--primary)" }}>
										Scopri
										<span style={{ display: "inline-flex", transform: "none" }}>→</span>
									</div>
								</article>
							</Link>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
