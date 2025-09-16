import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const vcfPath = join(process.cwd(), 'public', 'omar-contact', 'Omar Jadallah.vcf');
    const vcfData = readFileSync(vcfPath);

    return new NextResponse(vcfData, {
      headers: {
        'Content-Type': 'text/vcard',
        'Content-Disposition': 'attachment; filename="Omar Jadallah.vcf"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Contact file not found' }, { status: 404 });
  }
}