# Estágio 1: Instalação das dependências
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Estágio 2: Build do projeto Next.js
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Injeta a variável de ambiente apontando para a sua API local/mock
ENV NEXT_PUBLIC_API_URL=http://localhost:3000
RUN npm run build

# Estágio 3: Execução da aplicação em ambiente de produção
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Cria um usuário de sistema por questões de segurança (evita rodar como root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
