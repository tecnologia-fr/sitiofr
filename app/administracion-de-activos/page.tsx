import React from "react";
import PropertyGrid from "@/components/PropertyGrid";
import { fetchProperties } from "@/config/db";
import { PropertyT } from "@/typings";
import PropertySearchFormHorizontal from "@/components/PropertySearchFormHorizontal";

import CTASection from "@/components/CTASection";
import { CTASectionT } from "@/typings";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdministracionDeActivos({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const { properties, total } = await fetchProperties(currentPage);
  const totalPages = Math.ceil(total / 21);
  const ctaProps: CTASectionT = {
    title: "{Publica tu}\n {{propiedad}}\n \n ¡y llega a\n miles de usuarios!",
    btnText: "Publica",
    btnLink: "/administracion-de-activos/propietario-arriendo/contacto",
    name: "administracion-de-activos-banner",

    bgColor: "bg-primario",
    textColor: "white",
    btnBgColor: "bg-destacado",
    btnTextColor: "text-white",
    bgImage: {
      url: "/banner-activos-home.jpg",
      description: "Publica tu propiedad",
      title: "Publica tu propiedad",
    },
    reverse: true,
    mobileReverse: false,
    brightness: "brightness-90",
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <PropertySearchFormHorizontal />
      <PropertyGrid 
        properties={properties} 
        title="Todas las propiedades"
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/administracion-de-activos"
      />
      <CTASection {...ctaProps} />
    </div>
  );
}
