import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-black">Welcome to Fetch</h1>
        </div>
        <div className="flex w-full max-w-screen-sm justify-center">
          <Link
            href="/dashboard"
            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            className="mainBtn text-center text-stone-400 hover:text-black hover:bg-teal-600 transition-all"
          >
            Enter Fetch
          </Link>
        </div>
      </div>
    </div>
  );
}
