"use client";
// pages/products/[barcode].js
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import getProductByBarcode from "./details";

export default function ProductBarcodePage() {
  const router = useRouter();
  const params = useParams();
  const barcode = params.barcode as string;

  const [item, setItem] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductByBarcode(barcode);
        // console.log({ data });
        setItem(data);
      } catch (error) {
        console.error("Error fetching products", error);
        // setError("Failed to fetch products");
      }
    };

    if (barcode) {
      fetchProducts();
    }
  }, [barcode]);

  return (
    <div>
      <h1>
        Barcode is <b>{barcode}</b>
      </h1>
      <h1>
        Status is{" "}
        <b>
          {item.status}-{item.status_verbose}
        </b>
      </h1>
      {error || !item.product ? (
        <p>{error}</p>
      ) : (
        <ul>
          <li>
            Name:<b>{item.product.product_name}</b>
          </li>
          <li>
            Brand:<b>{item.product.brands}</b>
          </li>
        </ul>
      )}
    </div>
  );
}
