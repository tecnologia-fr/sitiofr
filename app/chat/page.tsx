"use client";

import React from "react";
import dynamic from "next/dynamic";

const CustomerServiceLanding = dynamic(
  () => import("@/components/CustomerServiceLanding"),
  { ssr: false }
);
const OwloChat = dynamic(() => import("@/components/OwloChat"), { ssr: false });

export default function Page() {
  return (
    <>
      <CustomerServiceLanding />
      <OwloChat
        partnerId="jx76pz3z11801gtzxt9752m2fh7cen3t"
        spaceId="k570xx7qbmh7gtk8f2sns2hpyd6tnpjq"
        title="Owlo Chat 2"
      />
    </>
  );
}
