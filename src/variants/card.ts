import { cva, type VariantProps } from "class-variance-authority";

export const cardVariantVariants = cva("", {
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

export const cardHeaderVariants = cva("flex flex-col space-y-1.5");

export const cardTitleVariants = cva("font-semibold leading-none tracking-tight");

export const cardDescriptionVariants = cva("text-sm text-muted-foreground");

export const cardContentVariants = cva("pt-0");

export const cardFooterVariants = cva("flex items-center pt-0");

export interface CardVariantProps extends VariantProps<typeof cardVariantVariants> {}


