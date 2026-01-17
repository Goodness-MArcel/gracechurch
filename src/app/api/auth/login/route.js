import { NextResponse } from 'next/server';
import { sequelize, db } from '@/lib/db';

const User = db.User;

export async function POST(request) {
  let transaction = null;

  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Use a transaction for database operations to ensure proper connection handling
    transaction = await sequelize.transaction();

    // Find user
    const user = await User.findOne({
      where: { email },
      transaction,
      lock: transaction.LOCK.UPDATE // Prevent concurrent modifications
    });

    if (!user) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      await transaction.rollback();
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Commit transaction
    await transaction.commit();

    // Generate token
    const token = user.generateToken();

    return NextResponse.json({
      message: 'Login successful',
      user: user.toJSON(),
      token
    });

  } catch (error) {
    // Rollback transaction if it exists
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error('Error rolling back transaction:', rollbackError);
      }
    }

    console.error('Login error:', error);

    // Handle specific database connection errors
    if (error.code === '53300' || error.message.includes('remaining connection slots')) {
      return NextResponse.json(
        { error: 'Database temporarily unavailable. Please try again in a moment.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}