import { NextResponse } from "next/server";
import { AuthServices } from "@/services/auth.services";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email dan Password wajib diisi" }, 
        { status: 400 }
      );
    }
    const user = await AuthServices.login(body);
    return NextResponse.json({
      message: "Login Berhasil!",
      data: user
    }, { status: 200 });

  } catch (error: any) {
    console.error("Login Error:", error.message);
    
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan pada server" }, 
      { status: 401 } 
    );
  }
}