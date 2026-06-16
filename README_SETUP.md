# Pulse-Line MVP - Setup Guide

## Project Structure

```
pulse-line/
├── src/
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Main app component
│   ├── App.css            # App styles
│   └── index.css          # Global styles
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── .eslintrc.json         # ESLint rules
├── .prettierrc             # Prettier configuration
├── .gitignore             # Git ignore rules
└── .env.example           # Environment variables example
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

### Development

**Start development server:**
```bash
npm run dev
```
The app will open at `http://localhost:3000`

### Build & Production

**Build for production:**
```bash
npm run build
```

**Preview production build locally:**
```bash
npm run preview
```

## Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production with TypeScript checking
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check Prettier formatting
- `npm run type-check` - Check TypeScript types without emitting

## Code Quality

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
npm run format:check
```

### Type Checking
```bash
npm run type-check
```

## Technologies

- **React** 18.2.0 - UI library
- **TypeScript** 5.0.2 - Type safety
- **Vite** 4.4.5 - Build tool and dev server
- **ESLint** 8.45.0 - Code linting
- **Prettier** 3.0.0 - Code formatting
- **Lucide React** 0.263.1 - Icon library

## Features

- ✅ Modern React setup with TypeScript
- ✅ Fast build with Vite
- ✅ Code quality with ESLint & Prettier
- ✅ Responsive design
- ✅ Component-based architecture
- ✅ Environment variables support

## Best Practices

1. **Always run `npm run type-check` before committing**
2. **Use `npm run format` to maintain code style**
3. **Use `npm run lint:fix` to fix linting issues**
4. **Write TypeScript types for all components and functions**
5. **Use React hooks for state management**

## Troubleshooting

### Port 3000 already in use
Edit `vite.config.ts` and change the port:
```ts
server: {
  port: 3001,
}
```

### Dependencies not installing
Clear npm cache and reinstall:
```bash
npm cache clean --force
npm install
```

### TypeScript errors
Make sure all files have proper type annotations:
```bash
npm run type-check
```

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm run dev`
3. ✅ Create reusable components in `src/components/`
4. ✅ Add types in `src/types/`
5. ✅ Create utilities in `src/utils/`
6. ✅ Maintain code quality with linting and formatting

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [ESLint Documentation](https://eslint.org)
- [Prettier Documentation](https://prettier.io)
