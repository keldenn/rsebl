"use client"
import { ThemeToggle } from "./theme-toggle"
import { useState } from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import GoBack from "./go-back"
import { usePathname } from "next/navigation"
import CommandMenu from "./command-menu"
import MarketTicker from "./market-ticker"

const NAVIGATION = [
  { title: "Home", href: "/" },
  { title: "Screener", href: "/screener" },
  { title: "Listed Scripts", href: "/listedscripts" },
  { title: "Our Services", href: "/ourservices" },
  { title: "Debt Securities", href: "/debt-securities" },
  { title: "Brokers", href: "/brokers" },

]

export default function Navigation() {
  const pathname = usePathname()
  const images = ['\images\banner.png', "\images\banner1.png"];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <MarketTicker></MarketTicker>
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex w-full flex-row justify-between py-4">
            {pathname !== "/" ? (
                <GoBack />
              ) : (
                <div className="hidden lg:flex mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={95}
                    height={25}
                    viewBox="0 0 204 138"
                    fill="none"
                  >
                    <path
                      d="M88.1098 91.567L66.0578 71.1443C64.7858 69.967 64.7858 68.0577 66.0578 66.8803L127.603 9.883C128.874 8.70567 130.935 8.70567 132.206 9.883L193.751 66.8803C195.023 68.0577 195.023 69.967 193.751 71.1443L132.206 128.142C130.935 129.319 128.874 129.319 127.603 128.142L112.606 114.254"
                      stroke="#205A8A"
                      strokeWidth="16.6253"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M115.595 46.963L137.647 67.3857C138.919 68.563 138.919 70.4723 137.647 71.6497L76.102 128.647C74.8313 129.824 72.77 129.824 71.4993 128.647L9.954 71.6497C8.682 70.4723 8.682 68.563 9.954 67.3857L71.4993 10.3883C72.77 9.21101 74.8313 9.21101 76.102 10.3883L91.0993 24.2763"
                      stroke="#382E7A"
                      strokeWidth="16.6253"
                      strokeMiterlimit={10}
                    />
                  </svg>

                </div>
              )}
        
        {/* Hamburger Menu */}
{/* Hamburger Menu */}
<button
  className="lg:hidden relative w-8 h-8 focus:outline-none"
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Toggle menu"
>
  <span
    className={`absolute top-1 left-1/2 w-6 h-1 rounded bg-custom-1 dark:bg-white transform transition duration-300 ease-in-out ${
      isOpen ? "rotate-45 translate-y-3 -translate-x-1/2" : "-translate-x-1/2"
    }`}
  ></span>
  <span
    className={`absolute top-3 left-1/2 w-6 h-1 rounded bg-custom-1 dark:bg-white transform transition duration-300 ease-in-out ${
      isOpen ? "opacity-0" : "-translate-x-1/2"
    }`}
  ></span>
  <span
    className={`absolute top-5  left-1/2 w-6 rounded h-1 bg-custom-1 dark:bg-white transform transition duration-300 ease-in-out ${
      isOpen ? "-rotate-45 -translate-y-1 -translate-x-1/2" : "-translate-x-1/2"
    }`}
  ></span>
</button>


          <div className="hidden lg:flex flex-row items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                {NAVIGATION.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <CommandMenu />

            <ThemeToggle />
          </div>
        </div>
        {/* Dropdown menu for mobile */}
        {isOpen && (
            <div className="lg:hidden flex flex-col space-y-2 py-2">
              {NAVIGATION.map((item) => (
                <Link key={item.title} href={item.href} className="px-4 py-2 hover:bg-accent">
                  {item.title}
                </Link>
              ))}
              <CommandMenu />
              <ThemeToggle />
            </div>
          )}
      </div>
    </header>
 
    </>
  )
}
