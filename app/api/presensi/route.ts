import { NextRequest, NextResponse } from 'next/server';
import { PresensiRepository } from '@/lib/firebase-repositories';
import { StatusPresensi } from '@/lib/firebase-collections';

// GET - Get all presensi or filter by userId/modulId/status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const modulId = searchParams.get('modulId');
    const status = searchParams.get('status') as StatusPresensi | null;

    let presensiList;

    if (userId && modulId) {
      // Get specific user's presensi for a module
      presensiList = await PresensiRepository.findByUserIdAndModulId(userId, modulId);
      presensiList = presensiList ? [presensiList] : [];
    } else if (userId) {
      presensiList = await PresensiRepository.findByUserId(userId);
    } else if (modulId) {
      presensiList = await PresensiRepository.findByModulId(modulId);
    } else {
      presensiList = await PresensiRepository.findAll();
    }

    // Filter by status if provided
    if (status && Array.isArray(presensiList)) {
      presensiList = presensiList.filter((presensi: any) => presensi.status === status);
    }

    return NextResponse.json({
      success: true,
      data: presensiList,
    });
  } catch (error) {
    console.error('Error fetching presensi:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch presensi',
      },
      { status: 500 }
    );
  }
}

// POST - Submit presensi (praktikan)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      modulId,
      nama,
      nim,
      kelompok,
    } = body;

    // Validation
    if (!userId || !modulId || !nama || !nim || !kelompok) {
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required: userId, modulId, nama, nim, kelompok',
        },
        { status: 400 }
      );
    }

    // Check if presensi already exists for this user and module
    const existingPresensi = await PresensiRepository.findByUserIdAndModulId(userId, modulId);
    
    if (existingPresensi) {
      return NextResponse.json(
        {
          success: false,
          error: 'Anda sudah melakukan presensi untuk modul ini',
        },
        { status: 400 }
      );
    }

    // Create new presensi with HADIR status
    const newPresensi = await PresensiRepository.create({
      userId,
      modulId,
      nama,
      nim,
      kelompok,
      status: StatusPresensi.HADIR,
      waktuPresensi: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Presensi berhasil dicatat',
      data: newPresensi,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating presensi:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create presensi',
      },
      { status: 500 }
    );
  }
}
