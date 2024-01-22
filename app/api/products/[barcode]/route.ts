// pages/api/products/[category].js
// Note: The file should have a .ts extension since you are using TypeScript

import { NextApiRequest, NextApiResponse } from "next";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  const barcode = req.nextUrl.searchParams.get("barcode") as string;
  console.log({ barcode });

  const baseUrlProduct = "https://world.openfoodfacts.net/api/v2/product/";

  try {
    const apiResponse = await fetch(`${baseUrlProduct}/${barcode}`);

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch products");
    }
    console.log({ apiResponse });

    const data = await apiResponse.json();
    const products = data.products;

    console.log({ data });

    return res.status(200).json(products);
  } catch (error) {
    console.error(
      `Error fetching product with barcode ${barcode} from Open Food Facts API`,
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}
