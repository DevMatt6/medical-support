"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MagneticButtonProps =
	| {
			children: ReactNode;
			className?: string;
			style?: React.CSSProperties;
			strength?: number;
			as?: "button";
			href?: never;
			onClick?: () => void;
	  }
	| {
			children: ReactNode;
			className?: string;
			style?: React.CSSProperties;
			strength?: number;
			as: "a";
			href?: string;
			onClick?: () => void;
	  };

export function MagneticButton({
	children,
	className,
	style,
	strength = 0.4,
	as = "button",
	href,
	onClick,
}: MagneticButtonProps) {
	const ref = useRef<HTMLElement>(null);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springX = useSpring(mouseX, { stiffness: 200, damping: 15 });
	const springY = useSpring(mouseY, { stiffness: 200, damping: 15 });

	function onMouseMove(e: React.MouseEvent<HTMLElement>) {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;
		mouseX.set((e.clientX - rect.left - rect.width / 2) * strength);
		mouseY.set((e.clientY - rect.top - rect.height / 2) * strength);
	}

	function onMouseLeave() {
		mouseX.set(0);
		mouseY.set(0);
	}

	const MotionTag = motion(as);

	return (
		<MotionTag
			// @ts-expect-error — ref is compatible at runtime; motion() generic inference is limited
			ref={ref}
			className={cn(className)}
			style={{
				x: springX,
				y: springY,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				...style,
			}}
			data-cursor="hover"
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			onClick={onClick}
			{...(as === "a" ? { href } : {})}
		>
			{children}
		</MotionTag>
	);
}
