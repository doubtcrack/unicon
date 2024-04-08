import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faqs } from "@/constants/site";

const FAQPage = () => {
  return (
    <div>
      <h2 className="text-xl md:text-4xl font-bold flex justify-center my-8">
        Frequently Asked &nbsp;
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>
      <div className="flex justify-center">
        <Accordion type="single" collapsible className="w-full max-w-screen-lg">
          {Faqs.map((i: any) => (
            <AccordionItem value={i.id} key={i.id}>
              <AccordionTrigger className="text-left">
                {i.title}
              </AccordionTrigger>
              <AccordionContent>{i.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;
