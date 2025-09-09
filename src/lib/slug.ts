/**
 * Slug utility functions for restaurant URL management
 */

/**
 * Generate a URL-friendly slug from restaurant name
 * @param name Restaurant name
 * @returns URL-friendly slug
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Validate if a slug is valid format
 * @param slug Slug to validate
 * @returns boolean
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 50;
}

/**
 * Check if slug is available (not reserved)
 * @param slug Slug to check
 * @returns boolean
 */
export function isSlugAvailable(slug: string): boolean {
  const reservedSlugs = [
    'www',
    'api',
    'admin',
    'portal',
    'yonetim',
    'app',
    'mail',
    'ftp',
    'blog',
    'help',
    'support',
    'contact',
    'about',
    'pricing',
    'terms',
    'privacy',
    'login',
    'register',
    'dashboard',
    'kitchen',
    'menu'
  ];
  
  return !reservedSlugs.includes(slug.toLowerCase());
}

/**
 * Generate unique slug by appending number if needed
 * @param baseSlug Base slug
 * @param existingSlugs Array of existing slugs
 * @returns Unique slug
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  let counter = 1;
  
  while (existingSlugs.includes(slug) || !isSlugAvailable(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

/**
 * Extract subdomain from hostname
 * @param hostname Full hostname
 * @returns Subdomain or null
 */
export function extractSubdomain(hostname: string): string | null {
  const parts = hostname.split('.');
  
  // For localhost development
  if (hostname.includes('localhost')) {
    return null;
  }
  
  // For production (e.g., restaurant.siparisqr.com)
  if (parts.length >= 3) {
    const subdomain = parts[0];
    // Skip www and other system subdomains
    if (['www', 'api', 'portal', 'yonetim'].includes(subdomain)) {
      return null;
    }
    return subdomain;
  }
  
  return null;
}

/**
 * Build restaurant URL
 * @param slug Restaurant slug
 * @param path Optional path
 * @returns Full URL
 */
export function buildRestaurantUrl(slug: string, path: string = ''): string {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? `https://${slug}.siparisqr.com`
    : `http://localhost:3000`;
  
  return `${baseUrl}${path}`;
}

/**
 * Build table URL for QR code
 * @param slug Restaurant slug
 * @param tableId Table ID
 * @returns QR code URL
 */
export function buildTableUrl(slug: string, tableId: string): string {
  return buildRestaurantUrl(slug, `/masa/${tableId}`);
}