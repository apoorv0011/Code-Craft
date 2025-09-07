import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../supabaseClient';
import LoadingButton from '../components/LoadingButton';
import { Bot } from 'lucide-react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
        setError("Sign up is disabled. Supabase has not been configured by the developer.");
        return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { error } = await signUp({ email, password });
      if (error) throw error;
      setMessage('Success! Please check your email for a confirmation link.');
      setTimeout(() => navigate('/login'), 5000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground">Create an Account</h1>
          <p className="text-muted-foreground">Join CodeCraft and boost your productivity.</p>
        </div>
        
        <form onSubmit={handleSignup} className="bg-card border rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength="6"
              className="w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
            />
          </div>

          <LoadingButton
            type="submit"
            loading={loading}
            disabled={loading || !email || !password}
            className="w-full"
          >
            Sign Up
          </LoadingButton>

          {error && <p className="text-sm text-center text-destructive">{error}</p>}
          {message && <p className="text-sm text-center text-green-600">{message}</p>}
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
