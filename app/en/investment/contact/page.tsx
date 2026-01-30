import { Metadata } from "next";
import { fetchMetaTagsFromContentful } from "@/config/db";
import { ContactFormInvestment } from "@/components/ContactForm/en/ContactFormInvestment";

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/en/investment/contact";
  return await fetchMetaTagsFromContentful(pathname);
}

export default function ContactPage() {
  return <ContactFormInvestment />;
}
