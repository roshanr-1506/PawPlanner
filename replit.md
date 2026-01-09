PawPlanner - Pet Care Management Application
Overview
PawPlanner is a pet care management application that helps users track their pets' daily tasks, appointments, and health status. The application combines a clean, productivity-focused interface with warm, engaging interactions to make pet care management delightful and efficient. Users can schedule and track feeding times, walks, medications, and veterinary appointments while monitoring their pet's mood and overall well-being.

User Preferences
Preferred communication style: Simple, everyday language.

System Architecture
Frontend Architecture
Framework: React with TypeScript using Vite as the build tool and development server.

Routing: Wouter for client-side routing, providing a lightweight alternative to React Router.

UI Component Library: Radix UI primitives with shadcn/ui component patterns, offering accessible, unstyled components that are customized with Tailwind CSS.

Styling: Tailwind CSS with a custom design system featuring:

Custom color palette (Peach, Mint, Sand, Light Blue)
Typography using Inter and Quicksand fonts from Google Fonts
Material Design principles with utility-first approach
Theme support (light/dark mode) via ThemeProvider
Custom spacing primitives and layout system
State Management:

React Query (@tanstack/react-query) for server state management and data fetching
React hooks and local state for UI state management
Context API for theme management
Animation: Framer Motion for micro-interactions, transitions, and visual feedback including confetti effects and avatar animations.

Form Handling: React Hook Form with Zod validation via @hookform/resolvers for type-safe form validation.

Date Handling: date-fns for date manipulation and formatting throughout the application.

Backend Architecture
Server Framework: Express.js running on Node.js with TypeScript.

API Design: RESTful API architecture with routes prefixed with /api. The application uses a modular routing system where routes are registered via registerRoutes().

Development Server: Custom Vite integration in development mode with middleware mode, providing HMR (Hot Module Replacement) and development tooling.

Storage Interface: Abstract storage interface (IStorage) with in-memory implementation (MemStorage) for development. The interface is designed to be replaceable with a database-backed implementation.

Session Management: Prepared for session handling with connect-pg-simple for PostgreSQL session store.

Data Storage
Database: PostgreSQL configured via Neon serverless driver (@neondatabase/serverless).

ORM: Drizzle ORM for type-safe database operations with schema definitions in TypeScript.

Schema Management:

Schema defined in shared/schema.ts for code sharing between client and server
Drizzle Kit for migrations stored in ./migrations directory
Zod schemas generated from Drizzle schemas for runtime validation
Current Schema: Basic user authentication structure (users table with id, username, password).

Design Rationale: The storage layer uses an abstract interface pattern to allow switching between in-memory storage (development) and database-backed storage (production) without changing business logic. This enables rapid prototyping while maintaining a path to production-ready persistence.

External Dependencies
UI Components:

@radix-ui/\* packages for accessible component primitives (dialogs, dropdowns, tooltips, etc.)
cmdk for command palette functionality
embla-carousel-react for carousel components
Database:

@neondatabase/serverless for PostgreSQL connectivity
drizzle-orm and drizzle-kit for ORM and migrations
drizzle-zod for schema-to-validation bridge
Development Tools:

@replit/vite-plugin-runtime-error-modal for error overlay
@replit/vite-plugin-cartographer for code mapping
@replit/vite-plugin-dev-banner for development indicators
Utilities:

class-variance-authority for component variant styling
clsx and tailwind-merge (via cn utility) for conditional class names
nanoid for unique ID generation
Build Tools:

Vite for frontend bundling and development
esbuild for backend bundling
TypeScript compiler for type checking
PostCSS with Tailwind CSS and Autoprefixer
