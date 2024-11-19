import { z } from "zod";

export class UserValidation {
    static ADD = z.object({
        username: z.string().min(1, { message: "Required" }),
        point: z.number().min(0, { message: "Zero not allowed" }).nonnegative()
    })
}