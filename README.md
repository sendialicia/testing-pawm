# 🧬 Biomedis Laboratory Information System

**Tim Client:**
- 18223063 — Sendi Putra Alicia  
- 18223085 — Velicia Christina Gabriel  

---

## 💡 Deskripsi Proyek

**Biomedis Laboratory Information System** adalah sistem berbasis web yang dirancang untuk membantu pengelolaan kegiatan laboratorium biomedis di Departemen Teknik Biomedis ITB.  
Sistem ini mencakup manajemen sesi praktikum, peminjaman peralatan, serta pengaturan akses laboratorium dengan alur yang efisien dan terintegrasi.

---

## 🚀 Fitur Utama

### 1. 🔐 Autentikasi
- Login khusus untuk **Mahasiswa** dan **Asisten**  
- Sistem **role-based access control** agar setiap pengguna hanya dapat mengakses fitur sesuai perannya  

### 2. 🧪 Praktikum
#### **Tugas Awal Praktikum**
- Mahasiswa dapat **mengunggah tugas awal** secara online  
- Tersedia **materi tugas** yang bisa diunduh  
- Asisten dapat memberikan **penilaian langsung**  
- Status pengumpulan dan penilaian dapat **dipantau secara real-time**

#### **Presensi**
- Mahasiswa dapat **menandai kehadiran** untuk tiap modul  
- Dapat melihat **riwayat kehadiran pribadi**  
- Asisten dapat **memantau statistik kehadiran** seluruh peserta

### 3. ⚙️ Peminjaman Alat
#### **Peminjaman Peralatan**
- Lihat daftar **inventaris peralatan yang tersedia**  
- Ajukan **permintaan peminjaman** dengan mudah  
- Pantau **status peminjaman dan pengembalian**  
- Asisten dapat mengelola inventaris serta menyetujui peminjaman

### 4. 🧫 Peminjaman Laboratorium
#### **Permintaan Penggunaan Lab**
- Ajukan **permintaan penggunaan laboratorium** secara online  
- Periksa **ketersediaan jadwal lab**  
- Terdapat **alur persetujuan otomatis** untuk permintaan  
- Jadwal penggunaan akan **tercatat dan terorganisir**

### 5. 🧍‍♂️ Fitur Khusus Asisten
- Menilai tugas pra-praktikum mahasiswa  
- Memantau kehadiran tiap peserta  
- Mengelola peminjaman dan pengembalian peralatan  
- Memproses permintaan akses laboratorium  
- Melihat statistik pengumpulan tugas dan aktivitas lab

---

## 🧰 Teknologi yang Digunakan

| Komponen | Teknologi |
|-----------|------------|
| **Frontend** | Next.js 13 (App Router) |
| **Backend** | Next.js API Routes |
| **Database** | Firebase Firestore |
| **Authentication** | Firebase Auth |
| **UI Framework** | Tailwind CSS |
| **Animasi** | Framer Motion |
| **Deployment** | Vercel |

---

## ⚙️ Cara Menjalankan Proyek

### 🧩 Prasyarat
Sebelum memulai, pastikan Anda sudah menginstal:
- **Node.js** (versi 18 atau lebih baru)
- **Firebase Account** (untuk Firestore & Authentication)
- **Git**

### 💻 Langkah Instalasi

1. **Clone repositori**
   ```bash
   git clone https://github.com/username/biomedis-lis.git
   cd biomedis-lis

2. **Instal dependensi**
   ```bash
   npm install

3. **Setup Firebase**
   - Buat project di [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Download service account key dan simpan sebagai `firebase-service-account.json` di root project
   
4. **Buat file .env.local di root proyek**
   ```bash
   FIREBASE_SERVICE_ACCOUNT='{"type":"service_account",...}'
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

Aplikasi akan berjalan di `http://localhost:3000`
