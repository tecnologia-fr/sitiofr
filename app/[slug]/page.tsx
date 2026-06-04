import { Metadata } from "next";
import { fetchMetaTagsFromContentful, fetchPageComponents } from "@/config/db";
import BuilderComponent from "@/components/BuilderComponent";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pathname = `/${params.slug}`;
  return await fetchMetaTagsFromContentful(pathname);
}

export default async function DynamicPage({ params }: Props) {
  const pathname = `/${params.slug}`;
  const components = await fetchPageComponents(pathname);
  return <BuilderComponent components={components} />;
}
