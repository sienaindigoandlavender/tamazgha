import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Point directly to our new repository storage layout
const ARCHIVE_DIRECTORY = path.join(process.cwd(), 'data/archive');

export interface ArchiveSpecimen {
  slug: string;
  category: string;
  catalogId: string;
  title: string;
  tifinagh: string;
  classification: string;
  medium: string;
  region: string;
  provenance: string;
  era: string;
  content: string;
}

/**
 * Retrieves all items across all subfolders within data/archive/
 */
export function getAllSpecimens(): ArchiveSpecimen[] {
  // Read our top-level repository domains
  const categories = ['material', 'ephemeral', 'vernacular'];
  let allSpecimens: ArchiveSpecimen[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(ARCHIVE_DIRECTORY, category);
    
    // Check if the subdirectory exists to avoid runtime compilation crashes
    if (!fs.existsSync(categoryPath)) return;

    const fileNames = fs.readdirSync(categoryPath);

    fileNames.forEach((fileName) => {
      if (!fileName.endsWith('.md')) return;

      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Separate our YAML ledger header from the prose content
      const { data, content } = matter(fileContents);

      allSpecimens.push({
        slug,
        category,
        catalogId: data.catalogId || '',
        title: data.title || '',
        tifinagh: data.tifinagh || '',
        classification: data.classification || '',
        medium: data.medium || '',
        region: data.region || '',
        provenance: data.provenance || '',
        era: data.era || '',
        content,
      });
    });
  });

  // Sort chronologically/logically by Catalog ledger number (e.g., ARC-MAT-001)
  return allSpecimens.sort((a, b) => a.catalogId.localeCompare(b.catalogId));
}

/**
 * Fetches a singular specimen record based on its unique catalog routing slug
 */
export function getSpecimenBySlug(category: string, slug: string): ArchiveSpecimen | null {
  try {
    const fullPath = path.join(ARCHIVE_DIRECTORY, category, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      category,
      catalogId: data.catalogId || '',
      title: data.title || '',
      tifinagh: data.tifinagh || '',
      classification: data.classification || '',
      medium: data.medium || '',
      region: data.region || '',
      provenance: data.provenance || '',
      era: data.era || '',
      content,
    };
  } catch (error) {
    return null;
  }
}
