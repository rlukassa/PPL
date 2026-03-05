import { NextResponse } from 'next/server'; 
import pool from '@/src/lib/db';

export async function GET() { 
    try { 
        const res = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
        return NextResponse.json(res.rows)
    } catch (error) { 
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}

export async function POST(req: Request) { 
    try { 
        const {
            email, 
            password, 
            username, 
            role
        } = await req.json(); 
    

    const q = `
        INSERT INTO users (email, password, username, role) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [email, password, username, role];
    const res = await pool.query(q, values);
    return NextResponse.json(res.rows[0], { status: 201 })
} 
    
    catch (error: any) { 
        return NextResponse.json({ error: error.message }, { status: 500 }); 
    }
}