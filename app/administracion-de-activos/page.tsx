import React from "react";
import PropertyGrid from "@/components/PropertyGrid";
import { fetchProperties } from "@/config/db";
import { PropertyT } from "@/typings";
import PropertySearchFormHorizontal from "@/components/PropertySearchFormHorizontal";
import Banner from "@/components/Banner";
import { BannerT } from "@/typings";

export default async function AdministracionDeActivos() {
  const properties: PropertyT[] = await fetchProperties();
  const bannerProps: BannerT = {
    title: "Vende o arrienda tu {propiedad}",
    btnText: "Publica",
    btnLink: "/contacto",
    name: "administracion-de-activos-banner",
    textAlign: "items-start",
    bgColor: "bg-primario",
    textColor: "white",
    btnBgColor: "bg-destacado",
    btnTextColor: "text-white",
    bgImage: {
      url: "/activos-banner.jpg",
      description: "Publica tu propiedad",
      title: "Publica tu propiedad",
    },
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <PropertySearchFormHorizontal />
      <PropertyGrid properties={properties} title="Todas las propiedades" />
      <Banner {...bannerProps} />
    </div>
  );
}
