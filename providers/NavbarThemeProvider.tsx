"use client";

import { createContext, useContext, useState, useCallback } from "react";

type NavbarTheme = "default" | "light-on-dark";

interface NavbarThemeContextValue {
	navbarTheme: NavbarTheme;
	setNavbarTheme: (theme: NavbarTheme) => void;
}

const NavbarThemeContext = createContext<NavbarThemeContextValue>({
	navbarTheme: "default",
	setNavbarTheme: () => {},
});

export function NavbarThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [navbarTheme, setNavbarThemeState] = useState<NavbarTheme>("default");

	const setNavbarTheme = useCallback((theme: NavbarTheme) => {
		setNavbarThemeState(theme);
	}, []);

	return (
		<NavbarThemeContext.Provider value={{ navbarTheme, setNavbarTheme }}>
			{children}
		</NavbarThemeContext.Provider>
	);
}

export function useNavbarTheme() {
	return useContext(NavbarThemeContext);
}
