/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  id: Scalars['ID'];
  post: Post;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createMessage: Message;
  createPost: Post;
  createVote: Vote;
  deleteMessage: Message;
  login: SignUpDto;
  signup: SignUpDto;
  updateMessage: Message;
  userTyping: Scalars['Boolean'];
};


export type MutationCreateCommentArgs = {
  body: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  message: Scalars['String'];
  receiverId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  description: Scalars['String'];
  url: Scalars['String'];
};


export type MutationCreateVoteArgs = {
  postId: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateMessageArgs = {
  id: Scalars['String'];
  message: Scalars['String'];
};


export type MutationUserTypingArgs = {
  receiverId: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ID']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['ID']>;
};

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['ID'];
  postedBy: User;
  url: Scalars['String'];
  votes: Array<Vote>;
};

export type Query = {
  __typename?: 'Query';
  feed: QueryFeedConnection;
  info: Scalars['String'];
  me: User;
  messages: Array<Message>;
  post: Post;
  votes: Array<Vote>;
};


export type QueryFeedArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  postId: Scalars['String'];
};


export type QueryVotesArgs = {
  postId: Scalars['String'];
};

export type QueryFeedConnection = {
  __typename?: 'QueryFeedConnection';
  edges: Array<Maybe<QueryFeedConnectionEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryFeedConnectionEdge = {
  __typename?: 'QueryFeedConnectionEdge';
  cursor: Scalars['ID'];
  node: Post;
};

export type SignUpDto = {
  __typename?: 'SignUpDto';
  token: Scalars['String'];
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Array<Message>;
  newPost: Post;
  newVote: Vote;
  userTyping: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<Post>;
  votes: Array<Vote>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  post: Post;
  user: User;
};

export type InfoQueryVariables = Exact<{ [key: string]: never; }>;


export type InfoQuery = { __typename?: 'Query', info: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'SignUpDto', token: string } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignUpDto', token: string } };


export const InfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<InfoQuery, InfoQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;