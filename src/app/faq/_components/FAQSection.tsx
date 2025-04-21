"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "A: Shipping typically takes 5–7 business days domestically. International shipping may vary depending on destination.",
  },
  {
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "A: Orders can be modified or canceled within 24 hours of purchase.\n\nPlease contact our support team as soon as possible.",
  },
  {
    question: "Do you offer free returns?",
    answer:
      "A: We currently do not offer free returns. All purchases are final due to the exclusive nature of the product.",
  },
  {
    question: "Is the cube radioactive?",
    answer: "A: No. Despite its futuristic design, the cube is completely safe and non-radioactive.",
  },
  {
    question: "Do you offer round cubes?",
    answer: "A: No. We celebrate the perfection of geometry—cubes only.",
  },
];

export default function FAQSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="w-screen pt-[10em] flex justify-center items-center relative">
      {/* Background Video */}
      <div className="w-full h-full relative">
        <video
            className="absolute left-[50%] translate-x-[-50%] top-0 items-center w-250 h-auto z-0 "
            autoPlay
            muted
            loop
            playsInline
        >
            <source src="/Chrome Cube Elegance_simple_compose.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="relative pt-20 z-10 w-250 mx-auto px-[2em]">
            {/* Heading */}
            <h2 className="absolut mt-25 text-white text-center text-4xl font-normal stroke-1 ">
            - FREQUENTLY ASKED QUESTIONS -
            </h2>

            {/* FAQ layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[-5] p-[2em]">
            {/* Questions */}
            <div className="relative w-[calc(100%+3.5em)] space-y-[em] py-5 z-2">
                {faqs.map((faq, index) => (
                    <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`relative w-full text-left px-[1em] py-[1em] flex justify-between items-center gap-4 ${
                        selectedIndex === index ? "bg-[#D9D9D9]" : "bg-white"
                    }`}
                    >
                    {/* Colored Circle */}
                    <span
                        className={`w-3 h-3 rounded-full shrink-0 ${
                        selectedIndex === index ? "bg-[#95614E]" : "bg-gray-300"
                        }`}
                    ></span>

                    {/* Question Text */}
                    <span className="text-xs font-normal uppercase flex-1">
                        Q: {faq.question}
                    </span>

                    {/* Arrow */}
                    <ArrowUpRight
                        size={19}
                        strokeWidth={2}
                        className={`transition-transform duration-300 ${
                        selectedIndex === index ? "rotate-45 text-[#95614E]" : "rotate-0 text-gray-400"
                        }`}
                    />
                    </button>
                ))}
            </div>

            {/* Answer */}
            <div className="relative  text-black whitespace-pre-line p-[1.5em] bg-[#D9D9D9] z-1">
                <h3 className="mb-4 mt-5 ml-14 text-xl font-normal uppercase">{faqs[selectedIndex].question}</h3>
                <p className="italic font light text-sm ml-20">{faqs[selectedIndex].answer}</p>
            </div>
            </div>
        </div>
      </div>
      
    </section>
  );
}