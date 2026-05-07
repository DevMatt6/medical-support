"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { textReveal, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

type TagName = "h1" | "h2" | "h3" | "h4" | "p";

interface SplitTextProps {
	text?: string;
	children?: React.ReactNode;
	className?: string;
	delay?: number;
	tag?: TagName;
	stagger?: number;
	style?: React.CSSProperties;
	accentWords?: string[];
	accentColor?: string;
	immediate?: boolean;
}

export function SplitText({
	text,
	children,
	className,
	delay = 0,
	tag = "p",
	stagger = 0.04,
	style,
	accentWords,
	accentColor,
	immediate = false,
}: SplitTextProps) {
	const ref = useRef<HTMLElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0 });

	const content = text ?? (typeof children === "string" ? children : "");
	const MotionTag = motion.create(tag) as typeof motion.div;
	const words = content.split(" ");

	return (
		<MotionTag
			ref={ref as React.Ref<any>}
			className={cn(className)}
			style={{ position: "relative", ...style }}
			variants={staggerContainer}
			initial="hidden"
			animate={immediate || isInView ? "visible" : "hidden"}
			transition={{ staggerChildren: stagger, delayChildren: delay }}
		>
			{words.map((word, i) => {
				const isAccent = accentWords?.includes(
					word.trim().replace(/[.,!?;:]+$/, ""),
				);
				const colorStyle = isAccent
					? { color: accentColor || "var(--accent)" }
					: undefined;
				return (
					<span
						key={i}
						style={{
							display: "inline-block",
							overflow: "hidden",
							verticalAlign: "bottom",
							marginRight: "0.25em",
						}}
					>
						<motion.span
							style={{ display: "inline-block", ...colorStyle }}
							variants={textReveal}
						>
							{word}
						</motion.span>
					</span>
				);
			})}
		</MotionTag>
	);
}
