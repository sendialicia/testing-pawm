import { NextRequest, NextResponse } from 'next/server';
import { PeminjamanAlatRepository, AlatRepository } from '@/lib/firebase-repositories';
import { StatusPeminjamanAlat } from '@/lib/firebase-collections';

// GET - Get peminjaman alat by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const peminjaman = await PeminjamanAlatRepository.findById(params.id);

    if (!peminjaman) {
      return NextResponse.json(
        {
          success: false,
          error: 'Peminjaman not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: peminjaman,
    });
  } catch (error) {
    console.error('Error fetching peminjaman:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch peminjaman',
      },
      { status: 500 }
    );
  }
}

// PATCH - Update peminjaman status (approve/reject/dikembalikan)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const { status, approvedBy, keterangan } = body;

    console.log('PATCH peminjaman alat:', {
      id: params.id,
      status,
      approvedBy,
      keterangan
    });

    // Validation
    if (!status || !Object.values(StatusPeminjamanAlat).includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status. Must be PENDING, APPROVED, REJECTED, or DIKEMBALIKAN',
        },
        { status: 400 }
      );
    }

    // Get current peminjaman
    const currentPeminjaman = await PeminjamanAlatRepository.findById(params.id);
    if (!currentPeminjaman) {
      return NextResponse.json(
        {
          success: false,
          error: 'Peminjaman not found',
        },
        { status: 404 }
      );
    }

    const updateData: any = {
      status,
    };

    // Handle status change logic
    if (status === StatusPeminjamanAlat.APPROVED) {
      // Reduce available quantity when approved
      const alat = await AlatRepository.findById(currentPeminjaman.alatId);
      if (alat) {
        await AlatRepository.update(currentPeminjaman.alatId, {
          jumlahTersedia: alat.jumlahTersedia - currentPeminjaman.jumlahPinjam,
        });
      }
      
      if (approvedBy) {
        updateData.approvedBy = approvedBy;
        updateData.approvedAt = new Date();
      }
    } else if (status === StatusPeminjamanAlat.DIKEMBALIKAN) {
      // Return quantity when returned
      const alat = await AlatRepository.findById(currentPeminjaman.alatId);
      if (alat) {
        await AlatRepository.update(currentPeminjaman.alatId, {
          jumlahTersedia: alat.jumlahTersedia + currentPeminjaman.jumlahPinjam,
        });
      }
      
      updateData.dikembalikanAt = new Date();
    } else if (status === StatusPeminjamanAlat.REJECTED) {
      if (approvedBy) {
        updateData.approvedBy = approvedBy;
        updateData.approvedAt = new Date();
      }
    }

    if (keterangan) {
      updateData.keterangan = keterangan;
    }

    const updatedPeminjaman = await PeminjamanAlatRepository.update(params.id, updateData);

    return NextResponse.json({
      success: true,
      message: 'Peminjaman updated successfully',
      data: updatedPeminjaman,
    });
  } catch (error) {
    console.error('Error updating peminjaman:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update peminjaman',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete peminjaman
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    await PeminjamanAlatRepository.delete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Peminjaman deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting peminjaman:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete peminjaman',
      },
      { status: 500 }
    );
  }
}
