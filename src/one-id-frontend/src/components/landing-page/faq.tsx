"use client";
import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const FAQAccordion = () => {
	const [openIndex, setOpenIndex] = useState(0);

	const faqData = [
		{
			question: "How does Replex work?",
			answer:
				"Replex uses AI to analyze incoming messages and replies instantly, ensuring efficient customer interactions across various platforms.",
		},
		{
			question: "Does Replex work with my systems?",
			answer:
				"Replex integrates seamlessly with most common business systems and platforms.",
		},
		{
			question: "Is Replex suitable for small businesses?",
			answer:
				"Yes, Replex is designed to scale for businesses of all sizes.",
		},
		{
			question: "How secure is Replex?",
			answer:
				"Replex implements enterprise-grade security protocols to protect your data.",
		},
		{
			question: "Does Replex require technical expertise?",
			answer:
				"No, Replex is designed to be user-friendly and requires minimal technical knowledge.",
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
