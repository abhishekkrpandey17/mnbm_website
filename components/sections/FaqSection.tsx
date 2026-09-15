import { SectionHeading } from "./SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";
import { faqs as allFaqs } from "@/config/content";

export function FaqSection({
  items = allFaqs,
  title = "Frequently Asked Questions",
}: {
  items?: { question: string; answer: string }[];
  title?: string;
}) {
  return (
    <section className="bg-muted/40 py-16 lg:py-24">
      <div className="container max-w-3xl">
        <SectionHeading eyebrow="FAQs" title={title} align="center" className="mx-auto" />

        <div className="mt-10 rounded-2xl border border-border bg-white px-6">
          <Accordion type="single" collapsible>
            {items.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <JsonLd data={faqSchema(items)} />
    </section>
  );
}
