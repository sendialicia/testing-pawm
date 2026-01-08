import { NextRequest, NextResponse } from 'next/server';
import { PermohonanRepository } from '@/lib/firebase-repositories';
import { StatusPermohonan } from '@/lib/firebase-collections';

// GET - Get permohonan by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const permohonan = await PermohonanRepository.findById(params.id);

    if (!permohonan) {
      return NextResponse.json(
        {
          success: false,
          error: 'Permohonan not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: permohonan,
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

// PATCH - Update permohonan status (approve/reject)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const { status, approvedBy, keterangan } = body;

    console.log('PATCH request received:', {
      id: params.id,
      status,
      approvedBy,
      keterangan
    });

    // Validation
    if (!status || !Object.values(StatusPermohonan).includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status. Must be PENDING, APPROVED, or REJECTED',
        },
        { status: 400 }
      );
    }

    const updateData: any = {
      status,
    };

    // If approved or rejected, add metadata
    if (status === StatusPermohonan.APPROVED || status === StatusPermohonan.REJECTED) {
      if (approvedBy) {
        updateData.approvedBy = approvedBy;
        updateData.approvedAt = new Date();
      }
      if (keterangan) {
        updateData.keterangan = keterangan;
      }
    }

    console.log('Updating with data:', updateData);

    const updatedPermohonan = await PermohonanRepository.update(params.id, updateData);

    if (!updatedPermohonan) {
      return NextResponse.json(
        {
          success: false,
          error: 'Permohonan not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Permohonan updated successfully',
      data: updatedPermohonan,
    });
  } catch (error) {
    console.error('Error updating permohonan:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update permohonan',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete permohonan
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    await PermohonanRepository.delete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Permohonan deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting permohonan:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete permohonan',
      },
      { status: 500 }
    );
  }
}
