import Link from "next/link";
import { NEWS_DATA } from "@/lib/news";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { NavbarDark } from "@/components/ui/NavbarDark";

/* ─── Shared ────────────────────────────────────────────────────── */
const sectionPad: React.CSSProperties = {
	paddingInline: "clamp(24px,5vw,80px)",
};

/* ════════════════════════════════════════════════════════════════ */
/*  1. HERO                                                         */
/* ════════════════════════════════════════════════════════════════ */
function NewsHero() {
	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(140px,18vw,200px)",
				background: "var(--primary)",
				position: "relative",
			}}
		>
			<div
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					height: "60%",
					background: "linear-gradient(to top, var(--accent) 0%, transparent 100%)",
					pointerEvents: "none",
				}}
			/>
			<div style={{ position: "relative", zIndex: 1 }}>
				<SplitText
					text="News & Eventi"
					tag="h1"
					stagger={0.03}
					delay={0.1}
					style={{
						fontSize: "clamp(var(--text-3xl), 5vw, 3.5rem)",
						fontWeight: 500,
						lineHeight: 1.05,
						color: "white",
						margin: 0,
						maxWidth: 760,
					}}
					accentWords={["News"]}
					accentColor="var(--accent)"
				/>

				<ScrollReveal variant="fadeUp" delay={0.35}>
					<p
						style={{
							marginTop: 24,
							fontSize: "var(--text-lg)",
							color: "rgba(255,255,255,0.75)",
							maxWidth: 560,
							lineHeight: 1.65,
						}}
					>
						Eventi, aggiornamenti e progetti raccontati con lo stesso approccio chiaro e visivo del sito.
					</p>
				</ScrollReveal>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════════ */
/*  2. NEWS GRID                                                    */
/* ════════════════════════════════════════════════════════════════ */
function NewsGrid() {
	const items = Object.values(NEWS_DATA).sort((a, b) => (a.date < b.date ? 1 : -1));

	return (
		<section
			style={{
				...sectionPad,
				paddingBlock: "clamp(80px,10vw,140px)",
				background: "var(--background)",
			}}
		>
			<div style={{ maxWidth: 1400, marginInline: "auto", width: "100%" }}>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24 }}>
					{items.map((item) => (
						<Link key={item.id} href={`/news/${item.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
							<article style={{ background: "var(--surface)", overflow: "hidden", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
								<div style={{ aspectRatio: "16 / 10", background: "var(--surface-2)", backgroundImage: item.image ? `url(${item.image})` : undefined, backgroundSize: "cover", backgroundPosition: "center", borderBottom: "1px solid var(--border)" }} />
								<div style={{ padding: 20 }}>
									<span style={{ display: "inline-block", padding: "5px 12px", background: "var(--secondary)", color: "white", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.category}</span>
									<h3 style={{ marginTop: 14, marginBottom: 10, fontSize: "var(--text-lg)", fontWeight: 500, lineHeight: 1.2, color: "var(--primary)" }}>{item.title}</h3>
									<p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.6, color: "var(--muted-foreground)" }}>{item.excerpt}</p>
									<p style={{ marginTop: 16, marginBottom: 0, fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--accent)" }}>Scopri di più →</p>
								</div>
							</article>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

export default function NewsPage() {
	return (
		<>
			<NavbarDark />
			<NewsHero />
			<NewsGrid />
		</>
	);
}
