# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM node:alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=graphql --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN yarn global add pnpm

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY .git .git
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Generate prisma client
COPY ./apps/graphql/prisma/. ./apps/graphql/prisma/.
RUN pnpm --filter=graphql generate

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=graphql...

# Remove node_module and src folders
RUN rm -rf node_modules && pnpm recursive exec -- rm -rf ./node_modules ./src

FROM node:alpine AS stripper
WORKDIR /app

COPY --from=installer /app .
RUN yarn global add pnpm
RUN pnpm install --prod

FROM node:alpine AS runner
WORKDIR /app
ENV DATABASE_URL="postgresql://postgres:postgre@host.docker.internal:5432/yoga-tutorial?schema=public&connection_limit=5"

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 graphqljs
USER graphqljs
COPY --from=stripper /app .

CMD node --conditions=javascript apps/graphql/dist/index.js
