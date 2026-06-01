import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { db } from '@/lib/db-config';
import { documents } from '@/lib/db-schema';
import { generateEmbeddings } from '@/lib/embeddings';
import { chunkContent } from '@/lib/chunking';
import { PDFParse } from 'pdf-parse';
import { eq } from 'drizzle-orm';

export const maxDuration = 60;

export async function GET() {
  let parser;
  try {
    console.log('Starting PDF processing for CV...');
    const filePath = path.join(
      process.cwd(),
      'public',
      'cv',
      'GORDIENCO-ALEVTINA-CV_RU.pdf',
    );

    const buffer = await fs.readFile(filePath);
    console.log('CV PDF file read successfully.');

    parser = new PDFParse({ data: buffer });
    const result = await parser.getText();

    if (!result.text || result.text.trim().length === 0) {
      console.error('No text found in CV PDF');
      return NextResponse.json(
        { success: false, error: 'No text found in CV PDF' },
        { status: 400 },
      );
    }
    console.log(`Extracted ${result.text.length} characters from CV PDF.`);

    const chunks = await chunkContent(result.text);
    console.log(`Created ${chunks.length} CV chunks.`);

    const embeddings = await generateEmbeddings(chunks);
    console.log('Generated embeddings for all CV chunks.');

    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
      source: 'cv',
    }));

    console.log("Clearing existing 'cv' documents from the database...");
    await db.delete(documents).where(eq(documents.source, 'cv'));
    console.log("Old 'cv' documents cleared.");

    console.log(`Inserting ${records.length} new 'cv' records...`);
    await db.insert(documents).values(records);
    console.log("Successfully inserted new 'cv' records.");

    return NextResponse.json({
      success: true,
      message: `Created and stored ${records.length} searchable chunks from CV.`,
    });
  } catch (error) {
    console.error('CV PDF processing error:', error);
    let errorMessage = 'Failed to process CV PDF';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  } finally {
    if (parser) {
      await parser.destroy();
    }
  }
}
