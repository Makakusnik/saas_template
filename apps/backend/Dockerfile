FROM node:22-alpine

ARG PNPM_CACHE_DIR="/pnpm/store"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps ./apps
COPY tsconfig.base.json ./
COPY packages ./packages

RUN --mount=type=cache,id=pnpm-store,target=${PNPM_CACHE_DIR} \
    pnpm install --frozen-lockfile

EXPOSE 3001

CMD ["pnpm", "dev"]