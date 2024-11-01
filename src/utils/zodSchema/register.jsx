import z from "zod";

export const registerSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.string().min(1, 'role is required'),
    //cfpassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
    cfpassword: z.string().min(6, 'Confirm Password must be at least 6 characters')
}).refine((data) => data.password === data.cfpassword, {
    message: "Passwords must match!!",
    path: ["cfpassword"], // Corrected to match the field name
})

