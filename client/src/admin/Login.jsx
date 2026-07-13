import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials or unauthorized access');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border-t-4 border-secondary rounded shadow-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-full border border-secondary flex items-center justify-center mb-4 bg-surface-container">
            <ShieldAlert size={32} className="text-secondary" />
          </div>
          <h1 className="font-headline-md font-bold text-2xl text-on-surface tracking-widest uppercase">Admin Portal</h1>
          <p className="text-on-surface-variant text-xs mt-1">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="bg-error-container border border-error text-on-error-container p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Admin Email</label>
            <input 
              type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none placeholder-outline"
              placeholder="admin@4bros.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/30 rounded p-3 text-on-surface focus:border-secondary focus:outline-none placeholder-outline"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-primary-container text-on-primary font-label-bold uppercase tracking-widest hover:brightness-110 industrial-shadow rounded p-3 mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center flex flex-col space-y-4">
          <Link to="/" className="text-secondary font-bold text-sm hover:underline flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
            Back to Store
          </Link>
          <div className="text-xs text-on-surface-variant">
            Security policy enforces strict IP logging.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
