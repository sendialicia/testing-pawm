import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';

const prisma = new PrismaClient();

async function createTestPeminjamanAlat() {
  try {
    // Create test user first if doesn't exist
    const testUser = await prisma.user.upsert({
      where: { email: 'test@student.com' },
      update: {},
      create: {
        email: 'test@student.com',
        password: 'hashedpassword',
        role: 'PRAKTIKAN'
      }
    });

    // Create test asisten user
    const asistenUser = await prisma.user.upsert({
      where: { email: 'asisten@test.com' },
      update: {},
      create: {
        email: 'asisten@test.com',
        password: 'hashedpassword',
        role: 'ASISTEN'
      }
    });

    // Find first available alat
    const alat = await prisma.alat.findFirst();
    
    if (!alat) {
      console.log('No alat found. Creating test alat...');
      const newAlat = await prisma.alat.create({
        data: {
          nama: 'Test Alat',
          deskripsi: 'Alat untuk testing',
          gambar: 'test.jpg',
          jumlahTotal: 10,
          jumlahTersedia: 8,
          spesifikasi: 'Test specification'
        }
      });
      console.log('Created test alat:', newAlat);
    }

    // Create test peminjaman alat
    const testPeminjamanAlat = await prisma.peminjamanAlat.create({
      data: {
        userId: testUser.id,
        alatId: alat?.id || 1,
        nama: 'John Doe Student',
        nim: '13220001',
        email: 'test@student.com',
        tanggalPinjam: new Date('2024-11-07'),
        tanggalKembali: new Date('2024-11-14'),
        keperluan: 'Praktikum PTB1 Modul 1',
        jumlahPinjam: 2,
        status: 'PENDING'
      }
    });

    console.log('Created test peminjaman alat:', testPeminjamanAlat);

    // Create another test with APPROVED status
    const approvedPeminjamanAlat = await prisma.peminjamanAlat.create({
      data: {
        userId: testUser.id,
        alatId: alat?.id || 1,
        nama: 'Jane Smith Student',
        nim: '13220002',
        email: 'test@student.com',
        tanggalPinjam: new Date('2024-11-05'),
        tanggalKembali: new Date('2024-11-12'),
        keperluan: 'Praktikum PTB1 Modul 2',
        jumlahPinjam: 1,
        status: 'APPROVED',
        approvedBy: 'asisten@test.com',
        approvedAt: new Date(),
        keterangan: 'Disetujui untuk praktikum'
      }
    });

    console.log('Created approved peminjaman alat:', approvedPeminjamanAlat);

  } catch (error) {
    console.error('Error creating test peminjaman alat:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestPeminjamanAlat();
