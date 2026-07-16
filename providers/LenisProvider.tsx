"use client";

import Lenis from "lenis";
import { useEffect, useRef, type ReactNode } from "react";
import { useAnimationFrame } from "framer-motion";

interface LenisProviderProps {
	children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		const lenis = new Lenis({
			lerp: 0.08,
			duration: 1.2,
			smoothWheel: true,
		});

		lenisRef.current = lenis;

		return () => {
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	useAnimationFrame((time) => {
		lenisRef.current?.raf(time);
	});

	return <>{children}</>;
}
