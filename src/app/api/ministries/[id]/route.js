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

async function resolveParams(context) {
  return typeof context.params?.then === 'function' ? await context.params : context.params;
}

export async function GET(request, context) {
  try {
    const params = await resolveParams(context);
    const { id } = params || {};
    const ministryId = Number.parseInt(id, 10);

    if (Number.isNaN(ministryId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ministry id' },
        { status: 400 }
      );
    }

    const ministry = await db.Ministry.findByPk(ministryId);

    if (!ministry) {
      return NextResponse.json(
        { success: false, message: 'Ministry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: ministry });
  } catch (error) {
    console.error('Error fetching ministry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch ministry' },
      { status: 500 }
    );
  }
}

export async function PUT(request, context) {
  try {
    const params = await resolveParams(context);
    const { id } = params || {};
    const ministryId = Number.parseInt(id, 10);

    if (Number.isNaN(ministryId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ministry id' },
        { status: 400 }
      );
    }

    const existingMinistry = await db.Ministry.findByPk(ministryId);
    if (!existingMinistry) {
      return NextResponse.json(
        { success: false, message: 'Ministry not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const schedule = formData.get('schedule');
    const icon = formData.get('icon');
    const coordinator = formData.get('coordinator');
    const contactEmail = formData.get('contactEmail');
    const active = formData.get('active') === 'true';
    const imageFile = formData.get('image');
    const removeImage = formData.get('removeImage') === 'true';

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

    if (removeImage && existingMinistry.imagePath) {
      const oldPath = path.join(process.cwd(), 'public', existingMinistry.imagePath);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      ministryData.imagePath = null;
    }

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

      if (existingMinistry.imagePath) {
        const oldPath = path.join(process.cwd(), 'public', existingMinistry.imagePath);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    await existingMinistry.update(ministryData);
    const updated = await db.Ministry.findByPk(ministryId);

    return NextResponse.json({
      success: true,
      message: 'Ministry updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating ministry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update ministry' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const params = await resolveParams(context);
    const { id } = params || {};
    const ministryId = Number.parseInt(id, 10);

    if (Number.isNaN(ministryId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ministry id' },
        { status: 400 }
      );
    }

    const ministry = await db.Ministry.findByPk(ministryId);

    if (!ministry) {
      return NextResponse.json(
        { success: false, message: 'Ministry not found' },
        { status: 404 }
      );
    }

    if (ministry.imagePath) {
      const imagePath = path.join(process.cwd(), 'public', ministry.imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await ministry.destroy();

    return NextResponse.json({
      success: true,
      message: 'Ministry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting ministry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete ministry' },
      { status: 500 }
    );
  }
}
