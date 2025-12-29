import type { ElementType, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { resolveUtilityClassName, type UtilityPropBag, type UtilityPropPrefix } from "../../lib/utility-props";
import { flexVariants, textAlignVariants, type VariantFlexProps, type TextAlignProps } from "../../variants";

type StackDomProps = Omit<React.HTMLAttributes<HTMLElement>, UtilityPropPrefix>;

export type StackProps
  = StackDomProps &
    UtilityPropBag &
    Pick<VariantFlexProps, 'gap' | 'align' | 'justify' | 'direction'> &
    TextAlignProps & {
  children: ReactNode;
  component?: ElementType;
};

export const Stack = forwardRef<HTMLElement, StackProps>(
  ({
    children,
    className,
    component = 'div',
    gap = 'md',
    direction = 'col',
    align = 'start',
    justify = 'start',
    ta,
    ...props
  }, ref) => {
    const { utilityClassName, rest } = resolveUtilityClassName(props);
    const Element = component as ElementType;

    return (
      <Element
        ref={ref}
        data-class="stack"
        className={cn(
          flexVariants({ gap, align, justify, direction }),
          textAlignVariants({ ta }),
          utilityClassName,
          className
        )}
        {...rest}
      >
        {children}
      </Element>
    );
  }
);

Stack.displayName = "Stack"; 