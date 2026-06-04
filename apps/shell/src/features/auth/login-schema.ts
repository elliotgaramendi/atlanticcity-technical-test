import { z } from "zod";

export const loginSchema = z.object({
  password: z.string().min(1, "La contrasena es requerida"),
  username: z.string().min(1, "El usuario es requerido")
});

export type LoginFormValues = z.infer<typeof loginSchema>;
