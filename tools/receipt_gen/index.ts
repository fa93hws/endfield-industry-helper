#!/usr/bin/env tsx
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { genItems } from './generate_items.js';
import { genReceipts } from './generate_receipts.js';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const csvDir = path.join(__dirname, 'csv');
  const outputDir = path.join(__dirname, '../../src/receipts/generated');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('=== Generating Items ===');
  const itemsCsvPath = path.join(csvDir, 'items.csv');
  const itemsOutputPath = path.join(outputDir, 'items.ts');
  const itemsContent = genItems(itemsCsvPath);
  fs.writeFileSync(itemsOutputPath, itemsContent, 'utf-8');
  console.log('Generated:', itemsOutputPath);
  console.log('');

  console.log('=== Generating Receipts ===');
  const receiptsCsvPath = path.join(csvDir, 'receipts.csv');
  const receiptsOutputPath = path.join(outputDir, 'receipts.ts');
  const receiptsContent = genReceipts(receiptsCsvPath);
  fs.writeFileSync(receiptsOutputPath, receiptsContent, 'utf-8');
  console.log('Generated:', receiptsOutputPath);
  console.log('');

  console.log('✅ All files generated successfully!');
}

main();
