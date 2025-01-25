FROM node AS builder
WORKDIR /build
COPY package.json .
RUN npm install
COPY public ./public/
COPY src ./src/
ENV REACT_APP_BACKEND_URL=/api
RUN npm run build
FROM nginx:alpine AS runtime
COPY --from=builder /build/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
