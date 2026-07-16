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
	accentWords?: readonly string[];
	accentColor?: string;
	immediate?: boolean;
}

const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionH3 = motion.h3;
const MotionH4 = motion.h4;
const MotionP = motion.p;

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
	const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0 });
	const content = text ?? (typeof children === "string" ? children : "");
	const words = content.split(" ");

	const animateState: "visible" | "hidden" = immediate || isInView ? "visible" : "hidden";

	const sharedProps = {
		ref,
		className: cn(className),
		variants: staggerContainer,
		initial: "hidden" as const,
		animate: animateState,
		transition: { staggerChildren: stagger, delayChildren: delay },
	};

	const mergedStyle: React.CSSProperties = { position: "relative", ...style };

	const renderedWords = words.map((word, i) => {
		const isAccent = accentWords?.includes(word.trim().replace(/[.,!?;:]+$/, ""));
		const colorStyle = isAccent ? { color: accentColor || "var(--accent)" } : undefined;
		const isLastWord = i === words.length - 1;
		return (
			<span
				key={`${word}-${i}`}
				style={{
					display: "inline-block",
					overflow: "hidden",
					verticalAlign: "bottom",
					marginRight: isLastWord ? 0 : "0.25em",
				}}
			>
				<motion.span style={{ display: "inline-block", ...colorStyle }} variants={textReveal}>
					{word}
				</motion.span>
			</span>
		);
	});

	if (tag === "h1") {
		return <MotionH1 {...sharedProps} style={mergedStyle}>{renderedWords}</MotionH1>;
	}

	if (tag === "h2") {
		return <MotionH2 {...sharedProps} style={mergedStyle}>{renderedWords}</MotionH2>;
	}

	if (tag === "h3") {
		return <MotionH3 {...sharedProps} style={mergedStyle}>{renderedWords}</MotionH3>;
	}

	if (tag === "h4") {
		return <MotionH4 {...sharedProps} style={mergedStyle}>{renderedWords}</MotionH4>;
	}

	return <MotionP {...sharedProps} style={mergedStyle}>{renderedWords}</MotionP>;
}
