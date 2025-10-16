import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const productId = formData.get('productId') as string;
  const type = formData.get('type') as 'image' | 'video';

  if (!productId || !type) {
    return NextResponse.json({ error: 'Missing productId or type' }, { status: 400 });
  }

  const files = formData.getAll('files') as File[];
  if (!files.length) {
    return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
  }

  const uploadDir = type === 'image'
    ? path.join(process.cwd(), 'public', 'images', 'products', productId)
    : path.join(process.cwd(), 'public', 'videos', 'products', productId);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const urls: string[] = [];
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = type === 'image'
      ? `/images/products/${productId}/${filename}`
      : `/videos/products/${productId}/${filename}`;
    urls.push(publicUrl);
  }

  return NextResponse.json({ urls });
} 
