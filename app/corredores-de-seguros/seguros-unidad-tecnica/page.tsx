import { Metadata } from "next";
import { fetchMetaTagsFromContentful, fetchPageComponents } from "@/config/db";
import BuilderComponent from "@/components/BuilderComponent";

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/corredores-de-seguros/seguros-unidad-tecnica";
  return await fetchMetaTagsFromContentful(pathname);
}

export default async function Home() {
  const components = await fetchPageComponents(
    "/corredores-de-seguros/seguros-unidad-tecnica"
  );
  return <BuilderComponent components={components}></BuilderComponent>;
}
