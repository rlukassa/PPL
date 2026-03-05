
export interface CreateUserDto { 
    username: string, 
    email: string, 
    password: string,
    role: "DOSEN" | "TIM_SPSS"
}

export interface LoginDto { 
    email : string, 
    password : string
}

export interface AuthResponseDto {
  user_id:  number;
  username: string;
  email:    string;
  role:     string;
}