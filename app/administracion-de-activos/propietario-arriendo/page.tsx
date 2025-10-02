import React from "react";
import BuilderComponent from "@/components/BuilderComponent";
import { fetchPageComponents } from "@/config/db";
import { Metadata } from "next";
import { fetchMetaTagsFromContentful } from "@/config/db";

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/administracion-de-activos/propietario-arriendo";
  return await fetchMetaTagsFromContentful(pathname);
}
export default async function AdministracionDeActivos() {
  const components = await fetchPageComponents(
    "/administracion-de-activos/propietario-arriendo"
  );
  return <BuilderComponent components={components}></BuilderComponent>;
}
