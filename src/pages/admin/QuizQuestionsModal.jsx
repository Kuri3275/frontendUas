import { useEffect, useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, Save, HelpCircle, CheckCircle2, AlertCircle, Loader2, ListOrdered, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import autoAnimate from "@formkit/auto-animate";
import quizQuestionService from "../../api/admin/quizQuestion.service";

export default function QuizQuestionsModal({ quiz, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "a"
  });

  const listRef = useRef(null);
  useEffect(() => { if (listRef.current) autoAnimate(listRef.current); }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await quizQuestionService.getQuizQuestions(quiz.id);
      const data = res.data.data?.data || res.data.data || res.data || [];
      setQuestions(data);
    } catch {
      toast.error("Gagal sinkronisasi soal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuestions(); }, [quiz.id]);

  const submitForm = async () => {
    if (!form.question_text || !form.option_a || !form.option_b) {
      return toast.error("Pertanyaan & minimal 2 opsi awal wajib diisi!");
    }
    setLoading(true);
    try {
      if (editingId) {
        await quizQuestionService.updateQuizQuestion(editingId, form);
        toast.success("Soal diperbarui");
      } else {
        await quizQuestionService.createQuizQuestion(quiz.id, form);
        toast.success("Soal ditambahkan");
      }
      resetForm();
      fetchQuestions();
    } catch {
      toast.error("Gagal menyimpan soal");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: "a" });
    setEditingId(null);
    setShowForm(false);
  };

  const editQuestion = (q) => {
    setForm({
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c ?? "",
      option_d: q.option_d ?? "",
      correct_answer: q.correct_answer
    });
    setEditingId(q.id);
    setShowForm(true);
  };

  const deleteQuestion = async (id) => {
    if (!confirm("Hapus soal ini?")) return;
    try {
      await quizQuestionService.deleteQuizQuestion(id);
      toast.success("Soal dihapus");
      fetchQuestions();
    } catch {
      toast.error("Gagal menghapus");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center z-[100] p-0 md:p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-50 w-full max-w-6xl h-full md:h-[90vh] md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border border-white/20"
      >
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="px-8 py-8 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40 border border-indigo-400">
              <GraduationCap size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                Bank Soal <span className="text-indigo-400 font-medium">|</span> <span className="text-indigo-300">{quiz.title}</span>
              </h3>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-[10px] font-black bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30 uppercase tracking-widest">
                  Total: {questions.length} Soal
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="relative z-10 w-12 h-12 bg-white/5 hover:bg-red-500 hover:text-white rounded-2xl transition-all flex items-center justify-center border border-white/10 group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* --- LEFT: LIST VIEW (HIGHER CONTRAST) --- */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-100">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <ListOrdered size={20} className="text-indigo-600" />
                <h4 className="text-slate-800 font-black text-sm uppercase tracking-widest">Urutan Pertanyaan</h4>
              </div>
              {!showForm && (
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/40 flex items-center gap-2 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1"
                >
                  <Plus size={16} strokeWidth={3} /> TAMBAH SOAL BARU
                </button>
              )}
            </div>

            <div ref={listRef} className="space-y-6">
              {questions.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-[2.5rem] border-4 border-dashed border-slate-200">
                  <HelpCircle className="mx-auto text-slate-300 mb-4" size={64} />
                  <p className="text-slate-400 font-bold text-lg">Belum ada soal dibuat untuk kuis ini.</p>
                </div>
              ) : (
                questions.map((q, idx) => (
                  <motion.div 
                    key={q.id}
                    className="group relative bg-white p-6 rounded-[2rem] border-2 border-slate-200 shadow-sm hover:border-indigo-500 transition-all"
                  >
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black text-xl flex items-center justify-center shadow-lg">
                           {idx + 1}
                         </div>
                         <div className="h-full w-1 bg-slate-100 rounded-full" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm
                            ${q.correct_answer === 'a' || q.correct_answer === 'b' || q.correct_answer === 'c' || q.correct_answer === 'd' 
                              ? 'bg-emerald-600 text-white' : 'bg-slate-400 text-white'}`}>
                            KUNCI: {q.correct_answer.toUpperCase()}
                          </span>
                        </div>
                        <h5 className="text-slate-800 font-bold text-lg leading-relaxed mb-4">{q.question_text}</h5>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['a','b','c','d'].map(opt => (
                            <div key={opt} className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-3
                              ${q.correct_answer === opt ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                              <span className={`w-5 h-5 rounded flex items-center justify-center uppercase
                                ${q.correct_answer === opt ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>{opt}</span>
                              {q[`option_${opt}`] || <span className="italic opacity-50">Empty</span>}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => editQuestion(q)} className="w-12 h-12 bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white rounded-2xl transition-all flex items-center justify-center shadow-sm">
                          <Pencil size={20} />
                        </button>
                        <button onClick={() => deleteQuestion(q.id)} className="w-12 h-12 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-all flex items-center justify-center shadow-sm">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* --- RIGHT: HIGH-CONTRAST FORM --- */}
          <AnimatePresence>
            {showForm && (
              <motion.div 
                initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
                className="w-full lg:w-[450px] bg-white border-l-4 border-indigo-100 p-8 overflow-y-auto shadow-[-20px_0_50px_rgba(0,0,0,0.05)] z-20"
              >
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white"><Plus size={18} /></div>
                    <h3 className="font-black text-slate-900 uppercase text-sm tracking-widest">{editingId ? "Edit Mode" : "Tambah Soal"}</h3>
                  </div>
                  <button onClick={resetForm} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400"><X size={20} /></button>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                      <AlertCircle size={14} /> Pertanyaan Utama
                    </label>
                    <textarea 
                      rows={5} value={form.question_text} onChange={(e) => setForm({...form, question_text: e.target.value})}
                      className="w-full p-5 bg-slate-900 text-white rounded-[2rem] border-4 border-slate-800 focus:border-indigo-500 outline-none font-bold text-base transition-all placeholder:text-slate-600"
                      placeholder="Apa yang dimaksud dengan..."
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black text-indigo-900 uppercase tracking-widest">Opsi Jawaban & Kunci</label>
                    {['a', 'b', 'c', 'd'].map((opt) => (
                      <div key={opt} className="group relative">
                        <button
                          onClick={() => setForm({...form, correct_answer: opt})}
                          disabled={opt > 'b' && !form[`option_${opt}`]}
                          className={`absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black uppercase z-10 transition-all border-2
                            ${form.correct_answer === opt ? 'bg-emerald-600 border-white text-white rotate-[15deg] scale-110 shadow-lg' : 'bg-slate-200 border-slate-300 text-slate-500'}`}
                        >
                          {opt}
                        </button>
                        <input 
                          type="text" value={form[`option_${opt}`]} 
                          onChange={(e) => setForm({...form, [`option_${opt}`]: e.target.value})}
                          placeholder={`Isi pilihan ${opt.toUpperCase()}...`}
                          className={`w-full pl-10 pr-5 py-4 bg-slate-50 rounded-2xl border-2 outline-none font-bold text-sm transition-all
                            ${form.correct_answer === opt ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 focus:border-indigo-500'}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 flex flex-col gap-3">
                    <button 
                      onClick={submitForm} disabled={loading}
                      className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black text-lg shadow-2xl shadow-indigo-600/40 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 border-b-4 border-indigo-900"
                    >
                      {loading ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />} 
                      SIMPAN PERUBAHAN
                    </button>
                    <button onClick={resetForm} className="w-full py-4 text-slate-400 font-bold hover:text-red-500 transition-all">Batalkan</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}