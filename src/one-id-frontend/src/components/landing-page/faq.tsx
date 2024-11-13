import { useState } from "react";
import { Plus, X } from "lucide-react";

const FAQAccordion = () => {
	const [openIndex, setOpenIndex] = useState(0);

	const faqData = [
		{
			question: "How does OneID work?",
			answer:
				"OneID allows users to submit documents once and verifies their identity across multiple platforms using AI-powered instant verification.",
		},
		{
			question: "Does OneID work with my systems?",
			answer:
				"OneID integrates seamlessly with various major platforms in fintech, crypto, and telecom sectors.",
		},
		{
			question: "Is OneID suitable for small businesses?",
			answer:
				"Yes, OneID is designed to scale efficiently for businesses of all sizes, enhancing their KYC processes.",
		},
		{
			question: "How secure is OneID?",
			answer:
				"OneID implements bank-grade encryption and decentralized storage to ensure the highest level of data security.",
		},
		{
			question: "Does OneID require technical expertise?",
			answer:
				"No, OneID is user-friendly and requires minimal technical knowledge for setup and operation.",
		},
	];

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? -1 : index);
	};

	return (
		<div>
			<div className='text-center my-8'>
				<h1 className='font-grotesk text-[2.6rem] text-[#cae88b]'>
					Frequently Asked Questions
				</h1>
				<p className='text-gray-500 mt-3'>
					Discover the core functionalities that make OneID the ultimate
					solution for <br /> efficient user verification.
				</p>
			</div>
			<div className='w-full max-w-3xl mx-auto p-6 space-y-4 bg-black'>
				{faqData.map((faq, index) => (
					<div
						key={index}
						className='border border-gray-800 rounded-xl overflow-hidden'>
						<button
							onClick={() => toggleAccordion(index)}
							className='w-full p-6 flex justify-between items-center text-left text-white hover:bg-gray-900 transition-colors'>
							<span className='text-xl font-medium'>{faq.question}</span>
							{openIndex === index ? (
								<X className='w-6 h-6 flex-shrink-0' />
							) : (
								<Plus className='w-6 h-6 flex-shrink-0' />
							)}
						</button>

						<div
							className={`overflow-hidden transition-all duration-300 ease-in-out ${
								openIndex === index ? "max-h-96" : "max-h-0"
							}`}>
							<div className='p-6 text-gray-400 border-t border-gray-800'>
								{faq.answer}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FAQAccordion;
