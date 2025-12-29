import type { ElementType, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { resolveUtilityClassName, type UtilityPropBag, type UtilityPropPrefix } from "../../lib/utility-props";
import { containerSizeVariants, containerLayoutVariants, textAlignVariants, type ContainerSizingProps, type TextAlignProps } from "../../variants";

type ContainerDomProps = Omit<React.HTMLAttributes<HTMLElement>, UtilityPropPrefix>;

export type ContainerProps
  = ContainerDomProps &
    UtilityPropBag &
    ContainerSizingProps &
    TextAlignProps & {
  children: ReactNode;
  component?: ElementType;
  centered?: boolean;
  fluid?: boolean;
};

export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({
    children,
    className,
    component = 'div',
    size = 'lg',
    centered = true,
    fluid = false,
    ta,
    ...props
  }, ref) => {
    const { utilityClassName, rest } = resolveUtilityClassName(props);
    const Element = component as ElementType;

    return (
      <Element
        ref={ref}
        data-class="container"
        className={cn(
          containerSizeVariants({ size }),
          containerLayoutVariants({ centered: centered ? 'center' : 'left', fluid: fluid ? 'fluid' : 'fixed' }),
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

Container.displayName = "Container"; 