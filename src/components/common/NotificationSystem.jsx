import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Info, CheckCircle, AlertCircle, X } from 'lucide-react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map(({ id, message, type }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="pointer-events-auto"
            >
              <div className={`
                flex items-center gap-4 p-4 pr-6 rounded-2xl backdrop-blur-xl border shadow-2xl min-w-[300px]
                ${type === 'success' ? 'bg-[#a3e6b2]/10 border-[#a3e6b2]/20 text-[#a3e6b2]' : 
                  type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                  'bg-white/5 border-white/10 text-white'}
              `}>
                <div className={`p-2 rounded-xl ${type === 'success' ? 'bg-[#a3e6b2]/10' : type === 'error' ? 'bg-red-500/10' : 'bg-white/10'}`}>
                  {type === 'success' ? <CheckCircle size={20} /> : 
                   type === 'error' ? <AlertCircle size={20} /> : 
                   <Info size={20} />}
                </div>
                
                <div className="flex-1">
                  <p className="text-sm font-bold tracking-tight">{message}</p>
                </div>

                <button 
                  onClick={() => removeNotification(id)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}
