import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, LogOut, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-50 glass-strong border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold gradient-text">CodeCraft</span>
            <span className="text-xs text-blue-400 font-medium">AI-Powered Tools</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          {isSupabaseConfigured() && user ? (
            <>
              {/* User Avatar */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-white">Welcome back!</span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
                <div 
                  className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all cursor-pointer group"
                  title={user.email}
                >
                  <span className="relative z-10">{getInitials(user.email)}</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl font-medium text-white border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 group"
              >
                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link 
                to="/login" 
                className="px-5 py-2.5 glass rounded-xl font-medium text-white border border-white/10 hover:border-blue-500/30 hover:bg-white/5 transition-all duration-300"
              >
                Login
              </Link>

              {/* Sign Up Button */}
              <Link 
                to="/signup" 
                className="relative group px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold text-white overflow-hidden shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Sign Up
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
