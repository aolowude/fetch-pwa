"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PaperClipIcon,
  ListBulletIcon,
  PlusIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Explore",
    href: "/dashboard/explore",
    icon: ListBulletIcon,
  },
  {
    name: "Account",
    href: "/dashboard/account",
    icon: PaperClipIcon,
  },
  {
    name: "FetchBot",
    href: "/dashboard/fetchbot/chat",
    icon: ChatBubbleBottomCenterIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-teal-200 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-teal-400 text-black": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
