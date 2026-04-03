import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users, Play, Code, BookOpen, Calculator, Atom, MapPin } from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, scale: 0.8, y: 50, rotateX: -15 },
  show: { opacity: 1, scale: 1, y: 0, rotateX: 0, transition: { type: "spring", bounce: 0.5, duration: 1 } }
};

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pt-16 relative perspective-[1200px]">
      
      {/* 3D FLOATING BACKGROUND SUBJECTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
         <FloatingBadge icon={<Code size={30} />} label="Data Structures" top="20%" left="15%" delay={0} color="var(--accent-green)" />
         <FloatingBadge icon={<Calculator size={30} />} label="Calculus II" top="60%" left="10%" delay={1.5} color="var(--accent-purple)" />
         <FloatingBadge icon={<Atom size={30} />} label="Quantum Physics" top="30%" left="75%" delay={3} color="var(--accent-pink)" />
         <FloatingBadge icon={<BookOpen size={30} />} label="Literature" top="70%" left="70%" delay={4.5} color="var(--accent-blue)" />
      </div>

      {/* HERO SECTION */}
      <section className="relative text-center flex flex-col items-center max-w-5xl mx-auto z-10 w-full pt-10 perspective-[1000px]">
        <motion.div
           initial="hidden" animate="show"
           variants={{
             hidden: { opacity: 0, rotateY: 15, z: -300 },
             show: { opacity: 1, rotateY: 0, z: 0, transition: { staggerChildren: 0.2, duration: 1.2, ease: "easeOut" } }
           }}
           className="flex flex-col items-center gap-8 w-full preserve-3d"
        >
          {/* Badge */}
          <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[color:var(--accent-purple)]/30 bg-[color:var(--accent-purple)]/5 backdrop-blur-xl shadow-[0_4px_30px_rgba(212,191,255,0.2)] font-semibold text-sm text-[color:var(--accent-purple)] hover:scale-105 hover:translate-z-10 transition-transform cursor-pointer">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--accent-green)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[color:var(--accent-green)]"></span>
            </span>
            <span>StudySync Location Matcher Just Dropped!</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={FADE_UP} 
            className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--text-main)] via-[#EFEFEF] to-[color:var(--text-muted)] leading-[1] drop-shadow-2xl"
          >
            Match IRL. <br />
            Crush <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--accent-blue)] via-[color:var(--accent-purple)] to-[color:var(--accent-pink)] text-glow inline-block hover:scale-[1.05] hover:-translate-y-2 hover:rotate-3 transition-transform duration-300">Exams.</span>
          </motion.h1>

          <motion.p variants={FADE_UP} className="text-xl md:text-2xl text-[color:var(--text-muted)] max-w-3xl leading-relaxed font-medium mt-2 mix-blend-plus-lighter">
            The platform that uses physical Location proximity and AI to find you the absolute perfect study partner on campus.
          </motion.p>

          <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center gap-6 mt-8 w-full justify-center">
             <Link to="/signup" className="group relative w-full sm:w-auto overflow-hidden rounded-full p-[2px] transform transition-transform hover:scale-105 hover:rotate-[-1deg] shadow-[0_0_40px_rgba(212,191,255,0.3)]">
                <span className="absolute inset-0 bg-gradient-to-r from-[color:var(--accent-blue)] via-[color:var(--accent-purple)] to-[color:var(--accent-pink)] rounded-full animate-spin-slow" />
                <div className="relative bg-[color:var(--bg-primary)] px-10 py-5 rounded-full flex items-center justify-center gap-3 group-hover:bg-transparent text-[color:var(--text-main)] group-hover:text-[#050508] font-bold text-lg transition-colors">
                  Find Local Partners <MapPin size={22} className="group-hover:-translate-y-1 transition-transform" />
                </div>
             </Link>
             
             <Link to="/about" className="flex items-center justify-center gap-3 px-10 py-[22px] rounded-full glass-button text-[color:var(--text-main)] font-bold text-lg hover:bg-[color:var(--glass-bg)] hover:scale-105 transition-all shadow-xl w-full sm:w-auto group">
               <div className="w-8 h-8 rounded-full bg-[color:var(--text-main)] text-[#050508] flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Play size={16} weight="fill" className="ml-0.5" />
               </div>
               How matchmaking works
             </Link>
          </motion.div>

        </motion.div>
      </section>

      {/* FEATURE CARDS - EXTREME 3D GLASS GRIDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full z-10 perspective-[1000px] pb-20">
        
        <FeatureCard 
          icon={<MapPin className="text-[color:var(--accent-pink)]" size={36}/>}
          title="IRL Location Radar"
          desc="Our main feature. Radar pings matching students currently inside your campus library or dorm area for immediate physical study sessions."
          glowColor="rgba(255,77,133,0.15)"
          borderColor="border-[color:var(--accent-pink)]/40"
          delay={0.1}
        />
        <FeatureCard 
          icon={<Users className="text-[color:var(--accent-purple)]" size={36}/>}
          title="AI Neural Match"
          desc="Find partners with similar goals and complementary skillsets automatically using neural ML based on your course syllabus."
          glowColor="rgba(149,84,255,0.15)"
          borderColor="border-[color:var(--accent-purple)]/40"
          delay={0.3}
        />
        <FeatureCard 
          icon={<Zap className="text-[color:var(--accent-green)]" size={36}/>}
          title="Focus Tracking"
          desc="Active webcam engagement tracking guarantees both partners stay off their phones and study until the timer ends."
          glowColor="rgba(0,179,65,0.15)"
          borderColor="border-[color:var(--accent-green)]/40"
          delay={0.5}
        />

      </section>

    </div>
  );
}

function FloatingBadge({ icon, label, top, left, delay, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, z: -1000, scale: 0 }}
      animate={{ 
         opacity: [0, 0.8, 0.8, 0],
         z: [-500, 200, 300, 500],
         y: [0, -50, -100, -150],
         x: [0, 20, -20, 0],
         scale: [0.5, 1, 1.2, 1.5],
         rotateX: [0, 20, -20, 0],
         rotateY: [0, 30, -30, 0]
      }}
      transition={{ 
         duration: 8, 
         repeat: Infinity, 
         delay: delay,
         ease: "easeInOut"
      }}
      className="absolute flex flex-col items-center gap-2 drop-shadow-2xl"
      style={{ top, left }}
    >
      <div className="p-4 rounded-3xl glass-panel border border-white/20 shadow-2xl" style={{ borderBottomColor: color, boxShadow: `0 20px 40px -10px ${color}`}}>
        <div style={{ color }}>{icon}</div>
      </div>
      <span className="text-xs font-bold font-mono tracking-wider glass-panel px-3 py-1 rounded-full uppercase" style={{ color }}>{label}</span>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc, glowColor, borderColor, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, rotateX: 45, rotateY: 15, z: -200 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, z: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -20, z: 50, rotateX: 10, rotateY: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 80, damping: 15, delay }}
      style={{ boxShadow: `0 30px 60px -15px ${glowColor}` }}
      className={`relative p-10 rounded-[2.5rem] glass-panel border ${borderColor} flex flex-col gap-6 overflow-hidden group cursor-pointer preserve-3d`}
    >
      {/* 3D Inner Parallax Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-transparent via-[color:var(--text-main)] to-transparent opacity-0 group-hover:opacity-[0.05] transition-opacity rotate-45 scale-[2.5] mix-blend-overlay" 
      />
      
      <motion.div 
        className={`p-5 rounded-3xl w-fit shadow-2xl glass-button border-[color:var(--glass-border)] relative z-10 transition-transform duration-700`}
        whileHover={{ z: 20, rotateZ: 15, scale: 1.1 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-3xl font-black text-[color:var(--text-main)] tracking-widest uppercase mt-4 relative z-10 drop-shadow-lg transform-style-3d translate-z-10">{title}</h3>
      <p className="text-[color:var(--text-muted)] font-medium leading-relaxed mt-auto relative z-10 text-lg">
        {desc}
      </p>
    </motion.div>
  );
}
