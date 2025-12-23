import { Scalar } from '@scalar/hono-api-reference';
import { env } from 'hono/adapter';
import { HTTPException } from 'hono/http-exception';
import { generateSpecs } from 'hono-openapi';

import { honoFactory } from './hono.js';
import { helloWorldRoutes } from './routes/hello-world.js';

const app = honoFactory.createApp();

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        ok: false,
        error: err.message,
      },
      err.status,
    );
  }

  console.error(err);

  return c.json(
    {
      ok: false,
      error: {
        message: 'Server Runtime Error',
        details: [err.message || 'Internal Server Error'],
      },
    },
    500,
  );
});

export const routes = app
  .basePath('/api')
  .get('/_health', async (c) => {
    return c.json({ ok: true });
  })
  .get('/openapi.json', async (c) => {
    const { API_VERSION } = env<{ API_VERSION: string }>(c);
    const specs = await generateSpecs(app, {
      documentation: {
        info: {
          title: 'Core API',
          version: API_VERSION ?? '1.0.0',
          description: 'Core API documentation',
        },
        servers: [
          { url: 'http://localhost:3030', description: 'Local Server' },
        ],
      },
    });
    return c.json(specs);
  })
  .get(
    '/docs',
    Scalar({
      url: '/api/openapi.json',
      theme: 'kepler',
      layout: 'modern',
      defaultHttpClient: { targetKey: 'js', clientKey: 'axios' },
    }),
  )
  .route('/hello-world', helloWorldRoutes);

export { app };
