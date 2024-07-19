import { NextResponse, NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(_: NextRequest) {

    try {

        const filePath = path.resolve('.', 'public/files/andres-felipe-saumet-web-mobil-developer.pdf');
        const fileBuffer = await fs.readFile(filePath);
        const headers = new Headers();

        headers.set('Content-Length', fileBuffer.length.toString());
        headers.set('Content-Type', 'application/pdf');
        headers.set('Content-Disposition', 'attachment; filename=andres-felipe-saumet-web-mobil-developer.pdf');

        return new NextResponse(fileBuffer, { headers });

    } catch (error) {
        return new NextResponse('File not found', { status: 404 });
        
    }
}