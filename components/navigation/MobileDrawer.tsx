"use client";

import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Logo } from "@/components/ui/Logo";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/animations";

interface MobileDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

const itemVariant = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.35,
			ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
		},
	},
};

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
	const [accordionOpen, setAccordionOpen] = useState(false);

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent
				side="right"
				style={{
					width: "85vw",
					maxWidth: 380,
					background: "var(--background)",
					borderLeft: "1px solid var(--border)",
					borderRadius: 0,
					padding: 0,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{/* Header */}
				<SheetHeader
					style={{
						padding: 24,
						borderBottom: "1px solid var(--border)",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Logo variant="dark" width={130} height={37} />
				</SheetHeader>

				{/* Nav */}
				<motion.nav
					variants={staggerContainer}
					initial="hidden"
					animate={isOpen ? "visible" : "hidden"}
					transition={{ staggerChildren: 0.05, delayChildren: 0.05 }}
					style={{
						padding: "24px 24px 0",
						display: "flex",
						flexDirection: "column",
						flex: 1,
						overflowY: "auto",
					}}
				>
					{siteConfig.nav.map((item) => {
						const hasChildren =
							"children" in item &&
							Array.isArray(item.children) &&
							item.children.length > 0;

						if (hasChildren) {
							return (
								<motion.div key={item.href} variants={itemVariant}>
									{/* Accordion trigger */}
									<button
										onClick={() => setAccordionOpen((p) => !p)}
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											width: "100%",
											padding: "16px 0",
											borderBottom: "1px solid var(--border)",
											background: "none",
											border: "none",
											borderBottomWidth: 1,
											borderBottomStyle: "solid",
											borderBottomColor: "var(--border)",
											cursor: "pointer",
											color: "var(--foreground)",
											fontWeight: 500,
											fontFamily: "inherit",
											fontSize: "inherit",
										}}
									>
										{item.label}
										<motion.span
											animate={{ rotate: accordionOpen ? 180 : 0 }}
											transition={{
												duration: 0.25,
												ease: [0.16, 1, 0.3, 1] as [
													number,
													number,
													number,
													number,
												],
											}}
											style={{ display: "inline-flex" }}
										>
											<ChevronDown size={18} />
										</motion.span>
									</button>

									{/* Accordion content */}
									<AnimatePresence initial={false}>
										{accordionOpen && (
											<motion.div
												key="accordion"
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{
													duration: 0.35,
													ease: [0.16, 1, 0.3, 1] as [
														number,
														number,
														number,
														number,
													],
												}}
												style={{ overflow: "hidden" }}
											>
												<motion.div
													variants={staggerContainer}
													initial="hidden"
													animate="visible"
													transition={{
														staggerChildren: 0.05,
														delayChildren: 0,
													}}
												>
													{item.children!.map((child) => (
														<motion.div key={child.href} variants={itemVariant}>
															<Link
																href={child.href}
																onClick={onClose}
																style={{
																	display: "block",
																	padding: "12px 0 12px 16px",
																	fontSize: "var(--text-sm)",
																	color: "var(--muted-foreground)",
																	textDecoration: "none",
																}}
															>
																{child.label}
															</Link>
														</motion.div>
													))}
												</motion.div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							);
						}

						return (
							<motion.div key={item.href} variants={itemVariant}>
								<Link
									href={item.href}
									onClick={onClose}
									style={{
										display: "block",
										padding: "16px 0",
										borderBottom: "1px solid var(--border)",
										fontWeight: 500,
										color: "var(--foreground)",
										textDecoration: "none",
									}}
								>
									{item.label}
								</Link>
							</motion.div>
						);
					})}
				</motion.nav>

				{/* Footer */}
				<div
					style={{
						padding: 24,
						borderTop: "1px solid var(--border)",
						display: "flex",
						flexDirection: "column",
						gap: 4,
					}}
				>
					<span
						style={{
							fontSize: "var(--text-xs)",
							color: "var(--muted-foreground)",
						}}
					>
						Via Ippolito Nievo 61, Roma
					</span>
					<Link
						href="mailto:info@medical-support.it"
						style={{
							fontSize: "var(--text-xs)",
							color: "var(--muted-foreground)",
							textDecoration: "none",
						}}
					>
						info@medical-support.it
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	);
}
