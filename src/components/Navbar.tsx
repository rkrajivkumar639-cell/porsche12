import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Models', href: '#models' },
    { label: 'Collection India', href: '#india-pricing' },
    { label: 'Engineering', href: '#engineering' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Legacy', href: '#about' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-bold tracking-[0.35em] text-white hover:text-neutral-300 transition-colors uppercase whitespace-nowrap shrink-0"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          PORSCHE
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all rounded-none border border-red-500/30 whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-red-950/40"
          >
            <span>Book Test Drive</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 backdrop-blur-xl border-b border-neutral-800 px-6 py-8 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-6 text-sm uppercase tracking-[0.2em] font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-2 hover:text-white border-b border-neutral-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="mt-4 w-full py-3 text-xs uppercase tracking-[0.2em] font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors text-center"
            >
              Book Test Drive
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
