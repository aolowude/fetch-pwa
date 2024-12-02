"use client";

import { useState } from "react";
import { Product } from "../types/product";
import { ProductCard } from "./product-card";

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Walkers Salt & Vinegar",
    price: 1.3,
    priceMax: 1.7,
    image: "/img/placeholder.svg",
    isNew: true,
    quantity: 0,
    category: "Snacks",
    subcategory: "Crisps",
  },
  {
    id: "2",
    name: "Pipers Crisps",
    price: 1.3,
    priceMax: 1.5,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Crisps",
  },
  {
    id: "3",
    name: "Vitamin Water",
    price: 2.8,
    priceMax: 4.3,
    image: "/img/placeholder.svg",
    isNew: true,
    quantity: 0,
    category: "Beverages",
    subcategory: "Enhanced Water",
  },
  {
    id: "4",
    name: "Mr Filberts Mixed Nuts",
    price: 1.5,
    priceMax: 3,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Nuts & Seeds",
  },
  {
    id: "5",
    name: "Kettle Sweet Chili Chips",
    price: 2.0,
    priceMax: 2.8,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Crisps",
  },
  {
    id: "6",
    name: "Innocent Berry Smoothie",
    price: 2.5,
    priceMax: 3.2,
    image: "/img/placeholder.svg",
    isNew: true,
    quantity: 0,
    category: "Beverages",
    subcategory: "Smoothies",
  },
  {
    id: "7",
    name: "KIND Dark Chocolate Bar",
    price: 1.8,
    priceMax: 2.5,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Energy Bars",
  },
  {
    id: "8",
    name: "Pringles Original",
    price: 2.0,
    priceMax: 2.8,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Crisps",
  },
  {
    id: "9",
    name: "Naked Green Juice",
    price: 3.5,
    priceMax: 4.2,
    image: "/img/placeholder.svg",
    isNew: true,
    quantity: 0,
    category: "Beverages",
    subcategory: "Juices",
  },
  {
    id: "10",
    name: "Graze Protein Bites",
    price: 1.9,
    priceMax: 2.6,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Protein Snacks",
  },
  {
    id: "11",
    name: "San Pellegrino Orange",
    price: 1.2,
    priceMax: 1.8,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Beverages",
    subcategory: "Soft Drinks",
  },
  {
    id: "12",
    name: "Nature Valley Granola Bars",
    price: 2.3,
    priceMax: 3.0,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Energy Bars",
  },
  {
    id: "13",
    name: "Propercorn Sweet & Salty",
    price: 1.4,
    priceMax: 1.9,
    image: "/img/placeholder.svg",
    isNew: true,
    quantity: 0,
    category: "Snacks",
    subcategory: "Popcorn",
  },
  {
    id: "14",
    name: "Trek Protein Flapjack",
    price: 1.6,
    priceMax: 2.2,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Protein Snacks",
  },
  {
    id: "15",
    name: "Coconut Water",
    price: 2.4,
    priceMax: 3.1,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Beverages",
    subcategory: "Enhanced Water",
  },
  {
    id: "16",
    name: "Tyrrells Vegetable Crisps",
    price: 2.8,
    priceMax: 3.5,
    image: "/img/placeholder.svg",
    isNew: true,
    quantity: 0,
    category: "Snacks",
    subcategory: "Vegetable Snacks",
  },
  {
    id: "17",
    name: "Bounce Protein Ball",
    price: 2.0,
    priceMax: 2.7,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Protein Snacks",
  },
  {
    id: "18",
    name: "Kombucha Original",
    price: 3.2,
    priceMax: 4.0,
    image: "/img/placeholder.svg",
    isNew: true,
    quantity: 0,
    category: "Beverages",
    subcategory: "Fermented Drinks",
  },
  {
    id: "19",
    name: "Eat Natural Bars",
    price: 1.7,
    priceMax: 2.4,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Energy Bars",
  },
  {
    id: "20",
    name: "Popchips Original",
    price: 1.9,
    priceMax: 2.5,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Crisps",
  },
  {
    id: "21",
    name: "Yakult Probiotic",
    price: 2.5,
    priceMax: 3.2,
    image: "/img/placeholder.svg",
    isNew: true,
    quantity: 0,
    category: "Beverages",
    subcategory: "Fermented Drinks",
  },
  {
    id: "22",
    name: "Joe & Seph's Popcorn",
    price: 3.0,
    priceMax: 3.8,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Snacks",
    subcategory: "Popcorn",
  },
  {
    id: "23",
    name: "Vita Coco Pressed Coconut",
    price: 2.6,
    priceMax: 3.3,
    image: "/img/placeholder.svg",
    quantity: 0,
    category: "Beverages",
    subcategory: "Enhanced Water",
  },
  {
    id: "24",
    name: "Bear Fruit Yoyos",
    price: 1.2,
    priceMax: 1.8,
    image: "/img/placeholder.svg",
    isNew: true,
    quantity: 0,
    category: "Snacks",
    subcategory: "Fruit Snacks",
  },
];

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleQuantityChange = (id: string, change: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(0, (product.quantity || 0) + change),
            }
          : product
      )
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuantityChange={handleQuantityChange}
        />
      ))}
    </div>
  );
}
