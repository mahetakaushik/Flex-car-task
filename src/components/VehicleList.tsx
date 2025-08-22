"use client";

import type { Vehicle } from "@/lib/vehicle-data";
import { VehicleCard } from "./VehicleCard";
import { AlertCircle } from "lucide-react";
import { VirtuosoGrid } from "react-virtuoso";
import { forwardRef } from "react";

interface VehicleListProps {
  vehicles: Vehicle[];
  isLoading?: boolean;
  error?: string;
}

export function VehicleList({ vehicles, isLoading, error }: VehicleListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-lg aspect-[4/3] mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-3 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="font-serif text-lg font-semibold mb-2">Search Error</h3>
        <p className="text-muted-foreground max-w-md">{error}</p>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-serif text-lg font-semibold mb-2">
          No Vehicles Found
        </h3>
        <p className="text-muted-foreground max-w-md">
          No vehicles match your current search criteria. Try adjusting your
          filters or searching in a different area.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} found
        </p>
      </div>
      {/* <div className=""> */}
      <VirtuosoGrid
        style={{ height: 600 }}
        data={vehicles}
        itemContent={(_, vehicle) => <VehicleCard vehicle={vehicle} />}
        components={{
          List: forwardRef((props, ref) => (
            <div
              {...props}
              ref={ref}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            />
          )),
        }}
        useWindowScroll
      />
      {/* {vehicles.map((v) => (
           <VehicleCard key={v.id} vehicle={v} />
         ))} */}
      {/* </div> */}
    </div>
  );
}
