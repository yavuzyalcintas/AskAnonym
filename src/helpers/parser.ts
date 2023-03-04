import { z } from "zod";

export const specialCharacterParse = (str: string) => z
  .string()
  .min(1)
  .trim()
  .regex(/^[a-zA-Z]+$/)
  .safeParse(str);


export const generalParse = (str: string) => z
  .string()
  .max(250)
  .regex(/^[a-zA-ZıİüÜöÖçÇşŞğĞ0-9!()"?.:_/*+-._\ ]+$/)
  .optional()
    .or(z.literal(''))
  .safeParse(str);