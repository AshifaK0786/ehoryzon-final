import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";

const scheduleData = [
  { name: "Pitch for Tomorrow - Open Innovations", date: "February 26", venue: "Kongu Engineering College" },
  { name: "Pitch for Tomorrow - Mobility & Industry 4.0", date: "February 20", venue: "Kongu Engineering College" },
  { name: "Pitch for Tomorrow - Deeptech", date: "February 21", venue: "Kongu Engineering College" },
  { name: "Pitch for Tomorrow - Clean & Green Tech", date: "February 24", venue: "Kongu Engineering College" },
  { name: "Pitch for Tomorrow - Agritech & Healthcare", date: "February 25", venue: "Kongu Engineering College" },
  { name: "Mech Arena", date: "February 19", venue: "Kongu Engineering College" },
  { name: "Webify", date: "February 19", venue: "Kongu Engineering College" },
  { name: "Electrical Odyssey", date: "February 20", venue: "Kongu Engineering College" },
  { name: "Game-a-thon", date: "February 20", venue: "Kongu Engineering College" },
  { name: "Master Chef Mania", date: "February 21", venue: "Kongu Engineering College" },
  { name: "Buildscape", date: "February 21", venue: "Kongu Engineering College" },
  { name: "Stocks and Shares", date: "February 24", venue: "Kongu Engineering College" },
  { name: "B-Plan", date: "February 24", venue: "Kongu Engineering College" },
  { name: "DETx Forum", date: "February 23,24", venue: "Kongu Engineering College" },
  { name: "IPL Auction", date: "February 25", venue: "Kongu Engineering College" },
  { name: "Product-Market Fit", date: "February 23", venue: "Kongu Engineering College" },
  { name: "Business Market Fit", date: "February 23", venue: "Kongu Engineering College" },
  { name: "Rising Capital & Finance", date: "February 23", venue: "Kongu Engineering College" },
  { name: "IPR & IP Management", date: "February 23", venue: "Kongu Engineering College" },
  { name: "Startup Legal & Ethical", date: "February 23", venue: "Kongu Engineering College" },
  { name: "திரை-Trivia (Short Film)", date: "February 19-26", venue: "Kongu Engineering College" },
];

const detailedSchedule = [
  { sno: 1, date: "19.02.2026", session: "Inaugural", guest: "", topic: "", timing: "9:00 AM", highlight: true },
  { sno: 2, date: "20.02.2026", session: "Key note Address", guest: "Mr. Karthik Eswaramoorthi\nFounder & CEO, Kanavu Startup Village", topic: "AI Driven Strategies for Empowering rural communities", timing: "09:00 AM" },
  { sno: 3, date: "21.02.2026", session: "Key note Address", guest: "Mr. G. Senthil Kumar\nFounder and CEO, MADIEE Games, Chennai", topic: "From Play to Production: Reinventing Toy Manufacturing for the Future", timing: "09:00 AM" },
  { sno: 4, date: "21.02.2026", session: "Key note Address", guest: "Mr. C. P. Saravanakumar\nCo-Founder, LogBase Technologies", topic: "Rising Capital & Fund Management", timing: "11:00 AM" },
  { sno: 5, date: "23.02.2026", session: "Key note Address", guest: "Mr. Jayakumar and Ms. Yamuna Jayakumar\nCo-Founders, Squadl Technologies", topic: "FinTech 4.0: Startups, AI, and the Future of Digital Money", timing: "09:00 AM" },
  { sno: 6, date: "23.02.2026", session: "Key note Address", guest: "AUTOMIOS", topic: "Healing with Intelligence: AI-Driven Automation for the Future of Healthcare", timing: "11:00 AM", highlight: true },
  { sno: 7, date: "24.02.2026", session: "Key note Address", guest: "Mr. Muthu Vangaliappan\nCo-Founder & CEO, Goat Robotics", topic: "Robotics 4.0 - From Lab projects to Market products", timing: "09:00 AM" },
  { sno: 8, date: "25.02.2026", session: "Key note Address", guest: "Ms. Desika Prabhahar\nSustainability Consultant & Founder, DPurpose Foundation", topic: "Waste-to-Purpose: Empowering Youth for a Sustainable Bharat", timing: "09:00 AM" },
  { sno: 9, date: "25.02.2026", session: "Key note Address", guest: "Ms. B. Veena\nPracticing Company Secretary, Veena & Co, Coimbatore", topic: "Startup Legal and Ethical steps", timing: "02:00 PM" },
  { sno: 10, date: "26.02.2026", session: "Key note Address", guest: "Mr. G. Arun\nProject Manager, TNRISE (Women Startup Council)", topic: "Igniting Innovation: TNRISE and the Future of Tech-Driven Entrepreneurship", timing: "09:00 AM" },
  { sno: 11, date: "26.02.2026", session: "Key note Address", guest: "Dr. A Balaji Ganesh\nRegistered Patent Agent | Scientist @ AMTZ | Director, IP Ever | CEO, Emsensing Technologies | StartupTN Mentor", topic: "Your Idea Is Your Currency: IP Strategy for Startups & Innovators", timing: "11:00 AM" },
  { sno: 12, date: "26.02.2026", session: "Valedictory", guest: "Thiru. Devarajan Chinnusamy\nChairman & Managing Director, URC group of companies", topic: "Passion Propels Possibilities: Preparing Youth for a Tech-Driven Future", timing: "03:00 PM" },
];

export default function Schedule() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"events" | "detailed">("events");

  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition mb-8 group"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to E-Horyzon
        </button>

        <h1 className="text-4xl md:text-6xl font-black mb-4">
          Event <span className="text-yellow-400">Schedule</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-8">
          Mark your calendars for the most awaited innovation festival. Find all event timings and venues below.
        </p>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              activeTab === "events"
                ? "bg-yellow-400 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Events Schedule
          </button>
          <button
            onClick={() => setActiveTab("detailed")}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              activeTab === "detailed"
                ? "bg-yellow-400 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Detailed Schedule
          </button>
        </div>

        {/* Events Schedule Table */}
        {activeTab === "events" && (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 text-yellow-400 font-bold uppercase tracking-wider">Event Name</th>
                  <th className="p-6 text-yellow-400 font-bold uppercase tracking-wider">Date & Day</th>
                  <th className="p-6 text-yellow-400 font-bold uppercase tracking-wider">Venue</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((event, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-semibold">{event.name}</td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2">
                          <Calendar size={14} className="text-yellow-400" />
                          {event.date}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <MapPin size={14} className="text-yellow-400" />
                        {event.venue}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Detailed Schedule Table */}
        {activeTab === "detailed" && (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 text-yellow-400 font-bold uppercase tracking-wider" style={{ width: "60px" }}>S. No.</th>
                  <th className="p-4 text-yellow-400 font-bold uppercase tracking-wider" style={{ width: "120px" }}>Date</th>
                  <th className="p-4 text-yellow-400 font-bold uppercase tracking-wider" style={{ width: "140px" }}>Session</th>
                  <th className="p-4 text-yellow-400 font-bold uppercase tracking-wider">Guest Details</th>
                  <th className="p-4 text-yellow-400 font-bold uppercase tracking-wider">Topics</th>
                  <th className="p-4 text-yellow-400 font-bold uppercase tracking-wider" style={{ width: "100px" }}>Timing</th>
                </tr>
              </thead>
              <tbody>
                {detailedSchedule.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                      idx % 2 === 0 ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <td className="p-4">{item.sno}</td>
                    <td className="p-4">{item.date}</td>
                    <td className="p-4">{item.session}</td>
                    <td
                      className={`p-4 whitespace-pre-line ${
                        item.highlight ? "bg-yellow-400/20 text-yellow-300 font-semibold" : ""
                      }`}
                    >
                      {item.guest}
                    </td>
                    <td className="p-4">{item.topic}</td>
                    <td className="p-4">{item.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}