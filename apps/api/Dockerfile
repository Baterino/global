# Build context: apps/api (set Railway service Root Directory to this folder).
FROM node:22-bookworm-slim
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build && npm prune --omit=dev

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/index.js"]
