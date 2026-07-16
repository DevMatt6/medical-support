import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { NEWS_DATA } from "@/lib/news";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitText } from "@/components/ui/SplitText";
import { localize, type Locale } from "@/lib/i18n";

function formatDate(dateString: string, locale: Locale) {
	return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "it-IT", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	}).format(new Date(`${dateString}T12:00:00`));
}

export default async function NewsDetail({
	params,
}: {
	params: Promise<{ slug: string; locale?: Locale }>;
}) {
	const { slug, locale = "it" } = await params;
	const item = NEWS_DATA[slug];
	if (!item) return notFound();

	return (
		<section
			style={{
				paddingBlock: "clamp(80px, 10vw, 140px)",
				paddingInline: "clamp(24px, 5vw, 80px)",
				background: "var(--background)",
			}}
		>
			<div style={{ marginInline: "auto", width: "100%" }}>
				<Link
					href={`/${locale}/news`}
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: 8,
						marginBottom: 28,
						textDecoration: "none",
						color: "var(--primary)",
						fontSize: "var(--text-sm)",
						fontWeight: 600,
					}}
				>
					<ChevronLeft size={16} />
					{locale === "en" ? "Back to news" : "Torna alle news"}
				</Link>

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
						{localize(item.category)}
					</span>
				</ScrollReveal>

				<SplitText
					text={localize(item.title)}
					tag="h1"
					stagger={0.03}
					delay={0.12}
					immediate
					style={{
						marginTop: 16,
						fontSize: "var(--text-hero)",
						fontWeight: 500,
						lineHeight: 1.03,
						color: "var(--primary)",
						maxWidth: 980,
					}}
				/>

				<p
					style={{
						marginTop: 18,
						marginBottom: 0,
						fontSize: "var(--text-lg)",
						color: "var(--muted-foreground)",
						maxWidth: 820,
					}}
				>
					{formatDate(item.date, locale)}
					{item.location ? ` • ${item.location}` : ""}
				</p>

				{item.subtitle ? (
					<p
						style={{
							marginTop: 10,
							marginBottom: 0,
							fontSize: "var(--text-lg)",
							lineHeight: 1.6,
							color: "var(--primary)",
							maxWidth: 860,
						}}
					>
						{localize(item.subtitle ?? "") || ""}
					</p>
				) : null}

				<div style={{ height: 36 }} />

				<div
					style={{
						aspectRatio: "16 / 9",
						background: "var(--surface-2)",
						backgroundImage: item.image ? `url(${item.image})` : undefined,
						backgroundSize: "cover",
						backgroundPosition: "center",
						border: "1px solid var(--border)",
						marginBottom: 40,
					}}
				/>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "minmax(0, 1fr)",
						gap: 20,
						maxWidth: 860,
						marginInline: "auto",
					}}
				>
					{localize(item.content).map((paragraph, index) => (
						<p
							key={index}
							style={{
								fontSize: "var(--text-base)",
								lineHeight: 1.9,
								color: "var(--foreground)",
								margin: 0,
							}}
						>
							{paragraph}
						</p>
					))}
				</div>
			</div>
		</section>
	);
}
