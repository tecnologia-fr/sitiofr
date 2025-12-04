import { ContactFormCotizar } from "@/components/ContactForm/ContactFormCotizar";

interface PageProps {
  searchParams: Promise<{
    propertyId?: string;
    propertyAddress?: string;
    propertyComuna?: string;
    propertyType?: string;
    transactionType?: string;
  }>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const {
    propertyId,
    propertyAddress,
    propertyComuna,
    propertyType,
    transactionType,
  } = await searchParams;
  return (
    <ContactFormCotizar
      propertyId={propertyId}
      propertyAddress={propertyAddress}
      propertyComuna={propertyComuna}
      propertyType={propertyType}
      transactionType={transactionType}
    />
  );
}
