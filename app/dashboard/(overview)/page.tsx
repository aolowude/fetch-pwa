// import { getServerSession } from "next-auth/next";
import Image from "next/image";
import AccountList from "@/components/account-list";
import { SettingsIcon, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import Items from "@/components/items";
// const OFF = require("openfoodfacts-nodejs");

export default async function Home() {
  // const session = await getServerSession();
  // const foodClient = new OFF();
  // Get food item by barcode
  // foodClient.getProduct("5000112546415").then(console.log);

  // Get food item categories
  // foodClient.getCategories().then(console.log);
  // foodClient.getLabels().then(console.log);

  // foodClient.getProduct("5000112546415").then(console.log);

  // Andrews Apple Juice
  // foodClient.getProduct("5038862104500").then(console.log);

  // const categories = await foodClient.getCategories();
  // console.log({ categories });

  return (
    <div className="flex h-screen bg-white">
      <div className="w-screen h-screen flex flex-col ">
        <div className="justify-center items-center flex space-x-3 w-full basis-1/6 ">
          <div className="flex-col w-full basis-2/3 ">
            <p className="greyNok">Welcome</p>
            {/* <h1 className="text-2xl text-black">{session?.user?.email}</h1> */}
          </div>

          <div className="flex w-full basis-1/3 space-x-5 ">
            <Link
              className="h-10 outlineBtn transition-all text-black"
              href="/dashboard/fetchbot/chat"
            >
              Fetch
            </Link>
            <Link
              className="h-10 outlineBtn transition-all text-black"
              href="/dashboard/account"
            >
              <PersonStandingIcon />
            </Link>
          </div>
        </div>
        {/* {categories.map((cat, ind) => (
          <div key={ind}></div>
        ))} */}
        <Items />
      </div>
    </div>
  );
}
