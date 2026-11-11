"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { comunas } from "@/config/comunas";

const PropertySearchFormHorizontal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [transactionType, setTransactionType] = useState("venta");
  const [propertyType, setPropertyType] = useState("departamento");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedComuna, setSelectedComuna] = useState<{
    slug: string;
    name: string;
  } | null>(null);
  const [suggestions, setSuggestions] = useState<
    { slug: string; name: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const transactionTypes = [
    { value: "venta", label: "Venta" },
    { value: "arriendo", label: "Arriendo" },
  ];

  // Function to extract transaction type from URL path
  const getTransactionTypeFromPath = (path: string): string => {
    // URL pattern: /administracion-de-activos/{transactionType}/{propertyType}/...
    const pathSegments = path.split("/").filter((segment) => segment);

    // Check if we're in the administracion-de-activos section
    if (pathSegments[0] === "administracion-de-activos" && pathSegments[1]) {
      const extractedType = pathSegments[1];
      // Validate that it's a valid transaction type
      if (transactionTypes.some((type) => type.value === extractedType)) {
        return extractedType;
      }
    }

    return "venta"; // Default fallback
  };

  // Function to extract property type from URL path
  const getPropertyTypeFromPath = (path: string): string => {
    // URL pattern: /administracion-de-activos/{transactionType}/{propertyType}/...
    const pathSegments = path.split("/").filter((segment) => segment);

    // Check if we're in the administracion-de-activos section
    if (pathSegments[0] === "administracion-de-activos" && pathSegments[2]) {
      const extractedType = pathSegments[2];
      // Validate that it's a valid property type
      if (propertyTypes.some((type) => type.value === extractedType)) {
        return extractedType;
      }
    }

    return "departamento"; // Default fallback
  };

  const propertyTypes = [
    { value: "departamento", label: "Departamento" },
    { value: "casa", label: "Casa" },
    { value: "local", label: "Local" },
    { value: "terreno", label: "Terreno" },
    { value: "estacionamiento", label: "Estacionamiento" },
    { value: "oficina", label: "Oficina" },
    { value: "bodega", label: "Bodega" },
  ];

  const handleSearch = () => {
    // Handle search logic here
    console.log("Searching with:", {
      transactionType,
      propertyType,
      searchLocation,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Use the selected comuna slug if available, otherwise format the input
    let redirectPath;
    if (selectedComuna) {
      redirectPath = `/administracion-de-activos/${transactionType}/${propertyType}/${selectedComuna.slug}`;
    } else if (searchLocation.trim()) {
      // Fallback: format the input manually if no comuna was selected from suggestions
      const formattedComuna = searchLocation
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      redirectPath = `/administracion-de-activos/${transactionType}/${propertyType}/${formattedComuna}`;
