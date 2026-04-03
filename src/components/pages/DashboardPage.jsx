import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Flame, Coins, ShieldCheck, ChevronRight, UserPlus, MapPin, Radar, Trophy, BrainCircuit, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import QuizComponent from '../common/QuizComponent';
import { useNotifications } from '../common/NotificationSystem';

export default function DashboardPage() {
  const { currentUser, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const handleQuizComplete = (passed) => {
    setShowQuiz(false);
    if (passed) {
      addNotification("Congratulations! You've leveled up!", "success");
    } else {
      addNotification("Quiz failed. Try again after more study sessions.", "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 pt-6 min-h-[calc(100vh-8rem)] w-full max-w-7xl">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 flex flex-col gap-4 perspective-[800px]">
        
        <div className="p-6 rounded-[2rem] glass-panel border border-[color:var(--glass-border)] flex flex-col items-center text-center transform-style-3d hover:translate-z-10 transition-transform relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[color:var(--accent-purple)] to-[color:var(--accent-green)] group-hover:scale-x-110 transition-transform" />
          
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[color:var(--accent-purple)] to-[color:var(--accent-green)] p-1 mb-4 shadow-[0_0_30px_var(--accent-purple)] hover:scale-110 transition-transform">
            <img 
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${userProfile?.displayName || currentUser?.email || 'Felix'}&backgroundColor=transparent`} 
              alt="Avatar" 
              className="w-full h-full rounded-full bg-[#0F0F13] object-cover" 
            />
            {userProfile?.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-[color:var(--accent-green)] text-[#0F0F13] p-1.5 rounded-full border border-[#0F0F13] animate-bounce shadow-lg" title="Verified Domain Badge">
                <ShieldCheck size={18} weight="bold" />
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-[color:var(--text-main)] truncate w-full px-2">{userProfile?.displayName || currentUser?.email.split('@')[0]}</h2>
          <p className="text-[10px] text-[color:var(--accent-purple)] font-black tracking-widest mt-1 uppercase">Level: {userProfile?.level || 'JR'}</p>
          
          <div className="mt-4 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-[color:var(--glass-border)]">
            <span className="w-2 h-2 rounded-full bg-[color:var(--accent-green)] animate-ping" />
            <span className="w-2 h-2 absolute rounded-full bg-[color:var(--accent-green)]" />
            <span className="text-xs font-black tracking-widest text-[color:var(--accent-green)]">ACTIVE</span>
          </div>
        </div>

        <div className="p-4 rounded-[2rem] glass-panel border border-[color:var(--glass-border)] space-y-2">
          <SidebarLink icon={<Activity size={20} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <SidebarLink icon={<MapPin size={20} className="text-[color:var(--accent-blue)]" />} label="IRL Radar" active={activeTab === 'Radar'} onClick={() => setActiveTab('Radar')} />
          <SidebarLink icon={<Flame size={20} className="text-[color:var(--accent-pink)]" />} label="Streaks" active={activeTab === 'Streaks'} onClick={() => setActiveTab('Streaks')} />
          <SidebarLink icon={<Coins size={20} className="text-[color:var(--accent-purple)]" />} label="Credits" active={activeTab === 'Credits'} onClick={() => setActiveTab('Credits')} />
          <SidebarLink icon={<BrainCircuit size={20} className="text-[color:var(--accent-green)]" />} label="AI Mentors" active={activeTab === 'AI'} onClick={() => setActiveTab('AI')} />
        </div>

      </aside>

      {/* MAIN DASHBOARD */}
      <main className="flex-1 flex flex-col h-full bg-[color:var(--bg-secondary)]/[0.02] rounded-[2.5rem] p-2 overflow-hidden perspective-[1500px]">
        <AnimatePresence mode="wait">
           {activeTab === 'Overview' && <OverviewTab key="overview" setTab={setActiveTab} navigate={navigate} userProfile={userProfile} />}
           {activeTab === 'Radar' && <RadarTab key="radar" />}
           {activeTab === 'Streaks' && <StreaksTab key="streaks" />}
           {activeTab === 'Credits' && <CreditsTab key="credits" />}
           {activeTab === 'AI' && <AITab key="ai" setShowQuiz={setShowQuiz} />}
        </AnimatePresence>
      </main>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#0F0F13]/90 backdrop-blur-xl">
             <QuizComponent levelToAchieve={userProfile?.level === 'JR' ? 'Tutor' : 'Master'} onComplete={handleQuizComplete} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- TABS COMPONENTS ---

function OverviewTab({ setTab, navigate, userProfile }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-6 p-4">
      
      {/* FYP STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Study Credits" value={userProfile?.credits || "0"} 
          icon={<Coins size={24} className="text-[color:var(--accent-purple)]" />} 
          sub={`Rank: ${userProfile?.level || 'JR'} • +150 today`} color="text-[color:var(--accent-purple)]" 
          description="Earned by teaching JR students and maintaining streaks."
        />
        <StatCard 
          title="Current Streak" value={`${userProfile?.streak || 0} Days`} 
          icon={<Flame size={24} className="text-[color:var(--accent-pink)]" />} 
          sub="Top 2% of Campus" color="text-[color:var(--accent-pink)]" 
          description="Calculated based on daily productive study sessions."
        />
        <StatCard 
          title="Productivity Score" value="94%" 
          icon={<BrainCircuit size={24} className="text-[color:var(--accent-green)]" />} 
          sub="Master Level Sync" color="text-[color:var(--accent-green)]" 
          description="AI calculated compatibility with recent partners."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
         <div className="p-8 rounded-[2rem] glass-panel border border-[color:var(--glass-border)] shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-black text-white tracking-tight">AI Compatibility</h3>
               <span className="px-3 py-1 rounded-full bg-[color:var(--accent-blue)]/10 text-[color:var(--accent-blue)] text-[10px] font-black">MATCH ENGINE v2.4</span>
            </div>
            <div className="space-y-6">
               <CompatItem name="Ayesha Khan" score={91} details="Master Level • CS Specialist" />
               <CompatItem name="Omar Tariq" score={76} details="Tutor Level • Calculus II" />
               <CompatItem name="Zara Ahmed" score={89} details="JR Level • Physics 101" />
            </div>
            <button 
              onClick={() => navigate('/matching')}
              className="w-full mt-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors uppercase tracking-widest text-xs"
            >
              Run Deep Sync
            </button>
         </div>

         <div className="p-8 rounded-[2rem] glass-panel border border-[color:var(--glass-border)] shadow-xl flex flex-col justify-between">
            <div>
               <h3 className="text-2xl font-black text-white tracking-tight mb-2">Next Session</h3>
               <p className="text-gray-400 text-sm">Join your scheduled session to earn 50 Credits.</p>
            </div>
            <div className="mt-8 p-6 rounded-3xl bg-black/40 border border-white/5 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[color:var(--accent-green)] to-[color:var(--accent-blue)] flex items-center justify-center shadow-lg">
                  <Activity size={24} className="text-[#0F0F13]" />
               </div>
               <div>
                  <h4 className="font-bold text-white text-lg">Web Eng Project</h4>
                  <p className="text-[10px] font-black text-[color:var(--accent-blue)] tracking-widest">STARTS IN 15 MINS</p>
               </div>
            </div>
            <button 
              onClick={() => navigate('/session/web-eng-demo')}
              className="mt-8 py-5 rounded-2xl bg-[color:var(--accent-green)] text-[#0F0F13] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_50px_rgba(163,230,178,0.3)]"
            >
              Enter Study Hall
            </button>
         </div>
      </div>
    </motion.div>
  );
}

function RadarTab() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 h-full flex flex-col items-center justify-center text-center">
       <div className="relative w-80 h-80 rounded-full border-4 border-[color:var(--accent-blue)]/20 shadow-[0_0_100px_rgba(0,180,216,0.1)] flex items-center justify-center mb-10 overflow-hidden">
          <div className="absolute inset-0 border border-[color:var(--accent-blue)]/10 rounded-full scale-75"></div>
          <div className="absolute inset-0 border border-[color:var(--accent-blue)]/10 rounded-full scale-125"></div>
          <div className="absolute w-full h-[1px] bg-[color:var(--accent-blue)]/20"></div>
          <div className="absolute h-full w-[1px] bg-[color:var(--accent-blue)]/20"></div>
          <div className="absolute w-1/2 h-full bg-gradient-to-r from-transparent to-[color:var(--accent-blue)]/40 origin-right animate-spin-slow rounded-l-full mix-blend-screen top-0 left-0"></div>
          <MapPin size={40} className="text-[color:var(--accent-blue)] animate-pulse drop-shadow-[0_0_20px_var(--accent-blue)]" />
       </div>
       <h2 className="text-3xl font-black text-white uppercase tracking-widest">Scanning Physical Location...</h2>
       <p className="text-gray-400 mt-4 max-w-sm">Use GPS to find nearby students in your library or study hall for immediate IRL pairing.</p>
    </motion.div>
  );
}

function StreaksTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="p-10 h-full flex flex-col items-center justify-center text-center">
       <Flame size={120} className="text-[color:var(--accent-pink)] drop-shadow-[0_20px_40px_rgba(255,77,133,0.5)] mb-8 animate-bounce" />
       <h1 className="text-6xl font-black text-white tracking-tighter mb-4">28 DAY STREAK</h1>
       <div className="flex gap-2 mb-10">
          {[...Array(7)].map((_, i) => (
             <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${i < 5 ? 'bg-[color:var(--accent-pink)] text-black' : 'bg-white/5 border border-white/10 text-gray-600'}`}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
             </div>
          ))}
       </div>
       <p className="text-gray-400 max-w-md">You are in the top 2% of learners. Maintain this streak for 2 more days to reach **MASTER LEVEL** status.</p>
    </motion.div>
  );
}

function CreditsTab() {
  return (
    <motion.div initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} className="p-10 h-full flex flex-col items-center justify-center text-center">
       <div className="relative mb-10">
          <Coins size={150} className="text-[color:var(--accent-purple)] drop-shadow-[0_20px_50px_rgba(196,161,255,0.6)]" />
          <div className="absolute -top-4 -right-4 bg-[color:var(--accent-green)] text-black px-4 py-1 rounded-full text-xs font-black rotate-12 shadow-2xl">NEW!</div>
       </div>
       <h1 className="text-7xl font-black text-white tracking-tighter mb-4">2,450 SC</h1>
       <p className="text-lg text-[color:var(--accent-purple)] font-bold mb-10 tracking-wide uppercase">StudySync Credits Economy</p>
       <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left">
             <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Earned</h4>
             <p className="text-2xl font-black text-[color:var(--accent-green)]">+1,200</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left">
             <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Teaching</h4>
             <p className="text-2xl font-black text-[color:var(--accent-blue)]">45 SC/hr</p>
          </div>
       </div>
       <button className="mt-10 px-12 py-5 rounded-2xl bg-[color:var(--accent-purple)] text-black font-black uppercase tracking-widest hover:scale-105 transition-transform">Marketplace</button>
    </motion.div>
  );
}

function AITab({ setShowQuiz }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="p-10 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--accent-green)]/5 to-transparent pointer-events-none"></div>
       <BrainCircuit size={140} className="text-[color:var(--accent-green)] drop-shadow-[0_0_60px_rgba(163,230,178,0.4)] mb-8" />
       <h1 className="text-5xl font-black text-white tracking-tight mb-4">AI Study Mentor</h1>
       <p className="text-gray-400 max-w-lg leading-relaxed mb-10 italic">"I'll track your productivity during video calls, take automatic notes via mic, and generate custom quizzes to help you level up from JR to MASTER."</p>
       <div className="flex gap-4">
          <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors">Setup Mic Sync</button>
          <button 
            onClick={() => setShowQuiz(true)}
            className="px-8 py-4 rounded-2xl bg-[color:var(--accent-green)] text-black font-black uppercase tracking-widest"
          >
            Start Level Quiz
          </button>
       </div>
    </motion.div>
  );
}

// --- SUB-COMPONENTS ---

function SidebarLink({ icon, label, active, onClick }) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-[color:var(--bg-primary)] text-[color:var(--text-main)] font-black shadow-2xl border border-[color:var(--glass-border)] tracking-widest' : 'text-[color:var(--text-muted)] hover:text-[color:var(--text-main)] hover:bg-[color:var(--glass-bg)] font-semibold border border-transparent'}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

function StatCard({ title, value, icon, sub, color, description }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="p-8 rounded-[2.5rem] glass-panel border border-[color:var(--glass-border)] relative overflow-hidden group shadow-lg cursor-pointer">
      <div className={`absolute -top-5 -right-5 p-8 opacity-5 group-hover:opacity-20 transition-opacity ${color} transform group-hover:scale-150 duration-500`}>
        {icon}
      </div>
      <h4 className="text-[color:var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] mb-4">{title}</h4>
      <p className={`text-5xl font-black tracking-tighter mb-2 ${color}`}>{value}</p>
      <div className="flex items-center justify-between mt-6">
         <p className="text-xs font-bold text-white/50">{sub}</p>
         <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse text-white/20"></div>
      </div>
    </motion.div>
  );
}

function CompatItem({ name, score, details }) {
  return (
     <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-colors">
        <div className="relative">
           <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name}`} alt={name} className="w-14 h-14 rounded-2xl bg-black/40 border border-white/10 group-hover:border-[color:var(--accent-blue)] transition-colors" />
           <div className="absolute -bottom-1 -right-1 bg-[color:var(--accent-green)] text-black text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-lg">{score}%</div>
        </div>
        <div className="flex-1">
           <h4 className="font-bold text-white group-hover:text-[color:var(--accent-blue)] transition-colors">{name}</h4>
           <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{details}</p>
        </div>
        <ChevronRight size={18} className="text-gray-700 group-hover:text-white transition-colors" />
     </div>
  );
}
