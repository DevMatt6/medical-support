"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
	const [isTouch, setIsTouch] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const dotX = useMotionValue(-100);
	const dotY = useMotionValue(-100);
	const rawX = useMotionValue(-100);
	const rawY = useMotionValue(-100);
	const ringX = useSpring(rawX, { stiffness: 150, damping: 20 });
	const ringY = useSpring(rawY, { stiffness: 150, damping: 20 });

	useEffect(() => {
		const mq = window.matchMedia("(hover: none)");
		const updateTouch = () => setIsTouch(mq.matches);

		updateTouch();
		mq.addEventListener("change", updateTouch);
		return () => mq.removeEventListener("change", updateTouch);
	}, []);

	useEffect(() => {
		if (isTouch) return;

		const onMove = (e: MouseEvent) => {
			dotX.set(e.clientX);
			dotY.set(e.clientY);
			rawX.set(e.clientX);
			rawY.set(e.clientY);
		};

		window.addEventListener("mousemove", onMove);
		return () => window.removeEventListener("mousemove", onMove);
	}, [isTouch, dotX, dotY, rawX, rawY]);

	useEffect(() => {
		if (isTouch) return;

		const targets = Array.from(document.querySelectorAll<HTMLElement>('a, button, [data-cursor="hover"]'));
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
	}, [isTouch]);

	useEffect(() => {
		if (isTouch) return;
		const originalCursor = document.body.style.cursor;
		document.body.style.cursor = "none";
		return () => {
			document.body.style.cursor = originalCursor;
		};
	}, [isTouch]);

	if (isTouch) return null;

	return (
		<>
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
