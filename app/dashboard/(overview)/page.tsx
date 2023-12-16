import { getServerSession } from "next-auth/next";
import Image from "next/image";
import AccountList from "@/components/account-list";
import { SettingsIcon, PersonStandingIcon } from "lucide-react";
import Link from "next/link";

async function extractStructuredData(freeText: any) {
  // Replace this with your implementation to extract structured data using Bard or Gemini
  // For example, using Bard:
  const response = await fetch(
    `https://bard.googleapis.com/v3/text:analyze${freeText}`
  );
  console.log({ response });
  // const data = await response.json();
  // console.log({ data });
  // const entities = data.entities;
  // const structuredData = {
  //   entities: entities,
  // };

  return response;
}
export default async function Home() {
  const session = await getServerSession();
  // const extractedData = await extractStructuredData(
  //   "bread,eggs, steak thats dry aged, some biscuits, orange juice"
  // );
  // console.log({ extractedData });

  return (
    <div className="flex h-screen bg-white">
      <div className="w-screen h-screen flex flex-col ">
        <div className="justify-center items-center flex space-x-3 w-full basis-1/6 ">
          <div className="flex-col w-full basis-2/3 ">
            <p className="greyNok">Welcome</p>
            <h1 className="text-2xl text-black">{session?.user?.email}</h1>
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
      </div>
    </div>
  );
}
