"use client";
import { cn } from "@/lib/utils";
import { XIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "./ui/button";
import {
  geistRegular,
  geistBold,
  geistMonoBold,
  geistMedium,
} from "@/app/fonts";

export function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { name: "Products", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Docs", href: "/docs" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white">
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 max-w-7xl mx-auto h-16">
          <Link href="/" className="flex items-center h-full">
            <h1 className={`${geistBold.className} text-xl`}>Rockstake</h1>
          </Link>

          <div className="hidden md:flex items-center space-x-6 h-full">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group h-full flex items-center">
                <Button
                  variant="ghost"
                  className={`${geistRegular.className} text-white hover:text-gray-300 px-4 h-full`}
                >
                  {item.name}
                </Button>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className={`${geistRegular.className} text-white hover:text-gray-300 px-6 py-2`}
            >
              Log In
            </Button>
            <Button
              className={`${geistBold.className} bg-white text-black hover:bg-gray-200 px-6 py-2`}
            >
              Sign Up
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white h-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black text-white overflow-y-auto">
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16 border-b border-gray-800">
              <Link href="/" className="flex items-center h-full">
                <h1 className={`${geistBold.className} text-xl`}>Rockstake</h1>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-white h-full"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col px-4 md:px-6 lg:px-8 space-y-4 py-4">
              <Button
                className={`${geistMonoBold.className} bg-[#AC00C2] text-white hover:bg-opacity-80 transition-colors duration-200 px-6 py-6`}
                >
                Subscribe on 𝕏
              </Button>
              <Button
                variant="outline"
                className={`${geistMonoBold.className} text-white border-gray-600 px-6 py-6`}
              >
                Log In
              </Button>
              {menuItems.map((item) => (
                <div key={item.name} className="border-b border-gray-600">
                  <Button
                    variant="ghost"
                    className={`${geistMedium.className} text-white hover:text-gray-300 w-full justify-start py-4 px-0`}
                  >
                    {item.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}