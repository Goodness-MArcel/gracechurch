import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { db } from '@/lib/db';

// GET /api/events - List all events
export async function GET() {
  try {
    const events = await db.Event.findAll({
      order: [['date', 'ASC'], ['time', 'ASC']]
    });

    return NextResponse.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);

    // Handle specific database connection errors
    if (error.code === '53300' || error.message.includes('remaining connection slots')) {
      return NextResponse.json(
        { success: false, message: 'Database temporarily unavailable. Please try again in a moment.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create new event
export async function POST(request) {
  try {
    // Get form data
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    const time = formData.get('time');
    const location = formData.get('location');
    const imageFile = formData.get('image');

    // Validate required fields
    if (!title || !description || !date || !time || !location) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Prepare event data
    const eventData = {
      title,
      description,
      date,
      time,
      location
    };

    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      // Create upload directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'images', 'events');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(imageFile.name);
      const filename = `image-${uniqueSuffix}${extension}`;
      const filepath = path.join(uploadDir, filename);

      // Convert file to buffer and save
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filepath, buffer);

      eventData.image = `/images/events/${filename}`;
    }

    // Create event
    const event = await db.Event.create(eventData);

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      data: event
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating event:', error);

    // Handle specific database connection errors
    if (error.code === '53300' || error.message.includes('remaining connection slots')) {
      return NextResponse.json(
        { success: false, message: 'Database temporarily unavailable. Please try again in a moment.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create event' },
      { status: 500 }
    );
  }
};