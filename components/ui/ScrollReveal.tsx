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
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

const variantsMap = {
	fadeUp,
	fadeIn,
	slideInLeft,
	slideInRight,
	scaleIn,
	clipReveal,
} as const;

interface ScrollRevealProps {
	children: ReactNode;
	variant?: keyof typeof variantsMap;
	delay?: number;
	className?: string;
	once?: boolean;
	threshold?: number;
	as?: ElementType<ComponentPropsWithoutRef<"div">>;
}

export function ScrollReveal({
	children,
	variant = "fadeUp",
	delay = 0,
	className,
	once = true,
	threshold = 0.15,
	as: Tag = "div",
}: ScrollRevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once, amount: threshold });

	const MotionTag = motion.create(Tag as ElementType);

	return (
		<MotionTag
			ref={ref}
			className={cn(className)}
			variants={variantsMap[variant]}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			transition={{ ...defaultTransition, delay }}
		>
			{children}
		</MotionTag>
	);
}
