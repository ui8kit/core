import type { ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import {
  spacingVariants,
  roundedVariants,
  shadowVariants,
  layoutVariants,
  buttonSizeVariants,
  buttonStyleVariants,
  type VariantSpacingProps,
  type RoundedProps,
  type ShadowProps,
  type VariantLayoutProps,
  type ButtonSizeProps,
  type ButtonStyleProps,
} from "../../variants";

export type ButtonProps 
  = React.ButtonHTMLAttributes<HTMLButtonElement> &
    Pick<VariantSpacingProps, 'm' | 'mx' | 'my' | 'mr'> &
    RoundedProps &
    ShadowProps &
    Pick<VariantLayoutProps, 'w'> &
    ButtonSizeProps &
    ButtonStyleProps & {
  children: ReactNode;
  disabled?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className,
    variant = 'default',
    size = 'default',
    rounded = 'lg',
    shadow,
    // Spacing props  
    m, mx, my, mr,
    // Layout props
    w,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        data-class="button"
        className={cn(
          // Variants (CVA)
          buttonSizeVariants({ size }),
          buttonStyleVariants({ variant }),
          roundedVariants({ rounded }),
          shadowVariants({ shadow }),
          spacingVariants({ m, mx, my, mr }),
          layoutVariants({ w }),
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button"; 