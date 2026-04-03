import { motion } from 'framer-motion';
import { Target, Clock, Star, Trophy } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 pt-10 pb-20 max-w-5xl mx-auto">
      
      {/* HEADER */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#c4a1ff]/20 blur-[100px] rounded-full -z-10" />
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a1ff] to-[#a3e6b2]">StudySync</span> Story
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          We built this platform to fix a core problem: finding serious, compatible study partners. StudySync combines AI matching, productivity tracking, and a credit economy to revolutionize how students collaborate.
        </p>
      </motion.section>

      {/* STATS */}
      <motion.section 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        <Statbox value="500+" label="Students Registered" color="text-[#c4a1ff]" border="border-[#c4a1ff]/20" />
        <Statbox value="1200+" label="Sessions Completed" color="text-[#a3e6b2]" border="border-[#a3e6b2]/20" />
        <Statbox value="95%" label="Completion Rate" color="text-[#ffb3c6]" border="border-[#ffb3c6]/20" />
        <Statbox value="30+" label="Universities" color="text-[#c4a1ff]" border="border-[#c4a1ff]/20" />
      </motion.section>

      {/* TIMELINE */}
      <section className="mt-10">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Our Journey</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
          
          <TimelineItem 
            date="January 2025" 
            title="Project Conception" 
            desc="Ayesha & Sirat began working on the concept for their FYP." 
            align="left"
            color="bg-[#a3e6b2]"
          />
          <TimelineItem 
            date="March 2025" 
            title="Proposal Approved" 
            desc="Department gave the green light for the AI matching algorithm." 
            align="right"
            color="bg-[#c4a1ff]"
          />
          <TimelineItem 
            date="June 2025" 
            title="Core Development" 
            desc="Built the video tracking, gamification, and web architecture." 
            align="left"
            color="bg-[#ffb3c6]"
          />
          <TimelineItem 
            date="December 2025" 
            title="Official Launch" 
            desc="StudySync goes live for university students across Pakistan." 
            align="right"
            color="bg-[#c4a1ff]"
          />

        </div>
      </section>

      {/* TEAM */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-10">Meet the Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          
          <div className="p-8 rounded-3xl bg-[#1C1C22]/80 backdrop-blur-md border border-white/5 hover:border-[#c4a1ff]/30 transition-all hover:shadow-[0_0_30px_rgba(196,161,255,0.1)] group">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-[#c4a1ff] to-[#a3e6b2] rounded-full mb-6 p-1">
               <div className="w-full h-full bg-[#0F0F13] rounded-full flex items-center justify-center font-bold text-2xl text-white">A</div>
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-[#c4a1ff] transition-colors">Ayesha Zubair</h3>
            <p className="text-[#a3e6b2] font-mono text-sm mt-1 mb-4">ID: 70146508</p>
            <p className="text-gray-400">Frontend UI/UX & Gamification Architect</p>
          </div>

          <div className="p-8 rounded-3xl bg-[#1C1C22]/80 backdrop-blur-md border border-white/5 hover:border-[#a3e6b2]/30 transition-all hover:shadow-[0_0_30px_rgba(163,230,178,0.1)] group">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-[#a3e6b2] to-[#ffb3c6] rounded-full mb-6 p-1">
               <div className="w-full h-full bg-[#0F0F13] rounded-full flex items-center justify-center font-bold text-2xl text-white">S</div>
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-[#a3e6b2] transition-colors">Sirat Jamil</h3>
            <p className="text-[#c4a1ff] font-mono text-sm mt-1 mb-4">ID: 70149113</p>
            <p className="text-gray-400">Backend Systems & AI Integration</p>
          </div>

        </div>
      </section>

    </div>
  );
}

function Statbox({ value, label, color, border }) {
  return (
    <div className={`p-6 rounded-3xl bg-[#1C1C22]/50 border ${border} backdrop-blur-sm text-center transform hover:scale-105 transition-transform`}>
      <h3 className={`text-4xl md:text-5xl font-bold tracking-tight mb-2 ${color}`}>{value}</h3>
      <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
}

function TimelineItem({ date, title, desc, align, color }) {
  const isLeft = align === 'left';
  return (
    <motion.div 
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
    >
      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0F0F13] ${color} shadow-[0_0_15px_rgba(0,0,0,0.5)] shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`} />
      
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-[#1C1C22]/60 border border-white/5 hover:bg-[#1C1C22] transition-colors">
        <span className={`block text-xs font-mono mb-2 text-gray-500`}>{date}</span>
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
