import Link from "next/link";
import NavLinks from "app/ui/dashboard/nav-links";
import AuthStatus from "@/components/auth-status";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 ">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        {/* Comment out below to make Menu spread across Screen Height */}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 text-sm font-medium hover:bg-teal-500 hover:text-black md:flex-none md:justify-start">
          <AuthStatus />
        </div>
      </div>
    </div>
  );
}
