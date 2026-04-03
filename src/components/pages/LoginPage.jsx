import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get message from ProtectedRoute or Registration redirection
  const message = location.state?.message;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError('Your email is not verified. Please check your inbox for the verification link.');
        setLoading(false);
        return;
      }

      // Redirect back to where user was going, or dashboard
      const origin = location.state?.from || "/dashboard";
      navigate(origin);
    } catch (err) {
      console.error("Login Error:", err);
      // Show specific firebase error or fallback
      let errorMessage = 'Invalid credentials or network error. Please try again.';
      
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        errorMessage = "Invalid password. Please check your spelling.";
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = "User not found. Did you use the correct email?";
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your connection.";
      } else if (err.code) {
        errorMessage = `Error: ${err.code}. ${err.message}`;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-8 rounded-3xl bg-[#1C1C22]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(196,161,255,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c4a1ff]/20 blur-[50px] -z-10 rounded-full" />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4a1ff]/10 border border-[#c4a1ff]/20 text-[#c4a1ff] text-[10px] font-black uppercase tracking-widest mb-4">
             <ShieldCheck size={12} /> Secure Portal
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to sync your study sessions.</p>
        </div>

        {message && !error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)]/20 text-[var(--accent-purple)] text-sm flex items-center gap-3">
            <Info size={18} />
            {message}
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
             <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email</label>
             <div className="relative">
               <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
               <input 
                 type="email" required
                 value={email} onChange={(e) => setEmail(e.target.value)}
                 placeholder="student@university.edu" 
                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#c4a1ff] outline-none text-white transition-colors"
               />
             </div>
          </div>

          <div className="flex flex-col gap-1">
             <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
             <div className="relative">
               <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
               <input 
                 type="password" required
                 value={password} onChange={(e) => setPassword(e.target.value)}
                 placeholder="••••••••" 
                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#c4a1ff] outline-none text-white transition-colors"
               />
             </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-[#c4a1ff] to-[#a3e6b2] text-[#0F0F13] font-bold text-lg hover:shadow-[0_0_20px_rgba(196,161,255,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"} <LogIn size={20} />
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Don't have an account? <Link to="/auth/register" className="font-semibold text-[#a3e6b2] hover:underline">Join Now</Link>
        </p>

      </motion.div>
    </div>
  );
}
