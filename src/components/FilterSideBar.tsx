"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import { useState } from "react";

interface FiltersSidebarProps {
  selectedMakes: string[];
  selectedColors: string[];
  availableMakes: Record<string, number>;
  availableColors: Record<string, number>;
  onMakesChange: (makes: string[]) => void;
  onColorsChange: (colors: string[]) => void;
  onClearFilters: () => void;
}

export function FiltersSidebar({
  selectedMakes,
  selectedColors,
  availableMakes,
  availableColors,
  onMakesChange,
  onColorsChange,
  onClearFilters,
}: FiltersSidebarProps) {
  const [makeDropdownOpen, setMakeDropdownOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);

  const hasActiveFilters =
    selectedMakes.length > 0 || selectedColors.length > 0;

  const handleMakeToggle = (make: string) => {
    if (selectedMakes.includes(make)) {
      onMakesChange(selectedMakes.filter((m) => m !== make));
    } else {
      onMakesChange([...selectedMakes, make]);
    }
  };

  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      onColorsChange(selectedColors.filter((c) => c !== color));
    } else {
      onColorsChange([...selectedColors, color]);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Make Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Make</Label>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setMakeDropdownOpen(!makeDropdownOpen)}
              className="w-full justify-between text-left font-normal"
            >
              {selectedMakes.length === 0
                ? "Select Makes by default All"
                : `${selectedMakes.length} make${
                    selectedMakes.length > 1 ? "s" : ""
                  } selected`}
              <svg
                className="h-4 w-4 opacity-50"
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
            </Button>
            {makeDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {Object.entries(availableMakes).map(([make, count]) => (
                  <div
                    key={make}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMakeToggle(make)}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 border rounded flex items-center justify-center ${
                          selectedMakes.includes(make)
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedMakes.includes(make) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm">{make}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedMakes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedMakes.map((make) => (
                <span
                  key={make}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {make}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-blue-600"
                    onClick={() => handleMakeToggle(make)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Color Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Color</Label>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
              className="w-full justify-between text-left font-normal"
            >
              {selectedColors.length === 0
                ? "Select Colors by default All"
                : `${selectedColors.length} color${
                    selectedColors.length > 1 ? "s" : ""
                  } selected`}
              <svg
                className="h-4 w-4 opacity-50"
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
            </Button>
            {colorDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {Object.entries(availableColors).map(([color, count]) => (
                  <div
                    key={color}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleColorToggle(color)}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 border rounded flex items-center justify-center ${
                          selectedColors.includes(color)
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedColors.includes(color) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm">{color}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedColors.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedColors.map((color) => (
                <span
                  key={color}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {color}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-blue-600"
                    onClick={() => handleColorToggle(color)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
