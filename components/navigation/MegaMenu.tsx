"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { NavItem } from "@/types/index";
import { getDictionary, localize, type Locale } from "@/lib/i18n";

interface MegaMenuProps {
	items: NavItem[];
	isOpen: boolean;
	locale: Locale;
}

export function MegaMenu({ items, isOpen, locale }: MegaMenuProps) {
	const dictionary = getDictionary(locale);
	const [hoveredHref, setHoveredHref] = useState(items[0]?.href ?? "");
	const activeItem = items.find((item) => item.href === hoveredHref) ?? items[0] ?? null;

	if (!items.length) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: -8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
					style={{
						position: "absolute",
						top: "100%",
						left: 0,
						minWidth: 640,
						background: "var(--background)",
						border: "1px solid var(--border)",
						borderRadius: 0,
						boxShadow: "none",
						display: "flex",
					}}
				>
					<div style={{ width: "45%" }}>
						{items.map((item) => {
							const isActive = activeItem?.href === item.href;
							return (
								<Link
									key={item.href}
									href={locale === "en" ? `/en${item.href}` : item.href}
									onMouseEnter={() => setHoveredHref(item.href)}
									style={{
										display: "block",
										padding: "16px 24px",
										background: isActive ? "color-mix(in oklch, var(--primary) 6%, var(--background))" : "transparent",
										transition: "background 200ms",
										textDecoration: "none",
									}}
								>
									<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
										<span style={{ fontWeight: 500, color: "var(--foreground)" }}>{localize(item.label, locale)}</span>
										<span
											style={{
												display: "inline-block",
												color: "var(--foreground)",
												transform: isActive ? "translateX(4px)" : "translateX(0)",
												transition: "transform 200ms",
											}}
										>
											→
										</span>
									</div>
									{item.description && (
										<p style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", marginTop: 2, marginBottom: 0 }}>
											{localize(item.description, locale)}
										</p>
									)}
								</Link>
							);
						})}
					</div>

					<div style={{ width: "55%", borderLeft: "1px solid var(--border)", padding: 24 }}>
						<AnimatePresence mode="wait">
							<motion.div
								key={activeItem?.href}
								initial={{ opacity: 0, x: 8 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 8 }}
								transition={{ duration: 0.2 }}
							>
								<p style={{ fontWeight: 700, fontSize: "var(--text-lg)", color: "var(--foreground)", marginBottom: 8 }}>
									{activeItem ? localize(activeItem.label, locale) : null}
								</p>
								{activeItem?.description && (
									<p style={{ color: "var(--muted-foreground)", marginBottom: 16 }}>
										{localize(activeItem.description, locale)}
									</p>
								)}
								<Link href={activeItem?.href ? (locale === "en" ? `/en${activeItem.href}` : activeItem.href) : "#"} style={{ color: "var(--primary)", fontWeight: 500, textDecoration: "none" }}>
									{dictionary.common.discover} →
								</Link>
							</motion.div>
						</AnimatePresence>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
