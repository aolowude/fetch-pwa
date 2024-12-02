"use client";

import { Carrot, Egg, Fish, Leaf, Milk, Wheat } from "lucide-react";
import { DietaryFilterModal, DietaryFilter } from "./dietary-filter-modal";

interface DietaryFiltersProps {
  selectedFilters: DietaryFilter[];
  onFiltersChange: (filters: DietaryFilter[]) => void;
}

export function DietaryFilters({
  selectedFilters,
  onFiltersChange,
}: DietaryFiltersProps) {
  const filterIcons: Record<DietaryFilter, React.ReactNode> = {
    vegan: <Leaf className="w-5 h-5 text-white" />,
    vegetarian: <Carrot className="w-5 h-5 text-white" />,
    "gluten-free": <Wheat className="w-5 h-5 text-white" />,
    "dairy-free": <Milk className="w-5 h-5 text-white" />,
    pescatarian: <Fish className="w-5 h-5 text-white" />,
    "egg-free": <Egg className="w-5 h-5 text-white" />,
  };

  return (
    <div className="bg-zinc-900 p-4">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          {selectedFilters &&
            selectedFilters.map((filter) => (
              <div key={filter} className="flex flex-col items-center">
                <div className="bg-emerald-600 p-2 rounded-full">
                  {filterIcons[filter]}
                </div>
                <span className="text-white text-xs mt-1">{filter}</span>
              </div>
            ))}
        </div>
        <DietaryFilterModal
          selectedFilters={selectedFilters}
          onFiltersChange={onFiltersChange}
        />
      </div>
    </div>
  );
}
