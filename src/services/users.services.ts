import { db } from "@/lib/db.prisma";
import { CreateUserDto } from "@/types/users.dto";

export const UserServices = {
    async  getAllUsers() { 
    try { 
        const users = await db.users.findMany({orderBy: { user_id: "asc" }});
        return users;
    } catch (error: any) { 
        console.error(error.message); 
    }
},
    async getUserById(id: number) { 
    try { 
        const user = await db.users.findUnique({
            where: { user_id: id },
        });
        return user;
    } catch (error: any) { 
        console.error(error.message); 
    }
},

    async createUser(data: CreateUserDto) { 
        try { 
            let r : "DOSEN" | "TIM_SPSS";

            if (data.role === "DOSEN") { 
                r = "DOSEN";
            }
            else {
                r = "TIM_SPSS";
            }
            const newUser = await db.users.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    role : r 
                },
            });
            return newUser;
        } catch (error: any) { 
            console.error("err : ",error) ;
        }
    },

    async deleteAllUsers() {
        try { 
            await db.users.deleteMany();
        } catch (error: any) { 
            console.error("err : ",error) ; 
        }
    }
}

