import React from "react";
import { Button } from "@/components/ui/button";
import { CardT } from "@/typings";
import Link from "next/link";
import ImageComponent from "../ImageComponent";
import RenderIf from "@/utils/RenderIf";
import { textHighlighter } from "@/utils/TextHighlighter";
//? @desc: card component for making columns or cards

const Card = (props: CardT) => {
  return (
    <div
      className={`w-full max-w-sm  flex flex-col items-center relative ${
        props.bgColor
      } text-${props.textColor} p-0 m-0 text-center  ${
        props.bgImage?.url &&
        "bg-cover bg-center bg-no-repeat h-[30rem]  flex flex-col justify-end"
      } ${props.bgImage?.url && props.btnLink && "cursor-pointer"}`}
      id={props.name}
      style={
        props.bgImage?.url
          ? { backgroundImage: `url(${props.bgImage.url})` }
          : undefined
      }
    >
      <RenderIf condition={props.bgImage?.url}>
        <Link href={props.btnLink || ""} className="w-full h-full">
          <div
            className={`w-full h-full flex flex-col ${
              props.icon ? "justify-around" : "justify-end"
            } `}
          >
            <RenderIf condition={props.icon}>
              <div className="h-full"></div>
            </RenderIf>
            <div className={`${props.icon ? "h-full" : " h-24"}`}>
              <RenderIf condition={props.icon}>
                <div className="flex justify-center items-center">
                  <ImageComponent
                    src={props.icon?.url || ""}
                    alt={props.icon?.description || ""}
                    className="w-20 h-20 mb-4 border-b-2 border-white "
                    width={64}
                    height={90}
                  />
                </div>
              </RenderIf>
              <div className=" p-2 pb-4 text-white">
                <RenderIf condition={props.title}>
                  <h4 className="text-2xl font-semibold text-center ">
                    {textHighlighter(props.title || "")}
                  </h4>
                </RenderIf>
                <RenderIf condition={props.desc}>
                  <span className="h-8 ">
                    <p className="text-sm text-center ">
                      {textHighlighter(props.desc || "")}
                    </p>
                  </span>
                </RenderIf>
              </div>
              <RenderIf
                condition={
                  props.btnLink && props.btnText && !props.bgImage?.url
                }
              >
                <div className="flex justify-center mt-3">
                  <Link href={props.btnLink || ""}>
                    <Button
                      size="sm"
                      className={`text-sm ${
                        props.btnBgColor && props.btnBgColor
                      } ${
                        props.btnTextColor && props.btnTextColor
                      } py-2 px-4 rounded-full font-bold hover:cursor-pointer`}
                    >
                      {props.btnText}
                    </Button>
                  </Link>
                </div>
              </RenderIf>
            </div>
          </div>
        </Link>
      </RenderIf>

      <RenderIf condition={!props.bgImage?.url}>
        {props.btnLink ? (
          <Link href={props.btnLink}>
            {props.image && (
              <ImageComponent
                src={props.image.url}
                alt={props.image.description}
                className={`  ${
                  props.isImageFull
                    ? "object-cover w-sm h-64"
                    : "object-contain max-w-64 h-64"
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
                    ? "max-w-full  place-items-center w-sm h-64"
                    : ` ${
                        props.isImageFull
                          ? "object-cover"
                          : "object-contain max-w-64 h-64"
                      }`
                }`}
                width={400}
                height={400}
              ></ImageComponent>
            </RenderIf>
          </>
        )}

        <div
          className={`h-64 w-full flex flex-col justify-between my-6 ${
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
              <p className="text-md line-clamp-8 text-center">
                {textHighlighter(props.desc || "")}
              </p>
            </RenderIf>
          </div>
          <div className="flex justify-center align-bottom items-center flex-col mt-4">
            <RenderIf condition={props.btnLink && props.btnText}>
              <Link href={props.btnLink || ""}>
                <Button
                  size="sm"
                  className={`text-lg ${props.btnBgColor && props.btnBgColor} ${
                    props.btnTextColor && props.btnTextColor
                  } p-0 my-2 btn-light text-lg lg:text-base py-6 px-8 rounded-full font-bold w-fit hover:cursor-pointer`}
                >
                  {props.btnText}
                </Button>
              </Link>
            </RenderIf>
          </div>
        </div>
      </RenderIf>
    </div>
  );
};

export default Card;
