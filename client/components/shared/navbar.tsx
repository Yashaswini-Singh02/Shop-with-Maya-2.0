"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
  const path = usePathname();
  const [user, setUser] = useState<string | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    if (
      !localStorage.getItem("user") &&
      path !== "/signup" &&
      path !== "/login" &&
      path !== "/"
    ) {
      push("/login");
    }
  }, [path]);

  if (path === "/signup" || path === "/login") {
    return null;
  }

  return (
    <nav className="sticky left-0 top-0 z-50  bg-white text-black flex w-full items-center justify-between px-16 py-1 shadow-md">
      <Image src={"/logo.png"} alt="maya2.0" height={40} width={100} />

      {user ? (
        <div className="flex items-center gap-x-5">
          <Link href={"/profile"}>
            <button className="rounded-full px-8 py-2 border-pink border-2 hover:shadow-pink hover:shadow">
              Profile
            </button>
          </Link>
          <Link href={"/tryon"}>
            <button className="rounded-full px-8 py-2 border-pink border-2 hover:shadow-pink hover:shadow">
              Try On
            </button>
          </Link>
          <button
            className="rounded-full px-8 py-2 border-pink border-2 hover:shadow-pink hover:shadow"
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
              push("/");
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-x-5">
          <Link href={"/signup"}>
            <button className="rounded-full px-8 py-2 border-pink border-2 hover:shadow-pink hover:shadow">
              SIGN UP
            </button>
          </Link>
          <Link href={"/login"}>
            <button className="rounded-full px-8 py-2 border-pink border-2 hover:shadow-pink hover:shadow">
              LOG IN
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};
