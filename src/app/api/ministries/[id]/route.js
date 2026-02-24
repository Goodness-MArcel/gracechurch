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

function normalizePublicPath(p) {
  if (!p) return '';
  // Remove leading slash so path.join doesn't discard previous segments
  return p.startsWith('/') ? p.slice(1) : p;
}

function getSafeImageExtension(file) {
  const nameExt = file?.name ? path.extname(file.name) : '';
  if (nameExt) return nameExt;
  const type = file?.type || '';
  switch (type) {
    case 'image/jpeg':
    case 'image/jpg':
      return '.jpg';
    case 'image/png':
      return '.png';
    case 'image/webp':
      return '.webp';
    case 'image/gif':
      return '.gif';
    default:
      return '.jpg';
  }
}

async function resolveParams(context) {
  return typeof context.params?.then === 'function' ? await context.params : context.params;
}

let hasImageColumnCache = null;
async function ministryHasImageColumn() {
  if (hasImageColumnCache !== null) return hasImageColumnCache;
  try {
    const qi = db.sequelize.getQueryInterface();
    const desc = await qi.describeTable('Ministries');
    hasImageColumnCache = !!desc.image;
    return hasImageColumnCache;
  } catch (e) {
    console.warn('Could not describe Ministries table to detect image column:', e);
    hasImageColumnCache = false;
    return false;
  }
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

    console.log('PUT /api/ministries/[id]: Starting request for ID:', ministryId);

    if (Number.isNaN(ministryId)) {
      console.log('Invalid ministry ID:', id);
      return NextResponse.json(
        { success: false, message: 'Invalid ministry id' },
        { status: 400 }
      );
    }

    const existingMinistry = await db.Ministry.findByPk(ministryId);
    if (!existingMinistry) {
      console.log('Ministry not found:', ministryId);
      return NextResponse.json(
        { success: false, message: 'Ministry not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    console.log('Form data keys:', Array.from(formData.keys()));
    const title = formData.get('title');
    const description = formData.get('description');
    const schedule = formData.get('schedule');
    const icon = formData.get('icon');
    const coordinator = formData.get('coordinator');
    const contactEmail = formData.get('contactEmail');
    const active = formData.get('active') === 'true';
    const imageFile = formData.get('image');
    const removeImage = formData.get('removeImage') === 'true';

    console.log('Parsed data:', {
      title,
      description,
      active,
      hasImage: !!imageFile,
      removeImage,
      imageFileType: imageFile ? typeof imageFile : 'null',
      imageFileName: imageFile?.name,
      imageFileSize: imageFile?.size
    });

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

    if (removeImage && (existingMinistry.imagePath || existingMinistry.image)) {
      try {
        const stored = normalizePublicPath(existingMinistry.imagePath || existingMinistry.image);
        const oldPath = path.join(process.cwd(), 'public', stored);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      } catch (e) {
        console.warn('Failed to remove old ministry image:', e);
      }
      ministryData.imagePath = null;
      if (await ministryHasImageColumn()) {
        ministryData.image = null;
      }
    }

    if (imageFile && imageFile.size > 0) {
      console.log('Processing image upload...', {
        name: imageFile.name,
        size: imageFile.size,
        type: imageFile.type
      });

      ensureUploadDir();

      // Delete old image if exists
      if (existingMinistry.imagePath || existingMinistry.image) {
        try {
          const stored = normalizePublicPath(existingMinistry.imagePath || existingMinistry.image);
          const oldPath = path.join(process.cwd(), 'public', stored);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        } catch (e) {
          console.warn('Failed to remove previous image:', e);
        }
      }

      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = getSafeImageExtension(imageFile);
      const filename = `ministry-${uniqueSuffix}${extension}`;
      const filePath = path.join(uploadDir, filename);

      // Convert file to buffer and save
      try {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        fs.writeFileSync(filePath, buffer);
      } catch (e) {
        console.error('Failed to write ministry image:', e);
        return NextResponse.json(
          { success: false, message: 'Image upload failed' },
          { status: 400 }
        );
      }

      const publicPath = `/images/ministries/${filename}`;
      ministryData.imagePath = publicPath;
      if (await ministryHasImageColumn()) {
        ministryData.image = publicPath;
      }
      console.log('File saved successfully, path:', ministryData.imagePath);
    }

    console.log('Updating ministry with data:', ministryData);
    await existingMinistry.update(ministryData);
    const updated = await db.Ministry.findByPk(ministryId);
    console.log('Ministry updated successfully:', updated.id);

    return NextResponse.json({
      success: true,
      message: 'Ministry updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating ministry:', error);
    console.error('Error stack:', error.stack);
    console.error('Error message:', error.message);
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

    if (ministry.imagePath || ministry.image) {
      try {
        const stored = normalizePublicPath(ministry.imagePath || ministry.image);
        const imagePath = path.join(process.cwd(), 'public', stored);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (e) {
        console.warn('Failed to delete ministry image during delete:', e);
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
