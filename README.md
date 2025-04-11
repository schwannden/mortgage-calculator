# mortgage-calculator

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Development Commands

```sh
# Compile and Hot-Reload for Development
npm run dev

# Compile and Minify for Production
npm run build

# Run ESLint
npm run lint

# Fix ESLint Issues
npm run lint:fix

# Type-check
npm run type-check

# Type-check with watch mode
npm run type-check:watch
```

### Git Hooks

This project uses:
- **Husky**: Manages Git hooks (automatically installed with `npm install`)
- **lint-staged**: Runs linters on staged files

Pre-commit hook will automatically:
- Run ESLint on staged `.js`, `.ts`, and `.vue` files
- Fix formatting issues when possible
- Prevent commit if there are any errors
