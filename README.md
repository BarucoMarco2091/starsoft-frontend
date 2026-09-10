# Starsoft Frontend

Aplicação web de uma loja de produtos com catálogo, paginação incremental e carrinho de compras. O projeto foi desenvolvido com Next.js e utiliza uma API Route Mock nativa para disponibilizar os produtos durante o desenvolvimento.

## 1. Configuração e execução

### Pré-requisitos

- Node.js 18 ou superior, compatível com a imagem usada no `Dockerfile`.
- npm.

### Instalação

Na raiz do projeto, instale as dependências:

```bash
npm ci
```

Também é possível usar `npm install`, mas `npm ci` reproduz as versões registradas no `package-lock.json`.

### Variáveis de ambiente

Crie ou mantenha um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Essa variável define a base usada pelo catálogo para consultar `/api/products`. Com o valor acima, a aplicação utiliza a API Route Mock local em `src/app/api/products/route.ts`. O arquivo `.env*` está ignorado pelo Git; não inclua tokens, senhas ou chaves reais no repositório.

Não há banco de dados, migrações ou serviço externo obrigatório para executar a aplicação.

### Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Validações

Execute os testes unitários e de componentes:

```bash
npm test
```

Para manter o Jest em modo de observação:

```bash
npm run test:watch
```

Verifique o código com ESLint:

```bash
npm run lint
```

Para formatar os arquivos de código e estilos:

```bash
npm run format
```

### Build e execução em produção

Gere a build otimizada:

```bash
npm run build
```

Depois, execute o servidor de produção:

```bash
npm run start
```

O servidor fica disponível em [http://localhost:3000](http://localhost:3000), salvo alteração das variáveis de porta do ambiente.

### Docker

O projeto possui `Dockerfile` com build standalone do Next.js e `docker-compose.yml` para executar o serviço web. Suba o container com:

```bash
docker compose up --build
```

A aplicação será exposta em [http://localhost:3000](http://localhost:3000). Para executar em segundo plano:

```bash
docker compose up --build -d
```

Para interromper os containers:

```bash
docker compose down
```

## 2. Funcionalidades implementadas

- Exibição de catálogo responsivo com produtos fornecidos pela API.
- Carregamento incremental de produtos, com quatro itens por página e botão que indica quando todos os produtos já foram carregados.
- Estados visuais de carregamento e erro durante a consulta do catálogo.
- Adição de produtos ao carrinho diretamente no catálogo.
- Contador no cabeçalho com a quantidade de itens distintos no carrinho.
- Tela de carrinho com estado vazio, descrição dos itens, quantidade, total por item e total geral em ETH.
- Incremento e decremento da quantidade de cada produto.
- Remoção individual de itens e limpeza do carrinho após a finalização simulada da compra.
- Feedback visual com animações de entrada, hover e clique.
- Testes automatizados do slice Redux do carrinho e do contador do cabeçalho.

## 3. Tecnologias utilizadas

- **Next.js 16**: framework principal para a aplicação React, roteamento baseado em arquivos, renderização e API Route Mock.
- **React 19** e **TypeScript**: construção da interface com tipagem estática para produtos, respostas da API e estado da aplicação.
- **TanStack React Query**: gerenciamento da consulta de produtos, incluindo cache, estados de carregamento/erro e paginação incremental com `useInfiniteQuery`.
- **Redux Toolkit**, **Redux** e **React Redux**: gerenciamento centralizado do carrinho, com reducers para adicionar, remover, excluir e limpar itens.
- **SCSS Modules e CSS**: estilos locais por componente e estilos globais, com layout responsivo do catálogo e do carrinho.
- **Framer Motion**: animações de entrada, hover, clique e atualização do contador do carrinho.
- **Lucide React**: ícone da sacola no cabeçalho.
- **Next Image** e **next/font**: otimização de imagens locais e carregamento da fonte Poppins.
- **Jest**, **Testing Library** e `jest-environment-jsdom`: testes automatizados de reducers e componentes em um ambiente de DOM simulado.
- **ESLint** e **Prettier**: análise estática e formatação do código.
- **Docker** e **Docker Compose**: build standalone e execução conteinerizada do frontend em produção.

Não há autenticação, persistência em banco de dados, integração de pagamento ou validação de formulários implementadas no código atual.

## 4. Limitações e melhorias futuras

### Limitações atuais

- Durante o desenvolvimento, a API oficial da Starsoft hospedada no Heroku estava indisponível: apresentava erros HTTP 404 e problemas de CORS, enquanto a documentação Swagger também permanecia indisponível. Isso impossibilitou o consumo e a validação da API oficial.
- Para manter a aplicação funcional, foi implementada uma API Route Mock nativa do Next.js em `/api/products`, consumida por URL relativa por meio de `NEXT_PUBLIC_API_URL`. Ela simula o contrato necessário para o catálogo e contém um conjunto fixo de produtos em memória.
- A finalização da compra é apenas uma simulação: após três segundos, o carrinho é limpo. Não existe processamento real de pagamento, pedido ou persistência.
- O estado do carrinho é mantido apenas em memória no Redux; recarregar a página reinicia o carrinho.

### Melhorias futuras

- Substituir a API Mock pela API oficial assim que o serviço estiver disponível e validado.
- A troca foi estruturada para exigir apenas a alteração da variável `NEXT_PUBLIC_API_URL` no `.env.local`, apontando-a para a URL da API oficial, sem modificar a lógica de consumo do catálogo.
- Adicionar persistência do carrinho, por exemplo com armazenamento local ou backend.
- Implementar autenticação, checkout real, criação de pedidos e integração com um provedor de pagamento.
- Expandir os testes para a API, a paginação, os estados de carregamento/erro e os fluxos completos do carrinho.
- Tornar o tratamento de erros e as mensagens de carregamento mais informativos para o usuário.
