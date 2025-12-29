import React, { useState } from "react";
import { Timer, ChevronRight, CheckCircle2 } from "lucide-react";

export default function QuizPlay() {
  // Contoh data soal (nanti dari backend)
  const questions = [
    {
      id: 1,
      text: "Apa nama class untuk memberikan warna background di Tailwind CSS?",
      options: ["bg-color-red", "background-red", "bg-red-500", "color-red"],
    },
    // ... soal lainnya
  ];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="max-w-3xl mx-auto px-8">
        
        {/* Header Quiz */}
        <div className="flex justify-between items-center mb-10 bg-indigo-900 p-6 rounded-3xl text-white shadow-lg">
          <div>
            <p className="text-indigo-200 text-sm uppercase font-bold tracking-widest">Pertanyaan</p>
            <h2 className="text-xl font-bold">{currentStep + 1} dari {questions.length}</h2>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/20">
            <Timer size={20} />
            <span className="font-mono text-lg font-bold">14:59</span>
          </div>
        </div>

        {/* Soal */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            {questions[currentStep].text}
          </h1>
        </div>

        {/* Opsi Jawaban */}
        <div className="space-y-4 mb-12">
          {questions[currentStep].options.map((option, index) => (
            <button
              key={index}
              className="w-full text-left p-6 rounded-2xl border-2 border-gray-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all flex justify-between items-center group"
            >
              <span className="font-medium text-gray-700 group-hover:text-indigo-700">{option}</span>
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-indigo-600"></div>
            </button>
          ))}
        </div>

        {/* Navigasi */}
        <div className="flex justify-between items-center pb-20">
          <button className="text-gray-400 font-bold hover:text-gray-600">Lewati Dulu</button>
          <button 
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Pertanyaan Berikutnya <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}