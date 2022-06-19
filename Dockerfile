FROM node:18 as build

ENV NODE_ENV=development

WORKDIR /build

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . ./

RUN pnpm build

FROM node:18 as deps

ENV NODE_ENV=production

WORKDIR /deps
COPY --from=build /build/package.json /build/pnpm-lock.yaml ./

RUN  npm install -g pnpm && pnpm install --frozen-lockfile

FROM gcr.io/distroless/nodejs:18

WORKDIR /app

USER nonroot

COPY --from=deps /deps/package.json ./
COPY --from=deps /deps/node_modules ./node_modules/
COPY --from=build /build/dist/src ./dist/

CMD ["./dist/main"]
