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
    .regex(
      /^[a-zA-ZıİüÜöÖçÇşŞğĞ0-9!()=%^&@<>#${}'"\r\n|\r|\n?.:_/*+-._\\u00a9\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff] ]+$/
    )
    .optional()

    .or(z.literal(""))
    .safeParse(str);
