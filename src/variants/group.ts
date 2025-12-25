import { cva, type VariantProps } from "class-variance-authority";

export const groupLayoutVariants = cva("", {
  variants: {
    grow: {
      true: "flex-1",
      false: "",
    },
    preventGrowOverflow: {
      true: "min-w-0",
      false: "",
    },
  },
});

export interface GroupLayoutProps extends VariantProps<typeof groupLayoutVariants> {}


