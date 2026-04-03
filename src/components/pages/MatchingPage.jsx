import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Zap, UserPlus, Brain, Filter, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../common/NotificationSystem';
import { useNavigate } from 'react-router-dom';

export default function MatchingPage() {
  const { userProfile } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [userLocation, setUserLocation] = useState('Select Location');

  const mockPartners = [
    { id: 1, name: "Sarim Khan", level: "Master", compat: 98, location: "Islamabad, PK", subjects: ["React", "Python"], bio: "Final year student looking for research partners.", active: true },
    { id: 2, name: "Ayesha Ahmed", level: "Tutor", compat: 86, location: "Karachi, PK", subjects: ["Mathematics", "Physics"], bio: "Helping juniors with calculus and mechanics.", active: false },
    { id: 3, name: "Zubair Shah", level: "JR", compat: 72, location: "Lahore, PK", subjects: ["Economics", "Finance"], bio: "Looking for a study group for midterm exams.", active: true },
    { id: 4, name: "Fatima Noor", level: "Master", compat: 94, location: "Peshawar, PK", subjects: ["DS & Algo", "AI"], bio: "Let's crack coding interviews together!", active: true },
  ];

  const handleConnect = (name) => {
    addNotification(`Study request sent to ${name}!`, "success");
    setTimeout(() => {
      addNotification(`${name} accepted your request! Entering Session...`, "success");
      setTimeout(() => {
        navigate(`/session/sync-${Math.random().toString(36).substr(2, 9)}`);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* Header & AI Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3e6b2]/10 border border-[#a3e6b2]/20 text-[#a3e6b2] text-[10px] font-black uppercase tracking-widest"
          >
            <Brain size={12} /> AI Matching Engine Active
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e6b2] via-[#c4a1ff] to-[#ffb3c6]">Synchrony</span></h1>
          <p className="text-gray-400 font-medium max-w-xl text-lg">AI-powered peer matching based on your study habits, location, and expertise.</p>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-[#0F0F13] bg-gradient-to-tr from-purple-500 to-pink-500" />)}
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-white leading-none">1,240+</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Peers</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a3e6b2] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by subject, name or location..."
            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#1C1C22]/60 border border-white/5 focus:border-[#a3e6b2]/40 outline-none text-white font-medium transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {['All', 'Masters', 'Tutors', 'Nearby'].map(cat => (
            <button 
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat === 'Nearby') setShowLocationPicker(true);
              }}
              className={`px-6 py-5 rounded-2xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === cat ? 'bg-[#a3e6b2] text-[#0F0F13] shadow-[0_0_20px_rgba(163,230,178,0.3)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {cat === 'Nearby' && <MapPin size={18} />}
              {cat === 'Nearby' && userLocation !== 'Select Location' ? userLocation : cat}
            </button>
          ))}
          <button className="p-5 rounded-2xl bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Location Picker Modal */}
      <AnimatePresence>
        {showLocationPicker && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#0F0F13]/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md w-full p-8 rounded-3xl bg-[#1C1C22] border border-white/10 shadow-2xl space-y-6"
            >
              <h3 className="text-2xl font-black text-white tracking-tight uppercase">Select Your Location</h3>
              <div className="grid grid-cols-1 gap-2">
                {['Islamabad, PK', 'Karachi, PK', 'Lahore, PK', 'Peshawar, PK', 'Faisalabad, PK'].map(loc => (
                  <button 
                    key={loc}
                    onClick={() => {
                      setUserLocation(loc);
                      setShowLocationPicker(false);
                      addNotification(`Location set to ${loc}`, "info");
                    }}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#a3e6b2]/40 text-white font-bold text-left transition-all"
                  >
                    {loc}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowLocationPicker(false)}
                className="w-full py-4 text-gray-500 font-bold uppercase tracking-widest text-xs"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {mockPartners.map((partner) => (
          <motion.div 
            key={partner.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative p-8 rounded-[2rem] bg-[#1C1C22]/80 backdrop-blur-xl border border-white/10 hover:border-[#a3e6b2]/30 transition-all overflow-hidden"
          >
            {/* Animated Gradient Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#a3e6b2]/10 via-transparent to-transparent blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8">
              {/* Profile Image & Status */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-gray-800 to-gray-700 p-1">
                  <div className="w-full h-full rounded-[1.25rem] bg-[#0F0F13] flex items-center justify-center text-3xl font-black text-[#a3e6b2]">
                    {partner.name.charAt(0)}
                  </div>
                </div>
                {partner.active && <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#a3e6b2] border-4 border-[#1C1C22] shadow-[0_0_10px_#a3e6b2]" />}
                <div className="mt-4 flex flex-col items-center">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${partner.level === 'Master' ? 'bg-[#c4a1ff]/10 text-[#c4a1ff] border border-[#c4a1ff]/20' : 'bg-gray-800 text-gray-400'}`}>
                    {partner.level}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                      {partner.name}
                      <CheckCircle2 size={18} className="text-[#a3e6b2]" />
                    </h3>
                    <p className="text-gray-500 font-bold text-sm flex items-center gap-1 mt-1">
                      <MapPin size={14} /> {partner.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">AI Match</span>
                    <span className="text-3xl font-black text-white tracking-tighter leading-none">{partner.compat}%</span>
                  </div>
                </div>

                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                  {partner.bio}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {partner.subjects.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300">#{s}</span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => handleConnect(partner.name)}
                    className="flex-1 py-4 rounded-xl bg-white/5 border border-white/5 text-white font-black hover:bg-[#a3e6b2] hover:text-[#0F0F13] transition-all flex items-center justify-center gap-2"
                  >
                    Connect <UserPlus size={18} />
                  </button>
                  <button className="w-14 h-14 rounded-xl bg-white/5 border border-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-all">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
