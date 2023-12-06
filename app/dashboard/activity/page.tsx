import { getServerSession } from "next-auth/next";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-stone-200 flex space-x-3">
          <p>{`Activity Page for ${session?.user?.email}`}</p>
        </div>
      </div>
    </div>
  );
}
