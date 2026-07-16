"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRouteLocale } from "@/lib/route-locale";
import { homeCopy } from "@/lib/home-copy";

function AnimatedNumber({
	target,
	prefix = "",
	suffix = "",
	started,
}: {
	target: number;
	prefix?: string;
	suffix?: string;
	started: boolean;
}) {
	const [display, setDisplay] = useState(0);
	const startedRef = useRef(false);

	useEffect(() => {
		if (!started || startedRef.current) return;
		startedRef.current = true;

		let startTime: number | null = null;
		const duration = 1200;
		let frameId: number | null = null;

		function step(timestamp: number) {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setDisplay(Math.round(eased * target));
			if (progress < 1) {
				frameId = requestAnimationFrame(step);
			}
		}

		const timeoutId = window.setTimeout(() => {
			frameId = requestAnimationFrame(step);
		}, 200);

		return () => {
			window.clearTimeout(timeoutId);
			if (frameId !== null) {
				cancelAnimationFrame(frameId);
			}
		};
	}, [started, target]);

	return (
		<span>
			{prefix}
			{display}
			{suffix}
		</span>
	);
}

export function TrustBar() {
	const locale = useRouteLocale();
	const containerRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(containerRef, { once: true, amount: 0.3 });
	const [isMobile, setIsMobile] = useState(false);
	const items = homeCopy.trustbar[locale].items;

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		const updateIsMobile = () => setIsMobile(mq.matches);

		updateIsMobile();
		mq.addEventListener("change", updateIsMobile);

		return () => mq.removeEventListener("change", updateIsMobile);
	}, []);

	return (
		<>
			<style>{`
                @media (max-width: 767px) {
                    .trustbar-separator { display: none !important; }
                }
            `}</style>
			<div
				ref={containerRef}
				style={{
					background: "var(--primary)",
					paddingBlock: 100,
					color: "white",
					overflow: "hidden",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						gap: "clamp(12px,4vw,64px)",
						flexWrap: "wrap",
						alignItems: "center",
						paddingInline: "clamp(24px,5vw,80px)",
						flexDirection: isMobile ? "column" : "row",
					}}
				>
					{items.map((stat, i) => (
						<div
							key={stat.value}
							style={{
								display: "flex",
								alignItems: "center",
								gap: "clamp(32px,4vw,64px)",
							}}
						>
							{i > 0 && (
								<div
									className="trustbar-separator"
									style={{
										width: 1,
										height: 40,
										background: "var(--accent)",
										flexShrink: 0,
										display: isMobile ? "none" : "block",
									}}
								/>
							)}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{
									duration: 0.6,
									ease: [0.16, 1, 0.3, 1],
									delay: i * 0.1,
								}}
							>
								<div style={{ textAlign: "center" }}>
									<p
										style={{
											margin: 0,
											fontWeight: 600,
											fontSize: "var(--text-2xl)",
											color: "white",
										}}
									>
										{stat.numericTarget !== undefined ? (
											<AnimatedNumber
												target={stat.numericTarget}
												prefix={stat.numericPrefix ?? ""}
												suffix={stat.numericSuffix ?? ""}
												started={isInView}
											/>
										) : (
											stat.value
										)}
									</p>
									<p
										style={{
											margin: "4px 0 0",
											fontSize: "var(--text-xs)",
											color: "white",
											opacity: 0.7,
											textTransform: "uppercase",
											letterSpacing: "0.06em",
										}}
									>
										{stat.label}
									</p>
								</div>
							</motion.div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
