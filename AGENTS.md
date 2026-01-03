# SFS-Backend - AI Agent Guidelines

## Project Overview

Core backend infrastructure for SmartFlow Systems ecosystem. This is a full-stack application template built with Express, React, and Drizzle ORM, featuring authentication, database management, and comprehensive UI components. Serves as the foundation for SFS backend services with modern tooling and best practices.

## Technology Stack

### Backend
- **Node.js 20+** with Express 4.21
- **TypeScript 5.6.3** for type safety
- **Drizzle ORM 0.39** for database operations
- **Neon Serverless** PostgreSQL database
- **Passport.js** for authentication (local strategy)
- **Express Session** with PostgreSQL storage

### Frontend
- **React 18.3** with TypeScript
- **Wouter 3.3.5** for routing
- **TanStack Query 5.60** for data fetching
- **Radix UI** comprehensive component library
- **Framer Motion 11.13** for animations
- **Recharts 2.15** for data visualization

### Styling & UI
- **Tailwind CSS 3.4** with custom configuration
- **Tailwind Animate** for animations
- **Class Variance Authority** for component variants
- **CLSX & Tailwind Merge** for class management
- **Next Themes** for dark mode support

### Build Tools
- **Vite 5.4** for fast development and building
- **ESBuild 0.25** for server bundling
- **TSX 4.19** for TypeScript execution
- **Drizzle Kit 0.30** for database migrations

### Development Tools
- **Replit Vite Plugins:** Cartographer, Runtime Error Modal
- **WebSocket (ws)** for real-time features
- **Zod 3.24** for validation
- **Date-fns 3.6** for date utilities

## Key Files & Directories

### Server Architecture
- `[server/index.ts]` - Main Express server with Vite integration
  - Route registration
  - Error handling middleware
  - Development/production mode switching
  - Port configuration (default 5000)
- `[server/routes.ts]` - API route definitions (to be implemented)

### Client Application
- `[client/]` - React frontend source
  - Components built with Radix UI
  - TanStack Query for data management
  - Wouter for client-side routing
  - Framer Motion animations

### Database
- `[drizzle.config.ts]` - Drizzle ORM configuration
- `[shared/]` - Shared types and schemas
- Database schema definitions (Drizzle)
- PostgreSQL via Neon Serverless

### Configuration Files
- `[package.json]` - Dependencies and scripts
- `[tsconfig.json]` - TypeScript configuration
- `[vite.config.ts]` - Vite build configuration
- `[tailwind.config.ts]` - Tailwind CSS customization
- `[postcss.config.js]` - PostCSS setup
- `[components.json]` - UI component configuration
- `[.replit]` - Replit deployment settings

### Documentation
- `[design_guidelines.md]` - Design system and UI guidelines

## Common Tasks

### Development Workflow

**Start Development Server:**
```bash
npm run dev
# Runs server with tsx watch mode
# Environment: NODE_ENV=development
```

**Type Checking:**
```bash
npm run check
# Runs TypeScript compiler in check mode
```

**Database Operations:**
```bash
npm run db:push
# Push schema changes to database via Drizzle Kit
```

### Building for Production

**Full Build:**
```bash
npm run build
# 1. Builds client with Vite
# 2. Bundles server with esbuild
# Output: dist/index.js
```

**Start Production Server:**
```bash
npm start
# NODE_ENV=production node dist/index.js
```

### Authentication Tasks

**User Management:**
- Passport local strategy configured
- Session storage in PostgreSQL via connect-pg-simple
- Memory store fallback available

**Session Configuration:**
- Persistent sessions across server restarts
- Secure session management
- Express-session integration

### Database Management

**Schema Updates:**
```bash
# 1. Modify schema in shared/
# 2. Run migration
npm run db:push
```

**ORM Operations:**
- Use Drizzle ORM for all database queries
- Type-safe database operations
- Zod validation with drizzle-zod

## Development Commands

```bash
# Installation
npm install                    # Install all dependencies

# Development
npm run dev                    # Start dev server with hot reload
                              # Server: http://localhost:5000

# Type Safety
npm run check                  # TypeScript type checking

# Database
npm run db:push                # Push schema to database
                              # Uses drizzle-kit

# Building
npm run build                  # Build client + server
                              # Client: Vite build
                              # Server: esbuild bundle

# Production
npm start                      # Start production server
                              # Requires completed build

# Testing
npm test                       # Run test suite (configure as needed)
```

## Integration Points

### SFS Ecosystem Integration
- **Shared Authentication:** Passport.js standardization across SFS
- **Database Pattern:** Drizzle ORM template for other services
- **UI Components:** Radix UI component library standard
- **Theme System:** SmartFlow brown/black/gold palette

### Database Integration
- **Neon Serverless:** PostgreSQL cloud database
- **Connection Pooling:** Efficient database connections
- **Migration Strategy:** Drizzle Kit for schema management

### Frontend-Backend Communication
- **API Routes:** Express REST endpoints
- **TanStack Query:** Efficient data fetching and caching
- **WebSocket:** Real-time communication via ws
- **Type Safety:** Shared types between client/server

### External Services
- **PostgreSQL:** Primary data store
- **Session Store:** connect-pg-simple for session persistence
- **Replit:** Deployment platform integration

## Environment Variables

```env
# Server Configuration
PORT=5000                      # Server port (default: 5000)
NODE_ENV=production           # Environment mode

# Database
DATABASE_URL=postgresql://...  # Neon PostgreSQL connection string

# Session Management
SESSION_SECRET=your-secret-key # Express session secret

# Authentication
# Add OAuth providers as needed
```

## Agent Best Practices

### File Operations
- **VERIFY** before modifying `[server/index.ts]` or database schemas
- **UNDO** capability for all file changes
- **Show file paths** in brackets `[path/to/file]`
- **Preserve** existing authentication and session logic

### Code Safety
- Bash scripts use `set -euo pipefail`
- Always run `npm run check` before committing
- Test database migrations in development first
- Validate environment variables before server start

### TypeScript Best Practices
- Use strict type checking
- Define shared types in `[shared/]`
- Leverage Zod for runtime validation
- Use Drizzle's type inference

### Database Operations
- Always use Drizzle ORM, never raw SQL unless necessary
- Test schema changes with `db:push` in development
- Use transactions for multi-step operations
- Validate data with Zod schemas before database writes

### Authentication & Security
- Never commit session secrets
- Use secure session configuration in production
- Implement CSRF protection where needed
- Validate all user inputs
- Use prepared statements (Drizzle handles this)

### Component Development
- Follow Radix UI patterns
- Use Class Variance Authority for variants
- Implement responsive design
- Support dark mode via next-themes
- Leverage Framer Motion for animations

## SmartFlow Standards

### Theme & Design
- **Colors:** Brown/black/gold signature palette (configure in `[tailwind.config.ts]`)
- **Typography:** System fonts with custom scaling
- **Components:** Radix UI primitives
- **Dark Mode:** Support via next-themes
- **Responsive:** Mobile-first approach

### CI/CD
- **GitHub Actions:** Standard SFS workflows
- **Deployment:** Replit-ready configuration in `[.replit]`
- **Health Check:** Implement `GET /health → {"ok":true}`

### API Standards
- RESTful endpoint design
- Consistent error handling
- JSON responses
- Proper HTTP status codes
- Request validation with Zod

### Performance
- **Code Splitting:** Vite automatic chunking
- **Lazy Loading:** React lazy for routes
- **Caching:** TanStack Query built-in
- **Compression:** Configure in Express middleware
- **Bundle Optimization:** ESBuild for server, Vite for client

## Architecture Patterns

### Server Structure
```typescript
// server/index.ts pattern
import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";

// 1. Express app setup
// 2. Middleware configuration
// 3. Route registration
// 4. Error handling
// 5. Vite dev server (development) or static serving (production)
// 6. Server listen on PORT
```

### Request Logging
- Automatic API request logging
- Response capture and logging
- Duration tracking
- JSON response truncation (80 chars)

### Error Handling
- Centralized error middleware
- Status code detection (err.status || err.statusCode || 500)
- JSON error responses
- Error re-throw for logging

### Development vs Production
- **Development:** Vite dev server with HMR
- **Production:** Static file serving from build
- Automatic mode detection via `app.get("env")`

## Component Library

### Available Radix Components
- Accordion, Alert Dialog, Aspect Ratio, Avatar
- Checkbox, Collapsible, Context Menu, Dialog
- Dropdown Menu, Hover Card, Label, Menubar
- Navigation Menu, Popover, Progress, Radio Group
- Scroll Area, Select, Separator, Slider
- Switch, Tabs, Toast, Toggle, Toggle Group, Tooltip

### Utility Libraries
- **CMDK:** Command palette component
- **Embla Carousel:** Carousel functionality
- **Input OTP:** One-time password inputs
- **React Day Picker:** Date picker component
- **React Hook Form:** Form management
- **React Icons:** Icon library
- **Vaul:** Drawer component

### Form Handling
- React Hook Form for form state
- Zod resolver for validation
- Hookform resolvers integration

## Database Schema Best Practices

### Schema Definition
```typescript
// Use Drizzle ORM patterns
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow()
});
```

### Migrations
- Define schemas in TypeScript
- Use Drizzle Kit for migrations
- Test in development before production
- Version control all schema changes

## Monitoring & Debugging

### Development Tools
- Vite runtime error modal
- React DevTools compatible
- TanStack Query DevTools available
- TypeScript error overlay

### Production Monitoring
- Implement health check endpoint
- Log API requests with duration
- Track error rates
- Monitor session store

## Deployment Notes

### Replit Deployment
- Configuration in `[.replit]`
- Environment variables via Replit Secrets
- Automatic HTTPS
- Port binding to 0.0.0.0:5000

### Manual Deployment
```bash
# Build process
npm run build

# Environment setup
export NODE_ENV=production
export PORT=5000
export DATABASE_URL=postgresql://...
export SESSION_SECRET=...

# Start server
npm start
```

### Production Checklist
- [ ] Build completed successfully
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Session store configured (PostgreSQL)
- [ ] Health check endpoint implemented
- [ ] HTTPS enabled
- [ ] Error logging configured
- [ ] Security headers set

## Design Guidelines

Refer to `[design_guidelines.md]` for:
- Component usage patterns
- Styling conventions
- Accessibility requirements
- Responsive design breakpoints
- Color palette specifics

## Support & Resources

**Technology Documentation:**
- Drizzle ORM: https://orm.drizzle.team/
- Radix UI: https://www.radix-ui.com/
- TanStack Query: https://tanstack.com/query/
- Express: https://expressjs.com/
- Vite: https://vitejs.dev/

**License:** MIT

**Organization:** SmartFlow Systems
