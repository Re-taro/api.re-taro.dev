# syntax=docker/dockerfile:1
FROM node:18 AS build

ENV NODE_ENV=development

WORKDIR /build

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . ./

RUN pnpm run build

FROM node:18 AS deps

ENV NODE_ENV=production

WORKDIR /deps
COPY package.json pnpm-lock.yaml ./

RUN  npm install -g pnpm && pnpm install --frozen-lockfile

FROM gcr.io/distroless/nodejs:18

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /build/dist /app/dist
COPY --from=deps /deps/node_modules /app/node_modules

CMD ["dist/src/main"]
