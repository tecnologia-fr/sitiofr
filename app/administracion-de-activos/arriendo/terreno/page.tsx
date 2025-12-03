import React from "react";
import PropertyGrid from "@/components/PropertyGrid";
import { fetchPropertiesByFilters } from "@/config/db";
import { PropertyT } from "@/typings";
import PropertySearchFormHorizontal from "@/components/PropertySearchFormHorizontal";
import PropertySortDropdown from "@/components/PropertySortDropdown";

interface PageProps {
  searchParams: Promise<{ page?: string; sortBy?: string; order?: string }>;
}

export default async function AdministracionDeActivos({ searchParams }: PageProps) {
  const { page, sortBy, order } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const { properties, total } = await fetchPropertiesByFilters(
    "arriendo",
    "terreno",
    undefined,
    currentPage,
    sortBy,
    order
  );
  const totalPages = Math.ceil(total / 21);
  return (
    <div className="min-h-screen bg-gray-50">
      <PropertySearchFormHorizontal />
      <PropertySortDropdown sortBy={sortBy} order={order} />
      <PropertyGrid 
        properties={properties} 
        title="Terrenos en Arriendo"
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/administracion-de-activos/arriendo/terreno"
        sortBy={sortBy}
        order={order}
      />
    </div>
  );
}
