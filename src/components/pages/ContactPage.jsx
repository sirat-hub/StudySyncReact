import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

const FORMSPREE_URL = "https://formspree.io/f/xjgpebav";

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setErrorMsg('');
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('Please fill in all fields before sending.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMsg(data?.errors?.[0]?.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col gap-16 pt-10 pb-20 max-w-5xl mx-auto">

      {/* HEADER */}
      <motion.section
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#ffb3c6]/20 blur-[100px] rounded-full -z-10" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
          Get in <span className="text-[#ffb3c6]">Touch</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Have a question about StudySync's matchmaking algorithm or want to report an issue? We're here to help.
        </p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="p-6 rounded-3xl bg-[#1C1C22]/80 backdrop-blur-md border border-white/5 flex items-center gap-6">
            <div className="p-4 bg-[#ffb3c6]/10 rounded-2xl text-[#ffb3c6]"><Mail size={24} /></div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Email Us</h3>
              <p className="text-gray-400">support@studysync.edu.pk</p>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-[#1C1C22]/80 backdrop-blur-md border border-white/5 flex items-center gap-6">
            <div className="p-4 bg-[#c4a1ff]/10 rounded-2xl text-[#c4a1ff]"><MessageSquare size={24} /></div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Live Chat</h3>
              <p className="text-gray-400">Available Mon-Fri, 9am - 5pm</p>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-[#1C1C22]/80 backdrop-blur-md border border-white/5 flex items-center gap-6">
            <div className="p-4 bg-[#a3e6b2]/10 rounded-2xl text-[#a3e6b2]"><MapPin size={24} /></div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Office</h3>
              <p className="text-gray-400">Innovation Lab, FYP Department</p>
            </div>
          </div>
        </motion.div>

        {/* CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="p-8 rounded-3xl bg-black/40 border border-white/10 shadow-[0_0_30px_rgba(255,179,198,0.1)]"
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-10">
              <div className="w-16 h-16 rounded-full bg-[#a3e6b2]/10 flex items-center justify-center">
                <Send size={28} className="text-[#a3e6b2]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
              <p className="text-gray-400">Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-2 px-6 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors text-sm"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Error banner */}
              {errorMsg && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Name</label>
                <input
                  type="text" name="name" value={form.name} onChange={handle}
                  placeholder="Your name" disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-xl bg-[#1C1C22] border border-white/5 focus:border-[#ffb3c6] outline-none text-white transition-colors disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={handle}
                  placeholder="Your email address" disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-xl bg-[#1C1C22] border border-white/5 focus:border-[#ffb3c6] outline-none text-white transition-colors disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Message</label>
                <textarea
                  rows={5} name="message" value={form.message} onChange={handle}
                  placeholder="How can we help?" disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-xl bg-[#1C1C22] border border-white/5 focus:border-[#ffb3c6] outline-none text-white transition-colors resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="button" onClick={handleSubmit} disabled={status === 'loading'}
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#ffb3c6] to-[#c4a1ff] text-[#0F0F13] font-bold text-lg hover:shadow-[0_0_20px_rgba(255,179,198,0.4)] transition-shadow flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : (<>Send Message <Send size={20} /></>)}
              </button>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
