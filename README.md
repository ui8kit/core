# @ui8kit/core

> A minimalist React UI component library with utility-first Tailwind CSS and semantic HTML5 approach. Build complex interfaces with just 15 composite components and 12 reusable design variants.

[![npm version](https://img.shields.io/npm/v/@ui8kit/core)](https://www.npmjs.com/package/@ui8kit/core)
[![license](https://img.shields.io/npm/l/@ui8kit/core)](https://github.com/ui8kit/core/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/ui8kit/core)](https://github.com/ui8kit/core)

## ✨ Features

- **Minimal & Composable** - Build unlimited designs with 15 base components and 12 reusable variants
- **Type-Safe** - Full TypeScript support with precise prop interfaces
- **Tailwind Native** - Utility-first styling with zero runtime overhead
- **Semantic HTML** - Built on clean HTML5 semantic tags (section, article, nav, header, footer, etc.)
- **Atomic Design** - Hierarchical architecture: Atoms → Molecules → Organisms
- **Prop Forwarding** - Extended components inherit all base component props
- **Compound Components** - Card.Header, Card.Content, Card.Footer patterns for flexibility
- **Dark Mode** - Built-in theme support with automatic persistence
- **Zero Dependencies** - Only depends on class-variance-authority and React

## 🚀 Quick Start

### Installation

```bash
npm install @ui8kit/core react react-dom
```

Or with Tailwind CSS:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

### Basic Usage

```tsx
import { Button, Card, Text, Stack } from '@ui8kit/core';

export function App() {
  return (
    <Card p="lg" rounded="xl" shadow="md">
      <Card.Header>
        <Text as="h2" size="xl" weight="bold">
          Welcome
        </Text>
      </Card.Header>
      <Card.Content>
        <Stack gap="md">
          <Text>Build beautiful UIs with minimal code.</Text>
          <Button variant="primary" size="md">
            Get Started
          </Button>
        </Stack>
      </Card.Content>
    </Card>
  );
}
```

## 🏗️ Architecture

ui8kit/core is built on a three-layer architecture:

```
┌─────────────────────────────────────┐
│  Layer 3: Layouts                   │
│  (DashLayout, SplitBlock, etc.)     │
├─────────────────────────────────────┤
│  Layer 2: UI Components             │
│  (Button, Card, Form, etc.)         │
│  + Variant System Props             │
├─────────────────────────────────────┤
│  Layer 1: Core Primitives           │
│  (Box, Block, Grid, Flex, Stack)    │
│  + CVA Variant System               │
└─────────────────────────────────────┘
```

### Layer 1: Core Primitives

Basic building blocks for any layout:

- **Box** - Generic container with full styling support
- **Block** - Semantic block element (section, article, nav, etc.)
- **Grid** - CSS Grid layout component
- **Flex** - Flexbox layout component
- **Stack** - Vertical/horizontal stacking with gap

```tsx
import { Box, Stack, Grid } from '@ui8kit/core';

<Stack gap="lg" p="md">
  <Box bg="primary" rounded="lg" p="md">
    Content
  </Box>
  <Grid cols={2} gap="md">
    <Box>Column 1</Box>
    <Box>Column 2</Box>
  </Grid>
</Stack>
```

### Layer 2: UI Components

Pre-styled composite components ready to use:

- **Button** - Action buttons with multiple variants
- **Card** - Flexible card component with compound parts
- **Text** - Semantic text rendering (p, span, em, strong)
- **Title** - Heading hierarchy (h1-h6)
- **Container** - Responsive container with max-width
- **Icon** - SVG icon wrapper
- **Image** - Optimized image component
- **Badge** - Small label component
- **Group** - Group related elements
- **Sheet** - Drawer/sheet component
- **Accordion** - Expandable content sections

```tsx
import { Button, Card, Text, Title, Icon } from '@ui8kit/core';
import { Heart } from 'lucide-react';

<Card variant="outlined" p="lg">
  <Card.Header>
    <Title order={3} size="lg">
      Favorite Item
    </Title>
  </Card.Header>
  <Card.Content>
    <Stack gap="md" align="center">
      <Icon c="red">
        <Heart />
      </Icon>
      <Text>Add to favorites</Text>
    </Stack>
  </Card.Content>
  <Card.Footer>
    <Button variant="primary" leftSection={<Heart size={16} />}>
      Save
    </Button>
  </Card.Footer>
</Card>
```

### Layer 3: Layout Components

Pre-built layout templates for common patterns:

- **DashLayout** - Dashboard layout with sidebar, header, content
- **LayoutBlock** - Flexible content block layout
- **SplitBlock** - Two-column split layout

```tsx
import { DashLayout, Container, Card } from '@ui8kit/core';

<DashLayout 
  sidebar={<NavSidebar />}
  header={<Header />}
>
  <Container>
    <Card p="lg">
      Main content
    </Card>
  </Container>
</DashLayout>
```

## 🎨 Variant System

The **CVA-based variant system** centralizes all styling concerns:

### Spacing
Control margins and padding across all components:

```tsx
<Box p="lg" m="md" mx="auto">
  Padded with margins
</Box>
```

### Colors
Semantic color system (primary, secondary, destructive, etc.):

```tsx
<Card bg="card" c="foreground">
  Semantic colors
</Card>
```

### Layout
Width, height, and positioning:

```tsx
<Box w="full" h="screen" position="relative">
  Full width and height
</Box>
```

### Typography
Size, weight, alignment, and line-height:

```tsx
<Text size="lg" weight="bold" align="center" leading="tight">
  Styled text
</Text>
```

### Effects
Shadows, borders, and rounded corners:

```tsx
<Box shadow="lg" rounded="2xl" border="1px solid border">
  Beautiful box
</Box>
```

## 🌓 Dark Mode

Built-in dark mode support with ThemeProvider:

```tsx
import { ThemeProvider, modernUITheme } from '@ui8kit/core';

export function App() {
  return (
    <ThemeProvider theme={modernUITheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

Use the `useTheme` hook to access theme context:

```tsx
import { useTheme } from '@ui8kit/core';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <Button onClick={toggleDarkMode}>
      {isDarkMode ? '☀️' : '🌙'}
    </Button>
  );
}
```

## 📦 Component Registry

The **registry.json** system powers multiple installation formats:

### NPM Installation (Full Library)
```bash
npm install @ui8kit/core
```

### Per-Component Installation
Install individual components:

```bash
npx buildy-ui add button card text
```

### Registry JSON Integration
Programmatic access to component metadata:

```tsx
import registry from '@ui8kit/core/registry.json';

registry.items.forEach(component => {
  console.log(`${component.name}: ${component.description}`);
});
```

## 🛠️ Development & Customization

### Create Custom Components

Extend base components with your own variants:

```tsx
import { Button, buttonSizeVariants, buttonStyleVariants } from '@ui8kit/core';
import { cva } from 'class-variance-authority';

const customButtonVariants = cva('', {
  variants: {
    special: {
      true: 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  }
});

export function CustomButton(props) {
  return (
    <Button 
      className={customButtonVariants({ special: props.special })}
      {...props}
    />
  );
}
```

### Compose Components

Build complex UIs by composing simple components:

```tsx
export function FormCard() {
  return (
    <Card variant="outlined" p="xl">
      <Card.Header>
        <Title order={2}>Sign Up</Title>
      </Card.Header>
      <Card.Content>
        <Stack gap="md">
          {/* Form fields using Box + Text */}
          <Box>
            <Text weight="medium" mb="xs">Email</Text>
            <input type="email" />
          </Box>
          <Box>
            <Text weight="medium" mb="xs">Password</Text>
            <input type="password" />
          </Box>
        </Stack>
      </Card.Content>
      <Card.Footer>
        <Stack gap="md" direction="row">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Sign Up</Button>
        </Stack>
      </Card.Footer>
    </Card>
  );
}
```

### React Hooks

Built-in utilities for responsive design:

```tsx
import { useMediaQuery, useMobile, useViewport } from '@ui8kit/core';

export function ResponsiveComponent() {
  const isMobile = useMobile();
  const isSmall = useMediaQuery('(max-width: 640px)');
  const viewport = useViewport();
  
  return (
    <Box>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </Box>
  );
}
```

## 📚 Complete Component List

### Core Primitives (5)
- Box
- Block
- Grid
- Flex
- Stack

### UI Components (15)
- Button
- Card (+ Header, Content, Footer, Title, Description)
- Text
- Title
- Container
- Icon
- Image
- Badge
- Group
- Sheet
- Accordion

### Layout Components (3)
- DashLayout
- LayoutBlock
- SplitBlock

## 🎯 Design Philosophy

ui8kit/core follows the principle of **minimal code with maximum flexibility**:

- **15 Components** cover 95% of UI needs
- **12 Variants** eliminate the need for custom classes
- **Composable** architecture enables unlimited design possibilities
- **Semantic HTML** ensures accessibility and SEO
- **Type-Safe** TypeScript prevents prop-related bugs

This approach significantly reduces:
- ✅ Bundle size
- ✅ Development time
- ✅ Cognitive load
- ✅ CSS complexity

## 📖 Documentation

Complete documentation available at:
- 📔 [Full Documentation](https://buildy.tw/)
- 🏗️ [Architecture Guide](./.devin/wiki.json)
- 📝 [Component API Reference](https://buildy.tw/docs/api)
- 🎨 [Design System](https://buildy.tw/docs/design)

## 🔗 Integration

Works seamlessly with:
- ✅ Next.js
- ✅ Vite
- ✅ Create React App
- ✅ Storybook
- ✅ Remix
- ✅ Astro

## 📦 Building from Source

```bash
# Install dependencies
npm install

# Type checking
npm run type-check

# Build for distribution
npm run build

# Linting
npm run lint
npm run lint:fix

# Component scanning
npm run scan
```

## Roadmap CDL mapping

### 1) Refactor UI8Kit: “variants only”
- Move all Tailwind utility strings out of JSX and into variant files.
- Enforce rule: components consume variant props; no ad-hoc class strings in bodies.
- Result: components = logic/structure, variants = styling.

### 2) Create CDL maps (declarative component definitions)
- Define a CDL schema (YAML/JSON/TS) that describes:
  - component name
  - variant axes + options
  - default variants
  - compound variants (if needed)
- Add scripts to generate/validate CDL output.
- Result: a stable machine-readable description for generation.

### 3) Audit real Tailwind usage (whitelist)
- Scan all variant definitions → extract unique class tokens.
- Save to a single whitelist (e.g. `.project/core-classes.json`).
- Result: exact class surface area that UI8Kit core supports.

### 4) Build `class → CSS3 properties` map for the whitelist
- Create/maintain a map where:
  - key = class name
  - value = CSS declarations (prefer **1 class = 1 property**; allow small composites like `truncate`)
- Include generators for tokenized classes (spacing, etc.) where it’s safe.
- Result: deterministic conversion to inline CSS or head CSS.

### 5) Build semantic design system map
- Define semantic keys that represent UI intent:
  - `button.primary`, `card.surface`, `text.muted`, etc.
- Values are **coordinated sets** of tailwind-like utilities (from the whitelist).
- Add validation scripts that ensure:
  - only whitelisted utilities are used
  - no forbidden “decorative” classes slip into the core layer
- Result: semantic-first UI building blocks.

## 📄 License

MIT - see [LICENSE](./LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

Made with ❤️ by [buildy-ui](https://github.com/ui8kit)
