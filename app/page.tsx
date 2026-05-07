import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { ProductsSection } from "@/components/sections/home/ProductsSection";
import { ApplicationsSection } from "@/components/sections/home/ApplicationsSection";
import { SoftwareSection } from "@/components/sections/home/SoftwareSection";
import { ClinicalSection } from "@/components/sections/home/ClinicalSection";
import { CTASection } from "@/components/sections/home/CTASection";

export default function Home() {
	return (
		<>
			<HeroSection />
			<TrustBar />
			<IntroSection />
			<ProductsSection />
			<ApplicationsSection />
			<SoftwareSection />
			<ClinicalSection />
			<CTASection />
		</>
	);
}
