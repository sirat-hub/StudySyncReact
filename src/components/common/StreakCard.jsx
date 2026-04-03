import { motion } from 'framer-motion';
import { Flame, Zap, Award } from 'lucide-react';

export default function StreakCard({ streak = 0, level = 'JR' }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-3xl bg-[#1C1C22]/60 backdrop-blur-md border border-white/10 relative overflow-hidden group border-b-4 border-b-[#FF5F1F]/40"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5F1F]/10 blur-[40px] rounded-full group-hover:bg-[#FF5F1F]/20 transition-all" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-2xl bg-[#FF5F1F]/10 border border-[#FF5F1F]/20">
          <Flame size={24} className="text-[#FF5F1F]" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Rank</span>
          <span className={`text-sm font-bold ${level === 'Master' ? 'text-[#c4a1ff]' : level === 'Tutor' ? 'text-[#a3e6b2]' : 'text-gray-300'}`}>
            {level}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-4xl font-black text-white tracking-tighter flex items-baseline gap-2">
          {streak}
          <span className="text-lg text-gray-500 font-bold uppercase">Days</span>
        </h3>
        <p className="text-sm text-gray-400 font-medium">Keep your study streak alive!</p>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex -space-x-2">
          {[1,2,3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1C1C22] bg-white/5 flex items-center justify-center">
              <Zap size={12} className="text-[#FF5F1F]/60" />
            </div>
          ))}
        </div>
        <button className="text-xs font-bold text-[#FF5F1F] hover:underline flex items-center gap-1 group/btn">
          View Badges <Award size={14} className="group-hover/btn:rotate-12 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
