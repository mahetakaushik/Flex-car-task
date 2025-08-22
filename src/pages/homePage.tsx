"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { FiltersSidebar } from "@/components/FilterSideBar";
import { SortDropdown, type SortOption } from "@/components/SortDropDown";
import { VehicleList } from "@/components/VehicleList";
import { vehicleData } from "@/lib/vehicle-data";

export default function HomePage() {
  const [searchZipCode, setSearchZipCode] = useState("");
  const [selectedMake, setSelectedMake] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("price-low");
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (zipCode: string) => {
    setSearchError("");

    if (!zipCode) {
      setSearchError("Please enter a ZIP code to search for vehicles.");
      return;
    }

    if (!/^\d{5}$/.test(zipCode)) {
      setSearchError("Please enter a valid 5-digit ZIP code.");
      return;
    }

    setSearchZipCode(zipCode);
    setHasSearched(true);
  };

  const filteredAndSortedVehicles = useMemo(() => {
    if (!hasSearched) return [];

    const filtered = vehicleData.filter((vehicle) => {
      // Filter by ZIP code (exact match for demo, in real app might use radius)
      const zipMatch = vehicle.zipCode === searchZipCode;

      // Filter by make
      const makeMatch = selectedMake?.length
        ? selectedMake.includes(vehicle.make)
        : true;

      // Filter by color
      const colorMatch = selectedColor?.length
        ? selectedColor.includes(vehicle.color)
        : true;

      return zipMatch && makeMatch && colorMatch;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "year-new":
          return b.year - a.year;
        case "year-old":
          return a.year - b.year;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchZipCode, selectedMake, selectedColor, sortBy, hasSearched]);

  const handleClearFilters = () => {
    setSelectedMake([]);
    setSelectedColor([]);
  };

  const availableColors = useMemo(() => {
    if (!hasSearched) return {};
    return vehicleData
      .filter((vehicle) => {
        const zipMatch = vehicle.zipCode === searchZipCode;
        const makeMatch = selectedMake?.length
          ? selectedMake.includes(vehicle.make)
          : true;
        return zipMatch && makeMatch;
      })
      .reduce((acc, v) => {
        acc[v.color] = (acc[v.color] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
  }, [selectedMake, searchZipCode, hasSearched]);

  const availableMakes = useMemo(() => {
    if (!hasSearched) return {};
    return vehicleData
      .filter((vehicle) => {
        const zipMatch = vehicle.zipCode === searchZipCode;
        const colorMatch = selectedColor?.length
          ? selectedColor.includes(vehicle.color)
          : true;
        return zipMatch && colorMatch;
      })
      .reduce((acc, v) => {
        acc[v.make] = (acc[v.make] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
  }, [selectedColor, searchZipCode, hasSearched]);

  const noResultsError =
    hasSearched && filteredAndSortedVehicles.length === 0 && !searchError
      ? `No vehicles found in ZIP code ${searchZipCode}. Try searching in a different area.`
      : "";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              Find Your Perfect Vehicle
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Search thousands of quality vehicles in your area. Filter by make,
              color, and more to find exactly what you're looking for.
            </p>
            <SearchBar onSearch={handleSearch} error={searchError} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      {hasSearched && (
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-8">
                <FiltersSidebar
                  selectedMakes={selectedMake}
                  selectedColors={selectedColor}
                  availableMakes={availableMakes}
                  availableColors={availableColors}
                  onMakesChange={setSelectedMake}
                  onColorsChange={setSelectedColor}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="font-serif text-xl font-semibold">
                  Vehicles in {searchZipCode}
                </h2>
                {filteredAndSortedVehicles.length > 0 && (
                  <SortDropdown value={sortBy} onChange={setSortBy} />
                )}
              </div>
              <VehicleList
                vehicles={filteredAndSortedVehicles}
                error={noResultsError}
              />
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Vehicle Search. Find your perfect car today.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
