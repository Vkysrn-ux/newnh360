import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { ResultSetHeader } from "mysql2";

// GET: List all products
export async function GET() {
  try {
    const [products] = await db.query("SELECT * FROM products ORDER BY created_at DESC");
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST: Create a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name, price, original_price, image_url, description, rating, reviews, category, size,
      features, warranty, specifications, detailed_description, benefits, technology,
      certifications, suitable_for, care_instructions, why_choose, in_stock
    } = body;

    const [result] = await db.query(
      `INSERT INTO products (
        name, price, original_price, image_url, description, rating, reviews, category, size,
        features, warranty, specifications, detailed_description, benefits, technology,
        certifications, suitable_for, care_instructions, why_choose, in_stock
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
      [
        name, price, original_price, image_url, description, rating, reviews, category, size,
        JSON.stringify(features), warranty, JSON.stringify(specifications), detailed_description,
        JSON.stringify(benefits), JSON.stringify(technology), JSON.stringify(certifications),
        JSON.stringify(suitable_for), JSON.stringify(care_instructions), JSON.stringify(why_choose), in_stock
      ]
    ) as [ResultSetHeader, any];
    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// PUT: Update a product
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id, name, price, original_price, image_url, description, rating, reviews, category, size,
      features, warranty, specifications, detailed_description, benefits, technology,
      certifications, suitable_for, care_instructions, why_choose, in_stock
    } = body;
    if (!id) return NextResponse.json({ error: "Missing product id" }, { status: 400 });

    await db.query(
      `UPDATE products SET
        name=?, price=?, original_price=?, image_url=?, description=?, rating=?, reviews=?, category=?, size=?,
        features=?, warranty=?, specifications=?, detailed_description=?, benefits=?, technology=?,
        certifications=?, suitable_for=?, care_instructions=?, why_choose=?, in_stock=?
      WHERE id=?`,
      [
        name, price, original_price, image_url, description, rating, reviews, category, size,
        JSON.stringify(features), warranty, JSON.stringify(specifications), detailed_description,
        JSON.stringify(benefits), JSON.stringify(technology), JSON.stringify(certifications),
        JSON.stringify(suitable_for), JSON.stringify(care_instructions), JSON.stringify(why_choose), in_stock, id
      ]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE: Delete a product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
} 