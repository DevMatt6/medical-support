"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export { useTheme };

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute="data-theme"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange={false}
			{...props}
		>
			{children}
		</NextThemesProvider>
	);
}

export function ThemeToggle({ className }: { className?: string }) {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<button
				aria-label="Caricamento tema"
				disabled
				className={cn(className)}
				style={{
					width: 40,
					height: 40,
					background: "none",
					border: "none",
					borderRadius: 0,
					cursor: "default",
				}}
			/>
		);
	}

	const isDark = resolvedTheme === "dark";

	return (
		<button
			aria-label={isDark ? "Passa a tema chiaro" : "Passa a tema scuro"}
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className={cn(className)}
			style={{
				width: 40,
				height: 40,
				background: "none",
				border: "none",
				borderRadius: 0,
				cursor: "pointer",
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				color: "var(--foreground)",
				padding: 0,
			}}
		>
			{isDark ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	);
}
