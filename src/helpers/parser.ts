import { z } from "zod";

export const specialCharacterParse = (str: string) => z
  .string()
  .min(1)
  .trim()
  .regex(/^[a-zA-Z]+$/)
  .safeParse(str);


export const generalParse = (str: string) => z
  .string()
  .max(150)
  .regex(/^[a-zA-ZıİüÜöÖçÇşŞğĞ1-9!()"?.\ ]+$/)
  .safeParse(str);