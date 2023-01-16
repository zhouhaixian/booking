FROM node:lts
WORKDIR /usr/src/app
COPY ./ ./
RUN corepack enable
RUN pnpm --filter @booking/configs install
RUN pnpm --filter @booking/api install
RUN pnpm run build:api
EXPOSE 8080
CMD [ "node", "packages/api/dist/src/main" ]