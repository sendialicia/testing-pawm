import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { UserRepository } from '@/lib/firebase-repositories';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('Login attempt:', { email, password: '***' });

    // Validation
    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await UserRepository.findByEmail(email);

    console.log('User found:', user ? { id: user.id, email: user.email } : 'null');

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if password is hashed or plain text
    const isPasswordHashed = user.hashPassword.startsWith('$2');
    let isPasswordValid = false;
    
    if (isPasswordHashed) {
      // Use bcrypt for hashed passwords
      isPasswordValid = await bcrypt.compare(password, user.hashPassword);
    } else {
      // Direct comparison for plain text passwords
      isPasswordValid = password === user.hashPassword;
    }
    
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Password validation failed');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Login successful
    return NextResponse.json(
      { 
        message: 'Login successful',
        user: {
          id: user.id,
          uid: user.uid,
          email: user.email,
          role: user.role,
          nim: user.nim
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
