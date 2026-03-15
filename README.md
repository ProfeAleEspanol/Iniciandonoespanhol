# Profe Ale Platform

Plataforma de aprendizado de espanhol para criancas, com experiencia visual ludica, trilha de aulas, materiais de apoio e dois modos de acesso: demonstracao simples por nome ou autenticacao com Supabase.

## O que o projeto faz

O projeto entrega uma experiencia inicial de ensino online para a marca Profe Ale:

- landing page institucional
- paginas de metodologia e planos
- login da familia
- dashboard com modulos e aulas
- pagina de aula com objetivo, pratica, vocabulario e materiais
- progresso local da crianca no navegador

O foco atual e um MVP publicavel, com base pronta para evoluir para um produto com persistencia real no Supabase.

## Stack

```text
Next.js 16
React 19
TypeScript
Tailwind CSS 4
Supabase Auth
```

## Arquitetura

O projeto usa `Next.js` com `App Router` para rotas e renderizacao, e `Supabase` para autenticacao e sessao quando configurado.

### Camadas principais

- `src/app`
  - paginas, layouts e rotas da aplicacao
- `src/components`
  - componentes visuais e fluxos de interface
- `src/lib`
  - dados mockados, persistencia local e integracao com Supabase
- `src/proxy.ts`
  - middleware/proxy para atualizar sessao e proteger rotas
- `supabase/sql`
  - schema SQL inicial para evolucao do produto

### Next.js + Supabase

O Supabase aparece em tres pontos:

- cliente browser em `src/lib/supabase/client.ts`
- cliente server em `src/lib/supabase/server.ts`
- middleware de sessao em `src/lib/supabase/middleware.ts`

O proxy em `src/proxy.ts` chama o middleware para:

- redirecionar usuarios nao autenticados ao acessar `/dashboard`
- redirecionar usuarios autenticados que tentarem abrir `/login`

Se as variaveis do Supabase nao estiverem definidas, o projeto continua funcionando em modo demonstracao.

## Estrutura de pastas

```text
platform/
├─ public/
│  ├─ materiais/
│  │  ├─ aula1.pdf
│  │  ├─ aula1-video.mp4
│  │  ├─ aula2.pdf
│  │  └─ aula2-video.mp4
│  └─ ...
├─ src/
│  ├─ app/
│  │  ├─ api/health/route.ts
│  │  ├─ dashboard/
│  │  │  ├─ aulas/[lessonId]/page.tsx
│  │  │  └─ page.tsx
│  │  ├─ login/page.tsx
│  │  ├─ metodologia/page.tsx
│  │  ├─ planos/page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ auth-form.tsx
│  │  ├─ dashboard-client.tsx
│  │  ├─ lesson-page-client.tsx
│  │  ├─ student-name-form.tsx
│  │  ├─ student-session.tsx
│  │  ├─ welcome-card.tsx
│  │  └─ ...
│  ├─ lib/
│  │  ├─ course-data.ts
│  │  ├─ student-store.ts
│  │  ├─ progress.ts
│  │  └─ supabase/
│  │     ├─ client.ts
│  │     ├─ config.ts
│  │     ├─ middleware.ts
│  │     └─ server.ts
│  └─ proxy.ts
├─ supabase/
│  └─ sql/
│     └─ 001_initial_schema.sql
├─ .env.example
├─ .env.local.example
├─ package.json
└─ README.md
```

## Rotas principais

```text
/                      Landing page
/metodologia           Proposta pedagogica
/planos                Pagina de planos
/login                 Entrada da familia
/dashboard             Mapa de aulas
/dashboard/aulas/[id]  Pagina de aula
/api/health            Health check
```

## Modos de autenticacao

O projeto suporta dois modos de acesso.

### 1. Modo Supabase

Quando estas variaveis estao configuradas:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

o fluxo ativo passa a ser:

- `/login` usa email e senha
- `AuthForm` faz `signIn` e `signUp` com Supabase
- o proxy/middleware protege `/dashboard`
- usuarios autenticados sao redirecionados automaticamente

Esse e o modo recomendado para producao.

### 2. Modo simples por nome

Quando o Supabase nao esta configurado:

- `/login` mostra a entrada simplificada por nome
- o nome da crianca e salvo em `localStorage`
- o progresso das aulas tambem fica local no navegador
- o dashboard segue funcional para demonstracao

Esse modo e util para validacao rapida e apresentacoes sem backend.

## Fluxo do dashboard e das aulas

### Dashboard

O dashboard:

- lista modulos e aulas
- calcula percentual de progresso
- destaca a proxima aula recomendada
- mostra quantidade de aulas concluidas

Hoje os dados vem de:

```text
src/lib/course-data.ts
```

O progresso atual vem de:

```text
src/lib/student-store.ts
```

### Pagina de aula

Cada aula pode exibir:

- titulo e modulo
- objetivo
- aquecimento
- pratica guiada
- missao da aula
- missao em casa
- vocabulario
- passos sugeridos
- links para video e PDF

O usuario pode marcar a aula como concluida, o que atualiza o progresso local.

## Materiais em `public/materiais`

Os materiais das aulas ficam em:

```text
public/materiais
```

Esses arquivos sao servidos diretamente pelo Next.js e podem incluir:

- PDFs
- videos `.mp4`
- outros arquivos de apoio, quando desejado

Exemplos atuais:

```text
public/materiais/aula1.pdf
public/materiais/aula1-video.mp4
public/materiais/aula2.pdf
public/materiais/aula2-video.mp4
```

Os links para esses materiais sao definidos nas aulas em `src/lib/course-data.ts`.

## Variaveis de ambiente

As variaveis obrigatorias para Supabase auth e middleware sao:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### Arquivos de exemplo

```text
.env.example
.env.local.example
```

### Como configurar localmente

1. Copie o exemplo:

```bash
cp .env.example .env.local
```

No PowerShell:

```powershell
Copy-Item .env.example .env.local
```

2. Preencha as variaveis com os dados do Supabase.

### Observacoes

- `NEXT_PUBLIC_SUPABASE_URL` e usada no browser, no server e no middleware
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` e usada no browser, no server e no middleware
- nao ha uso atual de `SUPABASE_SERVICE_ROLE_KEY`

## Configuracao do Supabase

No painel do Supabase:

1. Abra `Project Settings > API`
2. Copie:
   - `Project URL`
   - `anon public key`
3. Abra `Authentication > URL Configuration`
4. Configure:

```text
Site URL: https://seu-projeto.vercel.app
Redirect URLs:
- http://localhost:3000
- https://seu-projeto.vercel.app
```

Se usar preview deployments na Vercel, adicione tambem a URL de preview.

## Executando localmente

Instalacao:

```bash
npm install
```

Desenvolvimento:

```bash
npm run dev
```

No PowerShell deste ambiente, pode ser necessario usar:

```powershell
npm.cmd install
npm.cmd run dev
```

## Validacao local

Lint:

```bash
npm run lint
```

Build de producao:

```bash
npm run build
```

Health check:

```text
http://localhost:3000/api/health
```

## Deploy na Vercel

### Passo a passo

1. Suba o repositorio para o GitHub
2. Importe o repositorio na Vercel
3. Use o preset:

```text
Next.js
```

4. Configure os comandos:

```text
Install Command: npm install
Build Command: npm run build
```

5. Em `Settings > Environment Variables`, configure:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

6. Faça o deploy
7. Atualize no Supabase:
   - `Site URL`
   - `Redirect URLs`

### Checklist final de deploy

```text
[ ] Repositorio enviado ao GitHub
[ ] Projeto importado na Vercel
[ ] Framework preset = Next.js
[ ] Install command = npm install
[ ] Build command = npm run build
[ ] NEXT_PUBLIC_SUPABASE_URL configurada
[ ] NEXT_PUBLIC_SUPABASE_ANON_KEY configurada
[ ] Site URL configurada no Supabase
[ ] Redirect URLs configuradas no Supabase
[ ] /api/health respondendo
[ ] /login funcionando
[ ] /dashboard funcionando
```

## Banco de dados

O schema inicial do produto esta em:

```text
supabase/sql/001_initial_schema.sql
```

Ele ja contempla a base para:

- `profiles`
- `courses`
- `modules`
- `lessons`
- `progress`
- politicas RLS

Hoje o frontend ainda usa dados mockados para o conteudo das aulas, mas a estrutura do banco ja esta preparada para a proxima fase.

## Proximos passos

- integrar dashboard e aulas com dados reais do Supabase
- persistir progresso no banco
- definir fluxo final entre modo demo e modo autenticado
- estruturar area da familia e cobranca recorrente
