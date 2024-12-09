import { Product } from "../types/product";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="relative bg-white">
      {product.isNew && (
        <div className="absolute top-12 z-50 left-2 bg-emerald-500 text-white text-sm px-2 py-1 rounded-full">
          New
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="secondary">{product.category}</Badge>
          <Badge variant="outline">{product.subcategory}</Badge>
        </div>
        <div className="aspect-square relative mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-orange-800"
          >
            <Info className="h-4 w-4" />
          </Button>
          <div className="font-medium">{product.name}</div>
          <span className="font-semibold">{`£${product.price.toFixed(2)} ${
            product.priceMax && `- £${product.priceMax.toFixed(2)}`
          }`}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          <Button
            variant="outline"
            className="flex-1 bg-teal-50 hover:bg-white"
          >
            Fridge
          </Button>
          <Button
            variant="default"
            className="flex-1 bg-teal-700 hover:bg-teal-400"
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
