import {z} from "zod";

export const createUserSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    phone_number: z.string().regex(/^\d{10}$/, "Phone number must contain exactly 10 numeric digits")
}); 
