# Gigs Tracker Frontend

A modern frontend application for tracking earnings, expenses, vehicles, and work sessions for gig drivers, built with Angular and Supabase.

## Project Structure
The architecture follows a feature-based modular structure to allow future extensibility (e.g. vehicle management, work sessions, etc.).

```
src/app
 ├ core
 │   ├ services        # Core singletons (e.g. AuthService)
 │   ├ guards          # Route guards (e.g. authGuard)
 │   ├ interceptors    # HTTP Interceptors (e.g. authInterceptor)
 │   └ models          # Data models and interfaces
 │
 ├ features
 │   ├ auth            # Login and Signup standalone components
 │   └ dashboard       # Main application dashboard
 │
 ├ shared              # Shared components and utilities
 │
 ├ layout              # Main structural layout component
 │
 └ app.routes.ts       # Main application routes array
```

## Quick Start Configuration
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set your Supabase credentials in `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     supabaseUrl: 'YOUR_SUPABASE_URL',
     supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY',
     apiBaseUrl: 'http://localhost:8080/api',
     githubRepoUrl: 'https://github.com/leandroliveira/gigstracker-frontend.git'
   };
   ```

## Running Locally
Run `npm run start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code Quality
Run `npm run lint` or `ng lint` to execute the ESLint rules and maintain code consistency.

## Remote Repository
The primary git repository for this project is:
`https://github.com/leandroliveira/gigstracker-frontend.git`

To push the project to the remote repository, use the following commands:
```bash
git add .
git commit -m "Initial frontend project setup"
git branch -M main
git remote add origin https://github.com/leandroliveira/gigstracker-frontend.git
git push -u origin main
```
