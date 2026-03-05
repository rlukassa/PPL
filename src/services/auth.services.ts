import { db } from "@/lib/db.prisma";
import { LoginDto, AuthResponseDto } from "@/types/users.dto";
import bcrypt from "bcrypt";

export const AuthServices = { 
    async login(data: LoginDto): Promise<AuthResponseDto> { 
        const user = await db.users.findUnique({
            where : {
                email: data.email 
            }
        });
        if (!user) {
            throw new Error("User tidak ditemukan!");
        }
        const pw = await bcrypt.compare(data.password, user.password);
        if (!pw) {
            throw new Error("Email atau Password salah!");
        }
        return {
            user_id : user.user_id, 
            username : user.username,
            email : user.email,
            role : user.role 
        };
    }
}