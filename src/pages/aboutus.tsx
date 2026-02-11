import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";
import herologo from "../assets/hero-logo.png";
import iic from "../assets/IIC_Logo_Transparent.png";
import emdc from "../assets/EMDC Transpernt.png";
import kec from "../assets/kec.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import heroVideo from "../assets/hero.mp4";
import parameshwaransir from "../assets/parameshwaransir.jpeg";
import kannansir from "../assets/kannansir.jpeg";
import praveensir from "../assets/praveensir.jpeg";
import erkrishnan from "../assets/erkrishnan.jpeg"

import kalpana from "../assets/kalpanamam.jpeg"

const logos = [kec, herologo, iic, emdc];

const staffData = [
  {
    img: erkrishnan,
    name: "Mr E R K Krishnan",
    role: "Correspondent @KEC",
    desc: "",
  },
  {
    img: parameshwaransir,
    name: "Dr.R .Parameshwaran",
    role: "Principal @KEC",
    desc: "",
  },
  {
    img: kannansir,
    name: "Mr.P.S.Kannan",
    role: "Executive Director @KonguTBI",
    desc: "",
  },
  {
    img: praveensir,
    name: "Dr.Praveen Kumar ",
    role: "President IEF@KEC",
    desc: "",
  },
  {
    img: null,
    name: "To be announced",
    role: "Staff Member",
    desc: "Coming Soon",
  },
  {
    img: kalpana,
    name: "Mrs. R. Kalpana ",
    role: "Coordinator Emdc@KEC",
    desc: "",
  },
  {
    img: null,
    name: "To be announced",
    role: "Staff Member",
    desc: "Coming Soon",
  },
];

// Team Members Data
const teamMembers = [
  {
    id: 1,
    name: "V HarrisjayaKumar",
    designation: "Chairman",
    photo: "/assets/coordinatorspic/harrisjaya kumar.jpeg",
    linkedin: "https://www.linkedin.com/in/harrisjayakumar-v/",
    whatsapp: "https://wa.me/918838416061",
  },
  {
    id: 2,
    name: "G V Dheepiga",
    designation: "Co-Chairman",
    photo: "/assets/coordinatorspic/deepiga.jpeg",
    linkedin: " https://www.linkedin.com/in/dheepiga-gv-992b4b379/",
    whatsapp: "https://wa.me/9095060234",
  },
  
  {
    id: 3,
    name: "S Praneshbalaji",
    designation: "Student Convener",
    photo: "/assets/coordinatorspic/pranesh.jpeg",
    linkedin: " https://www.linkedin.com/in/praneshbalaji30/",
    whatsapp: "https://wa.me/919566822541",
  },
  {
    id: 4,
    name: "G HariHaran",
    designation: "Student Co-Convener",
    photo: "/assets/coordinatorspic/HariHaran.jpeg",
    linkedin: "https://www.linkedin.com/in/hariharan-ganeshpandian-89296a300/",
    whatsapp: "https://wa.me/916383828539",
  },
  {
    id: 5,
    name: "M K Sai Sanjay",
    designation: "Startups Activity Coordinator",
    photo: "/assets/coordinatorspic/SaiSanjay.jpeg",
    linkedin: "- https://www.linkedin.com/in/sai-sanjay-8a8044280/",
    whatsapp: "https://wa.me/919080938997",
  },
  {
    id: 10,
    name: "S Pragatheeswari",
    designation: "Student Co-Convener",
    photo: "/assets/coordinatorspic/pragatheeshwari.jpeg", 
    linkedin: "https://www.linkedin.com/in/pragatheeswari-selvaraj-62527a320/",
    whatsapp: "https://wa.me/9163740 43056",

  },
  {
    id: 6,
    name: "S Kanika",
    designation: "Treasurer",
    photo: "/assets/coordinatorspic/kanika.jpeg",
    linkedin: " https://www.linkedin.com/in/kanika-sakthivel/",
    whatsapp: "https://wa.me/916374424880",
  },
  {
    id: 7,
    name: "K Ashifa ",
    designation: "Media Team Head",
    photo: "/assets/coordinatorspic/Ashifa.jpeg",
    linkedin: "https://www.linkedin.com/in/ashifa-k786/",
    whatsapp: "https://wa.me/919344939976",
  },
  {
    id: 8,
    name: "P Santhosh",
    designation: "Treasurer",
    photo: "/assets/coordinatorspic/santhosh.jpeg",
    linkedin: " https://www.linkedin.com/in/santhosh-p-30a78933b/",
    whatsapp: "https://wa.me/919566971605",
  },
  {
    id: 9,
    name: "M Abdul Sahith",
    designation: "Technical Team Head",
    photo: "/assets/coordinatorspic/abdul.jpeg",
    linkedin: " https://www.linkedin.com/in/abdulsahith/",
    whatsapp: "https://wa.me/918056712504",
  },
  
    

  
  
];


// Coordinator carousels removed per request

function LogoMarquee() {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute top-0 left-0 right-0 z-20 py-2 md:py-4 border-b border-white/5"
    >
      <div className="relative">
        <div className="flex gap-8 md:gap-20 lg:gap-60 items-center justify-center px-3 md:px-6">
          <button
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
          className="mb-6 inline-flex items-center gap-3 text-white/90 hover:text-yellow-400 transition-colors"
        >
          <span className="p-2 rounded-full bg-black/20">
            <ArrowLeft size={18} />
          </span>
          <span className="text-lg font-semibold">Back</span>
        </button>
          {logos.map((src, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center justify-center"
            >
              <img src={src} alt={`logo-${i}`} className="h-6 md:h-10 lg:h-12 w-auto opacity-95 object-contain" onError={(e)=> (e.currentTarget.style.display='none')} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function VideoSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="relative min-h-screen flex items-center justify-center pt-24"
    >
      <LogoMarquee />
      <div className="absolute inset-0">
        <video src={heroVideo} autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 px-4 md:px-6 py-8 md:py-16 max-w-7xl mx-auto">
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-12 text-white transition-colors cursor-pointer hover:text-yellow-400"
        >
          Our Ecosystem
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          {/* IEF@KEC */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white transition-colors cursor-pointer hover:text-yellow-400">About IEF@KEC</h3>
            <p className="text-white text-sm md:text-base lg:text-lg mb-3 md:mb-4 transition-colors cursor-pointer hover:text-yellow-400">
              The KEC Innovation and Entrepreneurship Forum (IEF@KEC) is the unified innovation and entrepreneurship ecosystem of Kongu Engineering College. It brings together institutional and national initiatives to nurture creativity, innovation, and startup culture among students and faculty.
            </p>
            <p className="text-white text-lg transition-colors cursor-pointer hover:text-yellow-400">
              IEF@KEC integrates KISP, EMDC, IIC@KEC, MoE Innovation Ambassadors, SIH & YUKTI, KEC Spark Fund, and the Technology Business Incubator (TBI@KEC) to support innovators from idea generation to startup commercialization.
            </p>
          </motion.div>

          {/* EMDC */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white transition-colors cursor-pointer hover:text-yellow-400">Entrepreneurship and Management Development Centre (EMDC)</h3>
            <p className="text-white text-sm md:text-base lg:text-lg transition-colors cursor-pointer hover:text-yellow-400">
              Established in 1993 with Central Government support, EMDC promotes entrepreneurship as a viable career option. It creates awareness, provides pre-incubation support, and helps students and innovators transform ideas into campus startups and new ventures.
            </p>
          </motion.div>

          {/* IIC@KEC */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white transition-colors cursor-pointer hover:text-yellow-400">Institution's Innovation Council (IIC@KEC)</h3>
            <p className="text-white text-sm md:text-base lg:text-lg transition-colors cursor-pointer hover:text-yellow-400">
              Established in 2018–19 under the guidance of the MoE Innovation Cell, IIC@KEC drives innovation-led activities as per the national calendar. It organizes workshops, hackathons, idea competitions, prototype expos, and industry interactions to strengthen the innovation ecosystem.
            </p>
          </motion.div>

          {/* TBI@KEC */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white transition-colors cursor-pointer hover:text-yellow-400">Technology Business Incubator (TBI@KEC)</h3>
            <p className="text-white text-sm md:text-base lg:text-lg transition-colors cursor-pointer hover:text-yellow-400">
              Established in 2003 with support from Department of Science and Technology, TBI@KEC provides end-to-end support from concept to commercialization. With world-class infrastructure, mentoring, funding assistance, and investor networking, it focuses on nurturing technology-based startups, especially in Electronics and ICT.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function StaffSection() {
  return (
    <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.h3 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-24 md:mb-40 glow-text tracking-tighter"
      >
        Meet Our <span className="text-yellow-300 underline decoration-yellow-500/30 underline-offset-8">Esteemed Dignitaries</span>
      </motion.h3>

      {/* Staff Spotlight Layout */}
      <div className="space-y-40 md:space-y-64">
        {staffData.map((s, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: i % 2 === 1 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={`relative group flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
          >
            {/* Artistic Background Decoration */}
            <div className={`absolute -z-10 top-1/2 ${i % 2 === 1 ? 'right-1/4' : 'left-1/4'} -translate-y-1/2 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
            
            {/* Photo Section with Decorative Frames */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-700 opacity-10 group-hover:opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-bl from-yellow-400 to-amber-600 rounded-3xl -rotate-3 group-hover:-rotate-6 transition-transform duration-700 opacity-10 group-hover:opacity-30" />
              
              <div className="relative w-64 h-80 md:w-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-gray-900">
                {s.img ? (
                  <img 
                    src={s.img} 
                    alt={s.name} 
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex flex-col items-center justify-center text-yellow-300/30">
                    <svg className="w-20 h-20 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">Coming Soon</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                
                {/* Floating label on photo */}
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mb-4" />
                   <div className="text-yellow-400 font-bold text-center tracking-[0.2em] text-xs uppercase">E-Horyzon 2K26</div>
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <div className={`flex-1 text-center ${i % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`inline-block px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-[0.3em] mb-8`}
              >
                Distinguished Leadership
              </motion.div>
              
              <h4 className="text-4xl md:text-7xl font-black text-white mb-6 group-hover:text-yellow-300 transition-colors duration-700 leading-tight">
                {s.name}
              </h4>
              
              <div className={`text-xl md:text-3xl text-yellow-100/60 font-medium mb-10 italic flex items-center justify-center ${i % 2 === 1 ? 'md:justify-end' : 'md:justify-start'} gap-4`}>
                <span className="h-px w-12 bg-yellow-400/30 hidden md:block" />
                {s.role}
              </div>
              
              <p className="text-lg md:text-2xl text-neutral-400 leading-relaxed max-w-2xl group-hover:text-neutral-200 transition-colors duration-700">
                {s.desc || "Leading with vision and excellence, fostering a culture of innovation and entrepreneurship at Kongu Engineering College."}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function OtherStaffSection() {
  return (
    <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Other Staff - 2 Column Grid */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
      >
        {teamMembers.map((s, i) => (
          <motion.div 
            key={i} 
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.9 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { duration: 0.8, ease: "easeOut" } 
              }
            }}
            whileHover={{ y: -15, transition: { duration: 0.4 } }}
            className="group relative"
          >
            <div className="flex flex-col items-center p-10 md:p-14 rounded-[2rem] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md transition-all duration-700 hover:bg-white/10 hover:border-yellow-300/40 hover:shadow-yellow-300/20 h-full text-center">
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl mb-10 transform transition-all duration-1000 group-hover:scale-110 border-4 border-white/5 group-hover:border-yellow-300/30">
                {s.photo ? (
                  <img src={s.photo} alt={s.name} className="w-full h-full object-cover transform transition-transform duration-1000" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex flex-col items-center justify-center text-yellow-300/30">
                    <svg className="w-20 h-20 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">Coming Soon</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-yellow-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <motion.h4 
                whileHover={{ scale: 1.05, color: "#fde047" }}
                className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 transition-colors whitespace-nowrap overflow-hidden text-ellipsis w-full"
              >
                {s.name}
              </motion.h4>
              <div className="text-yellow-100/70 font-bold mb-6 text-sm md:text-lg uppercase tracking-[0.2em]">{s.designation}</div>
              <p className="text-neutral-400 text-lg leading-relaxed group-hover:text-neutral-200 transition-colors duration-700">
                {s.designation || "Team Member"}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function TeamMembersCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-advance carousel every 2 seconds (desktop only)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  // Get 5 members to show (2 on left, 1 center zoomed, 2 on right)
  const getVisibleMembers = () => {
    const members = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + teamMembers.length) % teamMembers.length;
      members.push({
        ...teamMembers[index],
        position: i, // -2, -1, 0 (center), 1, 2
      });
    }
    return members;
  };

  const visibleMembers = getVisibleMembers();

  // Member card component
  const MemberCard = ({ member, isCenter = false }: { member: typeof teamMembers[0]; isCenter?: boolean }) => (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Photo Card */}
      <div className="relative mb-2 sm:mb-4 md:mb-6 w-full flex justify-center group">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 2 }}
          className={`rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 shadow-2xl aspect-square flex items-center justify-center transition-all duration-500 hover:shadow-yellow-300/40 ${
          isCenter ? "w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" : "w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48"
        }`}>
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
              <svg
                className="w-8 h-8 sm:w-16 sm:h-16 md:w-24 md:h-24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </motion.div>
      </div>

      {/* Member Details Card */}
      <motion.div
        whileHover={{ y: -5 }}
        className={`bg-white/5 border border-white/10 rounded-xl p-2 sm:p-4 md:p-6 text-center backdrop-blur-sm transition-all w-full max-w-xs ${
          isCenter ? "md:w-72" : "md:w-56"
        }`}
      >
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 md:mb-2 whitespace-nowrap overflow-hidden text-ellipsis">{member.name}</h3>
        <p className="text-xs sm:text-sm md:text-base text-yellow-300 font-semibold mb-2 md:mb-3">{member.designation}</p>

        {/* Social Links */}
        <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-3">
          <motion.a
            whileHover={{ scale: 1.2, rotate: 15 }}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-700 hover:bg-yellow-300 flex items-center justify-center transition-colors flex-shrink-0"
            title="LinkedIn"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white hover:text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z" />
            </svg>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, rotate: -15 }}
            href={member.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-700 hover:bg-yellow-300 flex items-center justify-center transition-colors flex-shrink-0"
            title="WhatsApp"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white hover:text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section
      id="our-team"
      className="py-16 px-6 max-w-7xl mx-auto"
    >
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-12 md:mb-16 glow-text transition-all duration-500 hover:text-yellow-300 cursor-pointer"
      >
        Our Team
      </motion.h2>

      {/* Mobile Grid View */}
      <div className="block md:hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MemberCard member={member} isCenter={false} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Desktop Carousel View */}
      <div className="hidden md:block relative">
        {/* Carousel Container */}
        <div className="flex items-center justify-center gap-4 mb-12 min-h-[500px] overflow-hidden">
          <AnimatePresence mode="popLayout">
            {visibleMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.5, x: member.position > 0 ? 100 : -100 }}
                animate={{ 
                  opacity: member.position === 0 ? 1 : 0.6, 
                  scale: member.position === 0 ? 1.1 : 0.75,
                  x: 0,
                  zIndex: member.position === 0 ? 10 : 0,
                  display: Math.abs(member.position) > 1 ? "none" : "flex"
                }}
                exit={{ opacity: 0, scale: 0.5, x: member.position > 0 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <MemberCard member={member} isCenter={member.position === 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-3 rounded-full bg-yellow-300 text-black hover:bg-yellow-400 transition-colors shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-3 rounded-full bg-yellow-300 text-black hover:bg-yellow-400 transition-colors shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function PosterCarousel({ images = [] }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Filter only videos
  const videos = images.filter(src => src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov'));

  // Intersection Observer to pause video when scrolled out of view
  React.useEffect(() => {
    if (videos.length === 0) return;

    const currentVideoRef = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (currentVideoRef) {
          if (!entry.isIntersecting) {
            currentVideoRef.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, [videos.length]);

  // Pause video when changing index
  React.useEffect(() => {
    if (videos.length === 0) return;

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentIndex, videos.length]);

  if (videos.length === 0) return null;

  const currentVideo = videos[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      {/* Main Video Display */}
      <div className="relative w-full max-w-6xl mx-auto">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full aspect-video rounded-2xl overflow-hidden border border-yellow-600/20 bg-black shadow-lg shadow-yellow-300/20"
        >
          <video
            ref={videoRef}
            src={currentVideo}
            className="w-full h-full object-cover"
            controls
            controlsList="nodownload"
            autoPlay
            muted
          />
        </motion.div>

        {/* Navigation Buttons */}
        {videos.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handlePrevious}
              className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors shadow-lg"
              aria-label="Previous video"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleNext}
              className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors shadow-lg"
              aria-label="Next video"
            >
              <ChevronRight size={24} />
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}

// CoordinatorCarousel removed

export default function AboutUs() {
  // mark todo step progress
  const highlightCarousel = [
    "/src/assets/hl/v2.mp4",
    "/src/assets/hl/v1.mp4",
  ];

  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      <style>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <VideoSection />
      <StaffSection />
      

      {/* Student Coordinators section removed per request */}

      {/* Highlights Carousel */}
      <div className="px-4 md:px-6 py-8 md:py-16 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-4 md:mb-6"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white hover:text-yellow-400 hover:scale-105 transition-all duration-300 cursor-pointer">
            Highlights 
          </h3>
        </motion.div>
        <PosterCarousel images={highlightCarousel} />
      </div>

      <TeamMembersCarousel />

      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-12 text-center text-neutral-400 border-t border-white/5 mt-20"
      >
        <p className="mb-2">&copy; {new Date().getFullYear()} IEF's EHoryzon. All Rights Reserved</p>
        <p className="text-xs text-neutral-600">Innovation & Entrepreneurship Forum @ Kongu Engineering College</p>
      </motion.footer>
    </div>
  );
}