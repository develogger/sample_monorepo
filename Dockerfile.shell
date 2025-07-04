FROM node:lts-alpine AS builder
RUN apk add python3 make gcc g++
RUN npm install -g nx pnpm@10.8.1

WORKDIR /app/
ARG BUILD_VERSION
ENV BUILD_VERSION=$BUILD_VERSION
ARG NUXT_SANDBOX_NAME
ENV NUXT_SANDBOX_NAME=$NUXT_SANDBOX_NAME
ENV NODE_OPTIONS=--max_old_space_size=8192
COPY . .
RUN pnpm i
WORKDIR /app/apps/shell/
RUN npx nuxi generate
FROM nginx:stable-alpine AS shell
COPY --from=builder /app/apps/shell/.output/public /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html/beta/
RUN mv /usr/share/nginx/html/_nuxt /usr/share/nginx/html/beta/
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/beta/
COPY default.conf /etc/nginx/conf.d/default.conf