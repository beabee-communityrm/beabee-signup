FROM node:16.13-alpine as builder

WORKDIR /builder

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY ./src ./src/
RUN NODE_ENV=production npm run build

FROM node:16.13-alpine as app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--enable-source-maps
ENV TYPEORM_MIGRATIONS=built/migrations/*.js
ENV TYPEORM_ENTITIES=built/models/*.js

WORKDIR /opt/beabee-signup

RUN mkdir -p uploads/logos
RUN chown -R node:node uploads

COPY --chown=node:node --from=builder /builder/package.json /builder/package-lock.json ./
COPY --chown=node:node --from=builder /builder/node_modules/ ./node_modules/
RUN npm prune

COPY --chown=node:node --from=builder /builder/built/ ./built/

USER node
CMD [ "node", "built/app" ]
