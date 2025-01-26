# Plataforma de Análise de Notícias de Cyber Segurança com Transformers

Este projeto implementa uma plataforma para análise de notícias sobre segurança cibernética, utilizando modelos de Transformers para classificação de tokens e identificação de tendências. A aplicação é composta por múltiplos serviços que funcionam integrados via Docker.

## Funcionalidades

- **Análise de Notícias:** Classificação de textos com base em categorias específicas, extraindo insights estratégicos.
- **API RESTful:** Permite o envio de textos e a recuperação de resultados processados.
- **Modelo SecureBERT:** Utilizado para análise de texto, baseado na arquitetura BERT e ajustado para o domínio de segurança cibernética.

---

## Configuração e Execução

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

### Clonar o Repositório

```bash
git clone https://github.com/Carlosmax1/cyber.git
cd cyber
```

### Executar os Contêineres

```bash
docker-compose up
```

Após a execução, o servidor estará ativo na porta **5000**.

---

## Rotas da API

### GET `/`

Retorna uma lista de todos os textos que já foram processados pela API.

### POST `/`

Envia um texto para ser analisado. Exemplo de corpo da requisição:

```json
{
  "text": "Exemplo de notícia sobre cyber segurança."
}
```

Resposta esperada:
```json
{
  "tokens": [
    {"word": "Exemplo", "entity": "O"},
    {"word": "de", "entity": "O"},
    {"word": "notícia", "entity": "B-VULNAME"},
    ...
  ]
}
```

---

## Estrutura do Repositório

- **client/**: Frontend da aplicação.
- **python/**: Aplicação Flask responsável pelo processamento de textos.
- **server/**: Backend utilizando Prisma para integração com o banco de dados.
- **docker-compose.yaml**: Configuração dos serviços Docker.
- **nginx.conf**: Arquivo de configuração do servidor Nginx.

---

## Contribuidores

- **Carlos Eduardo Máximo**
- **Mikaelly Elídia Matos**
- **Grazielle Stefane Cruz**
- **Bernardo Teixeira de Miranda**
- **Daniel Imai Yamakawa**

---

## Licença

Este projeto é licenciado sob a [MIT License](./LICENSE).
