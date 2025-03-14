
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold">IP</span>
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-light"></div>
          </div>
          <span className="font-semibold text-xl">Interview Prep Pro</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/interview" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/interview' ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            Interview
          </Link>
          <Link 
            to="/dashboard" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/dashboard' ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            Dashboard
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg absolute top-full left-0 right-0 p-4 z-50 animate-fade-down">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-sm font-medium py-2 transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/interview" 
              className={`text-sm font-medium py-2 transition-colors hover:text-primary ${
                location.pathname === '/interview' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Interview
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium py-2 transition-colors hover:text-primary ${
                location.pathname === '/dashboard' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Dashboard
            </Link>
            
            {user ? (
              <>
                <hr className="border-border" />
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium py-2 transition-colors hover:text-primary flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <Button asChild className="w-full">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
