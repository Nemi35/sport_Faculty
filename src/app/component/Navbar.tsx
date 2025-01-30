"use client";

import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);


  return (
    <div className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.36)] backdrop-blur-md rounded-b-[5vw] shadow-md transition-all duration-300">
      <header className="container mx-auto flex items-center justify-between p-4 md:h-20">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-between w-full px-10">
          <div className="flex gap-6 items-center">
            <Link
              href="#coach"
              className="text-lg font-medium hover:text-gray-600 transition-colors"
            >
              Coach Profile
            </Link>
            <Link
              href="#calendar"
              className="text-lg font-medium hover:text-gray-600 transition-colors"
            >
              Events Calendar
            </Link>
          </div>

          {/* Admin Button */}
          <button
            onClick={() =>
              (window.location.href = localStorage.getItem("username")
                ? "/dashboard"
                : "/login")
            }
            className="border border-black px-6 py-2 rounded-full text-lg font-medium transition-all duration-200 hover:bg-black hover:text-white"
          >
            Admin
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </header>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-lg transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-96 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 p-6 text-lg font-medium">
          <li>
            <Link
              href="/"
              className="hover:text-gray-600 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="hover:text-gray-600 transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="hover:text-gray-600 transition-colors"
              onClick={toggleMenu}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="hover:text-gray-600 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}