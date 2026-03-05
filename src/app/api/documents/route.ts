import { NextResponse } from "next/server";
import pool from "@/src/lib/db";

export async function GET() { 
    try { 
        const res = await pool.query('SELECT * FROM documents ORDER BY created_at DESC')
        return NextResponse.json(res.rows)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 }) 
    }
}