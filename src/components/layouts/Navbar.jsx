import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LogIn, Menu, Zap, Sun, Moon, LogOut, BadgeCheck, User } from 'lucide-react';
import { THEMES } from '../../constants/themeConstants';
import { toggleTheme, initializeTheme } from '../../utils/themeUtils';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { currentUser, userProfile, logout } = useAuth();
  const [theme, setTheme] = useState(THEMES.DARK);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setTheme(initializeTheme());
  }, []);

  const handleToggleTheme = () => {
    setTheme(toggleTheme(theme));
  };

  const NavLink = ({ path, label, color }) => (
    <Link to={path} className={`relative px-3 py-2 transition-all font-semibold ${isActive(path) ? color : 'text-[color:var(--text-muted)] hover:text-[color:var(--text-main)]'}`}>
      {label}
      {isActive(path) && (
        <span className={`absolute -bottom-1 left-0 w-full h-[3px] rounded-full shadow-[0_0_15px_currentColor] ${color.split(' ')[0].replace('text-', 'bg-')}`} />
      )}
    </Link>
  );

  return (
    <nav className="fixed top-4 inset-x-4 md:inset-x-8 z-50 glass-panel rounded-full transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group hover:scale-105 transition-transform">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent-purple)] via-[var(--accent-blue)] to-[var(--accent-green)] flex items-center justify-center shadow-[0_0_20px_var(--accent-purple)] transition-all">
            <BookOpen size={20} className="text-[#050508]" weight="fill" />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-main)] to-[var(--accent-purple)]">
              StudySync
            </span>
            {userProfile && userProfile.isVerified && (
              <span className="text-[8px] font-bold text-[color:var(--accent-green)] flex items-center gap-1">
                <BadgeCheck size={10} /> VERIFIED
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink path="/" label="Home" color="text-[color:var(--accent-blue)]" />
          <NavLink path="/about" label="About" color="text-[color:var(--accent-green)]" />
          <NavLink path="/groups" label="Groups" color="text-[color:var(--accent-purple)]" />
          <NavLink path="/matching" label="Matching" color="text-[#a3e6b2]" />
          <NavLink path="/dashboard" label="Dashboard" color="text-[color:var(--accent-pink)]" />
          <NavLink path="/economy" label="Economy" color="text-[color:var(--accent-green)]" />
          <NavLink path="/contact" label="Contact" color="text-[color:var(--text-main)]" />
          <NavLink path="/404-test" label="Not Found" color="text-red-400" />
        </div>

        {/* CTA Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          
          <button onClick={handleToggleTheme} className="p-2 rounded-full border border-[color:var(--glass-border)] hover:bg-[color:var(--glass-bg)] transition-colors text-[color:var(--text-main)] shadow-sm">
            {theme === THEMES.DARK ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {!currentUser ? (
            <>
              <Link to="/auth/login" className="flex items-center gap-2 px-5 py-2 rounded-full border border-[color:var(--glass-border)] hover:bg-[color:var(--glass-bg)] transition-all text-[color:var(--text-main)] font-medium">
                <LogIn size={18} />
                <span>Login</span>
              </Link>

              <Link to="/auth/register" className="group relative inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] text-[#050508] font-bold hover:scale-105 transition-all">
                <Zap size={18} className="text-[#050508] drop-shadow-md group-hover:rotate-12 transition-transform" />
                <span>Join</span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent-pink)] to-[var(--accent-purple)] flex items-center justify-center">
                  <User size={16} className="text-[#050508]" />
                </div>
                <span className="text-xs font-bold text-gray-300 max-w-[80px] truncate">{currentUser.email.split('@')[0]}</span>
              </div>
              <button 
                onClick={() => logout()} 
                className="p-2 rounded-full border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={handleToggleTheme} className="p-2 rounded-full border border-[color:var(--glass-border)] text-[color:var(--text-main)]">
            {theme === THEMES.DARK ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Menu className="text-[color:var(--text-main)] transition-colors bg-[color:var(--glass-bg)] p-2 rounded-full border border-[color:var(--glass-border)] cursor-pointer" size={40} />
        </div>

      </div>
    </nav>
  );
}
