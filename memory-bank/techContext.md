# Technical Context

## Technology Stack

### Frontend
- Next.js 14+
- TypeScript
- Tailwind CSS
- React Hooks
- Shadcn UI Components

### Development Tools
- VS Code
- Git
- pnpm package manager
- PostCSS
- ESLint

## Project Structure
```
predictbet/
├── app/              # Next.js app router
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   └── ...          # Feature components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── public/          # Static assets
└── styles/          # Global styles
```

## Dependencies

### Core Dependencies
- next
- react
- react-dom
- typescript
- tailwindcss

### UI Dependencies
- shadcn/ui components
- class-variance-authority
- clsx
- tailwind-merge

### Development Dependencies
- @types/node
- @types/react
- @types/react-dom
- autoprefixer
- postcss
- typescript
- eslint

## Configuration Files
- next.config.mjs
- tailwind.config.ts
- postcss.config.mjs
- tsconfig.json
- components.json

## Technical Constraints
1. Browser Compatibility
   - Modern browsers
   - Mobile responsiveness
   - Progressive enhancement

2. Performance Requirements
   - Fast page loads
   - Optimized images
   - Efficient data fetching
   - Minimal bundle size

3. Security Considerations
   - Data encryption
   - Input validation
   - API security
   - Authentication

## Development Setup
1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run development server:
   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   ```

## Best Practices
1. Code Style
   - TypeScript strict mode
   - ESLint rules
   - Consistent formatting
   - Component organization

2. Performance
   - Image optimization
   - Code splitting
   - Server-side rendering
   - Caching strategies

3. Testing
   - Unit tests
   - Integration tests
   - E2E testing
   - Performance testing

## Deployment
- Production build process
- Environment configuration
- Performance monitoring
- Error tracking