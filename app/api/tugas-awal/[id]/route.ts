import { NextRequest, NextResponse } from 'next/server';
import { TugasAwalRepository } from '@/lib/firebase-repositories';

// GET - Get tugas awal by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const tugas = await TugasAwalRepository.findById(params.id);

    if (!tugas) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tugas not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: tugas,
    });
  } catch (error) {
    console.error('Error fetching tugas:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tugas',
      },
      { status: 500 }
    );
  }
}

// PATCH - Grade tugas awal (asisten only)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const { nilai, nilaiBy, keterangan } = body;

    console.log('PATCH tugas awal:', {
      id: params.id,
      nilai,
      nilaiBy,
      keterangan
    });

    // Validation
    if (nilai === undefined || nilai === null) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nilai is required',
        },
        { status: 400 }
      );
    }

    if (nilai < 0 || nilai > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nilai must be between 0 and 100',
        },
        { status: 400 }
      );
    }

    const updateData: any = {
      nilai: Number(nilai),
      nilaiAt: new Date(),
    };

    if (nilaiBy) {
      updateData.nilaiBy = nilaiBy;
    }

    if (keterangan) {
      updateData.keterangan = keterangan;
    }

    const updatedTugas = await TugasAwalRepository.update(params.id, updateData);

    if (!updatedTugas) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tugas not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tugas graded successfully',
      data: updatedTugas,
    });
  } catch (error) {
    console.error('Error grading tugas:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to grade tugas',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete tugas awal
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    await TugasAwalRepository.delete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Tugas deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting tugas:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete tugas',
      },
      { status: 500 }
    );
  }
}
