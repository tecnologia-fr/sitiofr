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
  searchParams: Promise<{ page?: string }>;
}

export default async function AdministracionDeActivos({ params, searchParams }: PageProps) {
  const { comuna: comunaSlug } = await params;
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  // Find the comuna name that matches the slug from params
  const comunaData = comunas.comunas.find(
    (comuna) => comuna.slug === comunaSlug
  );

  const comunaName = comunaData?.name || comunaSlug;

  const { properties, total } = await fetchPropertiesByFilters(
    "arriendo",
    "casa",
    comunaName,
    currentPage
  );

  const totalPages = Math.ceil(total / 21);

  return (
    <div className="min-h-screen bg-gray-50">
      <PropertySearchFormHorizontal />
      <PropertyGrid
        properties={properties}
        title={`Arriendo de Casas en ${comunaName}`}
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/administracion-de-activos/arriendo/casa/${comunaSlug}`}
      />
    </div>
  );
}
