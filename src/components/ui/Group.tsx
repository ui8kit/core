import type { ElementType, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import {
  spacingVariants,
  colorVariants,
  layoutVariants,
  flexVariants,
  groupLayoutVariants,
  type VariantSpacingProps,
  type ColorProps,
  type VariantLayoutProps,
  type VariantFlexProps
} from "../../variants";

export type GroupProps 
  = React.HTMLAttributes<HTMLElement> &
    Pick<VariantSpacingProps, 'p' | 'px' | 'py' | 'm' | 'mx' | 'my'> &
    Pick<ColorProps, 'bg' | 'c'> &
    Pick<VariantLayoutProps, 'w' | 'h'> &
    Pick<VariantFlexProps, 'gap' | 'align' | 'justify' | 'wrap'> & {
  children: ReactNode;
  component?: ElementType;
  grow?: boolean;
  preventGrowOverflow?: boolean;
};

export const Group = forwardRef<HTMLElement, GroupProps>(
  ({ 
    children, 
    className,
    component = 'div',
    gap = 'md',
    align = 'center',
    justify = 'start',
    wrap = 'nowrap',
    grow = false,
    preventGrowOverflow = true,
    // Spacing props
    p, px, py,
    m, mx, my,
    // Color props
    bg,
    c,
    // Layout props
    w,
    h,
    ...props 
  }, ref) => {
    const Element = component as ElementType;

    return (
      <Element
        ref={ref}
        data-class="group"
        className={cn(
          flexVariants({ gap, align, justify, wrap }),
          spacingVariants({ p, px, py, m, mx, my }),
          colorVariants({ bg, c }),
          layoutVariants({ w, h }),
          groupLayoutVariants({ grow: grow ? 'grow' : 'no-grow', preventGrowOverflow: preventGrowOverflow ? 'prevent-grow-overflow' : 'allow-grow-overflow' }),
          className
        )}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Group.displayName = "Group"; 