import React from "react";
import { AccordionSectionT } from "@/typings";
import RenderIf from "@/utils/RenderIf";
import { textHighlighter } from "@/utils/TextHighlighter";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const AccordionSection = (props: AccordionSectionT) => {
  return (
    <section
      className={`${props.bgColor} text-${props.textColor} py-12 px-4 `}
      id={props.name}
    >
      <div className=" flex flex-col flex-wrap justify-center items-center  w-full">
        <div className="w-full container">
          <RenderIf condition={props.title}>
            <h2 className="text-left text-4xl w-full">
              {textHighlighter(props.title || "")}
            </h2>
          </RenderIf>
          <RenderIf condition={props.desc}>
            <p className="text-left text-lg w-full my-6">{props.desc}</p>
          </RenderIf>

          <RenderIf condition={props.items}>
            <Accordion type="single" collapsible className="w-full my-12">
              {props.items.map((item, index) => {
                return (
                  <AccordionItem
                    key={index}
                    value={item.name}
                    className={`py-4 text-${props.textColor}`}
                  >
                    <AccordionTrigger className="text-left text-2xl w-full font-light">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-left text-lg font-light w-full">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </RenderIf>
        </div>
      </div>
    </section>
  );
};

export default AccordionSection;
