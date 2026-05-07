import Image from "next/image";

interface LogoProps {
	width?: number;
	height?: number;
	className?: string;
}

export function Logo({ width = 140, height = 40, className }: LogoProps) {
	return (
		<Image
			src="/logo-ms.svg"
			alt="Medical Support"
			width={width}
			height={height}
			className={className}
			priority
		/>
	);
}
