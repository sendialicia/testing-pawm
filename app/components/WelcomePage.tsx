"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import NavbarWithLogout from "./NavbarWithLogout";
import Footer from './Footer';

interface WelcomePageProps {
  user: {
    id: number;
    email: string;
    role: string;
  };
  onLogout: () => void;
}

export default function WelcomePage({ user, onLogout }: WelcomePageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Extract name from email (before @)
  const userName = user.email.split('@')[0];
  const userRole = user.role;
  const [activeSection, setActiveSection] = useState('home');
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const lecturersRef = useRef<HTMLDivElement>(null);
  const assistantsRef = useRef<HTMLDivElement>(null);
  const contactUsRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-[#FAF6EF] flex flex-col text-[#1a1a1a] relative">
      {/* NAVBAR WITH LOGOUT */}
      <NavbarWithLogout onLogout={onLogout} userName={userName} />
      {/* ====== HERO SECTION ====== */}
      <section className="relative h-screen w-full">
        <Image
          src="/LandingPic.png"
          alt="Biomedical Lab"
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Welcome Message with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Hi, {userName}! [{userRole}]
            </h2>
            
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="text-5xl lg:text-5xl font-extrabold text-white max-w-2xl leading-tight"
          >
            Connecting technology to human health.
          </motion.h1>
        </div>
      </section>

     {/* ====== MAIN CONTENT + SIDEBAR WRAPPER ====== */}
      <section
        className="
          relative md:-mt-90 z-30   /* desktop: naik nimpah gambar, mobile: normal */
          flex flex-col md:flex-row 
          w-full max-w-8xl mx-auto 
        "
      >
        {/* ====== SIDEBAR ====== */}
        <motion.aside
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="
            bg-[#FAF6EF]
            px-30 py-12
            w-full md:w-1/4
            h-fit
            
          "
        >
          <div className="flex justify-between items-center md:block">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl md:text-2xl font-extrabold text-[#E64A19] mb-0 md:mb-4"
            >
              Menu
            </motion.h2>

            {/* Tombol More di mobile */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden flex items-center gap-1 font-bold text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              More <ChevronDown size={18} />
            </motion.button>
          </div>

          {/* Menu Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex flex-col gap-8 font-semibold text-gray-700 text-left mt-6`}
          >
            {["About us", "Research", "Activities", "Lecturers", "Assistants", "Contacts"].map((item, index) => (
              <motion.a
                key={item}
                onClick={() => {
                  if (item === "About us") {
                    aboutUsRef.current?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection('about');
                  } else if (item == "Research") {
                    researchRef.current?.scrollIntoView({ behavior: 'smooth'});
                    setActiveSection('about');
                  } else if (item == "Activities") {
                    activitiesRef.current?.scrollIntoView({ behavior: 'smooth'});
                    setActiveSection('activities');
                  } else if (item == "Lecturers") {
                    lecturersRef.current?.scrollIntoView({ behavior: 'smooth'});
                    setActiveSection('lecturers');
                  } else if (item == "Assistants") {
                    assistantsRef.current?.scrollIntoView({ behavior: 'smooth'});
                    setActiveSection('assistants');
                  } else if (item == "Contacts") {
                    contactUsRef.current?.scrollIntoView({ behavior: 'smooth'});
                    setActiveSection('contacts');
                  }
                }}
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + (index * 0.1) }}
                whileHover={{ scale: 1.05, x: 5 }}
                className="hover:text-[#E64A19] transition-colors duration-200"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </motion.aside>

        {/* User Info Card */}
        <motion.main 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className=" flex-1 relative  mt-10 md:mt-30  bg-[#FAF6EF]"
        >

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#E64A19] m-4" 
        >
          <p className="text-sm text-gray-600 mb-1">Currently logged in as:</p>
          <p className="text-lg font-semibold text-[#E64A19]">{user.email}</p>
        </motion.div>
        
        {/* ====== MAIN CONTENT ====== */}
          <div className="    w-full md:full mx-auto flex flex-col gap-5">
            <div className=" flex flex-col md:flex-row items-center gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="md:w-1/2 text-center md:text-left"
              >

                <motion.h3 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="text-2xl md:text-3xl font-bold text-[#E64A19] mb-6"
                >
                  Welcome to Laboratorium Biomedika
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-gray-700 text-base md:text-lg"
                >
                  Laboratorium Teknik Biomedika (Lab EB) adalah fasilitas inti di bawah Sekolah Teknik Elektro dan Informatika (STEI) Institut Teknologi Bandung (ITB) yang berperan penting dalam mendukung kegiatan akademik dan penelitian di Jurusan Teknik Biomedis.
                </motion.p>
              </motion.div>

              <motion.div>
                <Image
                  src="/Labdas1.jpg"
                  alt="Laboratorium Biomedika"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-md object-cover w-full"
                />
              </motion.div>
              </div>


            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="md:w-1/2 flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >

                {/* === ABOUT US === */}
                <motion.div
                  ref={aboutUsRef}
                  initial={{ opacity: 0, x: 40, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt- px-6 -ml-15 mr-5"
                >
                
                  <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                    className="text-2xl md:text-3xl font-bold text-[#E64A19] mb-6"
                  >
                  About Us
                  </motion.h3>

                <motion.p 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-gray-700 text-base md:text-lg mb-4"
                >
                  Laboratorium Teknik Biomedis memiliki tujuan utama untuk memfasilitasi mahasiswa Teknik Biomedis dalam melakukan pembelajaran, penelitian, dan pengembangan alat-alat Teknik Biomedis tercanggih untuk mengedepankan kemajuan teknologi dalam dunia kesehatan
                </motion.p>
                </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{opacity: 0, x:-20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="md:w-1/2"
              >
                  <Image
                    src="/Labdas3.jpg"
                    alt="Laboratorium Biomedika"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover "
                  />
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <motion.div
                initial={{opacity: 0, x:-20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="md:w-1/2"
              >
                  <Image
                    src="/Labdas2.jpg"
                    alt="Laboratorium Biomedika"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover "
                  />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="md:w-1/2 flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >

                {/* === Research === */}
                <motion.div
                  ref={researchRef}
                  initial={{ opacity: 0, x: 40, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt- px-6 -ml-15 mr-5"
                >
                
                  <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                    className="text-2xl md:text-3xl font-bold text-[#E64A19] mb-6"
                  >
                  Research
                  </motion.h3>

                <motion.p 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-gray-700 text-base md:text-lg mb-4"
                >
                  Laboratorium Teknik Biomedis memiliki tujuan utama untuk memfasilitasi mahasiswa Teknik Biomedis dalam melakukan pembelajaran, penelitian, dan pengembangan alat-alat Teknik Biomedis tercanggih untuk mengedepankan kemajuan teknologi dalam dunia kesehatan
                </motion.p>
                </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="md:w-1/2 flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >

                {/* === Activities === */}
                <motion.div
                  ref={activitiesRef}
                  initial={{ opacity: 0, x: 40, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt- px-6 -ml-15 mr-5"
                >
                
                  <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                    className="text-2xl md:text-3xl font-bold text-[#E64A19] mb-6"
                  >
                  Activities
                  </motion.h3>

                <motion.p 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-gray-700 text-base md:text-lg mb-4"
                >
                 Menjadi tempat mahasiswa menggabungkan ilmu teknik dan medis untuk menciptakan inovasi di bidang kesehatan. Di sini, dilakukan riset dan pengembangan alat medis seperti sensor biometrik, perangkat rehabilitasi, hingga sistem monitoring pasien berbasis teknologi digital. Melalui kolaborasi lintas disiplin, lab ini mendorong lahirnya solusi kreatif yang dapat meningkatkan kualitas layanan kesehatan di Indonesia dan dunia.
                </motion.p>
                </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{opacity: 0, x:-20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="md:w-1/2"
              >
                  <Image
                    src="/labdas4.jpeg"
                    alt="Laboratorium Biomedika"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover "
                  />
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <motion.div
                initial={{opacity: 0, x:-20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="w-full" >
              
                  <motion.h3 
                  ref = {lecturersRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                    className="text-2xl md:text-3xl font-bold text-[#E64A19] mb-6"
                  >
                  Lecturers
                  </motion.h3>

              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <motion.div
                initial={{opacity: 0, x:-20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="w-full" >

                </motion.div>
              <motion.div
                initial={{opacity:0, x:-20}}
                animate={{opacity:1, x:0}}
                transition={{duration: 0.8, delay:0.2}}
                className="md:w-full"
                >
                  <Image
                    src="/people1.jpeg"
                    alt="people1"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover "
                  />
                  <p className="text-gray-700">
                      Donny Doner
                  </p>
              </motion.div>

              <motion.div
                initial={{opacity:0, x:-20}}
                animate={{opacity:1, x:0}}
                transition={{duration: 0.8, delay:0.2}}
                className="md:w-full"
                >
                  <Image
                    src="/people2.jpeg"
                    alt="people2"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover "
                  />

                  <p className="text-gray-700"> Minnie Bruce</p>
              </motion.div>

              <motion.div
                initial={{opacity:0, x:-20}}
                animate={{opacity:1, x:0}}
                transition={{duration: 0.8, delay:0.2}}
                className="md:w-full"
                >
                  <Image
                    src="/people3.jpeg"
                    alt="people3"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover "
                  />

                  <p className="text-gray-700"> Grace Spencer</p>
              </motion.div>

              <motion.div
                initial={{opacity:0, x:-20}}
                animate={{opacity:1, x:0}}
                transition={{duration: 0.8, delay:0.2}}
                className="md:w-full"
                >
                  <Image
                    src="/people4.jpeg"
                    alt="people4"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover "
                  />

                  <p className="text-gray-700"> Bruno Eliott</p>
              </motion.div>

              <motion.div
                initial={{opacity:0, x:-20}}
                animate={{opacity:1, x:0}}
                transition={{duration: 0.8, delay:0.2}}
                className="md:w-full"
                >
                  <Image
                    src="/people5.jpeg"
                    alt="people5"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover "
                  />

                  <p className="text-gray-700"> Kenneth Simon</p>
              </motion.div>

            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <motion.div
                initial={{opacity: 0, x:-20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="w-full" >
              
                  <motion.h3 
                  ref = {assistantsRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                    className="text-2xl md:text-3xl font-bold text-[#E64A19] mb-6"
                  >
                  Assistants
                  </motion.h3>

                  <p className="text-gray-700"> Coming soon! </p>

              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <motion.div
                initial={{opacity: 0, x:-20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="w-full" >
              
                  <motion.h3 
                  ref = {contactUsRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                    className="text-2xl md:text-3xl font-bold text-[#E64A19] mb-6"
                  >
                  Contacts
                  </motion.h3>
                  
                  <p className="text-gray-700"> lab.eb@itb.ac.id </p>

              </motion.div>
            </div>
          </div>
        </motion.main>
      </section>
      <Footer/>
    </main>
  );
}
