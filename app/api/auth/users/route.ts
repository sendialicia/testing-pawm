import { NextRequest, NextResponse } from 'next/server';
import { UserRepository } from '@/lib/firebase-repositories';
import { UserRole } from '@/lib/firebase-collections';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role') as UserRole | null;

    let users;
    
    if (role) {
      // Validate role
      if (!['ASISTEN', 'PRAKTIKAN'].includes(role)) {
        return NextResponse.json(
          { success: false, error: 'Invalid role. Must be ASISTEN or PRAKTIKAN' },
          { status: 400 }
        );
      }

      // Get users by role
      users = await UserRepository.findByRole(role);
    } else {
      // Get all users (you can add findAll to UserRepository if needed)
      return NextResponse.json(
        { success: false, error: 'Role parameter is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get users' },
      { status: 500 }
    );
  }
}
