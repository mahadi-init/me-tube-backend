import z from "zod";

export const schema = z.object({
  tables: z.array(z.string()),
});

export type schemaType = z.infer<typeof schema>;
