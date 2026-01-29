import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";

const rulesData = [
  "Accommodation will not be provided. Participants must make their own arrangements.",
  "Participants are responsible for bringing everything they need to participate in the event.",
  "All participants must carry a valid college ID / government-issued ID and present it upon request.",
  "Participants must report to the venue at least 30 minutes before the scheduled start time.",
  "Plagiarism, copying code, or use of unauthorized resources will result in immediate disqualification.",
  "Any form of misconduct, misbehavior, or violation of ethical standards will not be tolerated.",
  "Participants must strictly follow the instructions given by coordinators, judges, and volunteers.",
];

export default function Rules() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition mb-8 group"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to E-Horyzon
        </button>

        <h1 className="text-4xl md:text-6xl font-black mb-4">
          Rules & <span className="text-yellow-400">Regulation</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-12">
          Please read and follow these rules to ensure a fair and smooth experience for everyone.
        </p>

        {/* Rules List */}
        <div className="grid gap-4">
          {rulesData.map((rule, idx) => (
            <div 
              key={idx}
              className="group p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-yellow-400/50 transition-all duration-300 flex items-start gap-4"
            >
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                <ShieldCheck size={18} />
              </div>
              <p className="text-lg text-white/90 leading-relaxed">
                {rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
