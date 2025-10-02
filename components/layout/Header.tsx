"use client";
import Link from "next/link";
import Image from "next/image";
import ActiveLink from "../ActiveLink";
import { navItems } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";


interface User {
  id: string;
  name: string;
  email: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = getCookie("user") as string | undefined;
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("user");
    router.push("/login");
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-transparent shadow-sm backdrop-blur-sm">
      <div className="px-6 py-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Image src="/logo.png" width={150} height={150} className="object-cover h-auto w-36" alt="Logo" />
            </Link>
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6 px-6">
                {navItems.map((item, index) => (
                  <li className="relative" key={index}>
                    <ActiveLink href={item.href} className="font-medium duration-200 hover:text-sky-900" activeClassName="text-sky-900">
                      {item.name}
                    </ActiveLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src="/user_placeholder.png"
                      alt="user avatar"
                      width={200}
                      height={200}
                      className="w-9 h-9 rounded-full object-cover mx-auto"
                    />
                    <div>
                      <p className="text-sm font-medium">Welcome back,</p>
                      <p className="text-sm text-gray-700">{user?.name || "User"}</p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-46" align="center">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/account" className="w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings" className="w-full">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/login" className="font-medium text-blue-600">
              Signup
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
