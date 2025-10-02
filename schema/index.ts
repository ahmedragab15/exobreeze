import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ message: "Full name is required" })
    .min(8, { message: "Full name must be at least 8 characters" })
    .max(20, { message: "Full name must be at most 20 characters" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/g, {
    //   message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
    // }),
});

export type registerSchemaValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/g, {
    //   message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
    // }),
});

export type loginSchemaValues = z.infer<typeof loginSchema>;

export const resetEmailSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
});

export type resetEmailSchemaValues = z.infer<typeof resetEmailSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
