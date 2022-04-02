import { z } from 'zod';

export const gqlPayload = <T extends z.ZodTypeAny>(shape: T) =>
  z.object({
    data: z.object({
      id: z.string(),
      attributes: shape,
    }),
  });

interface Payload<T> {
  data: {
    id: string;
    attributes: T;
  };
}

export const extract = <T extends object>(value: Payload<T>) => ({
  id: value.data.id,
  ...value.data.attributes,
});

export const Locale = z.enum(['en', 'he-IL']).default('en');
export type Locale = z.infer<typeof Locale>;
