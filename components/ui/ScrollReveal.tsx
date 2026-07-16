"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
	fadeUp,
	fadeIn,
	slideInLeft,
	slideInRight,
	scaleIn,
	clipReveal,
	defaultTransition,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const variantsMap = {
	fadeUp,
	fadeIn,
	slideInLeft,
	slideInRight,
	scaleIn,
	clipReveal,
} as const;

type SupportedTag = "div" | "section" | "article" | "span";

interface ScrollRevealProps {
	children: ReactNode;
	variant?: keyof typeof variantsMap;
	delay?: number;
	className?: string;
	once?: boolean;
	threshold?: number;
	as?: SupportedTag;
}

const MotionDiv = motion.div;
const MotionSection = motion.section;
const MotionArticle = motion.article;
const MotionSpan = motion.span;

export function ScrollReveal({
	children,
	variant = "fadeUp",
	delay = 0,
	className,
	once = true,
	threshold = 0.15,
	as = "div",
}: ScrollRevealProps) {
	const divRef = useRef<HTMLDivElement>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const articleRef = useRef<HTMLElement>(null);
	const spanRef = useRef<HTMLSpanElement>(null);
	const activeRef = as === "section" ? sectionRef : as === "article" ? articleRef : as === "span" ? spanRef : divRef;
	const isInView = useInView(activeRef, { once, amount: threshold });

	const sharedProps = {
		className: cn(className),
		variants: variantsMap[variant],
		initial: "hidden",
		animate: isInView ? "visible" : "hidden",
		transition: { ...defaultTransition, delay },
	};

	if (as === "section") {
		return <MotionSection {...sharedProps} ref={sectionRef}>{children}</MotionSection>;
	}

	if (as === "article") {
		return <MotionArticle {...sharedProps} ref={articleRef}>{children}</MotionArticle>;
	}

	if (as === "span") {
		return <MotionSpan {...sharedProps} ref={spanRef}>{children}</MotionSpan>;
	}

	return <MotionDiv {...sharedProps} ref={divRef}>{children}</MotionDiv>;
}
