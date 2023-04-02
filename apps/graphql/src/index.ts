import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { createContext } from './context';
import schema from "./schema/index";

function index() {
  const yoga = createYoga({ schema , context: createContext });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
  });
}

index();
