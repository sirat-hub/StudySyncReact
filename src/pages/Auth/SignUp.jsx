import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

export default function SignUp() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-8 rounded-3xl bg-[#1C1C22]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(163,230,178,0.1)] relative overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#a3e6b2]/20 blur-[50px] -z-10 rounded-full" />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Join StudySync</h2>
          <p className="text-gray-400 text-sm">Create an account and find your perfect study partner.</p>
        </div>

        <form className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1">
             <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
             <div className="relative">
               <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
               <input 
                 type="text" 
                 placeholder="Felix Student" 
                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#a3e6b2] outline-none text-white transition-colors"
               />
             </div>
          </div>

          <div className="flex flex-col gap-1">
             <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">University Email</label>
             <div className="relative">
               <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
               <input 
                 type="email" 
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
                 type="password" 
                 placeholder="••••••••" 
                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-[#a3e6b2] outline-none text-white transition-colors"
               />
             </div>
          </div>

          <button type="button" className="w-full py-4 mt-6 rounded-xl bg-[#a3e6b2] text-[#0F0F13] font-bold text-lg hover:shadow-[0_0_20px_rgba(163,230,178,0.4)] hover:bg-white transition-all flex justify-center items-center gap-2">
            Create Account <UserPlus size={20} />
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Already have an account? <Link to="/signin" className="font-semibold text-[#c4a1ff] hover:underline">Sign In</Link>
        </p>

      </motion.div>
    </div>
  );
}
