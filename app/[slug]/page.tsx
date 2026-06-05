import { Metadata } from "next";
import { fetchMetaTagsFromContentful, fetchPageComponents } from "@/config/db";
import BuilderComponent from "@/components/BuilderComponent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pathname = `/${slug}`;
  return await fetchMetaTagsFromContentful(pathname);
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const pathname = `/${slug}`;
  const components = await fetchPageComponents(pathname);
  return <BuilderComponent components={components} />;
}
