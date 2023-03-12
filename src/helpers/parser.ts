import { z } from "zod";

export const specialCharacterParse = (str: string) =>
  z
    .string()
    .min(1)
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .optional()
    .or(z.literal(""))
    .safeParse(str);

export const generalParse = (str: string) =>
  z
    .string()
    .max(1000)
    .regex(/^[a-zA-ZıİüÜöÖçÇşŞğĞ0-9!()=%^&<>#${}'"\r\n|\r|\n?.:_/*+-._\ ]+$/)
    .optional()
    .or(z.literal(""))
    .safeParse(str);
