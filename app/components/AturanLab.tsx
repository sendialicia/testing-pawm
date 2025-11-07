"use client";

import Image from "next/image";

import { motion } from "framer-motion";




export default function AturanLab () {

    return (
      <div>
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
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="text-5xl lg:text-5xl font-extrabold text-white max-w-2xl leading-tight"
          >
            Aturan Laboratorium
          </motion.h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#FF4E05] mb-6">Aturan Laboratorium Teknik Biomedika</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="border-l-4 border-[#FF4E05] pl-4">
              <h3 className="font-semibold text-xl mb-2">1. Kerapihan dan Kebersihan</h3>
              <p>Jaga kebersihan laboratorium sebelum dan sesudah praktikum</p>
            </div>

            <div className="border-l-4 border-[#FF4E05] pl-4">
              <h3 className="font-semibold text-xl mb-2">2. Penggunaan Alat</h3>
              <p>Gunakan alat sesuai prosedur dan kembalikan ke tempat semula</p>
            </div>

            <div className="border-l-4 border-[#FF4E05] pl-4">
              <h3 className="font-semibold text-xl mb-2">3. Penjagaan Alat</h3>
              <p>Pastikan alat yang Anda gunakan selalu dalam keadaan aman, </p>
            </div>

            <div className="border-l-4 border-[#FF4E05] pl-4">
              <h3 className="font-semibold text-xl mb-2">4. Presensi</h3>
              <p>Hadir tepat waktu dan isi presensi dengan benar</p>
            </div>

            <div className="border-l-4 border-[#FF4E05] pl-4">
              <h3 className="font-semibold text-xl mb-2">5. Kumpulkan Tugas Awal</h3>
              <p>Jangan lupa untuk mengumpulkan tugas awal terlebih dahulu</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
}