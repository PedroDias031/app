# Marcelo Chavan · loja (React + TypeScript + Vite + Cloudflare Workers)

## Deploy (3 comandos)
```
npm install
npx wrangler login
npm run deploy      # build + wrangler deploy
```
Via Git (Workers Builds): Workers & Pages → Create → Import a repository. Build command `npm run build`, deploy command `npx wrangler deploy`.
**Não use o upload por arrastar e soltar**: ele não suporta projetos com build.

## Estrutura
- `shared/catalog.ts`: catálogo e regras de preço, frete e cupom (front e Worker)
- `src/`: app React (`pages/`, `components/`, `store/`, `lib/`, `styles/`)
- `worker/index.ts`: rotas `/api/orders` (recalcula preços e gera link do WhatsApp) e `/api/newsletter`; o resto vai para os assets (SPA)
- `public/_headers`: cabeçalhos de segurança e cache

## Configuração
- `WHATSAPP_NUMBER` em `wrangler.toml`.
- Para guardar pedidos e e-mails, crie os KV `ORDERS` e `NEWSLETTER` e descomente em `wrangler.toml`.
- Teste local com Worker: `npm run dev:cf`. Cupom de teste: `BEMVINDO10`.
