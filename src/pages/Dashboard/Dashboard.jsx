import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Flame, Coins, ShieldCheck, ChevronRight, UserPlus, MapPin, Radar } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Location');

  return (
    <div className="flex flex-col md:flex-row gap-8 pt-6 min-h-[calc(100vh-8rem)] w-full w-max-7xl">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 flex flex-col gap-4 perspective-[800px]">
        
        <div className="p-6 rounded-[2rem] glass-panel border border-[color:var(--glass-border)] flex flex-col items-center text-center transform-style-3d hover:translate-z-10 transition-transform">
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[color:var(--accent-purple)] to-[color:var(--accent-green)] p-1 mb-4 shadow-[0_0_30px_var(--accent-purple)] hover:scale-110 transition-transform">
            <img 
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent" 
              alt="Avatar" 
              className="w-full h-full rounded-full bg-[#0F0F13] object-cover" 
            />
            <div className="absolute -bottom-2 -right-2 bg-[color:var(--accent-green)] text-[#0F0F13] p-1.5 rounded-full border border-[#0F0F13] animate-bounce">
              <ShieldCheck size={18} weight="bold" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-[color:var(--text-main)]">Felix Student</h2>
          <p className="text-sm text-[color:var(--text-muted)] font-mono mt-1">@felix2026</p>
          <div className="mt-4 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-[color:var(--glass-border)]">
            <span className="w-2 h-2 rounded-full bg-[color:var(--accent-green)] animate-ping" />
            <span className="w-2 h-2 absolute rounded-full bg-[color:var(--accent-green)]" />
            <span className="text-xs font-black tracking-widest text-[color:var(--accent-green)]">ONLINE</span>
          </div>
        </div>

        <div className="p-4 rounded-[2rem] glass-panel border border-[color:var(--glass-border)] space-y-2">
          <SidebarLink icon={<MapPin size={20} className="text-[color:var(--accent-blue)]" />} label="Radar (IRL)" active={activeTab === 'Location'} onClick={() => setActiveTab('Location')} />
          <SidebarLink icon={<Activity size={20} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <SidebarLink icon={<Flame size={20} className="text-[color:var(--accent-pink)]" />} label="Streaks" active={activeTab === 'Streaks'} onClick={() => setActiveTab('Streaks')} />
          <SidebarLink icon={<Coins size={20} className="text-[color:var(--accent-purple)]" />} label="Credits" active={activeTab === 'Credits'} onClick={() => setActiveTab('Credits')} />
        </div>

      </aside>

      {/* MAIN DASHBOARD */}
      <main className="flex-1 flex flex-col h-full bg-[color:var(--bg-secondary)]/[0.02] rounded-[2.5rem] p-2 overflow-hidden perspective-[1500px]">
        <AnimatePresence mode="wait">
           {activeTab === 'Location' && <LocationTab key="location" />}
           {activeTab === 'Overview' && <OverviewTab key="overview" setTab={setActiveTab} />}
           {activeTab === 'Streaks' && <StreaksTab key="streaks" />}
           {activeTab === 'Credits' && <CreditsTab key="credits" />}
           {activeTab === 'Matches' && <MatchesTab key="matches" />}
        </AnimatePresence>
      </main>

    </div>
  );
}

// --- TABS COMPONENTS ---

function LocationTab() {
  const [scanning, setScanning] = useState(true);
  useEffect(() => {
     const t = setTimeout(() => setScanning(false), 3000);
     return () => clearTimeout(t);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9, rotateX: 10 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} exit={{ opacity: 0, scale: 1.1 }} className="p-8 rounded-[2rem] glass-panel h-full flex flex-col items-center justify-center text-center relative overflow-hidden border border-[color:var(--accent-blue)]/30 w-full min-h-[500px]">
       
       <h2 className="text-4xl font-black text-[color:var(--text-main)] mb-10 tracking-widest uppercase flex items-center gap-3">
         <Radar size={40} className={`text-[color:var(--accent-blue)] ${scanning ? 'animate-spin' : ''}`} />
         IRL Matching
       </h2>

       {/* RADAR UI */}
       <div className="relative w-80 h-80 rounded-full border-4 border-[color:var(--accent-blue)]/20 shadow-[0_0_100px_rgba(0,180,216,0.1)] flex items-center justify-center">
         
         <div className="absolute inset-0 border border-[color:var(--accent-blue)]/10 rounded-full scale-75"></div>
         <div className="absolute inset-0 border border-[color:var(--accent-blue)]/10 rounded-full scale-125"></div>
         <div className="absolute w-full h-[1px] bg-[color:var(--accent-blue)]/20"></div>
         <div className="absolute h-full w-[1px] bg-[color:var(--accent-blue)]/20"></div>

         {/* PING ANIMATION */}
         {scanning && <div className="absolute inset-0 rounded-full bg-[color:var(--accent-blue)]/30 animate-ping"></div>}
         {scanning && <div className="absolute w-1/2 h-full bg-gradient-to-r from-transparent to-[color:var(--accent-blue)]/40 origin-right animate-spin-slow rounded-l-full mix-blend-screen mix-blend-plus-lighter top-0 left-0 hover:pause"></div>}

         {/* FOUND USERS */}
         {!scanning && (
           <>
             <RadarPing top="20%" left="30%" delay={0} name="Ayesha" course="Machine Learning" img="Aisha" />
             <RadarPing top="70%" left="75%" delay={0.5} name="Omar" course="Web Eng" img="Omar" />
             <RadarPing top="60%" left="20%" delay={1} name="Hassan" course="Calculus II" img="Hassan" />
             
             {/* Self */}
             <div className="absolute z-50 p-2 rounded-full bg-[color:var(--bg-primary)] border-2 border-[color:var(--accent-blue)] shadow-[0_0_20px_var(--accent-blue)]">
               <MapPin size={24} className="text-[color:var(--accent-blue)]" weight="fill" />
             </div>
           </>
         )}

       </div>

       <p className="text-[color:var(--accent-blue)] font-mono mt-12 text-lg">
         {scanning ? "SCANNING LHR CAMPUS LIBRARY (100m)..." : "3 MATCHES FOUND WITHIN 50 METERS."}
       </p>
    </motion.div>
  );
}

function RadarPing({ top, left, delay, name, course, img }) {
  return (
     <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, delay }} className="absolute z-20 group cursor-pointer" style={{ top, left }}>
        <div className="relative w-12 h-12 rounded-full border-2 border-[color:var(--accent-blue)] p-1 bg-[color:var(--bg-primary)] shadow-[0_0_30px_var(--accent-blue)] group-hover:scale-125 transition-transform">
           <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${img}`} alt={name} className="w-full h-full rounded-full bg-[#1C1C22]" />
           <span className="w-full h-full absolute inset-0 rounded-full bg-[color:var(--accent-blue)]/50 animate-ping pointer-events-none"></span>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max p-4 rounded-2xl glass-panel opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl border-[color:var(--accent-blue)]/50">
           <h4 className="font-bold text-white text-lg">{name}</h4>
           <p className="text-[color:var(--text-muted)] text-sm">{course}</p>
        </div>
     </motion.div>
  );
}

function OverviewTab({ setTab }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Current Streak" value="14 Days" icon={<Flame size={24} className="text-[color:var(--accent-pink)]" />} sub="Top 10% of users" color="text-[color:var(--accent-pink)]" />
        <StatCard title="Total Study Time" value="48h 20m" icon={<Activity size={24} className="text-[color:var(--accent-green)]" />} sub="+5h this week" color="text-[color:var(--accent-green)]" />
        <StatCard title="Study Credits" value="1,250" icon={<Coins size={24} className="text-[color:var(--accent-purple)]" />} sub="Ready to spend" color="text-[color:var(--accent-purple)]" />
      </div>

      <div className="p-6 md:p-8 rounded-[2rem] glass-panel border border-[color:var(--glass-border)] flex-1 h-full shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--text-main)] to-[color:var(--text-muted)]">Match Recommendations</h3>
          <button onClick={() => setTab('Matches')} className="text-sm font-semibold text-[color:var(--accent-purple)] hover:text-[color:var(--accent-blue)] transition-colors flex items-center gap-1">
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MatchCard name="Aisha Khan" details="CS Data Structures • 86% Match" seed="Aisha" color="blue" />
          <MatchCard name="Omar Tariq" details="Calculus II • 72% Match" seed="Omar" color="gray" />
        </div>
      </div>
    </motion.div>
  );
}

function StreaksTab() {
  return (
    <motion.div initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ type: "spring", stiffness: 100 }} className="p-8 rounded-[2rem] glass-panel h-full flex flex-col items-center justify-center text-center shadow-[0_0_100px_rgba(255,77,133,0.1)]">
       <Flame size={120} className="text-[color:var(--accent-pink)] drop-shadow-[0_40px_30px_rgba(255,77,133,0.6)] mb-6 animate-bounce" />
       <h2 className="text-6xl font-black text-[color:var(--text-main)] mb-2 tracking-tighter">14 Day Streak!</h2>
       <p className="text-[color:var(--text-muted)] max-w-md text-lg mt-4">You've hit your daily study goals for two weeks straight. Keep it up to earn the Fire badge!</p>
       
       <div className="flex gap-3 mt-12 justify-center flex-wrap">
          {[...Array(14)].map((_, i) => (
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }} key={i} className="w-5 h-16 rounded-full bg-gradient-to-t from-[color:var(--accent-pink)] to-[color:var(--accent-purple)] shadow-[0_0_20px_rgba(255,77,133,0.4)]"></motion.div>
          ))}
          <div className="w-5 h-16 rounded-full bg-[color:var(--glass-bg)] border border-[color:var(--glass-border)]"></div>
       </div>
    </motion.div>
  );
}

function CreditsTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 50, rotateX: -20 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 100 }} className="p-8 rounded-[2rem] glass-panel h-full flex flex-col items-center justify-center text-center shadow-[0_0_100px_rgba(149,84,255,0.1)]">
       <div className="relative">
         <Coins size={120} className="text-[color:var(--accent-purple)] drop-shadow-[0_20px_40px_rgba(212,191,255,0.7)] mb-6" />
         <Coins size={60} className="text-[color:var(--accent-blue)] absolute -top-5 -right-5 drop-shadow-2xl animate-pulse" />
       </div>
       <h2 className="text-6xl font-black text-[color:var(--text-main)] mb-2 tracking-tighter">1,250 Credits</h2>
       <p className="text-[color:var(--text-muted)] max-w-lg text-lg mt-4">Use your credits to unlock premium tutoring sessions, physical study hall reservations, and exclusive ML matchmaking weighting algorithms!</p>
       <button className="mt-10 px-12 py-5 rounded-full bg-[color:var(--accent-purple)] text-[#050508] font-black tracking-widest uppercase hover:scale-110 shadow-[0_0_40px_rgba(212,191,255,0.5)] transition-all">Redeem Store</button>
    </motion.div>
  );
}

function MatchesTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="p-8 rounded-[2rem] glass-panel h-full flex flex-col shadow-2xl">
       <h2 className="text-3xl font-black text-[color:var(--text-main)] mb-8 tracking-wide">All Match Recommendations</h2>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MatchCard name="Aisha Khan" details="CS Data Structures • 86% Match" seed="Aisha" color="blue" />
          <MatchCard name="Omar Tariq" details="Calculus II • 72% Match" seed="Omar" color="gray" />
          <MatchCard name="Zara Ahmed" details="Physics 101 • 91% Match" seed="Zara" color="green" />
          <MatchCard name="Bilal Saeed" details="Macroeconomics • 65% Match" seed="Bilal" color="purple" />
          <MatchCard name="Hassan Ali" details="Intro to Psychology • 88% Match" seed="Hassan" color="pink" />
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

function StatCard({ title, value, icon, sub, color }) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} className="p-8 rounded-3xl glass-panel border border-[color:var(--glass-border)] relative overflow-hidden group shadow-lg cursor-pointer">
      <div className={`absolute -top-5 -right-5 p-8 opacity-10 group-hover:opacity-30 transition-opacity ${color} transform group-hover:scale-150 duration-500`}>
        {icon}
      </div>
      <h4 className="text-[color:var(--text-muted)] text-sm font-bold uppercase tracking-widest mb-2">{title}</h4>
      <p className={`text-5xl font-black tracking-tighter mb-2 ${color}`}>{value}</p>
      <p className="text-sm font-bold text-[color:var(--text-main)] opacity-70">{sub}</p>
    </motion.div>
  );
}

function MatchCard({ name, details, seed, color }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-5 p-5 rounded-3xl glass-panel border border-[color:var(--glass-border)] hover:border-[color:var(--accent-purple)] transition-colors cursor-pointer group shadow-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[color:var(--accent-purple)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}`} alt={name} className="w-16 h-16 rounded-full bg-[color:var(--bg-primary)] shadow-md border-2 border-[color:var(--glass-border)]" />
      <div className="flex-1">
        <h4 className="font-black text-xl text-[color:var(--text-main)] group-hover:text-[color:var(--accent-purple)] transition-colors tracking-tight">{name}</h4>
        <p className="text-sm text-[color:var(--text-muted)] font-medium mt-1">{details}</p>
      </div>
      <button className="px-5 py-3 rounded-2xl bg-[color:var(--glass-bg)] border border-[color:var(--glass-border)] hover:bg-[color:var(--accent-purple)] hover:text-[#050508] text-[color:var(--text-main)] font-black text-sm tracking-widest uppercase transition-all flex items-center gap-2 shadow-md">
        <UserPlus size={18} /> Invite
      </button>
    </motion.div>
  );
}
