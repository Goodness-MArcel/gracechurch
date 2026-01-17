import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { db } from '@/lib/db';

// GET /api/sermons/[id] - Get single sermon
export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params || {};
    console.log('GET /api/sermons/:id params.id:', id, 'type:', typeof id);

    const sermonId = Number.parseInt(id, 10); // Convert string param to numeric ID

    if (Number.isNaN(sermonId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid sermon id' },
        { status: 400 }
      );
    }

    console.log('Fetching sermon with ID:', sermonId, 'Type:', typeof sermonId);

    const sermon = await db.Sermon.findByPk(sermonId);

    if (!sermon) {
      console.log('Sermon not found for ID:', sermonId);
      return NextResponse.json(
        { success: false, message: 'Sermon not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: sermon
    });
  } catch (error) {
    console.error('Error fetching sermon:', error);

    return NextResponse.json(
      { success: false, message: 'Failed to fetch sermon' },
      { status: 500 }
    );
  }
}

// PUT /api/sermons/[id] - Update sermon
export async function PUT(request, context) {
  try {
    const params = await context.params;
    const { id } = params || {};
    console.log('PUT /api/sermons/:id params.id:', id, 'type:', typeof id);

    const sermonId = Number.parseInt(id, 10); // Convert string param to numeric ID

    if (Number.isNaN(sermonId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid sermon id' },
        { status: 400 }
      );
    }

    // Check if sermon exists
    const existingSermon = await db.Sermon.findByPk(sermonId);
    if (!existingSermon) {
      return NextResponse.json(
        { success: false, message: 'Sermon not found' },
        { status: 404 }
      );
    }

    // Get form data
    const formData = await request.formData();
    const title = formData.get('title');
    const speaker = formData.get('speaker');
    const date = formData.get('date');
    const scripture = formData.get('scripture');
    const duration = formData.get('duration');
    const description = formData.get('description');
    const videoUrl = formData.get('videoUrl');
    const featured = formData.get('featured') === 'true';
    const imageFile = formData.get('image');
    const audioFile = formData.get('audio');

    // Validate required fields
    if (!title || !speaker || !date || !description) {
      return NextResponse.json(
        { success: false, message: 'Title, speaker, date, and description are required' },
        { status: 400 }
      );
    }

    // Prepare sermon data
    const sermonData = {
      title,
      speaker,
      date,
      scripture,
      duration,
      description,
      videoUrl,
      featured
    };

    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      // Create upload directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'images', 'sermons');
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

      sermonData.image = `/images/sermons/${filename}`;

      // Delete old image if it exists
      if (existingSermon.image) {
        const oldImagePath = path.join(process.cwd(), 'public', existingSermon.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    // Handle audio upload
    if (audioFile && audioFile.size > 0) {
      // Create upload directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'audio', 'sermons');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(audioFile.name);
      const filename = `audio-${uniqueSuffix}${extension}`;
      const filepath = path.join(uploadDir, filename);

      // Convert file to buffer and save
      const bytes = await audioFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filepath, buffer);

      sermonData.audioPath = `/audio/sermons/${filename}`;

      // Delete old audio if it exists
      if (existingSermon.audioPath) {
        const oldAudioPath = path.join(process.cwd(), 'public', existingSermon.audioPath);
        if (fs.existsSync(oldAudioPath)) {
          fs.unlinkSync(oldAudioPath);
        }
      }
    }

    // Update sermon
    await existingSermon.update(sermonData);

    // Fetch updated sermon
    const updatedSermon = await db.Sermon.findByPk(sermonId);

    return NextResponse.json({
      success: true,
      message: 'Sermon updated successfully',
      data: updatedSermon
    });

  } catch (error) {
    console.error('Error updating sermon:', error);

    return NextResponse.json(
      { success: false, message: 'Failed to update sermon' },
      { status: 500 }
    );
  }
}

// DELETE /api/sermons/[id] - Delete sermon
export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const { id } = params || {};
    console.log('DELETE /api/sermons/:id params.id:', id, 'type:', typeof id);

    const sermonId = Number.parseInt(id, 10); // Convert string param to numeric ID

    if (Number.isNaN(sermonId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid sermon id' },
        { status: 400 }
      );
    }

    const sermon = await db.Sermon.findByPk(sermonId);

    if (!sermon) {
      return NextResponse.json(
        { success: false, message: 'Sermon not found' },
        { status: 404 }
      );
    }

    // Delete associated files
    if (sermon.image) {
      const imagePath = path.join(process.cwd(), 'public', sermon.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    if (sermon.audioPath) {
      const audioPath = path.join(process.cwd(), 'public', sermon.audioPath);
      if (fs.existsSync(audioPath)) {
        fs.unlinkSync(audioPath);
      }
    }

    // Delete sermon from database
    await sermon.destroy();

    return NextResponse.json({
      success: true,
      message: 'Sermon deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting sermon:', error);

    return NextResponse.json(
      { success: false, message: 'Failed to delete sermon' },
      { status: 500 }
    );
  }
}