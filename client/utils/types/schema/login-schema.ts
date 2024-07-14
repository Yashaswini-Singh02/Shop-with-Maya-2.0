"use client";
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),

  password: z
    .string()
    .min(4)
    .max(8)
    .regex(/^[a-zA-Z0-9]{3,30}$/, {
      message: "Password must include at least 1 letter and 1 number.",
    }),
});
