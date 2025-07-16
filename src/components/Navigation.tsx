import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Bot, Download, Mail, MessageCircle, Linkedin, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'How I Sell', path: '/how-i-sell' },
    { label: 'More than a Seller', path: '/more-than-seller' },
  ];

  const whatIBringItems = [
    { label: 'Sales Performance Dashboard', path: '/what-i-bring/sales-performance' },
    { label: 'Enterprise Case Studies', path: '/what-i-bring/case-studies' },
    { label: 'Professional Journey', path: '/what-i-bring/professional-journey' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isWhatIBringActive = () => location.pathname.startsWith('/what-i-bring');

  const handleEmailClick = () => {
    window.location.href = "mailto:sam@sbryant.io?subject=Enterprise Sales Opportunity";
  };

  const handlePhoneClick = () => {
    window.open("https://wa.me/447444473958", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://linkedin.com/in/sambryant", "_blank");
  };

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
            
            {/* What I Bring Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                to="/what-i-bring"
                className={`relative px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg flex items-center ${
                  isWhatIBringActive() 
                    ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 transform scale-105' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:shadow-md'
                }`}
              >
                What I Bring
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-gray-900/95 backdrop-blur-md border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/20 z-50">
                  <div className="py-2">
                    {whatIBringItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-cyan-500/20 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-600/10 transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact Buttons */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-600">
              <Button 
                variant="outline" 
                size="sm"
                className="border border-cyan-500/50 text-cyan-400 bg-gray-900/50 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                onClick={handleEmailClick}
                title="Email Me"
              >
                <Mail className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border border-green-500/50 text-green-400 bg-gray-900/50 hover:bg-green-500 hover:text-white transition-all duration-300"
                onClick={handlePhoneClick}
                title="WhatsApp Me"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border border-blue-500/50 text-blue-400 bg-gray-900/50 hover:bg-blue-500 hover:text-white transition-all duration-300"
                onClick={handleLinkedInClick}
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="ml-4 border-2 border-cyan-500 text-cyan-400 bg-gray-900/50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent transition-all duration-300 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105"
              onClick={() => {
                window.open('https://navnadoeznbzvqivamem.supabase.co/storage/v1/object/public/cv-files/cv-sam-bryant.pdf', '_blank');
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
                window.open('https://navnadoeznbzvqivamem.supabase.co/storage/v1/object/public/cv-files/cv-sam-bryant.pdf', '_blank');
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
              
              {/* Mobile What I Bring Section */}
              <div className="space-y-1">
                <Link
                  to="/what-i-bring"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    isWhatIBringActive() 
                      ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  What I Bring
                </Link>
                <div className="ml-4 space-y-1">
                  {whatIBringItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Mobile Contact Section */}
              <div className="border-t border-gray-600 pt-3 mt-3">
                <p className="text-xs text-gray-400 px-4 mb-2">Let's Connect</p>
                <div className="flex space-x-2 px-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border border-cyan-500/50 text-cyan-400 bg-gray-900/50 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                    onClick={handleEmailClick}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border border-green-500/50 text-green-400 bg-gray-900/50 hover:bg-green-500 hover:text-white transition-all duration-300"
                    onClick={handlePhoneClick}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border border-blue-500/50 text-blue-400 bg-gray-900/50 hover:bg-blue-500 hover:text-white transition-all duration-300"
                    onClick={handleLinkedInClick}
                  >
                    <Linkedin className="w-4 h-4 mr-1" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;