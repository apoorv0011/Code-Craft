import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../supabaseClient';

function getInitials(email) {
  if (!email) return '';
  const namePart = email.split('@')[0];
  const parts = namePart.split(/[._\-]/);
  const initials = parts.map(part => part.charAt(0).toUpperCase()).join('');
  return initials.slice(0, 2);
}

function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Bot className="w-7 h-7 text-primary" />
          <span className="text-xl font-bold text-foreground">CodeCraft</span>
        </Link>
        <nav className="flex items-center gap-4">
          {isSupabaseConfigured() && user ? (
            <>
              <div 
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold"
                title={user.email}
              >
                {getInitials(user.email)}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md hover:bg-accent transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
