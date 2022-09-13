FROM node:16.16.0-alpine as builder

WORKDIR /builder

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY ./src ./src/
RUN NODE_ENV=production npm run build

FROM node:16.16.0-alpine as app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--enable-source-maps

WORKDIR /opt/beabee-signup

COPY --chown=node:node --from=builder /builder/package.json /builder/package-lock.json ./
COPY --chown=node:node --from=builder /builder/node_modules/ ./node_modules/
RUN npm prune

COPY --chown=node:node --from=builder /builder/built/ ./built/

USER node
CMD [ "node", "built/app" ]
