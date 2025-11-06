import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Ambil daftar semua alat
export async function GET() {
  try {
    console.log('API: Fetching alat data from database...');
    const alats = await prisma.alat.findMany({
      orderBy: [
        { nama: 'asc' }
      ]
    });

    console.log(`API: Found ${alats.length} alat(s):`, alats.map(a => ({ id: a.id, nama: a.nama, tersedia: a.jumlahTersedia })));

    return NextResponse.json(alats);

  } catch (error) {
    console.error('API: Get alats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}