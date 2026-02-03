import * as fs from 'fs';

interface ItemRow {
  category: string;
  id: string;
  englishName: string;
  chineseName: string;
}

// Convert snake_case to camelCase
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Parse CSV file
function parseItemsCSV(csvPath: string): ItemRow[] {
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.trim().split('\n');

  // Skip header
  const dataLines = lines.slice(1);

  const items: ItemRow[] = [];

  for (const line of dataLines) {
    if (!line.trim()) continue;

    const [category, id, englishName, chineseName] = line.split(',');

    items.push({
      category,
      id,
      englishName,
      chineseName,
    });
  }

  return items;
}

// Generate TypeScript code
function generateItemsTS(items: ItemRow[]): string {
  const lines: string[] = [];

  // Add file header
  lines.push('// This file is auto-generated. Do not edit manually.');
  lines.push('// Generated from tools/receipt_gen/csv/items.csv');
  lines.push('// Output: src/receipts/generated/items.ts');
  lines.push('');

  // Collect unique categories
  const categories = [...new Set(items.map((item) => item.category))].sort();

  // Add category enum (camelCase keys with snake_case values)
  lines.push('export enum ItemCategory {');
  categories.forEach((category) => {
    const camelCaseKey = toCamelCase(category);
    lines.push(`  ${camelCaseKey},`);
  });
  lines.push('}');
  lines.push('');

  // Add interface
  lines.push('export interface Item {');
  lines.push('  label: string;');
  lines.push('  category: ItemCategory;');
  lines.push('  imagePath: string;');
  lines.push('}');
  lines.push('');

  // Start items object
  lines.push('export const items: Record<string, Item> = {');

  // Generate each item entry
  items.forEach((item) => {
    const camelCaseKey = toCamelCase(item.id);
    const camelCaseCategory = toCamelCase(item.category);
    const imagePath = `/images/items/${item.id}.webp`;

    lines.push(`  ${camelCaseKey}: {`);
    lines.push(`    label: '${item.chineseName}',`);
    lines.push(`    category: ItemCategory.${camelCaseCategory},`);
    lines.push(`    imagePath: '${imagePath}',`);
    lines.push(`  },`);
  });

  // Close items object
  lines.push('};');
  lines.push('');

  return lines.join('\n');
}

// Main function - returns generated content
export function genItems(csvPath: string): string {
  const items = parseItemsCSV(csvPath);
  return generateItemsTS(items);
}
