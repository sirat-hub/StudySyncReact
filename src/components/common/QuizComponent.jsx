import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, XCircle, ArrowRight, Trophy, Zap } from 'lucide-react';

export default function QuizComponent({ onComplete, levelToAchieve = 'Tutor' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { q: "What is the primary benefit of peer-to-peer learning?", a: ["Speed", "Collaboration", "Cost", "None"], correct: 1 },
    { q: "Which AI feature in StudySync helps track productivity?", a: ["Notes", "Timer", "Compatibility", "All of above"], correct: 3 },
    { q: "How are Study Credits earned?", a: ["Paying money", "Sessions & Streaks", "Watching Ads", "Invite friends"], correct: 1 }
  ];

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleFinish = () => {
    const passed = score >= 2;
    onComplete(passed);
  };

  return (
    <div className="max-w-xl w-full p-8 rounded-3xl bg-[#1C1C22]/90 backdrop-blur-2xl border border-[#a3e6b2]/20 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3e6b2]/10 blur-[50px] rounded-full -z-10" />
      
      {!showResult ? (
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#a3e6b2] font-black text-xs uppercase tracking-widest">
                <Brain size={16} /> AI Assessment
              </div>
              <span className="text-gray-500 font-bold text-xs uppercase">Question {currentQuestion + 1} of {questions.length}</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">{questions[currentQuestion].q}</h3>

            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestion].a.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-[#a3e6b2]/10 hover:border-[#a3e6b2]/30 transition-all text-left flex items-center justify-between group"
                >
                  {opt}
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                 className="h-full bg-gradient-to-r from-[#a3e6b2] to-[#c4a1ff]"
               />
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${score >= 2 ? 'bg-[#a3e6b2]/20 text-[#a3e6b2]' : 'bg-red-500/20 text-red-500'}`}>
            {score >= 2 ? <Trophy size={40} /> : <XCircle size={40} />}
          </div>
          
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter mb-2">
              {score >= 2 ? "Level Up Success!" : "Keep Practicing!"}
            </h2>
            <p className="text-gray-400 font-medium">You scored {score} out of {questions.length}</p>
          </div>

          {score >= 2 ? (
            <div className="p-6 rounded-2xl bg-[#a3e6b2]/10 border border-[#a3e6b2]/20 flex items-center gap-4 text-left">
              <Zap size={24} className="text-[#a3e6b2]" />
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-wider">Unlocking {levelToAchieve} Status</p>
                <p className="text-xs text-gray-400">Your rewards and multipliers are being updated.</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">You need at least 2 correct answers to qualify for {levelToAchieve}.</p>
          )}

          <button 
            onClick={handleFinish}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#a3e6b2] to-[#c4a1ff] text-[#0F0F13] font-bold text-lg hover:shadow-2xl transition-all"
          >
            {score >= 2 ? "Claim Upgrade" : "Back to Home"}
          </button>
        </motion.div>
      )}
    </div>
  );
}
