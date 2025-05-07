"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image 
                src="/images/logo.svg" 
                alt="Butterfly Blue Creations Logo" 
                width={40}
                height={40}
              />
            </div>
            <span className={`font-heading font-bold text-xl ${
              isScrolled ? "text-primary" : "text-white"
            }`}>
              Butterfly Blue
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            <NavLink href="/" label="Home" isScrolled={isScrolled} />
            <NavLink href="/design-lab" label="Design Lab" isScrolled={isScrolled} />
            <NavLink href="/dashboard" label="Dashboard" isScrolled={isScrolled} />
            <NavLink href="/business-advisor" label="Business Advisor" isScrolled={isScrolled} />
            <NavLink href="/sync-dashboard" label="Sync Dashboard" isScrolled={isScrolled} />
          </nav>
          
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/login" 
              className={`font-medium ${
                isScrolled ? "text-neutral-700 hover:text-primary" : "text-white hover:text-neutral-200"
              }`}
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className={`btn ${isScrolled ? "btn-primary" : "bg-white text-primary hover:bg-neutral-100"}`}
            >
              Get Started
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className={`h-6 w-6 ${isScrolled ? "text-neutral-900" : "text-white"}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg animate-fade-in">
          <div className="container-custom py-4 space-y-3">
            <MobileNavLink href="/" label="Home" />
            <MobileNavLink href="/design-lab" label="Design Lab" />
            <MobileNavLink href="/dashboard" label="Dashboard" />
            <MobileNavLink href="/business-advisor" label="Business Advisor" />
            <MobileNavLink href="/sync-dashboard" label="Sync Dashboard" />
            
            <div className="pt-4 border-t border-neutral-200 flex flex-col space-y-3">
              <Link 
                href="/login" 
                className="font-medium text-neutral-700 hover:text-primary"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="btn btn-primary w-full text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label, isScrolled }) {
  return (
    <Link 
      href={href} 
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        isScrolled 
          ? "text-neutral-700 hover:text-primary hover:bg-neutral-100" 
          : "text-white hover:text-white hover:bg-white/20"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label }) {
  return (
    <Link 
      href={href} 
      className="block px-4 py-2 text-lg font-medium text-neutral-700 hover:text-primary hover:bg-neutral-100 rounded-md"
    >
      {label}
    </Link>
  );
}
