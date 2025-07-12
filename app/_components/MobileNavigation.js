"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNavigation({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-primary-50 hover:text-accent-400 transition-colors p-2 bg-primary-900 bg-opacity-50 rounded-md"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-primary-950 bg-opacity-95">
          <div className="flex flex-col items-center justify-center h-full">
            <nav className="text-center">
              <ul className="space-y-8">
                <li>
                  <Link
                    href="/cabins"
                    className="text-2xl text-primary-50 hover:text-accent-400 transition-colors block py-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Cabins
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-2xl text-primary-50 hover:text-accent-400 transition-colors block py-4"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  {session?.user?.image ? (
                    <Link
                      href="/account"
                      className="text-2xl text-primary-50 hover:text-accent-400 transition-colors flex flex-col items-center gap-4 py-4"
                      onClick={() => setIsOpen(false)}
                    >
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-full"
                      />
                      <span>Guest area</span>
                    </Link>
                  ) : (
                    <Link
                      href="/account"
                      className="text-2xl text-primary-50 hover:text-accent-400 transition-colors block py-4"
                      onClick={() => setIsOpen(false)}
                    >
                      Guest area
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
