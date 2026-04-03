import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[color:var(--glass-border)] bg-[color:var(--bg-secondary)]/30 backdrop-blur-md mt-auto z-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <Link to="/" className="flex items-center gap-2 grayscale brightness-200">
          <BookOpen size={20} className="text-[color:var(--text-muted)]" />
          <span className="text-xl font-black tracking-tight text-[color:var(--text-muted)]">
            StudySync
          </span>
        </Link>
        
        <ul className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[color:var(--text-muted)]">
          <li><Link to="/" className="hover:text-[color:var(--text-main)] transition-colors">Home</Link></li>
          <li><Link to="/about" className="hover:text-[color:var(--text-main)] transition-colors">About</Link></li>
          <li><Link to="/groups" className="hover:text-[color:var(--text-main)] transition-colors">Groups (CRUD)</Link></li>
          <li><Link to="/dashboard" className="hover:text-[color:var(--text-main)] transition-colors">Dashboard</Link></li>
          <li><Link to="/contact" className="hover:text-[color:var(--text-main)] transition-colors">Contact</Link></li>
        </ul>

        <p className="text-xs font-mono text-[color:var(--text-muted)] text-center">
          &copy; 2026 Web Engineering Assignment 02 - BSCS
        </p>

      </div>
    </footer>
  );
}
