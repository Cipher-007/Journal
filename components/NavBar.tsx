"use client";
import { UserButton } from "@clerk/nextjs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/journal", label: "Home" },
  { href: "/history", label: "History" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className='w-full h-16 bg-indigo-600 text-white px-8'>
      <div className='flex items-center justify-between border-b-[1px] border-indigo-500 pb-2'>
        <div className='text-3xl font-bold'>Journal</div>
        <ul className='flex flex-row basis-2/6 justify-between'>
          {links.map((link) => (
            <Link href={link.href} key={link.label} className='pt-2'>
              <li
                className={clsx(
                  "px-4 py-2 text-xl rounded-md",
                  pathname === link.href
                    ? "bg-indigo-800/50"
                    : "hover:bg-indigo-500/50"
                )}
              >
                {link.label}
              </li>
            </Link>
          ))}
        </ul>
        <UserButton />
      </div>
    </nav>
  );
}
