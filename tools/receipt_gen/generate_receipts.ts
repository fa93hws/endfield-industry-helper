import * as fs from 'fs';

interface ReceiptRow {
  out1Item: string;
  out1Qty: number;
  in1Item: string;
  in1Qty: number;
  in2Item: string;
  in2Qty: number;
}

// Convert snake_case to camelCase
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Parse CSV file
function parseReceiptsCSV(csvPath: string): ReceiptRow[] {
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.trim().split('\n');

  // Skip header
  const dataLines = lines.slice(1);

  const receipts: ReceiptRow[] = [];

  for (const line of dataLines) {
    if (!line.trim()) continue;

    const [out1Item, out1Qty, in1Item, in1Qty, in2Item, in2Qty] = line.split(',');

    receipts.push({
      out1Item,
      out1Qty: parseInt(out1Qty),
      in1Item,
      in1Qty: parseInt(in1Qty),
      in2Item: in2Item || '',
      in2Qty: in2Qty ? parseInt(in2Qty) : 0,
    });
  }

  return receipts;
}

// Generate TypeScript code
function generateReceiptsTS(receipts: ReceiptRow[]): string {
  const lines: string[] = [];

  // Add file header
  lines.push('// This file is auto-generated. Do not edit manually.');
  lines.push('// Generated from tools/receipt_gen/csv/receipts.csv');
  lines.push('');

  // Add interfaces
  lines.push('export interface ReceiptItem {');
  lines.push('  item: string;');
  lines.push('  perMin: number;');
  lines.push('}');
  lines.push('');

  lines.push('export interface Receipt {');
  lines.push('  inputs: ReceiptItem[];');
  lines.push('  outputs: ReceiptItem[];');
  lines.push('}');
  lines.push('');

  // Start receipts array
  lines.push('export const receipts: Receipt[] = [');

  // Generate each receipt entry
  receipts.forEach((receipt) => {
    lines.push('  {');

    // Inputs
    lines.push('    inputs: [');
    lines.push(`      { item: '${toCamelCase(receipt.in1Item)}', perMin: ${receipt.in1Qty} },`);
    if (receipt.in2Item) {
      lines.push(`      { item: '${toCamelCase(receipt.in2Item)}', perMin: ${receipt.in2Qty} },`);
    }
    lines.push('    ],');

    // Outputs
    lines.push('    outputs: [');
    lines.push(`      { item: '${toCamelCase(receipt.out1Item)}', perMin: ${receipt.out1Qty} },`);
    lines.push('    ],');

    lines.push(`  },`);
  });

  // Close receipts array
  lines.push('];');
  lines.push('');

  return lines.join('\n');
}

// Main function - returns generated content
export function genReceipts(csvPath: string): string {
  const receipts = parseReceiptsCSV(csvPath);
  return generateReceiptsTS(receipts);
}
