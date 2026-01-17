import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { db } from '@/lib/db';

// GET /api/sermons - List all sermons (supports pagination)
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get('page');
    const limitParam = url.searchParams.get('limit');

    const page = Math.max(Number.parseInt(pageParam ?? '1', 10) || 1, 1);
    const limitRaw = Number.parseInt(limitParam ?? '10', 10) || 10;
    const limit = Math.min(Math.max(limitRaw, 1), 50); // prevent extremes

    let offset = (page - 1) * limit;
    let { rows, count } = await db.Sermon.findAndCountAll({
      order: [['date', 'DESC'], ['createdAt', 'DESC']],
      limit,
      offset
    });

    const totalPages = count === 0 ? 0 : Math.ceil(count / limit);

    // If requested page overshoots the available range, re-query for the last page
    if (totalPages > 0 && page > totalPages) {
      const adjustedPage = totalPages;
      offset = (adjustedPage - 1) * limit;
      ({ rows, count } = await db.Sermon.findAndCountAll({
        order: [['date', 'DESC'], ['createdAt', 'DESC']],
        limit,
        offset
      }));

      return NextResponse.json({
        success: true,
        data: rows,
        meta: {
          currentPage: adjustedPage,
          totalPages,
          pageSize: limit,
          totalItems: count
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: rows,
      meta: {
        currentPage: totalPages === 0 ? 1 : page,
        totalPages,
        pageSize: limit,
        totalItems: count
      }
    });
  } catch (error) {
    console.error('Error fetching sermons:', error);

    // Handle specific database connection errors
    if (error.code === '53300' || error.message.includes('remaining connection slots')) {
      return NextResponse.json(
        { success: false, message: 'Database temporarily unavailable. Please try again in a moment.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to fetch sermons' },
      { status: 500 }
    );
  }
}

// POST /api/sermons - Create new sermon
export async function POST(request) {
  try {
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
    }

    // Create sermon
    const sermon = await db.Sermon.create(sermonData);

    return NextResponse.json({
      success: true,
      message: 'Sermon created successfully',
      data: sermon
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating sermon:', error);

    // Handle specific database connection errors
    if (error.code === '53300' || error.message.includes('remaining connection slots')) {
      return NextResponse.json(
        { success: false, message: 'Database temporarily unavailable. Please try again in a moment.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create sermon' },
      { status: 500 }
    );
  }
}