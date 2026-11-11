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
                        key={suggestion.slug}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`px-3 py-2 cursor-pointer hover:bg-blue-50 transition-colors ${
                          index === selectedIndex ? "bg-blue-100" : ""
                        }`}
                      >
                        {suggestion.name.charAt(0).toUpperCase() +
                          suggestion.name.slice(1)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Buttons */}
              <div className="flex gap-3 flex-shrink-0 items-center justify-center">
                <Button
                  type="submit"
                  className="text-lg bg-destacado hover:bg-destacado/90 text-white py-5 px-8 rounded-full whitespace-nowrap cursor-pointer"
                >
                  Buscar Propiedades
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
