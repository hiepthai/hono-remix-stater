import { Scalar } from '@scalar/hono-api-reference';
import { env } from 'hono/adapter';
import { generateSpecs } from 'hono-openapi';

import { honoFactory } from './hono.js';
import { helloWorldRoutes } from './routes/hello-world.js';

const app = honoFactory.createApp();

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
