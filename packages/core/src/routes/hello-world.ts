import { z } from 'zod';

import { honoFactory } from '../hono.js';
import { validator } from '../utils/custom-validator.js';
import { describe, successResponse } from '../utils/route-helpers.js';

const HelloDTO = z.object({
  name: z.string(),
});

const HelloResponse = z.object({
  message: z.string(),
});

export const helloWorldRoutes = honoFactory
  .createApp()
  .post(
    '/say',
    describe('sayHelloWorld', { 201: successResponse(HelloResponse) }, [
      'HelloWorld',
    ]),
    validator('json', HelloDTO),
    async (c) => {
      const { name } = c.req.valid('json');

      return c.json(
        {
          ok: true,
          data: {
            message: `Hello, ${name}!`,
          },
        },
        201,
      );
    },
  );
