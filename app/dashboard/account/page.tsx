import { getServerSession } from "next-auth/next";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="flex h-screen bg-white">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-black flex space-x-3">
          <p>{`Send Page for ${session?.user?.email}`}</p>
        </div>
      </div>
    </div>
  );
}
