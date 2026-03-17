# Appwrite CRUD Next.js

Aplicação de exemplo usando Next.js (App Router) + Appwrite para criar, listar, editar e excluir interpretações.

## Descrição do projeto

- Página inicial (`app/page.tsx`): lista interpretações do Appwrite e permite editar/excluir.
- Criar interpretação (`app/create/page.tsx`): form para gravar novo documento no banco.
- Editar interpretação (`app/edit/[id]/page.tsx`): carrega dados e atualiza com API PUT.
- API Appwrite:
  - `app/api/interpretations/route.ts` (GET/POST)
  - `app/api/interpretations/[id]/route.ts` (GET/PUT/DELETE)
- Delete com confirmação de UX na interface antes de chamar DELETE.

## Instalação & configuração

1. Clone o repositório:

```bash
git clone <repo-url>
cd appwrite-crud
```

2. Instale dependências:

```bash
npm install
```

3. Copie variáveis de ambiente:

```bash
cp .env.example .env.local
```

4. Adicione as variáveis Appwrite em `.env.local`:
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT`
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
   - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`

## Executar localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador. Se a porta 3000 já estiver em uso, o Next pode abrir em outra porta (por exemplo 3001). Verifique o terminal para a URL correta.

## Funcionalidades

- Listar interpretações.
- Criar nova interpretação.
- Editar interpretação existente.
- Excluir interpretação com modal de confirmação (inclui `term` no texto).

## Como testar exclusão

1. Na listagem, clique em **Delete**.
2. O modal aparece: "Would you like to confirm the exclusion of the item: {term}?"
3. Clique em **Sim** para excluir ou **Não** para cancelar.

## Estrutura principal

- `app/page.tsx`
- `app/create/page.tsx`
- `app/edit/[id]/page.tsx`
- `app/api/interpretations/route.ts`
- `app/api/interpretations/[id]/route.ts`
- `lib/appwrite_client.ts`

## Notas

- O estado de itens usa `useState<IInterpretation[]>([])` para evitar `undefined`.
- Rota DELETE no backend usa `database.deleteDocument(...)`.
- O modal de exclusão é controlado por `confirmDelete`.

---

Feito com Next.js + Appwrite.
