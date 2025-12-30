## ✅ **Система отслеживания недостающих классов создана**

### **Что мы сделали:**
- ✅ Обнаружили проблему с `min-w-0` в Group.tsx
- ✅ Добавили комментарий в `src/lib/utility-props.ts` для отслеживания недостающих классов
- ✅ Составили список потенциальных будущих потребностей
- ✅ Указали шаги для добавления классов в CDL whitelist

### **Следующие шаги для решения проблемы:**
```bash
# 1. Добавить min-w-0 в CDL whitelist
# 2. Перегенерировать utility-props.generated.ts
bun run cdl:utilities:emit

# 3. Заменить в Group.tsx:
# Было: min: 'w-0' (работает, но не идеально)
# Станет: minW: '0' (если добавим новый префикс)
```

==========================

## ✅ **Group.tsx рефакторинг завершен!**

### **Что изменилось:**

#### **❌ Убрано (упрощение API):**
- `preventGrowOverflow?: boolean` - теперь всегда `true`
- Сложная логика с conditional `min-w-0`

#### **✅ Упрощено (CDL-first подход):**
- **Default props** теперь включают `min: 'w-0'` (предотвращение overflow)
- **Только один specific prop** - `grow?: boolean`
- **Четкая карта utility props** - `flex: '1'` для grow

### **Итоговый API Group:**
```typescript
<Group 
  grow           // flex-1
  gap="2"        // custom gap  
  items="start"  // custom align
  // + все utility props: p, m, bg, etc.
/>
```

### **Что всегда применяется:**
- `display: flex`
- `gap: 1rem` 
- `align-items: center`
- `justify-content: flex-start`
- `min-width: 0` (предотвращает overflow)

