import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { createContext } from './context.js';
import schema from './schema/index.js';
import { logger } from 'logger';

function index() {
  const yoga = createYoga({ schema, context: createContext });
  const server = createServer(yoga);
  const port = 4001;
  server.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}/graphql`);
  });
}

index();
