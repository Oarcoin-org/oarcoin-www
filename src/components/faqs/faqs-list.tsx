import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WidthConstraint } from "@/components/ui/width-constraint";
import { FAQS } from "@/lib/constants";

const FAQsList = () => {
  return (
    <section className="py-16 sm:py-24" data-aos="fade-up">
      <WidthConstraint className="max-w-3xl">
        <div className="border-b border-foreground">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-foreground">
                <AccordionTrigger className="rounded-none px-6 py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 whitespace-pre-line text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default FAQsList;
