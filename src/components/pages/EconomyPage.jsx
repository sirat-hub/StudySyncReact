import { motion } from 'framer-motion';
import { Coins, TrendingUp, ArrowUpRight, ArrowDownLeft, ShieldCheck, Zap, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../common/NotificationSystem';
import { updateUserCredits } from '../../database/userDb';

export default function EconomyPage() {
  const { userProfile, currentUser } = useAuth();
  const { addNotification } = useNotifications();

  const handleTestEarn = async () => {
    try {
      await updateUserCredits(currentUser.uid, 50);
      addNotification("Successfully earned 50 Study Credits!", "success");
    } catch (err) {
      addNotification("Failed to earn credits.", "error");
    }
  };

  const StatCard = ({ icon: Icon, label, value, subtext, color }) => (
    <div className={`p-6 rounded-3xl bg-[#1C1C22]/60 border border-white/5 relative overflow-hidden group`}>
      <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] rounded-full opacity-10 group-hover:opacity-20 transition-all ${color}`} />
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${color.replace('bg-', 'text-')}`}>
          <Icon size={24} />
        </div>
        <div className="flex items-center gap-1 text-[color:var(--accent-green)] text-xs font-bold bg-[color:var(--accent-green)]/10 px-2 py-1 rounded-full uppercase tracking-tighter">
          <TrendingUp size={12} /> +12%
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        <h3 className="text-3xl font-black text-white">{value}</h3>
        <p className="text-xs text-gray-400 font-medium">{subtext}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4a1ff]/10 border border-[#c4a1ff]/20 text-[#c4a1ff] text-[10px] font-black uppercase tracking-widest mb-4"
          >
            <Star size={12} /> Study Economy v1.0
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2">Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a1ff] to-[#a3e6b2]">Credits</span></h1>
          <p className="text-gray-400 font-medium max-w-md">Manage your learning currency, earn rewards, and request expert tutors.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
             onClick={handleTestEarn}
             className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Zap size={18} className="text-[#a3e6b2]" /> Earn Credits
          </button>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c4a1ff] to-[#a3e6b2] text-[#0F0F13] font-bold hover:shadow-[0_0_20px_rgba(196,161,255,0.4)] transition-all flex items-center gap-2">
            <Coins size={18} /> Spend Credits
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={Coins} 
          label="Current Balance" 
          value={userProfile?.credits || 0} 
          subtext="Available for tutor requests" 
          color="bg-[#c4a1ff]" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Total Earned" 
          value="1,250" 
          subtext="Lifetime study earnings" 
          color="bg-[#a3e6b2]" 
        />
        <StatCard 
          icon={ShieldCheck} 
          label="Level Multiplier" 
          value={userProfile?.level === 'Master' ? '2.5x' : userProfile?.level === 'Tutor' ? '1.5x' : '1.0x'} 
          subtext="Based on your user rank" 
          color="bg-[#ffb3c6]" 
        />
      </div>

      {/* Transaction History (Mock) */}
      <div className="p-8 rounded-3xl bg-[#1C1C22]/80 backdrop-blur-xl border border-white/10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-white tracking-tight">Recent Activity</h3>
          <button className="text-sm font-bold text-[#c4a1ff] hover:underline">View All</button>
        </div>

        <div className="space-y-4">
          {[
            { type: 'earn', title: 'Study Session completed with Ali', date: 'Today, 2:30 PM', amount: '+50' },
            { type: 'spend', title: 'Requested Python Tutoring', date: 'Yesterday', amount: '-150' },
            { type: 'earn', title: 'Weekly Streak Bonus', date: '2 days ago', amount: '+200' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 group hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${item.type === 'earn' ? 'bg-[#a3e6b2]/10 text-[#a3e6b2]' : 'bg-red-500/10 text-red-400'}`}>
                  {item.type === 'earn' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-gray-500 font-medium">{item.date}</p>
                </div>
              </div>
              <span className={`text-lg font-black ${item.type === 'earn' ? 'text-[#a3e6b2]' : 'text-red-400'}`}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
