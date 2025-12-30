[РАЗРАБОТАТЬ ВАРИАНТЫ CVA + хардкод]

## ✅ **Хардкод обнаружен и зафиксирован!**

### **Проблема:**
В **Icon.tsx** и **Image.tsx** обнаружен хардкод вариантов вместо генерации через CDL:

#### **Icon.tsx - hardcoded:**
```typescript
const sizeProps = {
  xs: ux({ w: '3', h: '3' }),    // 12px
  sm: ux({ w: '4', h: '4' }),    // 16px
  // ...
};
```

#### **Image.tsx - hardcoded:**
```typescript
const fitProps = { contain: ux({ object: 'contain' }), ... };
const positionProps = { center: ux({ object: 'center' }), ... };
const aspectProps = { square: ux({ aspect: 'square' }), ... };
```

### **Решение зафиксировано в планах:**

1. **Создать `.project/cdl/component-variants.json`** с определениями:
   ```json
   {
     "icon": {
       "size": {
         "xs": { "w": "3", "h": "3" },
         "sm": { "w": "4", "h": "4" },
         ...
       }
     },
     "image": {
       "fit": { "contain": { "object": "contain" }, ... },
       "position": { "center": { "object": "center" }, ... },
       "aspect": { "square": { "aspect": "square" }, ... }
     }
   }
   ```

2. **Создать скрипт `scripts/cdl-emit-component-variants.mjs`** для генерации функций

3. **Заменить хардкод:**
   ```typescript
   // Было: const sizeClasses = sizeProps[size];
   // Станет: const sizeClasses = iconVariants({ size });
   ```

### **Текущее состояние:**
- ✅ **Компоненты работают** с текущим хардкодом
- ✅ **8/8 тестов** проходят  
- ✅ **План решения** зафиксирован в `utility-props.ts`

