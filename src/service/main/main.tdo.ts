import { z } from "zod";

export const mainConfig = z.object({
  admins: z.array(z.string().regex(/^(\d{15,25})$/)),
});