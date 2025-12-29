import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* KOLOM 1: LOGO & ABOUT */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-6">
            EXCEL<span className="text-indigo-500">LEARN</span>
          </h2>
          <p className="text-sm leading-relaxed mb-6">
            Platform belajar IT terpercaya untuk membantu kamu menguasai teknologi terbaru dan membangun karier impian di industri digital.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-500 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-indigo-500 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-indigo-500 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* KOLOM 2: QUICK LINKS */}
        <div>
          <h4 className="text-white font-bold mb-6">Navigasi</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/Course" className="hover:text-white transition-colors">Courses</Link></li>
            <li><Link to="/Materi" className="hover:text-white transition-colors">Materi</Link></li>
            <li><Link to="/Quiz" className="hover:text-white transition-colors">Quiz</Link></li>
          </ul>
        </div>

        {/* KOLOM 3: BANTUAN */}
        <div>
          <h4 className="text-white font-bold mb-6">Bantuan</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
            <li><Link to="/About" className="hover:text-white transition-colors">Tentang Kami</Link></li>
          </ul>
        </div>

        {/* KOLOM 4: CONTACT */}
        <div>
          <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-indigo-500 shrink-0" />
              <span>Makamhaji, Indonesia</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-indigo-500 shrink-0" />
              <span>halo@excellearn.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-indigo-500 shrink-0" />
              <span>+62 896 4946 4125</span>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT AREA */}
      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Excellearn. All rights reserved.
        </p>
        <p className="text-xs text-slate-500">
          Build with ❤️ for Indonesian Developers
        </p>
      </div>
    </footer>
  );
}