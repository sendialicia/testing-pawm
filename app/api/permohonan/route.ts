import { NextRequest, NextResponse } from 'next/server';
import { PermohonanRepository } from '@/lib/firebase-repositories';
import { StatusPermohonan } from '@/lib/firebase-collections';

// GET - Get all permohonan or filter by userId/status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status') as StatusPermohonan | null;

    let permohonanList;

    if (userId) {
      permohonanList = await PermohonanRepository.findByUserId(userId);
    } else if (status) {
      permohonanList = await PermohonanRepository.findByStatus(status);
    } else {
      permohonanList = await PermohonanRepository.findAll();
    }

    return NextResponse.json({
      success: true,
      data: permohonanList,
    });
  } catch (error) {
    console.error('Error fetching permohonan:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch permohonan',
      },
      { status: 500 }
    );
  }
}

// POST - Create new permohonan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nama,
      nim,
      email,
      tanggal,
      waktuMulai,
      waktuSelesai,
      keperluan,
      jumlahOrang,
      userId,
    } = body;

    // Validation
    if (!nama || !nim || !email || !tanggal || !waktuMulai || !waktuSelesai || !keperluan || !jumlahOrang || !userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required: nama, nim, email, tanggal, waktuMulai, waktuSelesai, keperluan, jumlahOrang, userId',
        },
        { status: 400 }
      );
    }

    // Create permohonan with PENDING status
    const newPermohonan = await PermohonanRepository.create({
      nama,
      nim,
      email,
      tanggal: new Date(tanggal),
      waktuMulai,
      waktuSelesai,
      keperluan,
      jumlahOrang,
      status: StatusPermohonan.PENDING,
      userId,
    });

    return NextResponse.json({
      success: true,
      message: 'Permohonan created successfully',
      data: newPermohonan,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating permohonan:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create permohonan',
      },
      { status: 500 }
    );
  }
}
