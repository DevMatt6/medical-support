"use client";

import { motion } from "framer-motion";

export default function Loading() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				background: "var(--background)",
				gap: 24,
			}}
		>
			<span
				style={{
					fontSize: "var(--text-xl)",
					fontWeight: 700,
					color: "var(--primary)",
					letterSpacing: "0.1em",
				}}
			>
				MS
			</span>

			{/* Progress bar */}
			<div
				style={{
					position: "fixed",
					bottom: 0,
					left: 0,
					width: "100%",
					height: 3,
					background: "var(--border)",
				}}
			>
				<motion.div
					initial={{ width: "0%" }}
					animate={{ width: "100%" }}
					transition={{ duration: 1.5, ease: "easeInOut" }}
					style={{
						height: "100%",
						background: "var(--primary)",
					}}
				/>
			</div>
		</div>
	);
}
