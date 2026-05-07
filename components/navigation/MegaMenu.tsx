"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { NavItem } from "@/types/index";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
	items: NavItem[];
	isOpen: boolean;
}

export function MegaMenu({ items, isOpen }: MegaMenuProps) {
	const [activeItem, setActiveItem] = useState<NavItem>(items[0]);

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
					{/* Left column */}
					<div style={{ width: "45%" }}>
						{items.map((item) => {
							const isActive = activeItem === item;
							return (
								<Link
									key={item.href}
									href={item.href}
									onMouseEnter={() => setActiveItem(item)}
									style={{
										display: "block",
										padding: "16px 24px",
										background: isActive
											? "color-mix(in oklch, var(--primary) 6%, var(--background))"
											: "transparent",
										transition: "background 200ms",
										textDecoration: "none",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<span
											style={{
												fontWeight: 500,
												color: "var(--foreground)",
											}}
										>
											{item.label}
										</span>
										<span
											style={{
												display: "inline-block",
												color: "var(--foreground)",
												transform: isActive
													? "translateX(4px)"
													: "translateX(0)",
												transition: "transform 200ms",
											}}
										>
											→
										</span>
									</div>
									{item.description && (
										<p
											style={{
												fontSize: "var(--text-xs)",
												color: "var(--muted-foreground)",
												marginTop: 2,
												marginBottom: 0,
											}}
										>
											{item.description}
										</p>
									)}
								</Link>
							);
						})}
					</div>

					{/* Right column — preview */}
					<div
						style={{
							width: "55%",
							borderLeft: "1px solid var(--border)",
							padding: 24,
						}}
					>
						<AnimatePresence mode="wait">
							<motion.div
								key={activeItem?.href}
								initial={{ opacity: 0, x: 8 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 8 }}
								transition={{ duration: 0.2 }}
							>
								<p
									style={{
										fontWeight: 700,
										fontSize: "var(--text-lg)",
										color: "var(--foreground)",
										marginBottom: 8,
									}}
								>
									{activeItem?.label}
								</p>
								{activeItem?.description && (
									<p
										style={{
											color: "var(--muted-foreground)",
											marginBottom: 16,
										}}
									>
										{activeItem.description}
									</p>
								)}
								<Link
									href={activeItem?.href ?? "#"}
									style={{
										color: "var(--primary)",
										fontWeight: 500,
										textDecoration: "none",
									}}
								>
									Scopri →
								</Link>
							</motion.div>
						</AnimatePresence>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
