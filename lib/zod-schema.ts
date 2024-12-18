import * as z from "zod";

export const OnboardingSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(20, { message: "Username cannot exceed 20 characters" })
    .regex(/^[a-z][a-z0-9_]*[a-z0-9]$/, {
      message:
        "Username can only contain alphabets, digits, and underscores, and cannot start or end with an underscore",
    }),
  city: z
    .string()
    .min(3, { message: "City Name must be more than 3 letters or so.." }),
  preferences: z
    .array(z.string())
    .min(1, { message: "Select at least one preference" }),
  challengeTypes: z
    .array(z.string())
    .min(1, { message: "Select at least one challenge type" }),
});
