import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Bot } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <Link 
              to="/"
              className="text-white font-semibold text-lg hover:text-cyan-400 transition-colors"
            >
              Sam Bryant
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path) 
                    ? 'text-cyan-400 border-b-2 border-cyan-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/chat">
              <Button 
                variant="outline" 
                size="sm"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white"
              >
                <Bot className="w-4 h-4 mr-2" />
                Chat with AI Sam
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/chat">
              <Button 
                variant="outline" 
                size="sm"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white"
              >
                <Bot className="w-4 h-4" />
              </Button>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 border-t border-gray-800">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.path) 
                      ? 'text-cyan-400 bg-gray-800' 
                      : 'text-gray-300 hover:text-white'
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