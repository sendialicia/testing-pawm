import { NextRequest, NextResponse } from 'next/server';
import { TugasAwalRepository } from '@/lib/firebase-repositories';
import { StatusTugasAwal } from '@/lib/firebase-collections';

// GET - Get all tugas awal or filter by userId/modulId/status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const modulId = searchParams.get('modulId');
    const status = searchParams.get('status') as StatusTugasAwal | null;

    let tugasList;

    if (userId && modulId) {
      // Get specific user's tugas for a module
      tugasList = await TugasAwalRepository.findByUserIdAndModulId(userId, modulId);
      tugasList = tugasList ? [tugasList] : [];
    } else if (userId) {
      tugasList = await TugasAwalRepository.findByUserId(userId);
    } else {
      tugasList = await TugasAwalRepository.findAll();
    }

    // Filter by status if provided
    if (status && Array.isArray(tugasList)) {
      tugasList = tugasList.filter((tugas: any) => tugas.status === status);
    }

    return NextResponse.json({
      success: true,
      data: tugasList,
    });
  } catch (error) {
    console.error('Error fetching tugas awal:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tugas awal',
      },
      { status: 500 }
    );
  }
}

// POST - Submit tugas awal (praktikan)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      modulId,
      nama,
      nim,
      linkTugas,
    } = body;

    // Validation
    if (!userId || !modulId || !nama || !nim || !linkTugas) {
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required: userId, modulId, nama, nim, linkTugas',
        },
        { status: 400 }
      );
    }

    // Check if tugas already exists for this user and module
    const existingTugas = await TugasAwalRepository.findByUserIdAndModulId(userId, modulId);
    
    if (existingTugas) {
      // Update existing tugas
      const updatedTugas = await TugasAwalRepository.update(existingTugas.id, {
        linkTugas,
        status: StatusTugasAwal.SUDAH_SUBMIT,
        submitAt: new Date(),
      });

      return NextResponse.json({
        success: true,
        message: 'Tugas awal updated successfully',
        data: updatedTugas,
      });
    } else {
      // Create new tugas
      const newTugas = await TugasAwalRepository.create({
        userId,
        modulId,
        nama,
        nim,
        linkTugas,
        status: StatusTugasAwal.SUDAH_SUBMIT,
        submitAt: new Date(),
      });

      return NextResponse.json({
        success: true,
        message: 'Tugas awal submitted successfully',
        data: newTugas,
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Error submitting tugas awal:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit tugas awal',
      },
      { status: 500 }
    );
  }
}
