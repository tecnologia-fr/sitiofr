import React from "react";
import { Button } from "@/components/ui/button";
import { CardT } from "@/typings";
import Link from "next/link";
import ImageComponent from "../ImageComponent";
import RenderIf from "@/utils/RenderIf";

//? @desc: card component for making columns or cards

const Card = (props: CardT) => {
  return (
    <div
      className={`w-full max-w-xs flex flex-col items-center relative ${
        props.bgColor
      } text-${props.textColor} ${
        props.isImageFull ? "pt-0" : "pt-8"
      } my-3 text-center lg:mx-4 `}
      id={props.name}
    >
      <>
        {props.btnLink ? (
          <Link href={props.btnLink}>
            {props.image && (
              <ImageComponent
                src={props.image.url}
                alt={props.image.description}
                className={` ${
                  props.isImageFull ? "object-cover" : "object-contain"
                } ${props.imageRound}`}
                width={400}
                height={400}
              ></ImageComponent>
            )}
          </Link>
        ) : (
          <>
            <RenderIf condition={props.image}>
              <ImageComponent
                src={props.image?.url || ""}
                alt={props.image?.description || ""}
                className={`${
                  props.isImageFull
                    ? "max-w-full h-auto place-items-center"
                    : ` ${
                        props.isImageFull ? "object-cover" : "object-contain"
                      }`
                }`}
                width={400}
                height={400}
              ></ImageComponent>
            </RenderIf>
          </>
        )}
      </>

      <div
        className={`h-full w-full flex flex-col justify-between my-6 ${
          props.btnLink ? "px-2 pb-4" : "px-6 py-4"
        } `}
      >
        <div>
          <RenderIf condition={props.title && !props.btnLink}>
            <h4 className={`mb-4 text-2xl font-semibold text-center`}>
              {props.title}
            </h4>
          </RenderIf>

          <RenderIf condition={props.title && props.btnLink}>
            <Link href={props.btnLink || ""}>
              <h4 className={`mb-4 text-2xl font-semibold text-center`}>
                {props.title}
              </h4>
            </Link>
          </RenderIf>

          <RenderIf condition={props.desc}>
            <p className="text-md line-clamp-8 text-center">{props.desc}</p>
          </RenderIf>
        </div>
        <div className="flex justify-center align-bottom items-center flex-col mt-4">
          <RenderIf condition={props.btnLink && props.btnText}>
            <Link href={props.btnLink || ""}>
              <Button
                size="sm"
                className={`text-lg ${props.btnBgColor && props.btnBgColor} ${
                  props.btnTextColor && props.btnTextColor
                } p-0 my-2 btn-light text-lg lg:text-base py-6 px-8 rounded-full font-bold w-32 hover:cursor-pointer`}
              >
                {props.btnText}
              </Button>
            </Link>
          </RenderIf>
        </div>
      </div>
    </div>
  );
};

export default Card;
