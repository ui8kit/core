# @ui8kit/core UI Components

## Overview

This directory contains UI components organized into two layers:

- **`src/components/ui/`** - Primitive components for JIT compilation (no styles, no logic, no state)
- **`src/components/`** - Composite components with logic, state, and styling

All styling uses the **CDL (Component Definition Language)** system:
- Single-token utilities via `src/cdl/utility-props.map.ts`
- Multi-class variants via CVA in `src/variants/`
- Fast runtime resolution via `src/lib/utility-props.ts`

## Architecture

```
USER LEVEL               COMPOSITE LEVEL           PRIMITIVE LEVEL
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ <Card           │────▶│ components/Card │────▶│ ui/Button       │
│   p="lg"        │     │ + CVA variants  │     │ (no styles)     │
│   bg="card"     │     │ + logic/state   │     │                 │
│   variant="filled"│   │ + default ux()  │     │                 │
│ />              │     │                  │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Components

### Primitive Components (`src/components/ui/`)

These are minimal, JIT-compilation ready components with no styles, no logic, no state. All styling goes through CVA variants or default `ux()` calls.

#### Block
Basic element wrapper.

```tsx
<Block component="section" p="4" bg="muted" rounded="lg">
  Content
</Block>
```

#### Container
Responsive container.

```tsx
<Container p="4" mx="auto" max="w-4xl">
  Content
</Container>
```

#### Stack
Vertical flex layout.

```tsx
<Stack gap="4" items="center" justify="center">
  <Title>Heading</Title>
  <Text>Description</Text>
</Stack>
```

#### Group
Horizontal flex layout.

```tsx
<Group gap="4" items="center" justify="between">
  <Button>Left</Button>
  <Button>Right</Button>
</Group>
```

#### Grid
CSS Grid with CVA variants.

```tsx
<Grid cols="3" gap="4">
  <GridCol span="2">Wide</GridCol>
  <GridCol>Normal</GridCol>
</Grid>
```

#### Text
Typography component.

```tsx
<Text size="lg" fw="semibold" text="center">
  Content
</Text>
```

#### Title
Semantic headings.

```tsx
<Title order={1} size="2xl" fw="bold">
  Heading
</Title>
```

#### Image
Image component.

```tsx
<Image src="/img.jpg" w="full" h="auto" rounded="lg" />
```

#### Icon
Icon wrapper.

```tsx
<Icon w="6" h="6" text="primary" />
```

#### Badge
Status indicators (CVA variants).

```tsx
<Badge variant="success">Active</Badge>
```

#### Button
Interactive button (CVA variants).

```tsx
<Button variant="default" size="md">Click</Button>
```

### Composite Components (`src/components/`)

These components include logic, state, and complex styling.

#### Card
Card with compound structure and CVA variants.

```tsx
<Card variant="filled" p="6" rounded="xl">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

#### Accordion
Collapsible content sections.

```tsx
<Accordion type="single">
  <AccordionItem value="1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Sheet
Modal/overlay component.

```tsx
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>Content</SheetContent>
</Sheet>
```

## Universal Props (CDL)

All components support these **CDL utility props** from `src/cdl/utility-props.map.ts`:

### Spacing
- **Padding**: `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`
- **Margin**: `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr`
- **Gap**: `gap`, `gap-x`, `gap-y`

### Layout
- **Display**: `block`, `inline`, `flex`, `grid`, `hidden`
- **Position**: `static`, `relative`, `absolute`, `fixed`, `sticky`
- **Sizing**: `w`, `h`, `min-w`, `max-w`, `min-h`, `max-h`

### Flexbox/Grid
- **Flex**: `flex`, `flex-col`, `flex-row`, `flex-1`, `shrink`, `shrink-0`, `grow`
- **Alignment**: `items-start`, `items-center`, `items-end`, `justify-start`, `justify-center`, etc.
- **Grid**: `grid-cols-1` to `grid-cols-12`, `grid-flow-row`, etc.

### Visual
- **Colors**: `bg`, `text`, `border` with design tokens
- **Borders**: `border`, `border-t`, `border-b`, `rounded`, `ring`
- **Shadows**: `shadow-sm`, `shadow-md`, `shadow-lg`, etc.
- **Typography**: `font`, `text`, `leading`, `tracking`

### Interactive
- **States**: `hover:`, `focus:`, `active:` (through CVA variants)
- **Transitions**: `transition`, `duration`, `ease`

## Data Classes

All components include semantic `data-class` attributes for easy targeting:

```tsx
// Primitive components (ui/)
<Button data-class="button" />
<Card data-class="card" />

// Composite components (components/)
<Accordion data-class="accordion">
  <AccordionItem data-class="accordion-item">
    <AccordionTrigger data-class="accordion-trigger">Title</AccordionTrigger>
    <AccordionContent data-class="accordion-content">Content</AccordionContent>
  </AccordionItem>
</Accordion>
```

`data-class` enables easy CSS targeting, testing selectors, and semantic markup understanding.

## Best Practices

### For Primitive Components (`ui/`)
1. **No styles**: Never add `className` strings directly
2. **No logic**: No state, effects, or business logic
3. **CDL props only**: Use `resolveUtilityClassName()` and default `ux()` calls
4. **CVA variants**: Use only for multi-class combinations

### For Composite Components (`components/`)
1. **Full control**: Logic, state, styling, and custom classes allowed
2. **CDL foundation**: Build on primitives with utility props
3. **CVA variants**: Use for complex styling combinations
4. **Data attributes**: Use `data-class` for testing and styling hooks

### General Rules
1. **CDL-first**: Prefer utility props from `src/cdl/utility-props.map.ts`
2. **Variants for complexity**: Use CVA when 3+ utility props would be needed
3. **Consistent naming**: Short prop names (`p`, `m`, `bg`, `text`)
4. **JIT-friendly**: All classes must be statically analyzable

## Migration from Old Components

```tsx
// Old approach - mixed concerns
<OldCard className="p-8 rounded-xl shadow-md bg-card">
  Content
</OldCard>

// New approach - CDL utility props
<Card p="8" rounded="xl" shadow="md" bg="card">
  Content
</Card>

// Or with variants for complex cases
<Card variant="elevated" p="6">
  Content
</Card>
```

The CDL architecture provides perfect prop forwarding with maximum flexibility and consistency. 