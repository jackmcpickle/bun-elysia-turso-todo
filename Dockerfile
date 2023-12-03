FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
COPY public public
COPY tsconfig.json tailwind.config.js postcss.config.js drizzle.config.ts ./
RUN bun run build

ENV NODE_ENV production
CMD ["bun", "run", "./src/index.tsx"]

EXPOSE 3000
