"use client";

import Lenis from "lenis";
import {
	createContext,
	useContext,
	useEffect,
	useRef,
	type ReactNode,
} from "react";
import { useAnimationFrame } from "framer-motion";

const LenisContext = createContext<Lenis | null>(null);

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

	return (
		<LenisContext.Provider value={lenisRef.current}>
			{children}
		</LenisContext.Provider>
	);
}

export function useLenis(): Lenis | null {
	return useContext(LenisContext);
}
