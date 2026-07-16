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

const MotionButton = motion.button;
const MotionAnchor = motion.a;

export function MagneticButton({
	children,
	className,
	style,
	strength = 0.4,
	as = "button",
	href,
	onClick,
}: MagneticButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const anchorRef = useRef<HTMLAnchorElement>(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springX = useSpring(mouseX, { stiffness: 200, damping: 15 });
	const springY = useSpring(mouseY, { stiffness: 200, damping: 15 });

	function onMouseMove(e: React.MouseEvent<HTMLElement>) {
		const currentRef = as === "a" ? anchorRef : buttonRef;
		const rect = currentRef.current?.getBoundingClientRect();
		if (!rect) return;
		mouseX.set((e.clientX - rect.left - rect.width / 2) * strength);
		mouseY.set((e.clientY - rect.top - rect.height / 2) * strength);
	}

	function onMouseLeave() {
		mouseX.set(0);
		mouseY.set(0);
	}

	const sharedProps = {
		className: cn(className),
		style: {
			x: springX,
			y: springY,
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			...style,
		},
		"data-cursor": "hover",
		onMouseMove,
		onMouseLeave,
		onClick,
	};

	if (as === "a") {
		return (
			<MotionAnchor {...sharedProps} ref={anchorRef} href={href}>
				{children}
			</MotionAnchor>
		);
	}

	return <MotionButton {...sharedProps} ref={buttonRef}>{children}</MotionButton>;
}
