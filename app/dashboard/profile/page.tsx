"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

type DietaryFilter = {
  id: string;
  label: string;
  selected: boolean;
};

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilters, setDietaryFilters] = useState<DietaryFilter[]>([
    { id: "vegan", label: "Vegan", selected: false },
    { id: "vegetarian", label: "Vegetarian", selected: false },
    { id: "gluten-free", label: "Gluten-free", selected: false },
    { id: "dairy-free", label: "Dairy-free", selected: false },
    { id: "pescatarian", label: "Pescatarian", selected: false },
    { id: "egg-free", label: "Egg-Free", selected: false },
    { id: "nut-free", label: "Nut-Free", selected: false },
    { id: "kosher", label: "Kosher", selected: false },
    { id: "halal", label: "Halal", selected: false },
  ]);

  const toggleDietaryFilter = (id: string) => {
    setDietaryFilters((prev) =>
      prev.map((filter) =>
        filter.id === id ? { ...filter, selected: !filter.selected } : filter
      )
    );
  };

  const filteredDietaryOptions = dietaryFilters.filter((filter) =>
    filter.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Profile Information */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Profile Information
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Dietary Preferences Accordion */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <span className="text-lg font-medium text-gray-900">
            Dietary Preferences
          </span>
          {isAccordionOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {isAccordionOpen && (
          <div className="p-4 space-y-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search dietary preferences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dietary Filters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredDietaryOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleDietaryFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter.selected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
        Save Changes
      </button>
    </div>
  );
}
