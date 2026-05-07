import type { Variants } from "framer-motion";

export const defaultTransition = {
	duration: 0.7,
	ease: [0.16, 1, 0.3, 1] as const,
};

export const springTransition = {
	type: "spring" as const,
	stiffness: 150,
	damping: 20,
};

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
	},
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.6 },
	},
};

export const slideInLeft: Variants = {
	hidden: { opacity: 0, x: -60 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
	},
};

export const slideInRight: Variants = {
	hidden: { opacity: 0, x: 60 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
	},
};

export const staggerContainer: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.1, delayChildren: 0.1 },
	},
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.92 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
	},
};

export const clipReveal: Variants = {
	hidden: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
	visible: {
		clipPath: "inset(0 0% 0 0)",
		opacity: 1,
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
	},
};

export const textReveal: Variants = {
	hidden: { y: "110%" },
	visible: {
		y: "0%",
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
	},
};
