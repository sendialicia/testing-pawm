import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { UserRepository } from '@/lib/firebase-repositories';
import { UserRole } from '@/lib/firebase-collections';

export async function POST(request: NextRequest) {
  try {
    const { email, password, role, uid, nim } = await request.json();

    console.log('Register attempt:', { email, role, uid, nim });

    // Validation
    if (!email || !password || !uid || !nim) {
      return NextResponse.json(
        { error: 'Email, password, UID, and NIM are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with all fields
    const user = await UserRepository.create({
      uid: uid,
      email: email,
      hashPassword: hashedPassword,
      nim: nim,
      role: role || UserRole.PRAKTIKAN,
    });

    console.log('User created:', { id: user.id, email: user.email, uid: user.uid });

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          uid: user.uid,
          email: user.email,
          role: user.role,
          nim: user.nim
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
