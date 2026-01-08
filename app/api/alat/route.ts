import { NextRequest, NextResponse } from 'next/server';
import { AlatRepository } from '@/lib/firebase-repositories';

// GET - Get all alat
export async function GET() {
  try {
    const alatList = await AlatRepository.findAll();

    return NextResponse.json({
      success: true,
      data: alatList,
    });
  } catch (error) {
    console.error('Error fetching alat:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch alat',
      },
      { status: 500 }
    );
  }
}

// POST - Create new alat (admin/asisten only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nama,
      deskripsi,
      gambar,
      jumlahTotal,
      jumlahTersedia,
      spesifikasi,
    } = body;

    // Validation
    if (!nama || !deskripsi || !gambar || jumlahTotal === undefined || jumlahTersedia === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: 'Required fields: nama, deskripsi, gambar, jumlahTotal, jumlahTersedia',
        },
        { status: 400 }
      );
    }

    const newAlat = await AlatRepository.create({
      nama,
      deskripsi,
      gambar,
      jumlahTotal: Number(jumlahTotal),
      jumlahTersedia: Number(jumlahTersedia),
      spesifikasi: spesifikasi || '',
    });

    return NextResponse.json({
      success: true,
      message: 'Alat created successfully',
      data: newAlat,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating alat:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create alat',
      },
      { status: 500 }
    );
  }
}
