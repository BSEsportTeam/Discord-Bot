import type { z } from "zod";
import type { clientErrorSchema } from "$core/utils/api/brawl_stars/client_error.z";

export type ClientError = z.infer<typeof clientErrorSchema>;