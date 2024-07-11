"use client";
import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Inavlid email address",
  }),
  password: z
    .string()
    .min(4)
    .max(8)
    .regex(/^[a-zA-Z0-9]{3,30}$/, {
      message: "Password must include at least 1 letter and 1 number.",
    }),
});
