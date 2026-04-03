import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#ffb3c6]/20 via-[#c4a1ff]/20 to-transparent blur-[120px] rounded-full -z-10 animate-pulse" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-[#ffb3c6]/40 blur-[80px] rounded-full" />
        <h1 className="text-[14rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent relative z-10 select-none leading-none">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <AlertTriangle size={100} className="text-[#ffb3c6] drop-shadow-[0_0_30px_rgba(255,179,198,0.6)]" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <h2 className="text-5xl font-black text-white mb-4 tracking-tight uppercase">
          Lost in <span className="text-[#c4a1ff]">Synchrony?</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed font-medium">
          The requested coordinate does not exist in StudySync. <br/> 
          You might have followed a broken link or a ghost in the machine.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#ffb3c6] to-[#c4a1ff] text-[#0F0F13] font-bold text-lg hover:shadow-[0_0_40px_rgba(255,179,198,0.5)] transition-all"
          >
            <Home size={22} className="group-hover:-translate-y-1 transition-transform" /> 
            <span>Back to Base</span>
          </Link>
          
          <Link 
            to="/contact" 
            className="px-10 py-5 rounded-full border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-all"
          >
            Report Issue
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
