"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const DURATION = 0.6;

interface PageTransitionProps {
	children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
	const [showCurtain, setShowCurtain] = useState(true);

	useEffect(() => {
		const timeoutId = window.setTimeout(() => setShowCurtain(false), 700);
		return () => window.clearTimeout(timeoutId);
	}, []);

	return (
		<motion.div>
			{showCurtain && (
				<>
					{/* Curtain — TOP */}
					<motion.div
						initial={{ y: 0 }}
						animate={{ y: "-100%" }}
						transition={{ duration: DURATION, ease: EASE }}
						style={{
							position: "fixed",
							top: 0,
							left: 0,
							width: "100vw",
							height: "50vh",
							zIndex: 9998,
							backgroundColor: "var(--primary)",
							pointerEvents: "none",
						}}
					/>

					{/* Curtain — BOTTOM */}
					<motion.div
						initial={{ y: 0 }}
						animate={{ y: "100%" }}
						transition={{ duration: DURATION, ease: EASE }}
						style={{
							position: "fixed",
							bottom: 0,
							left: 0,
							width: "100vw",
							height: "50vh",
							zIndex: 9998,
							backgroundColor: "var(--primary)",
							pointerEvents: "none",
						}}
					/>
				</>
			)}

			{/* Page content */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, delay: 0.4 }}
			>
				{children}
			</motion.div>
		</motion.div>
	);
}
