import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initialGroups } from '../../database/db';
import { Trash2, Edit2, Plus, Search, Filter } from 'lucide-react';

export default function Groups() {
  const [groups, setGroups] = useState(initialGroups);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({ id: null, name: '', topic: '', date: '', price: 0, rating: 5, members: 1 });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Filters State
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('DATE');

  // --- CRUD OPERATIONS (Task 2 & 5) ---
  
  // CREATE / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update: Array.map() + Object mapping
      setGroups(groups.map(g => g.id === formData.id ? { ...formData } : g));
    } else {
      // Create: Array.push() equivalent via spread
      const newGroup = { ...formData, id: Date.now() };
      setGroups([...groups, newGroup]);
    }
    closeModal();
  };

  // DELETE
  const handleDelete = (id) => {
    // Delete: Array.filter()
    setGroups(groups.filter(g => g.id !== id));
  };

  const openEdit = (group) => {
    setFormData(group);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setFormData({ id: null, name: '', topic: '', date: '', price: 0, rating: 5, members: 1 });
    setIsEditing(false);
    setShowModal(false);
  };

  // --- STRING METHODS (Task 6) ---
  const cleanString = (str) => {
    if (!str) return "";
    let cleaned = str.trim(); // 1. trim()
    cleaned = cleaned.toLowerCase(); // 2. toLowerCase()
    return cleaned;
  };

  const formatTitle = (title) => {
    if (!title) return "";
    // 3. toUpperCase(), 4. substring(), 5. replace()
    let formatted = title.trim().replace(/\s+/g, ' '); 
    return formatted.substring(0, 1).toUpperCase() + formatted.substring(1);
  };

  // --- SEARCH & FILTERS (Task 3) ---
  const filteredAndSortedGroups = useMemo(() => {
    let result = [...groups];

    // 1. Array.filter() via String Search properties
    if (searchQuery) {
      const q = cleanString(searchQuery);
      result = result.filter(g => 
        cleanString(g.name).includes(q) || // 6. includes()
        cleanString(g.topic).startsWith(q) || // 7. startsWith()
        cleanString(g.topic).endsWith(q) // 8. endsWith()
      );
    }

    // 2. Active Category Filters (5 filters inside switch)
    switch(activeFilter) {
      case 'FREE':
        result = result.filter(g => g.price === 0);
        break;
      case 'PAID':
        result = result.filter(g => g.price > 0);
        break;
      case 'TOP_RATED':
        result = result.filter(g => g.rating >= 4.5);
        break;
      case 'CS_ONLY':
        // 9. split(), 10. concat()
        result = result.filter(g => cleanString(g.topic).split(' ').concat(['']).includes("computer"));
        break;
      default: break;
    }

    // 3. Array.sort()
    if (sortBy === 'PRICE_ASC') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'PRICE_DESC') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'DATE') result.sort((a, b) => new Date(b.date) - new Date(a.date));

    return result;
  }, [groups, searchQuery, activeFilter, sortBy]);

  // Array Advanced Aggregation / Methods checks
  const totalFree = groups.reduce((acc, curr) => curr.price === 0 ? acc + 1 : acc, 0); // Array.reduce()
  const allHighlyRated = groups.every(g => g.rating >= 3.0); // Array.every()
  const hasExpensive = groups.some(g => g.price > 50); // Array.some()
  const highestRatedGroup = groups.find(g => g.rating === 5) || groups[0]; // Array.find()

  return (
    <div className="w-full flex flex-col gap-6 pt-6 min-h-screen">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[color:var(--glass-border)] pb-6">
        <div>
           <h1 className="text-4xl font-black text-[color:var(--text-main)]">Study Groups</h1>
           <p className="text-[color:var(--text-muted)] mt-1">Manage, Search, and Filter via DOM & Arrays</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 rounded-full bg-[color:var(--accent-purple)] text-[#050508] font-bold hover:scale-105 transition-transform">
          <Plus size={20} /> Add New Group
        </button>
      </div>

      {/* Analytics (Reduce, Some, Every) */}
      <div className="flex flex-wrap gap-4 text-sm font-mono text-[color:var(--text-muted)] p-4 rounded-xl glass-panel">
         <span>Total Free Groups: {totalFree}</span> |
         <span>All Rating &gt; 3.0: {allHighlyRated ? 'Yes' : 'No'}</span> |
         <span>Expensive Found (&gt; 50): {hasExpensive ? 'Yes' : 'No'}</span> |
         <span>Top Group: {highestRatedGroup?.name}</span>
      </div>

      {/* FILTER CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 glass-panel p-4 rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]" size={18} />
          <input 
            type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, topic..." 
            className="w-full pl-10 pr-4 py-2 border border-[color:var(--glass-border)] bg-[color:var(--bg-secondary)] text-[color:var(--text-main)] rounded-xl outline-none focus:border-[color:var(--accent-purple)]" 
          />
        </div>
        
        <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)} className="px-4 py-2 border border-[color:var(--glass-border)] bg-[color:var(--bg-secondary)] text-[color:var(--text-main)] rounded-xl outline-none">
          <option value="ALL">All Categories</option>
          <option value="FREE">Free Only</option>
          <option value="PAID">Premium (Paid)</option>
          <option value="TOP_RATED">Top Rated (4.5+)</option>
          <option value="CS_ONLY">Computer Science</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2 border border-[color:var(--glass-border)] bg-[color:var(--bg-secondary)] text-[color:var(--text-main)] rounded-xl outline-none">
          <option value="DATE">Newest First</option>
          <option value="PRICE_ASC">Price: Low to High</option>
          <option value="PRICE_DESC">Price: High to Low</option>
        </select>
      </div>

      {/* GRID DISPLAY (Array.map) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAndSortedGroups.map(group => (
            <motion.div 
              key={group.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="p-6 rounded-3xl glass-panel flex flex-col gap-3 group"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[color:var(--text-main)]">{formatTitle(group.name)}</h3>
                <span className={`px-2 py-1 text-xs font-bold rounded-lg ${group.price === 0 ? 'bg-[color:var(--accent-green)] text-[#050508]' : 'bg-[color:var(--accent-purple)] text-[#050508]'}`}>
                  {group.price === 0 ? 'FREE' : `$${group.price}`}
                </span>
              </div>
              <p className="text-[color:var(--accent-blue)] text-sm font-semibold uppercase">{group.topic}</p>
              
              <div className="flex gap-4 text-sm text-[color:var(--text-muted)] mt-2">
                 <span>⭐ {group.rating}</span>
                 <span>👥 {group.members} Members</span>
              </div>
              <div className="text-xs font-mono text-[color:var(--text-muted)] opacity-60">Date: {group.date}</div>

              {/* CRUD Actions */}
              <div className="mt-4 pt-4 border-t border-[color:var(--glass-border)] flex gap-2">
                <button onClick={() => openEdit(group)} className="flex-1 py-2 flex justify-center items-center gap-2 rounded-xl text-[color:var(--text-main)] hover:bg-[color:var(--accent-blue)] hover:text-[#050508] transition-colors border border-[color:var(--glass-border)]">
                  <Edit2 size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(group.id)} className="flex-1 py-2 flex justify-center items-center gap-2 rounded-xl text-[color:var(--accent-pink)] hover:bg-[color:var(--accent-pink)] hover:text-[#050508] transition-colors border border-[color:var(--glass-border)]">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredAndSortedGroups.length === 0 && (
          <div className="col-span-full py-20 text-center text-[color:var(--text-muted)] font-mono text-lg">
            No groups match your search criteria.
          </div>
        )}
      </div>

      {/* MODAL FORM (Create / Update) */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="max-w-md w-full p-8 rounded-3xl bg-[color:var(--bg-primary)] border border-[color:var(--glass-border)]">
               <h2 className="text-2xl font-bold mb-6 text-[color:var(--text-main)]">{isEditing ? 'Update Group' : 'Create New Group'}</h2>
               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                 <input type="text" placeholder="Group Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--glass-border)] text-[color:var(--text-main)] outline-none" />
                 <input type="text" placeholder="Topic" required value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--glass-border)] text-[color:var(--text-main)] outline-none" />
                 <div className="flex gap-4">
                    <input type="number" placeholder="Price (0 for free)" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-1/2 px-4 py-3 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--glass-border)] text-[color:var(--text-main)] outline-none" />
                    <input type="number" placeholder="Rating" step="0.1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="w-1/2 px-4 py-3 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--glass-border)] text-[color:var(--text-main)] outline-none" />
                 </div>
                 <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[color:var(--bg-secondary)] border border-[color:var(--glass-border)] text-[color:var(--text-main)] outline-none" />
                 
                 <div className="flex gap-3 mt-4">
                   <button type="submit" className="flex-1 py-3 bg-[color:var(--accent-purple)] text-[#050508] font-bold rounded-xl">{isEditing ? 'Update' : 'Create'}</button>
                   <button type="button" onClick={closeModal} className="flex-1 py-3 bg-[color:var(--glass-bg)] border border-[color:var(--glass-border)] font-bold text-[color:var(--text-main)] rounded-xl">Cancel</button>
                 </div>
               </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
