import { cva, type VariantProps } from "class-variance-authority";

// Card root variants (visual-only utility classes belong here, not in components)
export const cardRootVariants = cva("", {
  variants: {
    variant: {
      default: "border-border",
      outlined: "border-border shadow-none",
      filled: "border-transparent bg-muted/50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardRootVariantProps extends VariantProps<typeof cardRootVariants> {}

export const cardHeaderVariants = cva("flex flex-col space-y-1.5");

export const cardTitleBaseVariants = cva("font-semibold leading-none tracking-tight");

export const cardDescriptionVariants = cva("text-sm text-muted-foreground");

export const cardContentBaseVariants = cva("pt-0");

export const cardFooterBaseVariants = cva("flex items-center pt-0");


