import { NextRequest, NextResponse } from 'next/server';
import { TugasAwalRepository, UserRepository } from '@/lib/firebase-repositories';

// GET - Get tugas awal by modulId with user info (for asisten to grade)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const modulId = searchParams.get('modulId');
    const includeUsers = searchParams.get('includeUsers') === 'true';

    if (!modulId) {
      return NextResponse.json(
        { success: false, error: 'modulId is required' },
        { status: 400 }
      );
    }

    // Get all tugas for this module
    const tugasList = await TugasAwalRepository.findAll();
    const filteredTugas = tugasList.filter((tugas: any) => tugas.modulId === modulId);

    if (includeUsers) {
      // Populate user data for each tugas
      const tugasWithUsers = await Promise.all(
        filteredTugas.map(async (tugas: any) => {
          const user = await UserRepository.findById(tugas.userId);
          return {
            ...tugas,
            user: user ? { 
              id: user.id, 
              email: user.email, 
              role: user.role,
              nim: user.nim 
            } : null,
          };
        })
      );

      return NextResponse.json({
        success: true,
        data: tugasWithUsers,
      });
    }

    return NextResponse.json({
      success: true,
      data: filteredTugas,
    });
  } catch (error) {
    console.error('Error fetching tugas by module:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tugas',
      },
      { status: 500 }
    );
  }
}
