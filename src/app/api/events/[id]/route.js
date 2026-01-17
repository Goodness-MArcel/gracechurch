import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { db } from '@/lib/db';

// GET /api/events/[id] - Get single event
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const event = await db.Event.findByPk(id);

    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);

    // Handle specific database connection errors
    if (error.code === '53300' || error.message.includes('remaining connection slots')) {
      return NextResponse.json(
        { success: false, message: 'Database temporarily unavailable. Please try again in a moment.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] - Update event
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    // Get form data
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    const time = formData.get('time');
    const location = formData.get('location');
    const imageFile = formData.get('image');

    // Find the event
    const event = await db.Event.findByPk(id);
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (date) updateData.date = date;
    if (time) updateData.time = time;
    if (location) updateData.location = location;

    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      // Create upload directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'images', 'events');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Delete old image if exists
      if (event.image) {
        const oldImagePath = path.join(process.cwd(), 'public', event.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
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

      updateData.image = `/images/events/${filename}`;
    }

    // Update event
    await event.update(updateData);

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    console.error('Error updating event:', error);

    // Handle specific database connection errors
    if (error.code === '53300' || error.message.includes('remaining connection slots')) {
      return NextResponse.json(
        { success: false, message: 'Database temporarily unavailable. Please try again in a moment.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const event = await db.Event.findByPk(id);
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    // Delete associated image if exists
    if (event.image) {
      const imagePath = path.join(process.cwd(), 'public', event.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete event
    await event.destroy();

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);

    // Handle specific database connection errors
    if (error.code === '53300' || error.message.includes('remaining connection slots')) {
      return NextResponse.json(
        { success: false, message: 'Database temporarily unavailable. Please try again in a moment.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to delete event' },
      { status: 500 }
    );
  }
};