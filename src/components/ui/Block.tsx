import type { ElementType, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { resolveUtilityClassName, type UtilityPropBag, type UtilityPropPrefix } from "../../lib/utility-props";

type BlockDomProps = Omit<React.HTMLAttributes<HTMLElement>, UtilityPropPrefix>;

export type BlockProps
  = BlockDomProps &
    UtilityPropBag & {
  children: ReactNode;
  component?: ElementType;
  variant?: 'section' | 'main' | 'nav' | 'article' | 'header' | 'footer' | 'aside' | 'div';
};

export const Block = forwardRef<HTMLElement, BlockProps>(
  ({
    children,
    className,
    component,
    variant = 'div',
    ...props
  }, ref) => {
    const { utilityClassName, rest } = resolveUtilityClassName(props);
    const elementType = component || variant;
    const Element = elementType as ElementType;

    return (
      <Element
        ref={ref}
        data-class="block"
        className={cn(
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

Block.displayName = "Block"; 