import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { db } from '@/lib/db';

const uploadDir = path.join(process.cwd(), 'public', 'images', 'ministries');

function ensureUploadDir() {
  console.log('Ensuring upload directory exists:', uploadDir);
  if (!fs.existsSync(uploadDir)) {
    console.log('Creating upload directory...');
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Upload directory created');
  } else {
    console.log('Upload directory already exists');
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

    console.log('PUT request for ministry ID:', ministryId);

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
    console.log('Form data keys:', Array.from(formData.keys()));
    console.log('Image file present:', formData.has('image'));

    const title = formData.get('title');
    const description = formData.get('description');
    const schedule = formData.get('schedule');
    const icon = formData.get('icon');
    const coordinator = formData.get('coordinator');
    const contactEmail = formData.get('contactEmail');
    const active = formData.get('active') === 'true';
    const imageFile = formData.get('image');
    const removeImage = formData.get('removeImage') === 'true';

    console.log('Parsed data:', { title, description, active, hasImage: !!imageFile, removeImage });

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
      console.log('Processing image upload...', {
        name: imageFile.name,
        size: imageFile.size,
        type: imageFile.type
      });

      try {
        ensureUploadDir();

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(imageFile.name) || '.jpg';
        const filename = `ministry-${uniqueSuffix}${extension}`;
        const filePath = path.join(uploadDir, filename);

        console.log('Saving file to:', filePath);

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        fs.writeFileSync(filePath, buffer);
        ministryData.imagePath = `/images/ministries/${filename}`;

        console.log('File saved successfully, path:', ministryData.imagePath);

        if (existingMinistry.imagePath) {
          const oldPath = path.join(process.cwd(), 'public', existingMinistry.imagePath);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
            console.log('Old file deleted:', oldPath);
          }
        }
      } catch (fileError) {
        console.error('Error processing image file:', fileError);
        return NextResponse.json(
          { success: false, message: 'Failed to process image file' },
          { status: 500 }
        );
      }
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
