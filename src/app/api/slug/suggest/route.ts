import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSlug, generateUniqueSlug, isValidSlug } from '@/lib/slug';

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Restaurant name is required' },
        { status: 400 }
      );
    }

    // Generate base slug from restaurant name
    const baseSlug = generateSlug(name);

    if (!baseSlug || !isValidSlug(baseSlug)) {
      return NextResponse.json(
        { error: 'Cannot generate valid slug from this name' },
        { status: 400 }
      );
    }

    // Get all existing slugs from database
    const existingRestaurants = await prisma.restaurant.findMany({
      select: { slug: true }
    });
    
    const existingSlugs = existingRestaurants.map(r => r.slug);

    // Generate unique slug
    const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

    // Generate additional suggestions
    const suggestions = [uniqueSlug];
    
    // Add variations if the base slug was taken
    if (uniqueSlug !== baseSlug) {
      const variations = [
        `${baseSlug}-restaurant`,
        `${baseSlug}-cafe`,
        `${baseSlug}-bistro`,
        `${baseSlug}-kitchen`
      ];
      
      for (const variation of variations) {
        const uniqueVariation = generateUniqueSlug(variation, existingSlugs);
        if (!suggestions.includes(uniqueVariation) && suggestions.length < 5) {
          suggestions.push(uniqueVariation);
        }
      }
    }

    return NextResponse.json({
      suggestions,
      primary: uniqueSlug
    });

  } catch (error) {
    console.error('Slug suggestion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json(
      { error: 'Name parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Generate base slug from restaurant name
    const baseSlug = generateSlug(name);

    if (!baseSlug || !isValidSlug(baseSlug)) {
      return NextResponse.json(
        { error: 'Cannot generate valid slug from this name' },
        { status: 400 }
      );
    }

    // Get all existing slugs from database
    const existingRestaurants = await prisma.restaurant.findMany({
      select: { slug: true }
    });
    
    const existingSlugs = existingRestaurants.map(r => r.slug);

    // Generate unique slug
    const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

    // Generate additional suggestions
    const suggestions = [uniqueSlug];
    
    // Add variations
    const variations = [
      `${baseSlug}-restaurant`,
      `${baseSlug}-cafe`,
      `${baseSlug}-bistro`,
      `${baseSlug}-kitchen`,
      `${baseSlug}-place`
    ];
    
    for (const variation of variations) {
      const uniqueVariation = generateUniqueSlug(variation, existingSlugs);
      if (!suggestions.includes(uniqueVariation) && suggestions.length < 5) {
        suggestions.push(uniqueVariation);
      }
    }

    return NextResponse.json({
      suggestions,
      primary: uniqueSlug
    });

  } catch (error) {
    console.error('Slug suggestion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}