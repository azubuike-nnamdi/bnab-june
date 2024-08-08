'use client'
import { faqs } from "@/lib/data/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Fade } from "react-awesome-reveal";

export default function Faq() {
  return (
    <Fade direction="up" cascade triggerOnce>
      <main className="sm:mt-12 mb-12 bg-faq wow fadeInUp">
        <div className="container">
          <h1 className="text-center sm:text-4xl font-bold text-2xl py-6">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="sm:w-6/12 w-full mx-auto sm:mt-4 mt-2">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="font-bold">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </Fade>
  )
}