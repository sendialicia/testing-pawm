import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';

const prisma = new PrismaClient();

async function testAPI() {
  try {
    console.log('Testing database connection...');
    
    // Test peminjaman alat query
    const peminjamanAlats = await prisma.peminjamanAlat.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        },
        alat: true
      },
      orderBy: [
        { createdAt: 'desc' }
      ]
    });

    console.log('\n=== PEMINJAMAN ALAT DATA ===');
    console.log('Found', peminjamanAlats.length, 'peminjaman alat records');
    
    peminjamanAlats.forEach((item, index) => {
      console.log(`\n${index + 1}. ID: ${item.id}`);
      console.log(`   Nama: ${item.nama}`);
      console.log(`   NIM: ${item.nim}`);
      console.log(`   Email: ${item.email}`);
      console.log(`   Alat: ${item.alat.nama}`);
      console.log(`   Status: ${item.status}`);
      console.log(`   Jumlah: ${item.jumlahPinjam}`);
      console.log(`   Created: ${item.createdAt}`);
      if (item.approvedBy) {
        console.log(`   Approved by: ${item.approvedBy}`);
      }
      if (item.keterangan) {
        console.log(`   Keterangan: ${item.keterangan}`);
      }
    });

    // Test API format response
    const apiResponse = {
      success: true,
      data: peminjamanAlats
    };

    console.log('\n=== API RESPONSE FORMAT ===');
    console.log('Response structure:', {
      success: apiResponse.success,
      dataCount: apiResponse.data.length,
      firstItem: apiResponse.data[0] ? apiResponse.data[0].id : 'No data'
    });

  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPI();
