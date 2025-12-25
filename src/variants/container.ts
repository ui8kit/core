import { cva, type VariantProps } from "class-variance-authority";

export const containerLayoutVariants = cva("", {
  variants: {
    centered: {
      true: "mx-auto",
      false: "",
    },
    fluid: {
      true: "max-w-none",
      false: "",
    },
  },
});

export interface ContainerLayoutProps extends VariantProps<typeof containerLayoutVariants> {}


