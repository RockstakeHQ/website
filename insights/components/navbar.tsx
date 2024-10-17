"use client";
import { cn } from "@/lib/utils";
import { XIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "./ui/button";
import { Section, Container } from "@/components/craft";
import {
  geistRegular,
  geistBold,
  geistMonoBold,
  geistMedium,
  geistSemiBold,
  geistBlack,
  geistMonoMedium,
} from "@/app/fonts";

export function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { name: "Football", href: "#" },
    { name: "Esports", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Contact", href: "#" },
    { name: "About", href: "#" },
  ];

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <>
        <Section>

      <div className="fixed top-0 left-0 right-0 z-50 text-white">
        <div className="flex items-center justify-between bg-opacity-100 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto h-16">
          <Link href="/" className="flex items-center h-full">
            <h1 className={`${geistBold.className} text-2xl`}>Rockstake</h1>
          </Link>

          <div className="hidden md:flex items-center space-x-6 h-full">
            {menuItems.map((item) => (
              <div key={item.name} className="border-black">
                <button
                  className={`
                    ${geistRegular.className}
                    w-full text-left py-3 px-0 text-base
                    transition-colors duration-200
                    group
                  `}
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-200">
                    {item.name}
                  </span>
                </button>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className={`
                ${geistSemiBold.className} 
                bg-black
                text-white border-gray-600 px-6 py-6
                w-full
                rounded-lg
                transition-all duration-200 ease-in-out
                hover:bg-white/5 focus:bg-white/5
                active:bg-white/10
                outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600
              `}
            >
              Log In
            </Button>
            <Button
              className={`
                ${geistSemiBold.className}
                bg-[#AC00C2] text-white px-4 py-4
                w-full
                rounded-lg
                transition-all duration-200 ease-in-out
                hover:bg-[#AC00C2]/80 focus:bg-[#AC00C2]/80
                active:bg-[#AC00C2]/70
                outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#AC00C2]
              `}
            >
              Subscribe
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white h-full transition-all duration-200 ease-in-out hover:bg-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black text-white overflow-y-auto md:hidden">
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
            <div className="flex flex-col px-4 md:px-6 lg:px-6 space-y-4 py-4">
              <button
                className={`
                  ${geistSemiBold.className}
                  bg-[#AC00C2] text-white px-4 py-4
                  w-full
                  rounded-lg
                  text-sm
                  transition-all duration-200 ease-in-out
                  hover:bg-[#AC00C2]/80 focus:bg-[#AC00C2]/80
                  active:bg-[#AC00C2]/70
                  outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#AC00C2]
                `}
              >
                Subscribe on 𝕏
              </button>
              <Button
                variant="outline"
                className={`
                  ${geistSemiBold.className} 
                  bg-black
                  text-white border-gray-600 px-6 py-6 text-sm
                  w-full
                  rounded-lg
                  transition-all duration-200 ease-in-out
                  hover:bg-white/5 focus:bg-white/5
                  active:bg-white/10
                  outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600
                `}
              >
                Log In
              </Button>
              {menuItems.map((item) => (
                <div key={item.name} className="border-b border-gray-850">
                  <button
                    className={`
                      ${geistRegular.className}
                      w-full text-left py-3 px-0 text-base
                      transition-colors duration-200
                      group
                    `}
                  >
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-200">
                      {item.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
          </Section>

    </>
  );
}