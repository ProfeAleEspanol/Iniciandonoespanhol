# Profe Ale Platform

Plataforma inicial de ensino online infantil para a marca Profe Ale.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Supabase Auth (`@supabase/supabase-js` + `@supabase/ssr`)

## Rotas implementadas

- `/` landing page
- `/metodologia` proposta pedagogica
- `/planos` precificacao base
- `/login` autenticacao com email/senha
- `/dashboard` area interna com trilha inicial

## Estrutura principal

- `src/app` paginas
- `src/components/site-shell.tsx` layout publico
- `src/components/auth-form.tsx` formulario de login/cadastro
- `src/lib/course-data.ts` dados iniciais de modulos e aulas
- `src/lib/supabase/*` cliente Supabase (browser/server/middleware)
- `src/proxy.ts` protecao de rotas
- `src/app/api/health/route.ts` endpoint simples de health check
- `supabase/sql/001_initial_schema.sql` schema inicial do banco + RLS

## Configurar .env.local

1. Copie o arquivo `.env.local.example` para `.env.local`.
2. No Supabase, abra `Project Settings > API`.
3. Preencha as variaveis:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

4. Em `Authentication > URL Configuration` no Supabase, configure:
- `Site URL`: URL da aplicacao (ex.: `http://localhost:3000` no dev)
- `Redirect URLs`: inclua as URLs de dev/producao

## Executar localmente

No PowerShell deste ambiente, use `npm.cmd`:

```bash
npm.cmd install
npm.cmd run dev
```

Para validar:

```bash
npm.cmd run lint
npm.cmd run build
```

Health check local:

```bash
http://localhost:3000/api/health
```

## GitHub + Vercel

1. Criar repositorio no GitHub e subir a pasta `platform`.
2. Importar o repositorio na Vercel.
3. Framework detectado automaticamente como Next.js.
4. Build command: `npm run build`
5. Output: padrao Next.js

## Proximos passos tecnicos (P0)

1. Modelagem de banco para cursos, modulos, aulas e progresso.
2. Integrar dashboard com dados reais do Supabase.
3. Checkout recorrente com Stripe.
4. Painel de responsavel com relatorio semanal.
