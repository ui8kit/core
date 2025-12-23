import type { ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import {
  spacingVariants,
  roundedVariants,
  shadowVariants,
  borderVariants,
  badgeSizeVariants,
  badgeStyleVariants,
  type VariantSpacingProps,
  type RoundedProps,
  type ShadowProps,
  type BorderProps,
  type BadgeSizeProps,
  type BadgeStyleProps,
} from "../../variants";

export interface BadgeProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantSpacingProps, 'm' | 'mx' | 'my'>,
    RoundedProps,
    ShadowProps,
    BorderProps,
    BadgeSizeProps,
    BadgeStyleProps {
  children: ReactNode;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    children, 
    className,
    variant = 'default',
    size = 'default',
    rounded = 'md',
    shadow,
    // Spacing props  
    m, mx, my,
    // Border props
    border,
    borderTop,
    borderBottom,
    borderLeft,
    borderRight,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        data-class="badge"
        className={cn(
          // Variants (CVA)
          badgeSizeVariants({ size }),
          badgeStyleVariants({ variant }),
          roundedVariants({ rounded }),
          shadowVariants({ shadow }),
          spacingVariants({ m, mx, my }),
          borderVariants({ border, borderTop, borderBottom, borderLeft, borderRight }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge"; 