import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Bot, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'How I Sell', path: '/how-i-sell' },
    { label: 'What I Bring', path: '/what-i-bring' },
    { label: 'More than a Seller', path: '/more-than-seller' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 backdrop-blur-md border-b-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <Link 
              to="/"
              className="text-white font-bold text-xl bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent hover:from-cyan-200 hover:to-white transition-all duration-300 transform hover:scale-105"
            >
              Sam Bryant
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg ${
                  isActive(item.path) 
                    ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 transform scale-105' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:shadow-md'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              className="ml-4 border-2 border-cyan-500 text-cyan-400 bg-gray-900/50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent transition-all duration-300 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://navnadoeznbzvqivamem.supabase.co/storage/v1/object/public/cv-files/cv-sam-bryant.pdf';
                link.download = 'Sam-Bryant-CV.pdf';
                link.click();
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-2 border-cyan-500 text-cyan-400 bg-gray-900/50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent transition-all duration-300 font-semibold shadow-lg shadow-cyan-500/20"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://navnadoeznbzvqivamem.supabase.co/storage/v1/object/public/cv-files/cv-sam-bryant.pdf';
                link.download = 'Sam-Bryant-CV.pdf';
                link.click();
              }}
            >
              <Download className="w-4 h-4" />
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-3 pt-2 pb-4 space-y-2 bg-gradient-to-b from-gray-900 to-slate-900 border-t-2 border-cyan-500/30 shadow-2xl">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    isActive(item.path) 
                      ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;