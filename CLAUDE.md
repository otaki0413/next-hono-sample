# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 full-stack web application template combining:
- **Frontend**: Next.js 15 (App Router) + React 19 + Material-UI (MUI v7)
- **Backend**: API routes with Better Auth for authentication
- **Database**: PostgreSQL 16 with Prisma ORM
- **Authentication Flow**: Email/password authentication via Better Auth

The application follows a landing page → authentication (signup/signin) → dashboard pattern.

## Technology Stack

### Core Framework
- **Next.js**: 15.5.3 (App Router, Turbopack enabled)
- **React**: 19.1.0 (with React DOM 19.1.0)
- **TypeScript**: 5.x (strict mode enabled)
- **Node.js**: 20.x recommended

### UI & Styling
- **Material-UI (MUI)**: v7.3.2 (latest major version)
- **Emotion**: v11.14.x (CSS-in-JS styling engine)
- **MUI Next.js Adapter**: v7.3.2 (seamless integration)

### Backend & Authentication
- **Better Auth**: v1.3.18 (modern authentication solution)
- **Prisma**: v6.16.2 (type-safe ORM)
- **PostgreSQL**: 16 (via Docker)

### Code Quality & Tooling
- **Biome**: 2.2.6 (fast linter & formatter)
- **Ultracite**: 5.6.4 (Biome configuration preset)
- **Lefthook**: v1.13.1 (Git hooks manager)
- **TypeScript Compiler**: Strict mode with null checks

### Development Tools
- **Turbopack**: Next.js bundler for fast compilation
- **pnpm**: 10.18.3 (efficient package manager)
- **Docker Compose**: PostgreSQL containerization

## Development Commands

### Core Development
```bash
pnpm dev              # Start dev server with Turbopack (http://localhost:3000)
pnpm build            # Production build with Turbopack
pnpm start            # Start production server
```

### Code Quality & Linting
```bash
pnpm typecheck        # TypeScript type checking (strict mode enabled)
pnpm check            # Biome linting and formatting check
pnpm check:fix        # Biome automatic fixes (safe + unsafe)
pnpm format           # Biome formatting check
pnpm format:fix       # Biome formatting fixes only
```

### Database Operations
```bash
docker-compose up -d           # Start PostgreSQL
npx prisma generate            # Generate Prisma client
pnpm migrate:local             # Run migrations (local dev database)
pnpm migrate:prod              # Apply migrations to production database
npx prisma studio              # Open Prisma Studio for database management
```

**Migration Scripts:**
- `pnpm migrate:local` - Uses `.env.local` to apply migrations to local Docker PostgreSQL
- `pnpm migrate:prod` - Uses `.env.production` to apply migrations to production Neon PostgreSQL
  - Displays connection confirmation before proceeding
  - Requires explicit 'yes' confirmation to prevent accidental production changes

### Git Workflow
Lefthook automatically:
- **Pre-commit**: Runs `npx ultracite fix` to auto-fix code style issues
- Supports JS, JSX, TS, TSX, JSON, JSONC, CSS files

## Project Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout (RootLayout) with MUI provider
│   ├── page.tsx           # Landing page (Home component)
│   ├── signin/
│   │   └── page.tsx       # Sign-in page (SignInPage component)
│   ├── signup/
│   │   └── page.tsx       # Sign-up page (SignUpPage component)
│   ├── dashboard/
│   │   └── page.tsx       # Protected dashboard (DashboardPage component)
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts  # Better Auth API routes (GET, POST handlers)
│   └── globals.css        # Global styles
├── lib/
│   ├── auth.ts            # Better Auth server configuration
│   ├── auth-client.ts     # Client exports: signIn, signUp, signOut, useSession
│   └── prisma.ts          # Prisma client singleton
└── prisma/
    ├── schema.prisma      # Prisma data model (User, Session, Account, Verification)
    └── migrations/        # Database migration history
```

### Route Structure

**Public Routes:**
- `/` - Landing page (Home component)
- `/signin` - Sign-in page with email/password form (SignInPage)
- `/signup` - Sign-up page with email/password/name form (SignUpPage)

**Protected Routes:**
- `/dashboard` - Dashboard page (DashboardPage, requires authentication)

**API Routes:**
- `/api/auth/*` - Better Auth endpoints (catch-all handler)
  - **GET requests**: Session queries, user info retrieval
  - **POST requests**: sign-in, sign-up, sign-out mutations
  - Automatically handles all authentication operations via Better Auth

### Authentication Architecture

**Server-side** (`src/lib/auth.ts`):
- Better Auth configured with Prisma adapter
- PostgreSQL provider specified
- Email/password authentication enabled
- Database schema managed by Prisma migrations

**Client-side** (`src/lib/auth-client.ts`):
- Client-side auth utilities from Better Auth
- Used in signup/signin pages for authentication logic

**API Routes** (`src/app/api/auth/[...all]/route.ts`):
- Catch-all route handler for all auth endpoints
- Integrates Better Auth with Next.js API

**Flow**:
1. User lands on `/` (home page)
2. Chooses `/signup` or `/signin`
3. Credentials validated via Better Auth API routes
4. Session established, user redirected to `/dashboard`
5. Dashboard is protected (authentication required)

### UI Framework Integration

- **MUI v7**: Material-UI components (Button, Box, Container, etc.)
- **Emotion**: CSS-in-JS styling via `@emotion/react` and `@emotion/styled`
- **MUI Next.js Integration**: `AppRouterCacheProvider` in root layout ensures styles work correctly with Next.js 15

### Database & ORM

- **Prisma Schema**: Defines User, Account, Session, Verification models (auto-generated by Better Auth)
- **Migrations**: Use `npx prisma migrate dev` to create/update schema
- **Client**: Singleton Prisma client in `src/lib/prisma.ts` prevents connection pool exhaustion
- **Client Output**: Generated client located at `src/app/generated/prisma` (custom output path)
- **Models**:
  - `User`: Core user data with email, name, image, email verification status
  - `Session`: User sessions with token, expiration, IP, user agent tracking
  - `Account`: OAuth/credential provider accounts with token management
  - `Verification`: Email/identity verification tokens with expiration

## Key Configuration Details

### TypeScript (`tsconfig.json`)
- **Strict Mode**: Full strict checking enabled
- **Path Aliases**: `~/*` points to `src/*` for cleaner imports
- **Target**: ES2017 with DOM types
- Biome extends `ultracite` configuration for style consistency

### Environment Setup
- **Package Manager**: pnpm with specific version lock (see package.json)
- **Only Built Dependencies**: Prisma, engines, lefthook, and sharp are built from source
- **Port**: Assumes localhost:3000 (configure `trustedOrigins` in `src/lib/auth.ts` for other ports)
- **Environment Variables Required**:
  - `DATABASE_URL`: PostgreSQL connection string (default: `postgresql://postgres:postgres@localhost:5432/postgres`)
  - Better Auth auto-generates other required variables

### Docker Configuration
- **PostgreSQL**: Docker Compose provides PostgreSQL 16 container
- **Health Check**: Automatic readiness checks with 10s intervals
- **Data Persistence**: Volume-backed data storage (`postgres_data`)
- **Default Credentials**: postgres/postgres (change for production)

## Common Development Patterns

### Adding New Routes
1. Create directory under `src/app/` (e.g., `src/app/profile/`)
2. Add `page.tsx` for the route
3. Use `"use client"` directive if client-side interactivity needed

### Using MUI Components
```tsx
import { Button, Box, Container } from "@mui/material";
// Components styled with sx prop or Emotion's styled()
```

### Database Queries
```tsx
import prisma from "~/lib/prisma";
const user = await prisma.user.findUnique({ where: { id: "..." } });
```

### Authentication in Components

**Client-side Authentication APIs** (`~/lib/auth-client`):
```tsx
import { signIn, signUp, signOut, useSession } from "~/lib/auth-client";

// Sign in with email/password
await signIn.email({
  email: "user@example.com",
  password: "password123"
});

// Sign up with name, email, password
await signUp.email({
  name: "User Name",
  email: "user@example.com",
  password: "password123"
});

// Sign out
await signOut();

// Get session in React component (hook)
const { data: session } = useSession();
```

### Component Architecture

**Page Components** (all in `src/app/`):

1. **Home** (`page.tsx`)
   - Landing page component
   - Entry point for unauthenticated users
   - Links to `/signin` and `/signup`

2. **SignInPage** (`signin/page.tsx`)
   - Client component (`"use client"`)
   - Email/password form submission
   - Calls `signIn.email()` from auth-client
   - Redirects to `/dashboard` on success

3. **SignUpPage** (`signup/page.tsx`)
   - Client component (`"use client"`)
   - Name/email/password form submission
   - Calls `signUp.email()` from auth-client
   - Redirects to `/dashboard` on success

4. **DashboardPage** (`dashboard/page.tsx`)
   - Protected page component
   - Requires valid authentication session
   - Displays user information from session
   - Sign-out functionality

5. **RootLayout** (`layout.tsx`)
   - Root layout wrapper for all pages
   - Integrates MUI `AppRouterCacheProvider` for styling
   - Applies global fonts (Geist Sans, Geist Mono)
   - Wraps children with MUI theme provider

## Development Guidelines & Best Practices

### Code Style
- **Biome Formatting**: Extends `ultracite` configuration for consistent style
- **Auto-formatting**: Pre-commit hooks automatically fix style issues
- **No Manual Formatting**: Rely on Biome instead of manual code styling
- **TypeScript Strict**: Never use `any` type or `@ts-ignore` without justification

### Project Conventions
- **Path Aliases**: Always use `~/` prefix for imports from `src/` (e.g., `~/lib/auth`)
- **Client Components**: Mark interactive components with `"use client"` directive
- **File Organization**: Group related files in feature directories (e.g., `signin/`, `dashboard/`)
- **Naming Conventions**:
  - Components: PascalCase (e.g., `SignInPage`, `DashboardPage`)
  - Files: kebab-case for directories, PascalCase for component files
  - Functions: camelCase (e.g., `handleSubmit`, `getSession`)

### Authentication Patterns
- **Client-side**: Use `signIn`, `signUp`, `signOut`, `useSession` from `~/lib/auth-client`
- **Server-side**: Import `auth` from `~/lib/auth` for server components/routes
- **Session Management**: Better Auth handles sessions automatically via cookies
- **Protected Routes**: Check session in server components, redirect if unauthenticated

### Database Practices
- **Prisma Client**: Always use singleton from `~/lib/prisma`, never create new instances
- **Schema Changes**: Use migrations (`npx prisma migrate dev`), never manual SQL
- **Generated Client**: Custom output path at `src/app/generated/prisma`
- **Better Auth Tables**: Never manually modify User, Session, Account, Verification tables

### MUI & Styling
- **MUI Components**: Import from `@mui/material` (e.g., `Button`, `Box`, `TextField`)
- **Styling Methods**: Use `sx` prop or Emotion's `styled()` for custom styles
- **Theme**: MUI theme provider configured in root layout
- **Cache Provider**: `AppRouterCacheProvider` required for Next.js 15 compatibility

### Testing & Quality
- **Type Checking**: Run `pnpm typecheck` before commits
- **Linting**: Run `pnpm check` to verify code quality
- **Pre-commit**: Lefthook runs `ultracite fix` automatically
- **Manual Review**: Always review auto-fixes before committing

## Important Notes

- **Turbopack**: Enabled in both dev and build for fast compilation
- **Better Auth Schema**: Never manually edit tables created by Better Auth; use migrations instead
- **Port Configuration**: If changing port from 3000, update `trustedOrigins` in auth config
- **Strict TypeScript**: All files use strict null checks; don't bypass type safety
- **Pre-commit Hooks**: Ultracite auto-fixes run before every commit; review changes before pushing

## Project Setup Checklist

### Initial Setup
1. **Install Dependencies**: `pnpm install`
2. **Start Database**: `docker-compose up -d`
3. **Configure Environment**: Create `.env` with `DATABASE_URL`
4. **Generate Prisma Client**: `npx prisma generate`
5. **Run Migrations**: `npx prisma migrate dev`
6. **Start Development Server**: `pnpm dev`

### Verification Steps
- Visit `http://localhost:3000` to see landing page
- Navigate to `/signup` to create account
- Sign in at `/signin` with created credentials
- Access `/dashboard` to verify authentication flow
- Check `docker ps` to confirm PostgreSQL is running
- Run `pnpm typecheck` to verify TypeScript configuration
- Run `pnpm check` to verify Biome linting

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL container is running: `docker ps`
- Check DATABASE_URL in `.env` matches docker-compose credentials
- Ensure port 5432 is not already in use
- Restart container: `docker-compose restart postgres`

### Authentication Issues
- Clear browser cookies and localStorage
- Verify Prisma client is generated: check `src/app/generated/prisma`
- Run migrations: `npx prisma migrate dev`
- Check Better Auth API routes are accessible: `/api/auth/*`

### Build/Type Errors
- Run `pnpm typecheck` to identify TypeScript issues
- Ensure all dependencies are installed: `pnpm install`
- Clear Next.js cache: `rm -rf .next`
- Verify tsconfig.json paths are correct

