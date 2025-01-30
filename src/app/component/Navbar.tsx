"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for menu
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className=" bg-[rgba(255,255,255,0.36)] rounded-b-[5vw] w-full h-20  md:h-32 md:p-10 flex items-center justify-between fixed backdrop-blur-md z-50 top-0   ">

    <header className="w-full">
      <div className="container mx-auto flex items-center justify-between md:p-4">
        <nav className="hidden md:flex justify-between gap-10 w-full space-x-8">
          <div className=""></div>


          <div className="flex gap-6 justify-center items-center">
            <a
              href="#coach"
              className="font-medium text-lg hhover:text-gray-300"
              id="coach"
            >
              Coach Profile
            </a>
            <a
              href="#calendar"
              className="font-medium text-lg hover:text-gray-300"
            >
              Events calendar
            </a>
          
          </div>

          
             
          
          <div onClick={() => window.location.href = "/login"} className="border-black border-solid border-[2px] cursor-pointer  w-fit px-6 py-2 rounded-full flex justify-center items-center gap-6 text-center text-xl">
           Admin
          </div>
        
        </nav>

        <Button
          variant="ghost"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <nav className="md:hidden  absolute w-full top-16 bg-[rgba(255,255,255,0.36)] backdrop-blur-xl  ">
          <ul className="flex flex-col items-center space-y-4 p-4">
            <li>
              <a href="" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-gray-300">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
    </div>
  );
}
