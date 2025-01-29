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
    <header className="bg-[#f1eeee6a] backdrop-blur-lg py-2 fixed z-10 w-full top-0 text-black">
      <div className="container mx-auto flex items-center justify-between p-4">
        
   
        <nav className="hidden md:flex justify-between w-full space-x-6">
<div className=""></div>
          <div className="flex gap-4 justify-center items-center">
          <a href="#Profile" className="font-medium text-base hover:text-gray-">
          Coach Profile
          </a>
          <a href="#calendar" className="font-medium text-base hover:text-gray-300">
          Events calendar
          </a>
          <a href="#contact" className="font-medium text-base hover:text-gray-300">
            Contact
          </a>
          </div>

        
        <Button variant="outline" className="text-black">Admin</Button>

        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800">
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
  );
}
