# @ui8kit/core Tests

Изолированная среда тестирования для компонентов @ui8kit/core с полной поддержкой:

- ✅ **Алиасы** (`@ui8kit/core`, `@/*`) - доступны все настройки корня
- ✅ **TypeScript** - полная типизация с отдельной конфигурацией
- ✅ **Tailwind CSS** - стилизация компонентов
- ✅ **Vite** - быстрая разработка и сборка
- ✅ **Vitest** - тестирование с покрытием кода
- ✅ **React Testing Library** - тестирование компонентов
- ✅ **Изоляция** - не вмешивается в корневые конфиги

## Структура

```
tests/
├── config/                 # Конфигурационные файлы
│   ├── tsconfig.tests.json # TypeScript для тестов
│   ├── vite.config.tests.ts # Vite для разработки
│   ├── vitest.config.ts     # Vitest для тестирования
│   ├── tailwind.config.tests.js # Tailwind для тестов
│   └── postcss.config.js    # PostCSS для тестов
├── setup/                  # Настройка тестового окружения
│   └── test-setup.ts        # Setup файл Vitest
├── utils/                  # Утилиты для тестирования
│   └── test-utils.tsx       # Кастомный рендерер с провайдерами
├── components/             # Тесты компонентов
│   ├── Button.test.tsx      # Пример тестов для Button
│   └── Card.test.tsx        # Пример тестов для Card
├── styles/                 # Стили для тестовой среды
│   └── test-styles.css      # Tailwind + дополнительные стили
├── index.html              # HTML для браузерной разработки
├── main.tsx                # Главный компонент для демонстрации
└── README.md               # Эта документация
```

## Скрипты

```bash
# Запуск тестов в режиме watch
npm run test

# Запуск всех тестов один раз
npm run test:run

# Запуск тестов с покрытием
npm run test:coverage

# Запуск тестов с UI интерфейсом
npm run test:ui

# Запуск тестовой среды в браузере (Vite dev server)
npm run test:dev

# Запуск тестов в режиме watch
npm run test:watch
```

## Использование

### Написание тестов

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@tests/utils/test-utils';
import { Button } from '@ui8kit/core';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Кастомный рендерер

Используйте `render` из `@tests/utils/test-utils` для автоматического включения провайдеров тем:

```tsx
import { render, screen } from '@tests/utils/test-utils';

// Автоматически оборачивается в ThemeProvider
render(<YourComponent />);
```

### Утилиты для тестирования

```tsx
import { createTestProps, createMockEvent } from '@tests/utils/test-utils';

// Создание тестовых пропсов
const props = createTestProps<ButtonProps>({
  variant: 'primary',
  onClick: vi.fn()
});

// Создание mock событий
const mockEvent = createMockEvent({
  preventDefault: vi.fn()
});
```

## Разработка в браузере

Запустите `npm run test:dev` для интерактивной разработки в браузере. Это позволит:

- Видеть компоненты в действии
- Тестировать визуальные изменения
- Разрабатывать новые компоненты
- Проверять интеграцию с темами

## Конфигурация

Все конфигурационные файлы изолированы и наследуют настройки из корня:

- **TypeScript**: `tests/config/tsconfig.tests.json`
- **Vite**: `tests/config/vite.config.tests.ts`
- **Vitest**: `tests/config/vitest.config.ts`
- **Tailwind**: `tests/config/tailwind.config.tests.js`

## Покрытие кода

Тесты настроены с минимальными порогами покрытия:

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

Запустите `npm run test:coverage` для просмотра детального отчета.

## Добавление новых тестов

1. Создайте файл `ComponentName.test.tsx` в папке `tests/components/`
2. Импортируйте необходимые утилиты
3. Используйте `render` из `@tests/utils/test-utils`
4. Следуйте паттернам из существующих тестов

## Примечания

- Все алиасы (`@ui8kit/core`, `@/*`) работают корректно
- Тесты полностью изолированы от основной кодовой базы
- Поддерживается горячая перезагрузка при разработке
- CSS модули и стили импортируются автоматически
