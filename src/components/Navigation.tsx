import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Bot, Download, Mail, MessageCircle, Linkedin, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreThanSellerDropdownOpen, setIsMoreThanSellerDropdownOpen] = useState(false);
  const [isHowISellDropdownOpen, setIsHowISellDropdownOpen] = useState(false);
  const location = useLocation();

  const howISellItems = [
    { label: 'How I Sell', path: '/how-i-sell' },
    { label: 'Sales Tech Stack', path: '/how-i-sell/sales-tech-stack' },
    { label: 'Testimonials', path: '/testimonials' },
  ];

  const moreThanSellerItems = [
    { label: 'About Me', path: '/more-than-seller' },
    { label: 'My Values', path: '/my-values' },
  ];

  const whatIBringItems = [
    { label: 'Sales Performance Dashboard', path: '/what-i-bring/sales-performance' },
    { label: 'Enterprise Case Studies', path: '/what-i-bring/case-studies' },
    { label: 'Professional Journey', path: '/what-i-bring/professional-journey' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isWhatIBringActive = () => location.pathname.startsWith('/what-i-bring');
  const isMoreThanSellerActive = () => location.pathname === '/more-than-seller' || location.pathname === '/my-values';
  const isHowISellActive = () => location.pathname === '/how-i-sell' || location.pathname === '/how-i-sell/sales-tech-stack' || location.pathname === '/testimonials';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-background via-secondary to-background backdrop-blur-md border-b-2 border-primary/30 shadow-2xl shadow-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <Link 
              to="/"
              className="flex items-center space-x-3 text-foreground font-bold text-xl bg-gradient-to-r from-foreground to-brand-cyan-light bg-clip-text text-transparent hover:from-brand-cyan-light hover:to-foreground transition-all duration-300 transform hover:scale-105"
            >
              {location.pathname !== '/' && (
                <img 
                  src="/lovable-uploads/3f4fc08d-c66d-42b8-8aab-5e13b546fe80.png" 
                  alt="Sam Bryant" 
                  className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                />
              )}
              <span>Sam Bryant</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
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
                    ? 'text-foreground bg-gradient-to-r from-primary to-brand-blue shadow-lg shadow-primary/25 transform scale-105' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:shadow-md'
                }`}
              >
                What I Bring
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-background/95 backdrop-blur-md border border-primary/30 rounded-lg shadow-2xl shadow-primary/20 z-50">
                  <div className="py-2">
                    {whatIBringItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/20 hover:bg-gradient-to-r hover:from-primary/10 hover:to-brand-blue/10 transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* More than a Seller Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMoreThanSellerDropdownOpen(true)}
              onMouseLeave={() => setIsMoreThanSellerDropdownOpen(false)}
            >
              <Link
                to="/more-than-seller"
                className={`relative px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg flex items-center ${
                  isMoreThanSellerActive() 
                    ? 'text-foreground bg-gradient-to-r from-primary to-brand-blue shadow-lg shadow-primary/25 transform scale-105' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:shadow-md'
                }`}
              >
                More than a Seller
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isMoreThanSellerDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Dropdown Menu */}
              {isMoreThanSellerDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-background/95 backdrop-blur-md border border-primary/30 rounded-lg shadow-2xl shadow-primary/20 z-50">
                  <div className="py-2">
                    {moreThanSellerItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/20 hover:bg-gradient-to-r hover:from-primary/10 hover:to-brand-blue/10 transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* How I Sell Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsHowISellDropdownOpen(true)}
              onMouseLeave={() => setIsHowISellDropdownOpen(false)}
            >
              <Link
                to="/how-i-sell"
                className={`relative px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg flex items-center ${
                  isHowISellActive() 
                    ? 'text-foreground bg-gradient-to-r from-primary to-brand-blue shadow-lg shadow-primary/25 transform scale-105' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:shadow-md'
                }`}
              >
                How I Sell
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isHowISellDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Dropdown Menu */}
              {isHowISellDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-background/95 backdrop-blur-md border border-primary/30 rounded-lg shadow-2xl shadow-primary/20 z-50">
                  <div className="py-2">
                    {howISellItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/20 hover:bg-gradient-to-r hover:from-primary/10 hover:to-brand-blue/10 transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact Buttons */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border">
              <Button 
                variant="outline" 
                size="sm"
                className="border border-primary/50 text-primary bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={handleEmailClick}
                title="Email Me"
              >
                <Mail className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border border-brand-green/50 text-brand-green bg-background/50 hover:bg-brand-green hover:text-primary-foreground transition-all duration-300"
                onClick={handlePhoneClick}
                title="WhatsApp Me"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border border-brand-blue/50 text-brand-blue bg-background/50 hover:bg-brand-blue hover:text-primary-foreground transition-all duration-300"
                onClick={handleLinkedInClick}
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="ml-4 border-2 border-primary text-primary bg-background/50 hover:bg-gradient-to-r hover:from-primary hover:to-brand-blue hover:text-primary-foreground hover:border-transparent transition-all duration-300 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105"
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
              className="border-2 border-primary text-primary bg-background/50 hover:bg-gradient-to-r hover:from-primary hover:to-brand-blue hover:text-primary-foreground hover:border-transparent transition-all duration-300 font-semibold shadow-lg shadow-primary/20"
              onClick={() => {
                window.open('https://navnadoeznbzvqivamem.supabase.co/storage/v1/object/public/cv-files/cv-sam-bryant.pdf', '_blank');
              }}
            >
              <Download className="w-4 h-4" />
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-3 pt-2 pb-4 space-y-2 bg-gradient-to-b from-background to-secondary border-t-2 border-primary/30 shadow-2xl">
              {/* Mobile What I Bring Section */}
              <div className="space-y-1">
                <Link
                  to="/what-i-bring"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    isWhatIBringActive() 
                      ? 'text-foreground bg-gradient-to-r from-primary to-brand-blue shadow-lg shadow-primary/25' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
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
                      className="block w-full text-left px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Mobile More than a Seller Section */}
              <div className="space-y-1">
                <Link
                  to="/more-than-seller"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    isMoreThanSellerActive() 
                      ? 'text-foreground bg-gradient-to-r from-primary to-brand-blue shadow-lg shadow-primary/25' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  More than a Seller
                </Link>
                <div className="ml-4 space-y-1">
                  {moreThanSellerItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Mobile How I Sell Section */}
              <div className="space-y-1">
                <Link
                  to="/how-i-sell"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    isHowISellActive() 
                      ? 'text-foreground bg-gradient-to-r from-primary to-brand-blue shadow-lg shadow-primary/25' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  How I Sell
                </Link>
                <div className="ml-4 space-y-1">
                  {howISellItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Mobile Contact Section */}
              <div className="border-t border-border pt-3 mt-3">
                <p className="text-xs text-muted-foreground px-4 mb-2">Let's Connect</p>
                <div className="flex space-x-2 px-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border border-primary/50 text-primary bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={handleEmailClick}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border border-brand-green/50 text-brand-green bg-background/50 hover:bg-brand-green hover:text-primary-foreground transition-all duration-300"
                    onClick={handlePhoneClick}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border border-brand-blue/50 text-brand-blue bg-background/50 hover:bg-brand-blue hover:text-primary-foreground transition-all duration-300"
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