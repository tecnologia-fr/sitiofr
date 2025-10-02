"use client";
import React from "react";
import Link from "next/link";
import ImageComponent from "../ImageComponent";
import { PropertyT } from "@/typings";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RenderIf from "@/utils/RenderIf/";
import { comunas } from "@/config/comunas";
import { Button } from "@/components/ui/button";

interface PropertyDetailProps {
  property: PropertyT;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <div className="min-h-screen bg-white mt-12">
      <div className="fixed top-0 left-0 w-full h-18 bg-primario z-40" />
      <div className="max-w-7xl container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="my-6 z-40">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/administracion-de-activos"
                className="hover:text-destacado"
              >
                Activos
              </Link>
            </li>
            <li>/</li>
            <li>
              {property.transactionType.charAt(0).toUpperCase() +
                property.transactionType.slice(1)}
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/administracion-de-activos/${property.transactionType.toLowerCase()}/${property.propertyType.toLowerCase()}s`}
                className="hover:text-destacado"
              >
                {property.propertyType.charAt(0).toUpperCase() +
                  property.propertyType.slice(1)}
                s
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/administracion-de-activos/${property.transactionType.toLowerCase()}/${property.propertyType.toLowerCase()}s/${
                  comunas.comunas.find(
                    (comuna) =>
                      comuna.name.toLowerCase() ===
                      property.comuna.toLowerCase()
                  )?.slug || property.comuna.toLowerCase()
                }`}
                className="hover:text-destacado"
              >
                {property.comuna}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Images */}
          <div className="space-y-4">
            <div className="relative h-96 overflow-hidden rounded-lg">
              <RenderIf condition={property.imagesCollection.items.length > 1}>
                <Carousel
                  className="w-full h-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent className="-ml-0">
                    {property.imagesCollection.items.map((image, index) => (
                      <CarouselItem key={index} className="pl-0 w-full h-96">
                        <ImageComponent
                          src={image.url}
                          alt={`${property.address} - Imagen ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={600}
                          height={400}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-destacado/50 text-white border-0 opacity-100 hover:opacity-80 transition-opacity duration-200 flex items-center justify-center place-items-center cursor-pointer" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-destacado/50 text-white border-0 opacity-100 hover:opacity-80 transition-opacity duration-200 flex items-center justify-center place-items-center cursor-pointer" />
                </Carousel>
              </RenderIf>
              <RenderIf
                condition={property.imagesCollection.items.length === 1}
              >
                <ImageComponent
                  src={property.imagesCollection.items[0].url}
                  alt={`${property.address} - Imagen principal`}
                  className="w-full h-full object-cover"
                  width={600}
                  height={400}
                />
              </RenderIf>
            </div>

            {/* Thumbnail Gallery */}
            <RenderIf condition={property.imagesCollection.items.length > 1}>
              <div className="grid grid-cols-4 gap-2">
                {property.imagesCollection.items
                  .slice(0, 4)
                  .map((image, index) => (
                    <div
                      key={index}
                      className="relative h-20 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
                    >
                      <ImageComponent
                        src={image.url}
                        alt={`${property.address} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={100}
                        height={80}
                      />
                    </div>
                  ))}
                {property.imagesCollection.items.length > 4 && (
                  <div className="relative h-20 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      +{property.imagesCollection.items.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </RenderIf>
          </div>

          {/* Property Information */}
          <div className="space-y-6 lg:ml-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              <RenderIf condition={property.destacado}>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-destacado text-white">
                  Destacado
                </span>
              </RenderIf>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-suave text-primario capitalize">
                {property.propertyType}
              </span>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-suave text-primario capitalize">
                {property.transactionType}
              </span>
            </div>

            {/* Location */}
            <div>
              <p className="font-light text-xl my-2">
                {property.propertyType} en {property.transactionType}
              </p>
              <h1 className="text-3xl font-extrabold text-primario mb-2">
                {property.address},{" "}
                <span className="text-primario capitalize">
                  {property.comuna}
                </span>
              </h1>
            </div>

            {/* Price */}
            <div className=" ">
              <p className="text-5xl font-black text-destacado">
                {property.priceCurrency}{" "}
                {property.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
              <p className="text-sm text-destacado mt-1 font-light">
                {property.transactionType === "arriendo"
                  ? "*Mensual"
                  : "*Precio de venta"}
              </p>
            </div>

            {/* Property Details */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-primario mb-4">
                Características
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Total Area */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-destacado/10 rounded-full flex items-center justify-center">
                    <img
                      src="/logo-total-area.svg"
                      alt="Total Area"
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Área Total</p>
                    <p className="font-semibold text-primario">
                      {property.totalArea} m²
                    </p>
                  </div>
                </div>

                {/* Usable Area */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-destacado/10 rounded-full flex items-center justify-center">
                    <img
                      src="/logo-util-area.svg"
                      alt="Usable Area"
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Área Útil</p>
                    <p className="font-semibold text-primario">
                      {property.usableArea} m²
                    </p>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-destacado/10 rounded-full flex items-center justify-center">
                    <img
                      src="/logo-dormitorio.svg"
                      alt="Bedrooms"
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dormitorios</p>
                    <p className="font-semibold text-primario">
                      {property.bedrooms}
                    </p>
                  </div>
                </div>

                {/* Bathrooms */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-destacado/10 rounded-full flex items-center justify-center">
                    <img
                      src="/logo-bano.svg"
                      alt="Bathrooms"
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Baños</p>
                    <p className="font-semibold text-primario">
                      {property.bathrooms}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact CTA */}
            <div className="bg-primario p-6 rounded-lg text-white text-center">
              <h3 className="text-2xl font-semibold mb-2 ">
                ¿Te interesa esta propiedad?
              </h3>
              <p className="mb-4">
                Contáctanos para más información o agendar una visita.
              </p>
              <Button
                size="lg"
                showArrow={true}
                className={`text-lg bg-destacado text-white  mt-8 mb-4 btn-light cursor-pointer lg:text-base py-6 pl-8 pr-2 rounded-full font-bold hover:text-white hover:bg-destacado w-fit `}
              >
                Cotizar
              </Button>
            </div>
            {/* Description */}
            <RenderIf condition={property.description}>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold text-primario mb-4">
                  Descripción
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </RenderIf>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
