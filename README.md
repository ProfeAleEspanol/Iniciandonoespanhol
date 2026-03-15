# Profe Ale Platform

Plataforma infantil de espanhol da marca Profe Ale, pronta para deploy inicial na Vercel.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Supabase Auth (`@supabase/supabase-js` + `@supabase/ssr`)

## Estado atual

- Landing page publica
- Paginas institucionais de metodologia e planos
- Dashboard com modulos, aulas e progresso local
- Pagina de aula com materiais em PDF e video
- Middleware de sessao com Supabase pronto para uso em producao
- Build e lint validados localmente

## Modos de acesso

O projeto suporta dois modos:

1. Sem Supabase configurado
- `/login` usa entrada simplificada por nome
- progresso salvo localmente no navegador
- adequado para demonstracao inicial

2. Com Supabase configurado
- `/login` usa email e senha
- middleware protege `/dashboard`
- base pronta para evoluir para progresso persistido em banco

## Rotas implementadas

- `/` landing page
- `/metodologia` proposta pedagogica
- `/planos` precificacao base
- `/login` entrada da familia
- `/dashboard` area interna com trilha inicial
- `/dashboard/aulas/[lessonId]` pagina de aula
- `/api/health` health check simples

## Estrutura principal

- `src/app` paginas
- `src/components/site-shell.tsx` layout compartilhado
- `src/components/auth-form.tsx` formulario de login/cadastro com Supabase
- `src/components/welcome-card.tsx` entrada simplificada por nome
- `src/lib/course-data.ts` dados iniciais de modulos e aulas
- `src/lib/student-store.ts` persistencia local de nome e progresso
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

Exemplo de producao:

```bash
Site URL: https://seu-projeto.vercel.app
Redirect URLs:
- http://localhost:3000
- https://seu-projeto.vercel.app
```

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
6. Em `Settings > Environment Variables`, configurar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Arquivos para revisar antes do commit

- `public/materiais/Magical_Spanish_Day aula 1.pptx`: decidir se deve entrar no repositorio
- `.env.local`: nao deve ser commitado
- logs `.codex-*`: agora ignorados pelo `.gitignore`

## Proximos passos tecnicos

1. Integrar dashboard e pagina de aula com dados reais do Supabase.
2. Persistir progresso no banco em vez de `localStorage`.
3. Definir modelo final de acesso: demo por nome ou autenticacao completa.
4. Estruturar painel do responsavel e cobranca recorrente.
