"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type SortOption = "price-low" | "price-high" | "year-new" | "year-old";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <Label
        htmlFor="sort-select"
        className="text-sm font-medium whitespace-nowrap"
      >
        Sort by:
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="sort-select" className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="year-new">Year: Newest First</SelectItem>
          <SelectItem value="year-old">Year: Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
