import { cva, type VariantProps } from "class-variance-authority";

export const containerLayoutVariants = cva("", {
  variants: {
    centered: {
      center: "mx-auto",
      left: "",
    },
    fluid: {
      fluid: "max-w-none",
      fixed: "",
    },
  },
  defaultVariants: {
    centered: "center",
    fluid: "fixed",
  },
});

export interface ContainerLayoutProps extends VariantProps<typeof containerLayoutVariants> {}


