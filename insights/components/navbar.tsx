"use client"
import { cn } from "@/lib/utils"
import { MenuIcon, XIcon } from 'lucide-react'
import Link from "next/link"
import * as React from "react"
import { Button } from "./ui/button"
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"

export function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Software", href: "/software" },
    { name: "Automation", href: "/automation" },
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" }
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-center p-2 mt-[2rem]">
          <div className="flex justify-between md:w-[720px] w-[95%] border dark:border-zinc-900 dark:bg-black bg-opacity-10 relative backdrop-filter backdrop-blur-lg bg-white border-white border-opacity-20 rounded-xl p-2 shadow-lg">
            <NavigationMenu>
              <NavigationMenuList>
                <Link href="/" className="pl-2">
                  <h1 className="font-bold">Rockstake</h1>
                </Link>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-2">
              <div className="max-[825px]:hidden">
                {menuItems.slice(1).map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Button variant="ghost">{item.name}</Button>
                  </Link>
                ))}
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 transition"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <XIcon className="h-5 w-5" />
                  ) : (
                    <MenuIcon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="absolute left-0 right-0 mb-0 bg-white dark:bg-black shadow-lg">
            <div className="py-2 md:w-[720px] w-[95%] mx-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-6 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Haze effect */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}