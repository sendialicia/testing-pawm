/**
 * Firebase Firestore Collections
 * Centralized collection names for consistency
 */

export const COLLECTIONS = {
  USERS: 'users',
  PERMOHONAN: 'permohonan',
  TUGAS_AWAL: 'tugasAwal',
  PRESENSI: 'presensi',
  ALAT: 'alat',
  PEMINJAMAN_ALAT: 'peminjamanAlat',
} as const;

/**
 * Enums - matching Prisma schema
 */

export enum UserRole {
  PRAKTIKAN = 'PRAKTIKAN',
  ASISTEN = 'ASISTEN',
}

export enum StatusPermohonan {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum StatusTugasAwal {
  BELUM_SUBMIT = 'BELUM_SUBMIT',
  SUDAH_SUBMIT = 'SUDAH_SUBMIT',
  TERLAMBAT = 'TERLAMBAT',
}

export enum StatusPresensi {
  HADIR = 'HADIR',
  TIDAK_HADIR = 'TIDAK_HADIR',
  TERLAMBAT = 'TERLAMBAT',
}

export enum StatusPeminjamanAlat {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DIKEMBALIKAN = 'DIKEMBALIKAN',
}

/**
 * TypeScript Interfaces - matching Prisma models
 */

export interface User {
  id: string; // Firestore document ID
  uid: string; // Firebase Auth UID
  email: string;
  hashPassword: string;
  nim: string; // Nomor Induk Mahasiswa (wajib)
  role: UserRole;
  createdAt: Date;
}

export interface Permohonan {
  id: string;
  nama: string;
  nim: string;
  email: string;
  tanggal: Date;
  waktuMulai: string;
  waktuSelesai: string;
  keperluan: string;
  jumlahOrang: string;
  status: StatusPermohonan;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  keterangan?: string;
}

export interface TugasAwal {
  id: string;
  userId: string;
  modulId: string;
  nama: string;
  nim: string;
  linkTugas: string;
  status: StatusTugasAwal;
  submitAt?: Date;
  nilai?: number;
  nilaiAt?: Date;
  nilaiBy?: string;
  createdAt: Date;
  updatedAt: Date;
  keterangan?: string;
}

export interface Presensi {
  id: string;
  userId: string;
  modulId: string;
  nama: string;
  nim: string;
  kelompok: string;
  status: StatusPresensi;
  waktuPresensi?: Date;
  createdAt: Date;
  updatedAt: Date;
  keterangan?: string;
}

export interface Alat {
  id: string;
  nama: string;
  deskripsi: string;
  gambar: string;
  jumlahTotal: number;
  jumlahTersedia: number;
  spesifikasi?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PeminjamanAlat {
  id: string;
  userId: string;
  alatId: string;
  nama: string;
  nim: string;
  email: string;
  tanggalPinjam: Date;
  tanggalKembali: Date;
  keperluan: string;
  jumlahPinjam: number;
  status: StatusPeminjamanAlat;
  approvedBy?: string;
  approvedAt?: Date;
  keterangan?: string;
  dikembalikanAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
