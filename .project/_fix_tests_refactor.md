
Все 84 теста проходят. Кратко, что изменено:

### 1. **Grid** (`src/components/Grid.tsx`)
- Добавлена поддержка `cols` как числа (`cols={3}` → `grid-cols-3`).
- Добавлена поддержка `cols` как массива правил (`cols={[{ bp: 'base', value: 1 }, { bp: 'sm', value: 2 }]}`) для responsive-классов.
- Добавлен компонент **Grid.Col** с пропсами `span`, `start`, `end`, `order`.

### 2. **Utility props** (`src/lib/utility-props.ts`)
- Добавлен алиас для bare-token: `italic="italic"` → `italic`, `underline="underline"` → `underline`.
- Добавлена семантическая карта для `gap`: `gap="md"` → `gap-4`, `gap="lg"` → `gap-6` и т.д.

### 3. **Gap map** (`src/lib/utility-props.map.ts`)
- Добавлены значения `xs`, `sm`, `md`, `lg`, `xl` в `gap`.

### 4. **Typography** (`src/variants/typography.ts`)
- Добавлен алиас `truncate="truncate"` для варианта `truncate` (дополнительно к `truncate={true}`).