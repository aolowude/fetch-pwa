"use server";
import { Suspense } from "react";
const OFF = require("openfoodfacts-nodejs");

// Next.js fetch API in action
async function getProductByBarcode(barcode: string) {
  const foodClient = new OFF();
  console.log({ barcode });
  const food = await foodClient.getProduct(barcode);
  //   console.log({ food });
  return food;
}

export default getProductByBarcode;
