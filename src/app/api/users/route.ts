import { NextResponse } from "next/server";
import { UserServices } from "@/services/users.services";

export async function GET() {
  const users = await UserServices.getAllUsers();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.email) return NextResponse.json({ error: "Email wajib isi" }, { status: 400 });
  if (!body.password) return NextResponse.json({ error: "Password wajib isi" }, { status: 400 });
  if (!body.username) return NextResponse.json({ error: "Username wajib isi" }, { status: 400 });
  if (!body.role) return NextResponse.json({ error: "Role wajib isi" }, { status: 400 });
  if (body.role !== "DOSEN" && body.role !== "TIM_SPSS") {
    return NextResponse.json({ error: "Role hanya boleh 'DOSEN' atau 'TIM_SPSS'" }, { status: 400 });
  }
  
  const newUser = await UserServices.createUser(body);
  return NextResponse.json(newUser, { status: 201 });
}

export async function DELETE() {
  try {
    await UserServices.deleteAllUsers();
    return NextResponse.json({ message: "Semua user berhasil dihapus" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}