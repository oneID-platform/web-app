import Features from "@/components/landing-page/features";
import Header from "@/components/landing-page/header";
import Hero from "@/components/landing-page/hero";
import About from "@/components/landing-page/about";
import FAQAccordion from "@/components/landing-page/faq";
import Footer from "@/components/landing-page/footer";

export default function LandingPage() {
	return (
		<div className='font-[family-name:var(--font-geist-sans)] bg-[#010101]'>
			<Header />
			<Hero />
			<Features />
			<About />
			<FAQAccordion />
			<Footer />
		</div>
	);
}
