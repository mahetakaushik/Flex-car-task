"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (zipCode: string) => void;
  error?: string;
}

export function SearchBar({ onSearch, error }: SearchBarProps) {
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(zipCode.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Enter ZIP code to search vehicles..."
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="pl-10 h-12 text-base"
            maxLength={5}
          />
        </div>
        <Button type="submit" size="lg" className="h-12 px-6">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
      {error && (
        <div className="mt-2 text-destructive text-sm font-medium">{error}</div>
      )}
    </div>
  );
}
