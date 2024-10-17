"use client";
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { XIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  geistRegular,
  geistBold,
  geistMonoBold,
  geistMedium,
} from "@/app/fonts";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Products", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Docs", href: "/docs" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
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
      {/* Bara de navigare principală */}
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
                  className={`${geistRegular.className} text-white hover:text-gray-300 px-4 h-full group-hover:bg-transparent focus:bg-transparent active:bg-transparent`}
                >
                  <span className="relative z-10 group-hover:text-gray-300 transition-colors duration-200">
                    {item.name}
                  </span>
                </Button>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          {/* Butoane desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className={`${geistRegular.className} text-white hover:text-gray-300 active:text-gray-400 px-6 py-2 relative overflow-hidden transition-colors duration-200 focus:outline-none`}
            >
              <span className="relative z-10">Log In</span>
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 active:opacity-20 transition-opacity duration-200"></span>
            </Button>
            <Button
              className={`${geistBold.className} bg-white text-black hover:bg-gray-200 active:bg-gray-300 px-6 py-2 relative overflow-hidden transition-colors duration-200 focus:outline-none`}
            >
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 bg-black opacity-0 hover:opacity-10 active:opacity-20 transition-opacity duration-200"></span>
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

      {/* Meniu mobil */}
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
                className={`${geistMonoBold.className} bg-[#AC00C2] text-white hover:bg-opacity-80 active:bg-opacity-70 transition-colors duration-200 ease-in-out px-6 py-6 relative overflow-hidden focus:outline-none`}
              >
                <span className="relative z-10">Subscribe on 𝕏</span>
                <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 active:opacity-20 transition-opacity duration-200"></span>
              </Button>
              <Button
                variant="outline"
                className={`${geistMonoBold.className} text-white border-gray-600 hover:bg-gray-800 active:bg-gray-700 px-6 py-6 relative overflow-hidden transition-colors duration-200 focus:outline-none`}
              >
                <span className="relative z-10">Log In</span>
                <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 active:opacity-20 transition-opacity duration-200"></span>
              </Button>
              {menuItems.map((item) => (
                <div key={item.name} className="border-b border-gray-600">
                  <Button
                    variant="ghost"
                    className={`${geistMedium.className} text-white hover:text-gray-300 active:text-gray-400 w-full justify-start py-4 px-0 focus:bg-transparent active:bg-transparent`}
                  >
                    <span className="relative z-10 transition-colors duration-200">
                      {item.name}
                    </span>
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