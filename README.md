# DirectorFlix

Web application developed with Next.js for managing and displaying content in a streaming-style catalog experience, with user authentication, premium subscription access, and an administrative dashboard for maintaining categories and media.

> Project created for portfolio presentation, focused on modern frontend development, API architecture in Next.js, authentication, payment integration, and content management.

## Overview

DirectorFlix was built as a content catalog platform with a clear distinction between free and premium users. The central experience includes a public area for browsing categories, searching content, and viewing carousels, along with an administrative panel for creating, editing, and deleting items and categories.

The application combines:

- authentication and session control;
- category browsing and search;
- exclusive content for premium users;
- administrative catalog management;
- Stripe integration for subscription and recurring billing.

---

## Implemented Features

### 1. Authentication and access control
- User registration and login;
- authentication with NextAuth;
- protected routes and session control;
- permission checks and blocking unauthorized access;
- support for both premium and free users.

### 2. Content catalog
- listing of categories and content;
- search by name and category filters;
- visual organization with carousels and content blocks;
- highlighting trending items and free/premium content;
- pagination and dynamic data loading.

### 3. Premium experience
- differentiation between free and subscribed users;
- exclusive access to selected content for premium users;
- subscription flow with Stripe Checkout;
- subscription management portal;
- control of subscription data and user status.

### 4. Administrative panel
- category creation;
- content creation, editing, and deletion;
- content status control;
- search and organization of records in the internal dashboard;
- data management with Prisma + PostgreSQL.

### 5. API and data architecture
- API routes in Next.js App Router;
- business rules implemented in dedicated endpoints;
- data persistence with Prisma ORM;
- organized structure ready for future maintenance and evolution.

---

## Technologies Used

### Frontend
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- Zustand
- React Query
- Lucide React
- Heroicons
- Radix UI

### Backend and data
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth
- JWT / authentication sessions

### Integrations and payments
- Stripe
- Stripe Checkout
- Webhooks for subscription events

### Utilities
- dotenv
- Zod
- bcryptjs
- clsx / tailwind-merge
- dayjs

---

## Project Structure

```bash
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── create-checkout/
│   │   ├── letsgo/
│   │   ├── nextsteps/
│   │   ├── pagamentorecebido/
│   │   └── webhook/
│   ├── (auth)/
│   ├── letsgo/
│   ├── nextsteps/
│   └── page.tsx
├── components/
├── database/
├── hooks/
├── lib/
├── scripts/
├── types/
├── utils/
└── middleware.ts
prisma/
└── schema.prisma
```

---

## Main Solution Challenges

- organizing a content flow with plan-based differentiation;
- implementing authentication and protected access on server-side routes;
- integrating recurring payments with Stripe in a Next.js application;
- creating a modern and responsive catalog experience;
- maintaining admin logic and data systems in a scalable architecture.

---

## How to Run Locally

### Requirements
- Node.js 20+
- PostgreSQL
- npm or pnpm

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables
Create a `.env` file with the required variables, including:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/directflix"
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUB_KEY="your_public_stripe_key"
STRIPE_SUBSCRIPTION_PRICEMONTH_ID="price_..."
STRIPE_SUBSCRIPTION_PRICETRIME_ID="price_..."
STRIPE_SUBSCRIPTION_PRICESEMES_ID="price_..."
STRIPE_SUBSCRIPTION_PRICEANUAL_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 3. Generate the Prisma client and sync the database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run the application

```bash
npm run dev
```

The app will be available at:

```bash
http://localhost:3000
```

---

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npx prisma generate
npx prisma db push
```

---

## Project Status

This project is under active development and was structured to demonstrate skills in:

- full-stack development with Next.js;
- database modeling with Prisma;
- authentication and authorization;
- digital payment integration;
- modern and responsive interface development;
- API route organization and business logic design.

---

## Portfolio Notes

DirectorFlix serves as a demonstration of capability for digital product projects focused on:

- user experience;
- content management;
- subscription-based monetization;
- authentication and security flows;
- integration with external services;
- modern architecture with React + Next.js.

If you want, I can also create a more polished portfolio version with:

- technology badges;
- a project preview section;
- a more commercial product description;
- a short technical case study with key challenges and outcomes.