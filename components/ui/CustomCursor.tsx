"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
	const [mounted, setMounted] = useState(false);
	const [isTouch, setIsTouch] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	// Dot position — direct, no spring
	const dotX = useMotionValue(-100);
	const dotY = useMotionValue(-100);

	// Ring position — spring follow
	const rawX = useMotionValue(-100);
	const rawY = useMotionValue(-100);
	const ringX = useSpring(rawX, { stiffness: 150, damping: 20 });
	const ringY = useSpring(rawY, { stiffness: 150, damping: 20 });

	// Mount + touch detection
	useEffect(() => {
		setMounted(true);
		if (window.matchMedia("(hover: none)").matches) {
			setIsTouch(true);
		}
	}, []);

	// Mouse move
	useEffect(() => {
		if (!mounted || isTouch) return;

		const onMove = (e: MouseEvent) => {
			dotX.set(e.clientX);
			dotY.set(e.clientY);
			rawX.set(e.clientX);
			rawY.set(e.clientY);
		};

		window.addEventListener("mousemove", onMove);
		return () => window.removeEventListener("mousemove", onMove);
	}, [mounted, isTouch, dotX, dotY, rawX, rawY]);

	// Hover detection on interactive elements
	useEffect(() => {
		if (!mounted || isTouch) return;

		const targets = Array.from(
			document.querySelectorAll<HTMLElement>(
				'a, button, [data-cursor="hover"]',
			),
		);

		const onEnter = () => setIsHovered(true);
		const onLeave = () => setIsHovered(false);

		targets.forEach((el) => {
			el.addEventListener("mouseenter", onEnter);
			el.addEventListener("mouseleave", onLeave);
		});

		return () => {
			targets.forEach((el) => {
				el.removeEventListener("mouseenter", onEnter);
				el.removeEventListener("mouseleave", onLeave);
			});
		};
	}, [mounted, isTouch]);

	// Hide native cursor on desktop
	useEffect(() => {
		if (!mounted || isTouch) return;
		document.body.style.cursor = "none";
		return () => {
			document.body.style.cursor = "";
		};
	}, [mounted, isTouch]);

	if (!mounted || isTouch) return null;

	return (
		<>
			{/* Dot — follows cursor directly */}
			<motion.div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					x: dotX,
					y: dotY,
					translateX: "-50%",
					translateY: "-50%",
					width: 8,
					height: 8,
					borderRadius: "50%",
					backgroundColor: "var(--primary)",
					pointerEvents: "none",
					zIndex: 9999,
				}}
				animate={{ opacity: isHovered ? 0 : 1 }}
				transition={{ duration: 0.2 }}
			/>

			{/* Ring — spring follow */}
			<motion.div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					x: ringX,
					y: ringY,
					translateX: "-50%",
					translateY: "-50%",
					borderRadius: "50%",
					border: "1.5px solid var(--primary)",
					backgroundColor: "transparent",
					pointerEvents: "none",
					zIndex: 9999,
				}}
				animate={{
					width: isHovered ? 64 : 40,
					height: isHovered ? 64 : 40,
					opacity: isHovered ? 0.5 : 1,
				}}
				transition={{ duration: 0.2 }}
			/>
		</>
	);
}
