import { NextRequest, NextResponse } from 'next/server';
import { PeminjamanAlatRepository, AlatRepository } from '@/lib/firebase-repositories';
import { StatusPeminjamanAlat } from '@/lib/firebase-collections';

// GET - Get all peminjaman alat or filter by userId/status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status') as StatusPeminjamanAlat | null;

    let peminjamanList;

    if (userId) {
      peminjamanList = await PeminjamanAlatRepository.findByUserId(userId);
    } else if (status) {
      peminjamanList = await PeminjamanAlatRepository.findByStatus(status);
    } else {
      peminjamanList = await PeminjamanAlatRepository.findAll();
    }

    return NextResponse.json({
      success: true,
      data: peminjamanList,
    });
  } catch (error) {
    console.error('Error fetching peminjaman alat:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch peminjaman alat',
      },
      { status: 500 }
    );
  }
}

// POST - Create new peminjaman alat
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      alatId,
      nama,
      nim,
      email,
      tanggalPinjam,
      tanggalKembali,
      keperluan,
      jumlahPinjam,
    } = body;

    // Validation
    if (!userId || !alatId || !nama || !nim || !email || !tanggalPinjam || !tanggalKembali || !keperluan || !jumlahPinjam) {
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required',
        },
        { status: 400 }
      );
    }

    // Check alat availability
    const alat = await AlatRepository.findById(alatId);
    if (!alat) {
      return NextResponse.json(
        {
          success: false,
          error: 'Alat not found',
        },
        { status: 404 }
      );
    }

    if (alat.jumlahTersedia < Number(jumlahPinjam)) {
      return NextResponse.json(
        {
          success: false,
          error: `Alat tidak tersedia. Tersisa: ${alat.jumlahTersedia}`,
        },
        { status: 400 }
      );
    }

    // Create peminjaman with PENDING status
    const newPeminjaman = await PeminjamanAlatRepository.create({
      userId,
      alatId,
      nama,
      nim,
      email,
      tanggalPinjam: new Date(tanggalPinjam),
      tanggalKembali: new Date(tanggalKembali),
      keperluan,
      jumlahPinjam: Number(jumlahPinjam),
      status: StatusPeminjamanAlat.PENDING,
    });

    return NextResponse.json({
      success: true,
      message: 'Peminjaman alat created successfully',
      data: newPeminjaman,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating peminjaman alat:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create peminjaman alat',
      },
      { status: 500 }
    );
  }
}
