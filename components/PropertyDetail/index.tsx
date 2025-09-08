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
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <RenderIf condition={property.destacado}>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-destacado text-white">
                  Destacado
                </span>
              </RenderIf>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-suave text-primario">
                {property.propertyType.charAt(0).toUpperCase() +
                  property.propertyType.slice(1)}
              </span>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-suave text-primario">
                {property.transactionType.charAt(0).toUpperCase() +
                  property.transactionType.slice(1)}
              </span>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm text-secundario mb-1">{property.comuna}</p>
              <h1 className="text-3xl font-bold text-primario mb-2">
                {property.address}
              </h1>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-4xl font-bold text-destacado">
                {property.priceCurrency}{" "}
                {property.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {property.transactionType === "arriendo"
                  ? "Mensual"
                  : "Precio de venta"}
              </p>
            </div>

            {/* Property Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-primario mb-4">
                Características
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Total Area */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-destacado/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-destacado"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
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
                    <svg
                      className="w-4 h-4 text-destacado"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
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
                    <svg
                      className="w-4 h-4 text-destacado"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
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
                    <svg
                      className="w-4 h-4 text-destacado"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
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

            {/* Contact CTA */}
            <div className="bg-destacado p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-2">
                ¿Te interesa esta propiedad?
              </h3>
              <p className="mb-4">
                Contáctanos para más información o agendar una visita.
              </p>
              <button className="bg-white text-destacado px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
