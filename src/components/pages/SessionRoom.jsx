import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, 
  Users, Settings, Shield, Clock, Brain, Send, Lock, 
  Sparkles, Coffee, Timer, CreditCard
} from 'lucide-react';
import { useNotifications } from '../common/NotificationSystem';

export default function SessionRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 minutes zoom-like limit
  const [messages, setMessages] = useState([
    { id: 1, sender: "System", text: "Encryption Key: RSA-4096. E2EE Active.", type: 'system' }
  ]);
  const [inputText, setInputText] = useState('');
  const [showPayWall, setShowPayWall] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setShowPayWall(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Simulate encryption
    const newMessage = {
      id: Date.now(),
      sender: "Me",
      text: inputText,
      encrypted: true
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
    
    // Simulate AI Suggestion
    setTimeout(() => {
      addNotification("AI Suggestion: 'Try explaining the concept of Props once more.'", "info");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#050508] z-[100] flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* Main Video Area */}
      <div className="flex-1 relative flex flex-col">
        
        {/* Top Header */}
        <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <Shield size={14} className="text-[#a3e6b2]" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">E2E Encrypted Room</span>
            </div>
            <h2 className="text-white font-bold tracking-tight">Study Session #{id?.slice(0, 4)}</h2>
          </div>

          <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl backdrop-blur-xl border ${timeLeft < 300 ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-pulse' : 'bg-white/10 border-white/20 text-white'}`}>
            <Clock size={18} />
            <span className="font-black tabular-nums">{formatTime(timeLeft)}</span>
            {timeLeft < 300 && <span className="text-[10px] font-bold uppercase ml-2">Time Low!</span>}
          </div>
        </div>

        {/* Video Grid Mockup */}
        <div className="flex-1 p-6 flex flex-col md:flex-row gap-4 items-center justify-center pt-24 pb-32">
          
          {/* Partner Video */}
          <div className="relative aspect-video w-full max-w-2xl rounded-3xl bg-gray-900 border border-white/5 overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent" />
             <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#a3e6b2]" />
                <span className="text-xs font-bold text-white">Ali (Partner)</span>
             </div>
             
             {/* AI Note Take Overlay */}
             <motion.div 
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-3"
             >
                <Brain size={16} className="text-[#c4a1ff]" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">AI Note-Taker Listening...</span>
             </motion.div>
          </div>

          {/* Self Video */}
          <div className="relative aspect-video w-full md:w-64 rounded-2xl bg-gray-800 border border-white/10 overflow-hidden shadow-xl self-end">
             {isVideoOn ? (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
             ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
                  <VideoOff size={40} className="text-gray-700" />
                </div>
             )}
             <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/5">
                <span className="text-[10px] font-bold text-white">You</span>
             </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 inset-x-0 p-8 flex justify-center items-end gap-4 z-20 pointer-events-none">
          <div className="flex items-center gap-4 p-4 rounded-[2.5rem] bg-white/10 border border-white/20 backdrop-blur-2xl pointer-events-auto transform hover:scale-[1.02] transition-transform">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
            <button 
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full transition-all ${!isVideoOn ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {!isVideoOn ? <VideoOff size={24} /> : <Video size={24} />}
            </button>
            
            <button className="p-4 rounded-full bg-white text-[#0F0F13] hover:scale-110 transition-all font-black">
               <Brain size={24} />
            </button>

            <button 
              onClick={() => setShowChat(!showChat)}
              className={`p-4 rounded-full transition-all ${showChat ? 'bg-[#c4a1ff] text-[#0F0F13]' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <MessageSquare size={24} />
            </button>

            <div className="w-[1px] h-10 bg-white/20 mx-2" />

            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 rounded-full bg-red-500 hover:bg-red-600 text-white font-black hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all flex items-center gap-2"
            >
              <PhoneOff size={20} /> Leave
            </button>
          </div>
        </div>
      </div>

      {/* Chat Sidebar Area */}
      <AnimatePresence>
        {showChat && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full bg-[#0F0F13] border-l border-white/10 flex flex-col relative z-30"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-white font-black uppercase tracking-widest text-xs">Encrypted Chat</h3>
                <div className="w-1.5 h-1.5 rounded-full bg-[#a3e6b2] animate-pulse" />
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="p-2 hover:bg-white/5 rounded-xl text-gray-500"
              >
                <Users size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.sender === 'Me' ? 'items-end' : 'items-start'}`}>
                  {m.type === 'system' ? (
                    <div className="w-full text-center py-2">
                       <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">{m.text}</span>
                    </div>
                  ) : (
                    <>
                      <div className={`p-4 rounded-2xl max-w-[85%] text-sm font-medium ${m.sender === 'Me' ? 'bg-[#c4a1ff] text-[#0F0F13] rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'}`}>
                        {m.text}
                      </div>
                      <span className="text-[8px] font-bold text-gray-600 mt-1 uppercase flex items-center gap-1">
                        <Lock size={8} /> Decrypted • 2:34 PM
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-6 bg-black/40 border-t border-white/5">
               <div className="relative">
                 <input 
                   type="text" 
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   placeholder="Type an encrypted message..."
                   className="w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-12 py-4 text-white text-sm focus:border-[#c4a1ff]/40 outline-none"
                 />
                 <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#c4a1ff] hover:bg-[#c4a1ff]/20 rounded-xl transition-all">
                    <Send size={20} />
                 </button>
               </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom-like Paywall Modal */}
      <AnimatePresence>
        {showPayWall && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#0F0F13]/90 backdrop-blur-xl">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="max-w-md w-full p-10 rounded-[3rem] bg-gradient-to-br from-[#1C1C22] to-[#0F0F13] border border-[#ffb3c6]/30 shadow-[0_0_100px_rgba(255,179,198,0.1)] relative overflow-hidden text-center"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffb3c6]/10 blur-[50px] rounded-full" />
                
                <div className="w-20 h-20 mx-auto rounded-full bg-[#ffb3c6]/10 border border-[#ffb3c6]/20 flex items-center justify-center mb-8">
                   <Timer size={40} className="text-[#ffb3c6]" />
                </div>

                <h3 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase">Session <span className="text-[#ffb3c6]">Expired</span></h3>
                <p className="text-gray-400 font-medium mb-10 leading-relaxed">
                  Your 40-minute free session has ended. To continue learning without interruptions, upgrade your plan.
                </p>

                <div className="flex flex-col gap-4">
                  <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#ffb3c6] to-[#c4a1ff] text-[#0F0F13] font-black text-xl hover:shadow-[0_0_30px_rgba(255,179,198,0.5)] transition-all flex items-center justify-center gap-3">
                    <CreditCard size={24} /> Upgrade Now
                  </button>
                  <button onClick={() => navigate('/dashboard')} className="w-full py-5 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                    End Session
                  </button>
                </div>
                
                <p className="mt-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">Studying with Credits? <span className="text-[#ffb3c6] cursor-pointer hover:underline">Use them here</span></p>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
