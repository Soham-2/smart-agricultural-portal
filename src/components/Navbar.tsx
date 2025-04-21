
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-agri-green-500 rounded-full flex items-center justify-center mr-2">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span className="font-bold text-xl text-agri-green-700">FieldWise</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-agri-green-900 hover:text-agri-green-500">Home</Link>
            <Link to="/crop-suggestions" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-agri-green-500">Crop Suggestions</Link>
            <Link to="/weather" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-agri-green-500">Weather</Link>
            <Link to="/market-prices" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-agri-green-500">Market Prices</Link>
            <Link to="/gov-schemes" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-agri-green-500">Govt. Schemes</Link>
            <Button className="ml-4 bg-agri-green-500 hover:bg-agri-green-600">Login</Button>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="flex items-center sm:hidden">
            <button 
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-agri-green-500 focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white pb-3 px-2 space-y-1 animate-fade-in">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-agri-green-900 hover:bg-agri-green-100">Home</Link>
          <Link to="/crop-suggestions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-agri-green-100">Crop Suggestions</Link>
          <Link to="/weather" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-agri-green-100">Weather</Link>
          <Link to="/market-prices" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-agri-green-100">Market Prices</Link>
          <Link to="/gov-schemes" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-agri-green-100">Govt. Schemes</Link>
          <Button className="w-full mt-3 bg-agri-green-500 hover:bg-agri-green-600">Login</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
