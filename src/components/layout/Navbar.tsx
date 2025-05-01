import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Home, UserPlus, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Users size={28} className="text-white" />
            <span className="text-xl font-bold">Student Team</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-blue-800 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-blue-800 transition-colors ${isActive('/') ? 'bg-blue-800' : ''}`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/add-member" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-blue-800 transition-colors ${isActive('/add-member') ? 'bg-blue-800' : ''}`}
            >
              <UserPlus size={18} />
              <span>Add Member</span>
            </Link>
            <Link 
              to="/view-members" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-blue-800 transition-colors ${isActive('/view-members') ? 'bg-blue-800' : ''}`}
            >
              <Users size={18} />
              <span>View Members</span>
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-2 space-y-1 border-t border-blue-600 pt-2">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-800 transition-colors ${isActive('/') ? 'bg-blue-800' : ''}`}
              onClick={closeMenu}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/add-member" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-800 transition-colors ${isActive('/add-member') ? 'bg-blue-800' : ''}`}
              onClick={closeMenu}
            >
              <UserPlus size={18} />
              <span>Add Member</span>
            </Link>
            <Link 
              to="/view-members" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-800 transition-colors ${isActive('/view-members') ? 'bg-blue-800' : ''}`}
              onClick={closeMenu}
            >
              <Users size={18} />
              <span>View Members</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;