import React from "react";
import PropertyGrid from "@/components/PropertyGrid";
import { fetchProperties } from "@/config/db";
import { PropertyT } from "@/typings";
import PropertySearchFormHorizontal from "@/components/PropertySearchFormHorizontal";

export default async function AdministracionDeActivos() {
  const properties: PropertyT[] = await fetchProperties();
  return (
    <div className="min-h-screen bg-gray-50">
      <PropertySearchFormHorizontal />
      <PropertyGrid properties={properties} title="Todas las propiedades" />
    </div>
  );
}
