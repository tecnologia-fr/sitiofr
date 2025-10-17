import React from "react";
import { fetchPropertyByPropertyId } from "@/config/db";
import { PropertyT } from "@/typings";
import PropertyDetail from "@/components/PropertyDetail";
import { notFound } from "next/navigation";

interface PropertyPageProps {
  params: Promise<{
    comuna: string;
    id: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  try {
    const { id } = await params;
    const property: PropertyT = await fetchPropertyByPropertyId(id);

    if (!property) {
      notFound();
    }

    return <PropertyDetail property={property} />;
  } catch (error) {
    console.error("Error fetching property:", error);
    notFound();
  }
}
