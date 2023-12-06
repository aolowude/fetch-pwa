import { getServerSession } from "next-auth/next";
import Image from "next/image";
import AccountList from "@/components/account-list";
import { SettingsIcon } from "lucide-react";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col ">
        <div className="justify-center items-center flex space-x-3 w-full basis-1/6 ">
          <div className="flex-col w-full basis-2/3 ">
            <p className="greyNok">Total Balance</p>
            <h1 className="text-3xl text-white">{`$47,283.11`}</h1>
            <p className="greyNok">{`(₦8,482,227.19)`}</p>
          </div>

          <div className="flex w-full basis-1/3 space-x-5 ">
            <button className="h-10 outlineBtn transition-all">Deposit</button>
            <button className="text-white">
              <SettingsIcon />
            </button>
          </div>
        </div>
        <div className="flex-col w-full basis-5/6 pt-5">
          <h1 className="text-white">Your Accounts</h1>
          <AccountList />
        </div>
      </div>
    </div>
  );
}
