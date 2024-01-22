"use client";
// pages/products/[barcode].js
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductBarcodePage() {
  const router = useRouter();
  //   const barcode = "pastries";
  const params = useParams();
  const barcode = params.barcode;

  console.log({ params });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/products/${barcode}?barcode=${barcode}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
        // setError("Failed to fetch products");
      }
    };

    if (barcode) {
      fetchProducts();
    }
  }, [barcode]);

  console.log({ products });
  return (
    <div>
      <h1>Products in {barcode}</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>{product.product_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
