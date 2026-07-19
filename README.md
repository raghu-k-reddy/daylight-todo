# Farmly Marketplace

Farmly is a farmer-to-table marketplace prototype rebuilt with **TanStack Start**, React, TypeScript, and **Redux Toolkit**.

## Stack

- TanStack Start with file-based routing and SSR build output
- Redux Toolkit + React Redux for product catalog, filters, basket, dialogs, and notifications
- Vite for development and production builds

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The marketplace state lives in `src/features/marketplaceSlice.ts`; typed Redux store hooks are in `src/hooks.ts`.
