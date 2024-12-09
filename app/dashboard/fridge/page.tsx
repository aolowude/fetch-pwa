"use client";

import { DietaryFilters } from "@/components/dietary-filters";
import { useState } from "react";
import { DietaryFilter } from "@/components/dietary-filter-modal";
import { ItemGrid } from "@/components/item-grid";

export default function Home() {
  // const session = await getServerSession();
  const [selectedFilters, setSelectedFilters] = useState<DietaryFilter[]>([]);

  const handleFiltersChange = (filters: DietaryFilter[]) => {
    setSelectedFilters(filters);
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-full h-screen flex flex-col ">
        <div className="justify-center items-center flex flex-col space-x-3 w-full">
          <div className="w-full min-h-screen bg-zinc-100">
            <DietaryFilters
              selectedFilters={selectedFilters}
              onFiltersChange={handleFiltersChange}
            />
            <div className="max-w-6xl mx-auto">
              <ItemGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
