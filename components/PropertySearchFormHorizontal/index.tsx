"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { comunas } from "@/config/comunas";

const PropertySearchFormHorizontal = () => {
  const [transactionType, setTransactionType] = useState("venta");
  const [propertyType, setPropertyType] = useState("departamentos");
  const [searchLocation, setSearchLocation] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const transactionTypes = [
    { value: "venta", label: "Venta" },
    { value: "arriendo", label: "Arriendo" },
  ];

  const propertyTypes = [
    { value: "departamentos", label: "Departamentos" },
    { value: "casas", label: "Casas" },
    { value: "locales", label: "Locales" },
    { value: "terrenos", label: "Terrenos" },
  ];

  const handleSearch = () => {
    // Handle search logic here
    console.log("Searching with:", {
      transactionType,
      propertyType,
      searchLocation,
    });
  };

  const handleMapSearch = () => {
    // Handle map search logic here
    console.log("Map search with:", {
      transactionType,
      propertyType,
      searchLocation,
    });
  };

  // Filter suggestions based on input
  const filterSuggestions = (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = comunas.comunas.filter((comuna) =>
      comuna.toLowerCase().startsWith(input.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
    setShowSuggestions(filtered.length > 0);
    setSelectedIndex(-1);
  };

  // Handle input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchLocation(value);
    filterSuggestions(value);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    setSearchLocation(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      className={`relative py-8 px-4 flex flex-col items-center justify-center pt-20justify-center
      min-h-[44rem] w-full  overflow-hidden bg-primario  `}
    >
      <div>
        <h1 className="text-white text-5xl font-light mb-12">
          Buscar Propiedades en{" "}
          <span className="font-bold underline decoration-destacado">
            Arriendo
          </span>{" "}
          o{" "}
          <span className="font-bold underline decoration-destacado">
            Venta
          </span>
        </h1>
      </div>
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Main form container */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col lg:flex-row items-starti lg:tems-center gap-4">
            {/* Transaction Type Dropdown */}
            <div className="relative flex-1 min-w-0">
              <select
                value={transactionType}
                name="transactionType"
                id="transactionType"
                onChange={(e) => setTransactionType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {transactionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="relative flex-1 min-w-0">
              <select
                value={propertyType}
                name="propertyType"
                id="propertyType"
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Location Search Input */}
            <div className="relative flex-2 min-w-0">
              <input
                ref={inputRef}
                type="text"
                name="comuna"
                id="comuna"
                value={searchLocation}
                onChange={handleLocationChange}
                onKeyDown={handleKeyDown}
                placeholder="Ingresa comuna o ciudad"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`px-3 py-2 cursor-pointer hover:bg-blue-50 transition-colors ${
                        index === selectedIndex ? "bg-blue-100" : ""
                      }`}
                    >
                      {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Buttons */}
            <div className="flex gap-3 flex-shrink-0">
              <Button
                onClick={handleSearch}
                className="bg-destacado hover:bg-destacado/90 text-white font-bold py-2 px-6 rounded-md whitespace-nowrap cursor-pointer"
              >
                Buscar Propiedades
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySearchFormHorizontal;
