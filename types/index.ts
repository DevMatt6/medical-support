export interface NavItem {
	label: string;
	href: string;
	description?: string;
	children?: NavItem[];
}

export interface Product {
	id: string;
	name: string;
	slug: string;
	tagline: string;
	description: string;
	badges: string[];
	category: string;
	image?: string;
}

export interface NewsItem {
	id: string;
	slug: string;
	title: string;
	subtitle?: string;
	excerpt: string;
	content: string[];
	category: "evento" | "novità" | "company" | "clinica";
	date: string;
	image?: string;
	agent?: string;
	location?: string;
	endDate?: string;
}

export interface SiteConfig {
	name: string;
	description: string;
	url: string;
	nav: NavItem[];
	products: Product[];
}
