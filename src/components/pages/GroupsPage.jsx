import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { 
  Trash2, Edit2, Plus, Search, 
  Filter, Award, Users, BookOpen, 
  BadgeCheck, ShieldAlert 
} from 'lucide-react';

export default function GroupsPage() {
  const { currentUser } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({ id: null, name: '', topic: '', level: 'JR', date: '', price: 0, rating: 5, members: 1 });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Filters State
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('DATE');

  // --- FIRESTORE REAL-TIME SUBSCRIPTION ---
  
  useEffect(() => {
    const q = query(collection(db, "groups"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const groupsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGroups(groupsData);
      setLoading(false);
    }, (error) => {
        console.error("Firestore Error:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- CRUD OPERATIONS ---
  const seedGroups = async () => {
    const samples = [
      { name: "Algorithms I Prep", topic: "Computer Science", level: "JR", date: "2026-04-10", price: 0, rating: 4.8, members: 4 },
      { name: "Macroeconomics Calc", topic: "Economics", level: "Tutor", date: "2026-04-12", price: 50, rating: 4.5, members: 2 },
      { name: "Graphic Design Masterclass", topic: "Graphic Design", level: "Master", date: "2026-04-15", price: 100, rating: 5.0, members: 8 }
    ];
    try {
      for (const group of samples) {
        await addDoc(collection(db, "groups"), {
           ...group,
           createdAt: new Date().toISOString(),
           createdBy: "system"
        });
      }
      alert("Sample FYP data seeded!");
    } catch (err) {
      alert("Error seeding: " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const groupRef = doc(db, "groups", formData.id);
        const { id, ...updateData } = formData;
        await updateDoc(groupRef, updateData);
      } else {
        await addDoc(collection(db, "groups"), {
          ...formData,
          createdAt: new Date().toISOString(),
          createdBy: currentUser.email
        });
      }
      closeModal();
    } catch (err) {
      alert("Error saving group: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await deleteDoc(doc(db, "groups", id));
      } catch (err) {
        alert("Error deleting: " + err.message);
      }
    }
  };

  const openEdit = (group) => {
    setFormData(group);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setFormData({ id: null, name: '', topic: '', level: 'JR', date: '', price: 0, rating: 5, members: 1 });
    setIsEditing(false);
    setShowModal(false);
  };

  // --- HELPER METHODS ---
  const cleanString = (str) => {
    if (!str) return "";
    return str.trim().toLowerCase();
  };

  const filteredAndSortedGroups = useMemo(() => {
    let result = [...groups];

    if (searchQuery) {
      const q = cleanString(searchQuery);
      result = result.filter(g => 
        cleanString(g.name).includes(q) || 
        cleanString(g.topic).includes(q)
      );
    }

    if (activeFilter !== 'ALL') {
      result = result.filter(g => g.level === activeFilter);
    }

    if (sortBy === 'PRICE_ASC') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'PRICE_DESC') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'RATING') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [groups, searchQuery, activeFilter, sortBy]);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center text-white">Loading FYP Groups Database...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6 pt-6 min-h-screen max-w-7xl">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[color:var(--glass-border)] pb-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <BadgeCheck size={18} className="text-[color:var(--accent-green)]" />
              <span className="text-[10px] font-black text-[color:var(--accent-green)] tracking-widest uppercase">Verified Academic Matching</span>
           </div>
           <h1 className="text-4xl font-black text-white tracking-tighter">Study Groups</h1>
           <p className="text-gray-400 mt-1">Manage and explore peer-to-peer study sessions.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[color:var(--accent-purple)] to-[color:var(--accent-blue)] text-[#050508] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(196,161,255,0.3)]">
          <Plus size={20} /> Host New Session
        </button>
      </div>

      {/* FILTER CONTROLS */}
      <div className="flex flex-col lg:flex-row gap-4 glass-panel p-4 rounded-3xl border border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search topics, keywords..." 
            className="w-full pl-12 pr-4 py-3 border border-white/5 bg-black/40 text-white rounded-2xl outline-none focus:border-[color:var(--accent-blue)] transition-colors" 
          />
        </div>
        
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)} className="px-6 py-3 border border-white/5 bg-black/40 text-[10px] font-black uppercase tracking-widest text-white rounded-2xl outline-none flex-1">
            <option value="ALL">All Ranks</option>
            <option value="JR">Junior Level (JR)</option>
            <option value="Tutor">Tutor Level</option>
            <option value="Master">Master Level</option>
          </select>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-6 py-3 border border-white/5 bg-black/40 text-[10px] font-black uppercase tracking-widest text-white rounded-2xl outline-none flex-1">
            <option value="DATE">Newest First</option>
            <option value="RATING">Top Rated</option>
            <option value="PRICE_ASC">Low to High Credits</option>
          </select>
        </div>
      </div>

      {/* GRID DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAndSortedGroups.map(group => (
            <motion.div 
              key={group.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 rounded-[2rem] glass-panel flex flex-col gap-4 group border border-white/5 hover:border-[color:var(--accent-purple)]/50 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[color:var(--accent-purple)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                   <h3 className="text-xl font-black text-white group-hover:text-[color:var(--accent-purple)] transition-colors tracking-tight">{group.name}</h3>
                   <span className="text-[10px] font-bold text-[color:var(--accent-blue)] mt-1 uppercase flex items-center gap-1">
                      <BookOpen size={12} /> {group.topic}
                   </span>
                </div>
                <div className={`px-3 py-1 text-[10px] font-black rounded-full shadow-lg ${group.price === 0 ? 'bg-[color:var(--accent-green)] text-[#050508]' : 'bg-[color:var(--accent-purple)] text-[#050508]'}`}>
                  {group.price === 0 ? 'FREE' : `${group.price} SC`}
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-2xl border border-white/5">
                 <div className="p-2 rounded-xl bg-white/5">
                    <Award size={18} className={group.level === 'Master' ? 'text-yellow-400' : 'text-gray-400'} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Required Rank</span>
                    <span className="text-xs font-bold text-white uppercase">{group.level} LEVEL</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Star size={14} className="text-yellow-500" /> {group.rating} Rating
                 </div>
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Users size={14} className="text-[color:var(--accent-blue)]" /> {group.members} Members
                 </div>
              </div>

              {/* CRUD Actions */}
              <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                <button onClick={() => openEdit(group)} className="flex-1 py-3 flex justify-center items-center gap-2 rounded-2xl text-white hover:bg-white/10 transition-all border border-white/5 text-[10px] font-black uppercase tracking-widest">
                  <Edit2 size={14} /> Update
                </button>
                <button onClick={() => handleDelete(group.id)} className="flex-1 py-3 flex justify-center items-center gap-2 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all border border-red-500/10 text-[10px] font-black uppercase tracking-widest">
                  <Trash2 size={14} /> Revoke
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredAndSortedGroups.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center p-20 glass-panel rounded-[3rem] border border-dashed border-white/10 text-center">
           <BookOpen size={60} className="text-gray-600 mb-6" />
           <h3 className="text-2xl font-black text-gray-500 uppercase tracking-widest">No Active Syncs</h3>
           <p className="text-gray-600 mt-2 max-w-sm mb-8">Nobody is hosting a session in this category yet. Be the first to start the sync!</p>
           <button onClick={seedGroups} className="px-8 py-3 rounded-xl border border-[color:var(--accent-purple)]/30 text-[color:var(--accent-purple)] font-black text-[10px] uppercase tracking-widest hover:bg-[color:var(--accent-purple)]/10 transition-all">Seed Default FYP Data</button>
        </div>
      )}

      {/* MODAL FORM */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }} className="max-w-lg w-full p-10 rounded-[2.5rem] bg-[#1C1C22] border border-white/10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                  <Plus size={150} className="text-[color:var(--accent-purple)]" />
               </div>
               
               <h2 className="text-3xl font-black mb-8 text-white tracking-widest uppercase">{isEditing ? 'Sync Update' : 'New Study Sync'}</h2>
               
               <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Session Name</label>
                    <input type="text" placeholder="e.g. Adv. Algorithms Lab" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/5 text-white outline-none focus:border-[color:var(--accent-purple)] transition-all" />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Topic</label>
                       <select value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/5 text-white outline-none focus:border-[color:var(--accent-purple)] transition-all">
                          <option value="">Select Topic</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Economics">Economics</option>
                          <option value="Psychology">Psychology</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Environmental Science">Environmental Science</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Rank Required</label>
                       <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/5 text-white outline-none focus:border-[color:var(--accent-purple)] transition-all">
                          <option value="JR">JR Level</option>
                          <option value="Tutor">Tutor Level</option>
                          <option value="Master">Master Level</option>
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Sync Date</label>
                       <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/5 text-white outline-none focus:border-[color:var(--accent-purple)] transition-all" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Credits (SC)</label>
                       <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/5 text-white outline-none focus:border-[color:var(--accent-purple)] transition-all" />
                    </div>
                 </div>
                 
                 <div className="flex gap-4 mt-6">
                   <button type="submit" className="flex-1 py-5 bg-gradient-to-r from-[color:var(--accent-purple)] to-[color:var(--accent-blue)] text-[#050508] font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">{isEditing ? 'Sync Changes' : 'Broadcast Sync'}</button>
                   <button type="button" onClick={closeModal} className="flex-1 py-5 bg-white/5 border border-white/10 font-bold text-white rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">Abort</button>
                 </div>
               </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
