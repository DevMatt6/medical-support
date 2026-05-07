"use client";

import { useEffect } from "react";
import { useNavbarTheme } from "@/providers/NavbarThemeProvider";

export function NavbarDark() {
	const { setNavbarTheme } = useNavbarTheme();

	useEffect(() => {
		setNavbarTheme("light-on-dark");
		return () => setNavbarTheme("default");
	}, [setNavbarTheme]);

	return null;
}
