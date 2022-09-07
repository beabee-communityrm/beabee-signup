# syntax=docker/dockerfile:1.3-labs

FROM node:16.13-alpine as builder

WORKDIR /opt/beabee-signup

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN NODE_ENV=production npx vite build

FROM nginx:1.18.0-alpine

COPY <<EOF /etc/nginx/conf.d/default.conf
server {
  listen       80;
  listen  [::]:80;
  server_name  _;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    expires -1;
    add_header Cache-Control \'no-cache, no-store\';
    try_files \$uri \$uri/ /index.html;
  }

  location /assets {
    expires 1y;
  }
}
EOF

COPY --from=builder --chown=nginx:nginx /opt/beabee-signup/dist/ /usr/share/nginx/html
