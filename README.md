# Fastify GraphQL Lead Form

This project demonstrates a simple lead form that submits data via a GraphQL mutation to a Fastify backend with a MySQL database.

## About This Exercise

This take-home project demonstrates my adaptability as a developer.

Node.js is my third or fourth most-used language, behind Java and PHP. Previously, I have only used Express for Node.js development. However, this exercise shows that I can quickly adapt to other tools within the ecosystem.

In this case, I used Fastify along with GraphQL to implement a simple lead management application. This allowed me to explore Fastify's performance benefits and GraphQL's flexibility for frontend integration.

We also use Docker to manage and run the MySQL database instance. This showcases some of my DevOps familiarity, particularly with containerized environments and managing development infrastructure in a repeatable and scalable way.

My ability to combine unfamiliar frameworks and produce a functional solution reinforces my flexibility and eagerness to learn when solving engineering problems.

Tech Sta
## Tech Stack

- Fastify
    - main site: https://fastify.dev/
    - demo repo used as referenced: https://github.com/fastify/demo
- GraphQL
- TypeScript / JavaScript
- MySQL (via Docker)
- Docker Compose
- Tailwind CSS (for frontend form)
- Static HTML + JS

---

## Getting started
Install the dependencies:
```bash
npm install
```

### Database
You can run a MySQL instance with Docker:
```bash
docker compose up
```

To run it in the background:
```bash
docker compose up -d
```

To create the database, run:
```bash
npm run db:create
```

To create and update the database schema, run the migrations:
```bash
npm run db:migrate
```

To populate the database with initial data, run:
```bash
npm run db:seed
```

To drop the database, run:
```bash
npm run db:drop
```

## Running the App

```
npm run dev
```

Then visit: http://localhost:3000/home.html

## GraphQL Endpoint

visit: http://localhost:3000/graphiql


## Example Mutation

```
mutation RegisterLead {
  register(input: {
    name: "Jane Smith",
    email: "jane@example.com",
    mobile: "0987654321",
    postcode: "5000",
    serviceIds: ["1", "3"]
  }) {
    id
    name
    email
  }
}
```

## Example Query

```
query {
  leads {
    id
    name
    email
    services {
      id
      name
    }
  }
}
```