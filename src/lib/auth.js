import jwt from 'jsonwebtoken';
import { sequelize, db } from './db';

const User = db.User;

export async function authenticateToken(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return { error: 'Access token required', status: 401 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await sequelize.authenticate();

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return { error: 'User not found', status: 401 };
    }

    return { user };
  } catch (error) {
    console.error('Token verification error:', error);
    return { error: 'Invalid token', status: 401 };
  }
}

export async function requireAuth(request) {
  const authResult = await authenticateToken(request);

  if (authResult.error) {
    return new Response(JSON.stringify({ error: authResult.error }), {
      status: authResult.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return authResult.user;
}