import React from "react";
import Card from "@/components/Card";
import { ColumnSectionT } from "@/typings";
import RenderIf from "@/utils/RenderIf";
import { textHighlighter } from "@/utils/TextHighlighter";

const ColumnSection = (props: ColumnSectionT) => {
  return (
    <section
      className={`${props.bgColor} text-${props.textColor} py-12 px-4 `}
      id={props.name}
    >
      <div className=" flex flex-col flex-wrap justify-center items-center text-primario w-full">
        <div className="w-full container">
          <RenderIf condition={props.title}>
            <h2 className="text-left text-4xl w-full">
              {textHighlighter(props.title || "")}
            </h2>
          </RenderIf>
          <RenderIf condition={props.desc}>
            <p className="text-left text-lg w-full mt-6">{props.desc}</p>
          </RenderIf>
        </div>
        <RenderIf condition={props.columns}>
          <div className={`grid grid-cols-1 lg:${props.gridCols} gap-2 mt-12`}>
            {props.columns.map((col, index) => {
              return <Card {...col} key={index}></Card>;
            })}
          </div>
        </RenderIf>

        {/* {
          <Pagination
            page={Number(pagination?.page)}
            limit={Number(pagination?.limit)}
            total={Number(pagination?.total)}
            anchorId={name}
          />
        } */}
      </div>
    </section>
  );
};

export default ColumnSection;
