export type Locale = "it" | "en";

export type LocalizedString = Record<Locale, string>;
export type LocalizedStringArray = Record<Locale, string[]>;

export interface NavItem {
	label: string | LocalizedString;
	href: string;
	description?: string | LocalizedString;
	children?: NavItem[];
}

export interface Product {
	id: string;
	name: string | LocalizedString;
	slug: string;
	tagline: string | LocalizedString;
	description: string | LocalizedString;
	badges: Array<string | LocalizedString>;
	category: string | LocalizedString;
	image?: string;
}

export interface NewsItem {
	id: string;
	slug: string;
	title: string | LocalizedString;
	subtitle?: string | LocalizedString;
	excerpt: string | LocalizedString;
	content: string[] | LocalizedStringArray;
	category:
		| "evento"
		| "novità"
		| "progetti"
		| "clinica"
		| LocalizedString;
	date: string;
	image?: string;
	agent?: string | LocalizedString;
	location?: string | LocalizedString;
	endDate?: string;
}

export interface SiteConfig {
	name: string;
	description: string | LocalizedString;
	url: string;
	nav: NavItem[];
	products: Product[];
}
