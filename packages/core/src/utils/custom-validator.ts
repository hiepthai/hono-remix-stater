import type { Context, Env } from 'hono';
import { validator as honoValidator } from 'hono-openapi';
import { ZodType } from 'zod';

export function validator<
  T extends ZodType,
  Target extends 'json' | 'query' | 'param' | 'header' | 'cookie' | 'form',
  E extends Env = Env,
  P extends string = string,
>(
  target: Target,
  schema: T,
): ReturnType<typeof honoValidator<T, Target, E, P>> {
  return honoValidator(target, schema, (result, c: Context) => {
    if (!result.success) {
      return c.json(
        {
          ok: false,
          error: {
            message: 'Validation Error',
            details: result.error,
          },
        },
        400,
      );
    }
  });
}
