import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isValidSlug, isSlugAvailable } from '@/lib/slug';

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Check if slug format is valid
    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { 
          available: false, 
          error: 'Slug format is invalid. Use only lowercase letters, numbers, and hyphens.' 
        },
        { status: 400 }
      );
    }

    // Check if slug is not reserved
    if (!isSlugAvailable(slug)) {
      return NextResponse.json(
        { 
          available: false, 
          error: 'This slug is reserved and cannot be used.' 
        },
        { status: 400 }
      );
    }

    // Check if slug already exists in database
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (existingRestaurant) {
      return NextResponse.json(
        { 
          available: false, 
          error: 'This slug is already taken.' 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      available: true, 
      message: 'Slug is available!' 
    });

  } catch (error) {
    console.error('Slug check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { error: 'Slug parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Check if slug format is valid
    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { 
          available: false, 
          error: 'Slug format is invalid' 
        }
      );
    }

    // Check if slug is not reserved
    if (!isSlugAvailable(slug)) {
      return NextResponse.json(
        { 
          available: false, 
          error: 'This slug is reserved' 
        }
      );
    }

    // Check if slug already exists in database
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { slug },
      select: { id: true }
    });

    return NextResponse.json({ 
      available: !existingRestaurant,
      message: existingRestaurant ? 'Slug is taken' : 'Slug is available'
    });

  } catch (error) {
    console.error('Slug check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}