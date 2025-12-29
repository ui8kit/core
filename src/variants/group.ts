import { cva, type VariantProps } from "class-variance-authority";

export const groupLayoutVariants = cva("", {
  variants: {
    grow: {
      grow: "flex-1",
      "no-grow": "",
    },
    preventGrowOverflow: {
      "prevent-grow-overflow": "min-w-0",
      "allow-grow-overflow": "",
    },
  },
  defaultVariants: {
    grow: "no-grow",
    preventGrowOverflow: "prevent-grow-overflow",
  },
});

export interface GroupLayoutProps extends VariantProps<typeof groupLayoutVariants> {}


