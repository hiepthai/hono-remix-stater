import { serve } from '@hono/node-server';
import { getLogger } from 'common';
import { Hono } from 'hono';

const app = new Hono();
const logger = getLogger();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

serve(
  {
    fetch: app.fetch,
    port: 3030,
  },
  (info) => {
    logger.info(`Server is running on http://localhost:${info.port}`);
  },
);
