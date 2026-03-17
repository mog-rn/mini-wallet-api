# Mini-Wallet API

A mini wallet that is used to manage the deposits and transfers.

## Tech Stack 
- Node.js, TypeScript, Express
- PostgreSQL, Prisma ORM
- Zod (input validation)
- Swagger UI (API documentation)

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL

### Installation Steps
```1. git clone https://github.com/mog-rn/mini-wallet-api ```

```2. cd mini-wallet-api```

```3. npm install```

```4. cp .env.example .env```

```5. Setup postgres db on your pc and create the database and update the details on the .env file```

```6. npx prisma db push```

```7. npm run db:seed```

```8. npm run dev```

- Server runs on http://localhost:3000
- Api docs: http://localhost:3000/api-docs


## Design decisions 

- **PostreSQL + Prisma ORM**: used Prisma ORM because it is a type-safe ORM with proper decimal handling 
- **Decimal(15, 2)**: as indicated on the schema, I used a decimal value instead of float to avoid rounding errors.
- **Atomic transactions**: used `prisma.$transaction()` to ensure the transactions are atomic and also avoid race conditions
- **Logged failed transactions**: to help with audit trails for the failed transactions 
- **zod validation**: validated the inputs to ensure the data is right before running the business logic.

## What I'd add with more time
- JWT authentication
- Pagination on list endpoints
- Idempotency keys for duplicate prevention
- Rate limiting
- Withdrawal support