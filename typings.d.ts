import React from "react";
import { z } from "zod";

const ImageSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string(),
  width: z.nullable(),
  height: z.nullable(),
  sys: z
    .object({
      id: z.string(),
    })
    .nullish(),
});

const CTASectionSchema = z.object({
  name: z.string(),
  title: z.string().optional(),
  desc: z.string().optional(),
  isHero: z.boolean().optional(),
  textColor: z.string().optional(),
  // textHighlighterColor: z.string().optional(),
  brightness: z.string().optional(),
  bgColor: z.string().optional(),
  bgImage: ImageSchema.optional(),
  mobileBgImage: ImageSchema.nullish(),
  image: ImageSchema.nullish(),
  btnBgColor: z.string().optional(),
  btnTextColor: z.string().optional(),
  btnText: z.string().min(5).max(30).optional(),
  btnLink: z.string().optional(),
  reverse: z.boolean(),
  mobileReverse: z.boolean(),
  brightness: z.string().optional(),
  imageRounded: z.string().optional(),
  //   bgVideo: z.any().optional(), //! FIX ANY
  //   video: ImageSchema.nullish().optional(),
});

const ColumnSectionSchema = z.object({
  name: z.string(),
  title: z.string(),
  desc: z.string().optional(),
  bgColor: z.string().optional(),
  textColor: z.string().optional(),
  isCarousel: z.boolean(),
  gridCols: z.string(),
  columns: z.array(CardSchema),
});

const AccordionSectionSchema = z.object({
  name: z.string(),
  title: z.string(),
  desc: z.string().optional(),
  bgColor: z.string().optional(),
  textColor: z.string().optional(),
  items: z.array(z.any()),
});

const CardSchema = z.object({
  name: z.string(),
  title: z.string(),
  desc: z.string().optional(),
  bgColor: z.string().optional(),
  textColor: z.string().optional(),
  image: ImageSchema.nullish(),
  icon: ImageSchema.nullish(),
  bgImage: ImageSchema.nullish().optional(),
  isImageFull: z.boolean().optional(),
  imageRound: z.boolean().optional(),
  pathname: z.string().optional(),
  btnBgColor: z.string().optional(),
  btnTextColor: z.string().optional(),
  btnText: z.string().min(5).max(30).optional(),
  btnLink: z.string().optional(),
});

const AccordionItemSchema = z.object({
  name: z.string(),
  title: z.string(),
  textColor: z.string().optional(),
  bgColor: z.string().optional(),
  content: z.string(),
});

const BannerSchema = z.object({
  name: z.string(),
  title: z.string(),
  desc: z.string().optional(),
  bgColor: z.string().optional(),
  textColor: z.string().optional(),
  btnBgColor: z.string().optional(),
  btnTextColor: z.string().optional(),
  btnText: z.string().min(5).max(30).optional(),
  btnLink: z.string().optional(),
  bgImage: ImageSchema.optional(),
  mobileBgImage: ImageSchema.nullish(),
  textAlign: z.string(),
});

const CarouselCTASchema = z.object({
  name: z.string(),
  itemsCollection: z.object({
    items: z.array(CTASectionSchema),
  }),
});

export type CTASectionT = z.infer<typeof CTASectionSchema>;
export type BannerT = z.infer<typeof BannerSchema>;
export type ColumnSectionT = z.infer<typeof ColumnSectionSchema>;
export type CardT = z.infer<typeof CardSchema>;
export type PageComponent = { id: string; __typename: string };
export type AccordionSectionT = z.infer<typeof AccordionSectionSchema>;
export type CarouselCTASchemaT = z.infer<typeof CarouselCTASchema>;
