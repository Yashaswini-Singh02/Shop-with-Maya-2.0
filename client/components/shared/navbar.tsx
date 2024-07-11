"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
  const path = usePathname();
  if (path === "/signup" || path === "/login") {
    return null;
  }
  return (
    <nav className="sticky left-0 top-0 z-50  bg-white text-black flex w-full items-center justify-between px-32 py-3.5 shadow-md">
      <h1 className="text-red">LOGO</h1>

      <div className="flex items-center gap-x-5">
        <Link href={"/signup"}>
          <button className="rounded-full px-8 py-4 border-pink border-2 hover:shadow-pink hover:shadow">
            SIGN UP
          </button>
        </Link>
        <Link href={"/login"}>
          <button className="rounded-full px-8 py-4 border-pink border-2 hover:shadow-pink hover:shadow">
            LOG IN
          </button>
        </Link>
      </div>
    </nav>
  );
};
