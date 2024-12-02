"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Leaf, Carrot, Wheat, Milk, Fish, Egg } from "lucide-react";

export type DietaryFilter =
  | "vegan"
  | "vegetarian"
  | "gluten-free"
  | "dairy-free"
  | "pescatarian"
  | "egg-free";

interface DietaryFilterModalProps {
  selectedFilters: DietaryFilter[];
  onFiltersChange: (filters: DietaryFilter[]) => void;
}

const filterOptions: {
  value: DietaryFilter;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "vegan", label: "Vegan", icon: <Leaf className="w-5 h-5" /> },
  {
    value: "vegetarian",
    label: "Vegetarian",
    icon: <Carrot className="w-5 h-5" />,
  },
  {
    value: "gluten-free",
    label: "Gluten-Free",
    icon: <Wheat className="w-5 h-5" />,
  },
  {
    value: "dairy-free",
    label: "Dairy-Free",
    icon: <Milk className="w-5 h-5" />,
  },
  {
    value: "pescatarian",
    label: "Pescatarian",
    icon: <Fish className="w-5 h-5" />,
  },
  { value: "egg-free", label: "Egg-Free", icon: <Egg className="w-5 h-5" /> },
];

export function DietaryFilterModal({
  selectedFilters,
  onFiltersChange,
}: DietaryFilterModalProps) {
  const [localFilters, setLocalFilters] = useState<DietaryFilter[]>(
    selectedFilters || []
  );

  const handleFilterToggle = (filter: DietaryFilter) => {
    setLocalFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onFiltersChange(localFilters);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-emerald-600 text-white hover:bg-emerald-700 border-none px-8"
        >
          Tap here for dietary filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Dietary Filters</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={
                localFilters.includes(option.value) ? "default" : "outline"
              }
              className="flex flex-col items-center justify-center h-24"
              onClick={() => handleFilterToggle(option.value)}
            >
              {option.icon}
              <span className="mt-2">{option.label}</span>
            </Button>
          ))}
        </div>
        <Button onClick={handleSave} className="w-full">
          Save Filters
        </Button>
      </DialogContent>
    </Dialog>
  );
}
