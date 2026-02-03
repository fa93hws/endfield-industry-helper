import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { genItems } from '../../../tools/receipt_gen/generate_items';
import { genReceipts } from '../../../tools/receipt_gen/generate_receipts';

const repoRoot = path.resolve(__dirname, '../../..');

describe('Auto-generated files', () => {
  it('should be up to date with CSV sources', () => {
    const itemsPath = path.join(repoRoot, 'src/receipts/generated/items.ts');
    const receiptsPath = path.join(repoRoot, 'src/receipts/generated/receipts.ts');

    // Check that generated files exist
    expect(
      fs.existsSync(itemsPath),
      'Generated items.ts file does not exist. Run: pnpm run autogen',
    ).toBe(true);

    expect(
      fs.existsSync(receiptsPath),
      'Generated receipts.ts file does not exist. Run: pnpm run autogen',
    ).toBe(true);

    // Read actual file contents
    const actualItemsContent = fs.readFileSync(itemsPath, 'utf-8');
    const actualReceiptsContent = fs.readFileSync(receiptsPath, 'utf-8');

    // Generate fresh content from CSV
    const csvPath = path.join(repoRoot, 'tools/receipt_gen/csv');
    const expectedItemsContent = genItems(path.join(csvPath, 'items.csv'));
    const expectedReceiptsContent = genReceipts(path.join(csvPath, 'receipts.csv'));

    // Compare actual vs expected
    expect(actualItemsContent, 'items.ts is out of date. Please run: pnpm run autogen').toBe(
      expectedItemsContent,
    );

    expect(actualReceiptsContent, 'receipts.ts is out of date. Please run: pnpm run autogen').toBe(
      expectedReceiptsContent,
    );
  });
});
