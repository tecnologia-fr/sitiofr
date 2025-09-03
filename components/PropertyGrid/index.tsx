import React from "react";
import ImageComponent from "../ImageComponent";
import RenderIf from "@/utils/RenderIf";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PropertyT } from "@/typings";

interface PropertyGridProps {
  properties: PropertyT[];
  title?: string;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, title }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {title && (
        <h2 className="text-3xl font-bold text-center mb-8 text-primario">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Property Image */}
            <div className="relative h-48 overflow-hidden group">
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
                      <CarouselItem key={index} className="pl-0 w-full h-48">
                        <ImageComponent
                          src={image.url}
                          alt={`${property.address} - Imagen ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={400}
                          height={300}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-destacado/50 text-white border-0 lg:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-200  flex items-center justify-center place-items-center cursor-pointer" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-destacado/50 text-white border-0 lg:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-200  flex items-center justify-center place-items-center cursor-pointer" />
                </Carousel>
              </RenderIf>

              <RenderIf
                condition={property.imagesCollection.items.length === 1}
              >
                <ImageComponent
                  src={property.imagesCollection.items[0].url}
                  alt={property.address}
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              </RenderIf>

              {/* Image Count Badge */}
              <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                {property.imagesCollection.items.length}
              </div>
            </div>

            {/* Property Content */}
            <Link
              href={`/administracion-de-activos/${property.transactionType.toLowerCase()}/${property.propertyType.toLowerCase()}/${
                property.id
              }`}
              className="block p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                <RenderIf condition={property.destacado}>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full bg-destacado text-white`}
                  >
                    Destacado
                  </span>
                </RenderIf>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-suave text-primario">
                  {property.propertyType.charAt(0).toUpperCase() +
                    property.propertyType.slice(1)}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-suave text-primario">
                  {property.transactionType.charAt(0).toUpperCase() +
                    property.transactionType.slice(1)}
                </span>
              </div>

              {/* Comuna */}
              <p className="text-sm text-secundario mb-1">{property.comuna}</p>

              {/* Address */}
              <h3 className="text-lg font-semibold text-primario mb-2">
                {property.address}
              </h3>

              {/* Price */}
              <p className="text-xl font-bold text-destacado mb-2">
                {property.priceCurrency}{" "}
                {property.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>

              {/* Promotion or Description */}

              <p className="text-sm text-gray-700 mb-3">
                {property.description}
              </p>

              {/* Property Details */}
              <div className="flex items-center justify-between text-sm text-secundario">
                {/* Total Area */}
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{property.totalArea} m² totales</span>
                </div>
                {/* Usable Area */}
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{property.usableArea} m² útiles</span>
                </div>
                {/* Bedrooms */}
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{property.bedrooms}</span>
                </div>
                {/* Bathrooms */}
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{property.bathrooms}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
