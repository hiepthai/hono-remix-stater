import { describeRoute, resolver } from 'hono-openapi';
import { z, type ZodType } from 'zod';

// Helper to create JSON response schema
const jsonResponse = (schema: ZodType, description: string) => ({
  description,
  content: {
    'application/json': {
      schema: resolver(schema),
    },
  },
});

// Common response schemas
export const successResponse = (
  dataSchema: ZodType,
  description = 'Successful response',
) => ({
  schema: z.object({ ok: z.boolean(), data: dataSchema }),
  description,
});

export const errorResponse = (description = 'Resource not found') => ({
  schema: z.object({ ok: z.boolean(), error: z.string() }),
  description,
});

export const messageResponse = (description = 'Successful response') => ({
  schema: z.object({ ok: z.boolean(), message: z.string() }),
  description,
});

// Helper to create describeRoute with common patterns
export const describe = (
  operationId: string,
  responses: Record<number, { schema: ZodType; description: string }>,
  tags?: string[],
) =>
  describeRoute({
    operationId,
    responses: Object.fromEntries(
      Object.entries(responses).map(([status, { schema, description }]) => [
        status,
        jsonResponse(schema, description),
      ]),
    ),
    ...(tags && { tags }),
  });
