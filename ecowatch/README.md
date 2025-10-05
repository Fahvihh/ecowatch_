This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Como instalar e rodar o EcoWatch

### Pré-requisitos

- Node.js (recomendado v18 ou superior)
- npm (instalado junto com Node.js)
- Git (opcional, para clonar o repositório)

### Passos para instalar

1. **Clone o repositório (opcional):**
	```bash
	git clone https://github.com/Jcmaster2000/EcoWatch.git
	cd EcoWatch/ecowatch
	```

2. **Instale as dependências:**
	```bash
	npm install
	```

3. **Configure variáveis de ambiente (se necessário):**
	- Crie um arquivo `.env.local` na raiz do projeto e adicione suas chaves de API, se houver.

4. **Inicie o servidor de desenvolvimento:**
	```bash
	npm run dev
	```

5. **Acesse o sistema:**
	- Abra o navegador e acesse [http://localhost:3000](http://localhost:3000)

### Estrutura do Projeto

- `src/app/` — Código principal do frontend (Next.js)
- `public/` — Imagens e arquivos estáticos
- `package.json` — Dependências e scripts
- `README.md` — Documentação do projeto

### Comandos Úteis

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera a versão de produção
- `npm start` — Inicia o servidor em modo produção após o build

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
