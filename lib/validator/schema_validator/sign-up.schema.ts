import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string()
        .min(1, {message: "Please Enter your email"})
        .email({
            message: "Please Enter a valid email", 
            pattern: z.regexes.html5Email,
        }),
    password: z.string()
        .min(1, {message: "Please Enter your password"})
        .min(8, {message: "Password must be at least 8 characters"})
        .regex(/[A-Z]/, "Must contain one uppercase letter")
        .regex(/[a-z]/, "Must contain one lowercase letter")
        .regex(/[0-9]/, "Must contain one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain special character"),
    passwordConfirm: z.string()
        .min(1, {message: "Re-enter your password"})
}).refine(
    (data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    },
);

export type signUpSchemaType = z.infer<typeof signUpSchema>;