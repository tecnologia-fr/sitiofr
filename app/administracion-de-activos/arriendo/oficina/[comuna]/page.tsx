import React from "react";
import PropertyGrid from "@/components/PropertyGrid";
import { fetchPropertiesByFilters } from "@/config/db";
import { PropertyT } from "@/typings";
import PropertySearchFormHorizontal from "@/components/PropertySearchFormHorizontal";
import { comunas } from "@/config/comunas";

interface PageProps {
  params: Promise<{
    comuna: string;
  }>;
}

export default async function AdministracionDeActivos({ params }: PageProps) {
  const { comuna: comunaSlug } = await params;

  // Find the comuna name that matches the slug from params
  const comunaData = comunas.comunas.find(
    (comuna) => comuna.slug === comunaSlug
  );

  const comunaName = comunaData?.name || comunaSlug;

  const properties: PropertyT[] = await fetchPropertiesByFilters(
    "arriendo",
    "oficina",
    comunaName
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PropertySearchFormHorizontal />
      <PropertyGrid
        properties={properties}
        title={`Arriendo de Oficinas en ${comunaName}`}
      />
    </div>
  );
}
