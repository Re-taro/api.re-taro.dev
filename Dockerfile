FROM node:18 AS build

WORKDIR /build

ENV NODE_ENV=development

COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile

COPY . ./
RUN pnpm build

FROM node:18 AS deps

WORKDIR /deps

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile

FROM gcr.io/distroless/nodejs:18

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /build/dist /app/dist
COPY --from=deps /deps/node_modules /app/node_modules

CMD ["dist/main"]
