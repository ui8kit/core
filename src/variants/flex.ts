import { cva, type VariantProps } from "class-variance-authority";

export const flexVariants = cva("flex", {
  variants: {
    // Flex direction
    direction: {
      row: "flex-row",
      col: "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse"
    },
    // Align items
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
      stretch: "items-stretch"
    },
    // Justify content
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly"
    },
    // Flex wrap
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse"
    },
    // Flex grow/shrink/basis
    grow: {
      0: "grow-0",
      1: "grow"
    },
    shrink: {
      0: "shrink-0",
      1: "shrink"
    },
    basis: {
      auto: "basis-auto",
      full: "basis-full",
      0: "basis-0",
      px: "basis-px"
    },
    // Order
    order: {
      first: "order-first",
      last: "order-last",
      none: "order-none",
      1: "order-1",
      2: "order-2",
      3: "order-3",
      4: "order-4",
      5: "order-5",
      6: "order-6",
      7: "order-7",
      8: "order-8",
      9: "order-9",
      10: "order-10",
      11: "order-11",
      12: "order-12"
    },
    // Gap
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-10",
      "3xl": "gap-12"
    },
    gapX: {
      none: "gap-x-0",
      xs: "gap-x-1",
      sm: "gap-x-2",
      md: "gap-x-4",
      lg: "gap-x-6",
      xl: "gap-x-8"
    },
    gapY: {
      none: "gap-y-0",
      xs: "gap-y-1",
      sm: "gap-y-2",
      md: "gap-y-4",
      lg: "gap-y-6",
      xl: "gap-y-8"
    }
  }
});

// Types for flex props
export interface VariantFlexProps extends VariantProps<typeof flexVariants> {}