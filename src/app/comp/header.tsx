"use client";
// components/Header.tsx
import Link from 'next/link';
import { useState } from 'react';
import { FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition duration-300">
          FashionAura
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-gray-300 focus:outline-none transition-colors duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <FaBars className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="hidden md:block mx-4 max-w-xl w-full">
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 pr-12 rounded-full bg-gray-800 text-white placeholder-gray-400 
                         border-2 border-transparent focus:border-fuchsia-950 focus:outline-none 
                         transition-all duration-300 ease-in-out"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                         text-gray-400 hover:text-violet-300 focus:outline-none 
                         transition-colors duration-300 ease-in-out"
              aria-label="Search"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Navigation Links for Desktop */}
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/" className="hover:text-gray-300 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cart" className="flex items-center hover:text-gray-300 transition duration-300">
                <FaShoppingCart className="mr-2" />
                Cart
              </Link>
            </li>
            <li>
              <Link href="./pages/about" className="flex items-center hover:text-gray-300 transition duration-300">
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu (Toggle visibility using state) */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link href="/" className="block px-4 py-2 text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/cart" className="block px-4 py-2 text-gray-300 hover:text-white transition">
            <FaShoppingCart className="inline-block mr-2" />
            Cart
          </Link>
        </div>
      )}

      {/* Search Bar for Mobile */}
      <div className="md:hidden mx-4 mt-4">
        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 pr-12 rounded-full bg-gray-800 text-white placeholder-gray-400 
                       border-2 border-transparent focus:border-fuchsia-950 focus:outline-none 
                       transition-all duration-300 ease-in-out"
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       text-gray-400 hover:text-violet-300 focus:outline-none 
                       transition-colors duration-300 ease-in-out"
            aria-label="Search"
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
