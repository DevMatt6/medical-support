import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale: string = "it-IT"): string {
	return date.toLocaleDateString(locale, {
		year: "numeric",
		month: "short",
		day: "2-digit",
	});
}

export type AnimationVariants = Record<
	string,
	{
		opacity?: number;
		y?: number;
		x?: number;
		scale?: number;
		clipPath?: string;
		transition?: Record<string, unknown>;
	}
>;
