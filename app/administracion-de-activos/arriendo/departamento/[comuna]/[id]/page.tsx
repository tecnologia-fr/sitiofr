import React from "react";
import PropertyDetail from "@/components/PropertyDetail";
import PropertyGrid from "@/components/PropertyGrid";
import {
  fetchPropertiesByFilters,
  fetchPropertyByPropertyId,
} from "@/config/db";
import { PropertyT } from "@/typings";
import { notFound } from "next/navigation";

interface PropertyPageProps {
  params: Promise<{
    comuna: string;
    id: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  try {
    const { id } = await params;
    const property: PropertyT = await fetchPropertyByPropertyId(id);

    if (!property) {
      notFound();
    }

    const { properties: relatedProperties } = await fetchPropertiesByFilters(
      property.transactionType.toLowerCase(),
      property.propertyType.toLowerCase(),
      property.comuna
    );

    const suggestedProperties = relatedProperties
      .filter((item: PropertyT) => item.propertyId !== property.propertyId)
      .slice(0, 6);

    return (
      <div className="bg-gray-50">
        <PropertyDetail property={property} />
        {suggestedProperties.length > 0 && (
          <section className="py-12">
            <PropertyGrid
              properties={suggestedProperties}
              title="Propiedades sugeridas"
            />
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching property:", error);
    notFound();
  }
}
