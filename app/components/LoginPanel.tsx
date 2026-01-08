"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-config";

interface LoginPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: { id: string; email: string; role: string }) => void;
}

export default function LoginPanel({ isOpen, onClose, onLoginSuccess }: LoginPanelProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nim, setNim] = useState('');
  const [role, setRole] = useState<'PRAKTIKAN' | 'ASISTEN'>('PRAKTIKAN');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Firebase login successful:', userCredential.user.uid);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful!');
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => onLoginSuccess(data.user), 1500);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email atau password salah');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Terlalu banyak percobaan login.');
      } else {
        setError('Terjadi kesalahan.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (password.length < 8) {
      setError('Password minimal 8 karakter');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Password tidak cocok');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          role,
          uid: userCredential.user.uid,
          nim: nim
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registrasi berhasil! Silakan login.');
        setTimeout(() => {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setNim('');
          setActiveTab('login');
          setSuccess('');
        }, 2000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email sudah terdaftar');
      } else if (err.code === 'auth/invalid-email') {
        setError('Format email tidak valid');
      } else if (err.code === 'auth/weak-password') {
        setError('Password terlalu lemah');
      } else {
        setError('Terjadi kesalahan.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ 
            type: "spring", 
            damping: 30, 
            stiffness: 300,
            mass: 0.8,
            opacity: { duration: 0.2 }
          }}
          className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-40 flex flex-col border-l border-gray-200"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={20} className="text-gray-600" />
              </motion.button>
            </div>
          </div>

          <div className="px-6 pt-6">
            <div className="flex border-b border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setActiveTab('login');
                  setError('');
                  setSuccess('');
                }}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'text-gray-900 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setActiveTab('register');
                  setError('');
                  setSuccess('');
                }}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'register'
                    ? 'text-gray-900 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Register
              </motion.button>
            </div>
          </div>

          <div className="flex-1 px-6 py-8 overflow-y-auto">
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                    {success}
                  </motion.div>
                )}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email:</label>
                  <motion.input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required whileFocus={{ scale: 1.01 }} className="w-full border-b-2 border-blue-400 focus:border-blue-600 outline-none pb-2 transition-colors duration-200 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Password:</label>
                  <motion.input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required whileFocus={{ scale: 1.01 }} className="w-full border-b-2 border-gray-300 focus:border-blue-600 outline-none pb-2 transition-colors duration-200 text-gray-900" />
                </div>
                <motion.button type="submit" disabled={isLoading} whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }} className={`w-full font-medium py-3 px-4 transition-colors duration-200 mt-8 ${isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                  {isLoading ? 'Logging in...' : 'Log in to the Lab'}
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                    {success}
                  </motion.div>
                )}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email:</label>
                  <motion.input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required whileFocus={{ scale: 1.01 }} className="w-full border-b-2 border-blue-400 focus:border-blue-600 outline-none pb-2 transition-colors duration-200 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Password:</label>
                  <motion.input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required whileFocus={{ scale: 1.01 }} className="w-full border-b-2 border-gray-300 focus:border-blue-600 outline-none pb-2 transition-colors duration-200 text-gray-900" placeholder="Minimal 8 karakter" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Konfirmasi Password:</label>
                  <motion.input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required whileFocus={{ scale: 1.01 }} className="w-full border-b-2 border-gray-300 focus:border-blue-600 outline-none pb-2 transition-colors duration-200 text-gray-900" placeholder="Ketik ulang password" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">NIM:</label>
                  <motion.input type="text" value={nim} onChange={(e) => setNim(e.target.value)} required whileFocus={{ scale: 1.01 }} className="w-full border-b-2 border-gray-300 focus:border-blue-600 outline-none pb-2 transition-colors duration-200 text-gray-900" placeholder="Nomor Induk Mahasiswa" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Role:</label>
                  <select value={role} onChange={(e) => setRole(e.target.value as 'PRAKTIKAN' | 'ASISTEN')} className="w-full border-b-2 border-gray-300 focus:border-blue-600 outline-none pb-2 transition-colors duration-200 bg-transparent text-gray-900">
                    <option value="PRAKTIKAN">Praktikan</option>
                    <option value="ASISTEN">Asisten</option>
                  </select>
                </div>
                <motion.button type="submit" disabled={isLoading} whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }} className={`w-full font-medium py-3 px-4 transition-colors duration-200 mt-8 ${isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                  {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
