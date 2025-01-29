"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for menu
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 fixed z-10 w-full top-0 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        
   
        <nav className="hidden md:flex justify-center w-full space-x-6">
          <a href="#Profile" className="hover:text-gray-300">
          Coach Profile
          </a>
          <a href="#calendar" className="hover:text-gray-300">
          Events calendar
          </a>
          <a href="#contact" className="hover:text-gray-300">
            Contact
          </a>
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
