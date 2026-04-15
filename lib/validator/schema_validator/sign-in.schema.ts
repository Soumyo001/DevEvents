import { z } from "zod";

export const signInSchema = z.object({
    identifier: z.string()
        .min(1, {message: "Please enter your email"})
        .email({
            message: "please enter a valid email",
            pattern: z.regexes.html5Email,
        }),
    password: z.string()
        .min(1, {message: "Please enter your password"}),
});

export type signInSchemaType = z.infer<typeof signInSchema>;