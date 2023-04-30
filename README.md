# Show Maker

Jogo onde o usuário deve acertar quais são os tipos de um pokémon aleatório.

## Rodando localmente

Clonando o projeto e instalando as dependências

```bash
  git clone https://github.com/fefezoka/guessthetype
  cd showmaker
  npm install
```

Configurando o arquivo .env.example e iniciando o projeto

```bash
  # Copiar o arquivo contendo as variáveis de ambiente e dados de conexão
  cp .env.example .env

  # Rodar o projeto
  npm run dev
```

## Stack utilizada

- [Next JS](https://github.com/vercel/next.js/)
- [Typescript](https://github.com/microsoft/TypeScript)
- [Prisma](https://github.com/prisma/prisma) - ORM
- [MongoDB](https://github.com/mongodb/mongo)

## Bibliotecas

- [Next Auth](https://github.com/nextauthjs/next-auth) - Autenticação
- [tRPC](https://github.com/trpc/trpc) - Rotas API typesafe
- [Zod](https://github.com/colinhacks/zod) - Criação de schemas e validação
- [Stitches](https://github.com/stitchesjs/stitches) - CSS in JS
- [Radix](https://github.com/radix-ui) - Componentes UI acessíveis

## Funcionalidades

- **Autenticação**
- **Inserir, remover e enviar os tipos escolhidos**
- **Sistema de ranqueamento**
  - Taxa de vitória
  - Vitórias
  - Maior sequencia
