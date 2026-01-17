import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { db } from '@/lib/db';

const uploadDir = path.join(process.cwd(), 'public', 'images', 'ministries');

function ensureUploadDir() {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get('page');
    const limitParam = url.searchParams.get('limit');
    const activeParam = url.searchParams.get('active');

    const page = Math.max(Number.parseInt(pageParam ?? '1', 10) || 1, 1);
    const limitRaw = Number.parseInt(limitParam ?? '10', 10) || 10;
    const limit = Math.min(Math.max(limitRaw, 1), 50);
    let offset = (page - 1) * limit;

    const where =
      activeParam === 'true'
        ? { active: true }
        : activeParam === 'false'
          ? { active: false }
          : undefined;

    let { rows, count } = await db.Ministry.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    const totalPages = count === 0 ? 0 : Math.ceil(count / limit);

    if (totalPages > 0 && page > totalPages) {
      const adjustedPage = totalPages;
      offset = (adjustedPage - 1) * limit;
      ({ rows, count } = await db.Ministry.findAndCountAll({
        where,
        order: [['createdAt', 'DESC']],
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
    console.error('Error fetching ministries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch ministries' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const schedule = formData.get('schedule');
    const icon = formData.get('icon');
    const coordinator = formData.get('coordinator');
    const contactEmail = formData.get('contactEmail');
    const active = formData.get('active') === 'true';
    const imageFile = formData.get('image');

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: 'Title and description are required' },
        { status: 400 }
      );
    }

    const ministryData = {
      title,
      description,
      schedule,
      icon,
      coordinator,
      // Only set contactEmail when provided; empty strings will fail the isEmail validator
      contactEmail: contactEmail && String(contactEmail).trim() !== '' ? contactEmail : null,
      active
    };

    if (imageFile && imageFile.size > 0) {
      ensureUploadDir();
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(imageFile.name) || '.jpg';
      const filename = `ministry-${uniqueSuffix}${extension}`;
      const filePath = path.join(uploadDir, filename);
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filePath, buffer);
      ministryData.imagePath = `/images/ministries/${filename}`;
    }

    const ministry = await db.Ministry.create(ministryData);

    return NextResponse.json({
      success: true,
      message: 'Ministry created successfully',
      data: ministry
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating ministry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create ministry' },
      { status: 500 }
    );
  }
}
