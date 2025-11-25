# GuaranaTattoShop - Estúdio Guarana Tatto - AI Coding Agent Instructions

## Code Quality Standards

### Console Logs
**NEVER** add `console.log()` statements unless explicitly requested by the user.
- ❌ Don't add debug logs automatically
- ❌ Don't add logs for tracking execution
- ✅ Only add if user specifically asks for debugging output

### Modern Angular Syntax (v17+)
Always use the latest Angular control flow syntax:
- ✅ `@if (condition) { }` instead of `*ngIf`
- ✅ `@for (item of items; track item.id) { }` instead of `*ngFor`
- ✅ `@switch` instead of `*ngSwitch`
- ✅ Standalone components with inline imports

### TypeScript Best Practices
- Use signals for reactive state management
- Use computed() for derived values
- Use inject() for dependency injection
- Strict typing always enabled
- No `any` types unless absolutely necessary

### Component Structure
Each component must have exactly 4 files:
- `component.ts` - Logic
- `component.html` - Template
- `component.scss` - Styles
- `component.spec.ts` - Tests

### Routing
- Use lazy loading for all feature modules
- Path aliases configured: `@core`, `@shared`, `@features`, `@models`, `@environments`

### Styling
- Use CSS variables for theming
- Mobile-first responsive design
- SCSS with BEM-like naming when needed
- Color palette: Dark Green (#1b4d3e), Bronze (#d4a574), Coral (#e8b4a0), Pink (#d81159), Orange (#ffa500), Olive Green (#8b9d40)

### Forms
- Always add `name` attribute to inputs using `[(ngModel)]` inside `<form>` tags
- Use reactive forms for complex forms
- Template-driven forms for simple cases

## Project Structure
```
src/app/
├── core/          # Services, guards, interceptors
├── shared/        # Reusable components
├── features/      # Feature modules (auth, products, cart, etc)
└── models/        # Interfaces and enums
```
