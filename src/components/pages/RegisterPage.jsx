import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, CheckCircle, ArrowRight, ShieldAlert, BadgeCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signup, sendVerification } = useAuth();
  
  const [step, setStep] = useState('form'); // 'form' or 'verify'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      // Signup now creates the user profile in Firestore automatically
      const user = await signup(email, password, fullName);
      await sendVerification(user);
      setStep('verify');
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyComplete = () => {
    navigate("/auth/login", { state: { message: "Account created! Please verify your email, then sign in." } });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div 
            key="reg-form"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-md w-full p-8 rounded-3xl bg-[#1C1C22]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(163,230,178,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3e6b2]/20 blur-[50px] -z-10 rounded-full" />
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3e6b2]/10 border border-[#a3e6b2]/20 text-[#a3e6b2] text-[10px] font-black uppercase tracking-widest mb-4">
                <BadgeCheck size={12} /> FYP Security Layer Active
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Join StudySync</h2>
              <p className="text-gray-400 text-sm">Start finding your perfect study partners.</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                <ShieldAlert size={18} />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                 <div className="relative">
                   <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                   <input 
                     type="text" required
                     value={fullName} onChange={(e) => setFullName(e.target.value)}
                     placeholder="Ayesha Zubair" 
                     className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#a3e6b2] outline-none text-white transition-colors"
                   />
                 </div>
              </div>

              <div className="flex flex-col gap-1">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Institute Email</label>
                 <div className="relative">
                   <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                   <input 
                     type="email" required
                     value={email} onChange={(e) => setEmail(e.target.value)}
                     placeholder="student@university.edu" 
                     className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#a3e6b2] outline-none text-white transition-colors"
                   />
                 </div>
              </div>

              <div className="flex flex-col gap-1">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                 <div className="relative">
                   <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                   <input 
                     type="password" required minLength={6}
                     value={password} onChange={(e) => setPassword(e.target.value)}
                     placeholder="••••••••" 
                     className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#a3e6b2] outline-none text-white transition-colors"
                   />
                 </div>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-[#a3e6b2] to-[#c4a1ff] text-[#0F0F13] font-bold text-lg hover:shadow-[0_0_20px_rgba(163,230,178,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:grayscale"
              >
                {loading ? "Creating..." : "Create Account"} <UserPlus size={20} />
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-8">
              Already have an account? <Link to="/auth/login" className="font-semibold text-[#c4a1ff] hover:underline">Sign In</Link>
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="verify-screen"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full p-10 rounded-3xl bg-[#1C1C22]/90 backdrop-blur-2xl border border-[#a3e6b2]/30 shadow-[0_0_60px_rgba(163,230,178,0.2)] text-center relative"
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#a3e6b2]/20 rounded-full flex items-center justify-center border-4 border-[#1C1C22]">
              <CheckCircle size={40} className="text-[#a3e6b2]" />
            </div>
            <h2 className="text-3xl font-black text-white mt-10 mb-4 tracking-tighter">Check Your Mail!</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              We've sent a verification link to <span className="text-white font-black underline decoration-[#a3e6b2]">{email}</span>. Click it to activate your **Verified Badge**.
            </p>
            
            <button 
              onClick={handleVerifyComplete}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#a3e6b2] to-[#c4a1ff] text-[#0F0F13] font-bold text-lg flex justify-center items-center gap-2 hover:scale-[1.02] transition-transform"
            >
              Finish Setup <ArrowRight size={20} />
            </button>
            <p className="mt-6 text-xs text-gray-500 font-medium">Didn't get the mail? Check your spam or <button onClick={sendVerification} className="text-[#a3e6b2] hover:underline">resend</button></p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
