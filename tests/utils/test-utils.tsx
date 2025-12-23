import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Кастомный рендерер без провайдеров (библиотека не имеет тем)
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Переэкспортируем все из @testing-library/react
export * from '@testing-library/react';

// Переопределяем render методом с провайдерами
export { customRender as render };

// Утилиты для тестирования компонентов
export const createTestProps = <T extends Record<string, any>>(
  overrides: Partial<T> = {}
): T => {
  return overrides as T;
};

export const mockProps = <T extends Record<string, any>>(
  template: T,
  overrides: Partial<T> = {}
): T => {
  return { ...template, ...overrides };
};

// Утилиты для тестирования событий
export const createMockEvent = (overrides = {}) => ({
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
  ...overrides,
});

// Утилиты для тестирования форм
export const createMockChangeEvent = (value: string, name?: string) => ({
  target: { value, name: name || 'test' },
});

// Типы для тестов
export type TestComponentProps<T> = T & {
  'data-testid'?: string;
};
