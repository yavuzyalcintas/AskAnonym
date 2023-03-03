import { z } from "zod";

export const specialCharacterParse = (str: string) => z
  .string()
  .min(1)
  .regex(/^[a-zA-Z]+$/)
  .safeParse(str);


export const generalParse = (str: string) => z
  .string()
  .min(1)
  .max(150)
  .trim()
  .regex(/^[a-zA-Z1-9?.\ ]+$/)
  .safeParse(str);