import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../supabaseClient';
import LoadingButton from '../components/LoadingButton';
import { Lock, Mail, ArrowRight } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
        setError("Login is disabled. Supabase has not been configured by the developer.");
        return;
    }
    setLoading(true);
    setError('');
    try {
      const { error } = await signIn({ email, password });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen px-4 overflow-hidden">
      {/* Premium mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient"></div>

      {/* Refined animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-orb animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-orb animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-1 gradient-text">Welcome Back</h1>
          <p className="text-gray-400 text-sm font-light">Sign in to continue</p>
        </div>
        
        {/* Form Card */}
        <form
          onSubmit={handleLogin}
          className="glass-strong border border-white/10 rounded-2xl p-5 space-y-4 shadow-2xl backdrop-blur-xl"
        >
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none font-light"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none font-light"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm"
            >
              <p className="text-xs text-red-400 text-center">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <LoadingButton
            type="submit"
            loading={loading}
            disabled={loading || !email || !password}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-semibold text-white text-sm hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group relative overflow-hidden"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </LoadingButton>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-xs text-gray-400 mt-4 font-light">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold gradient-text hover:underline">
            Sign up for free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
