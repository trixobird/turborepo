import {authenticateUser} from './auth';
import {YogaInitialContext} from "graphql-yoga";

export type GraphQLContext = {
  currentUserId: null | string
}

export async function createContext(
  initialContext: YogaInitialContext
): Promise<GraphQLContext> {
  return {
    currentUserId: await authenticateUser(initialContext.request),
  };
}
