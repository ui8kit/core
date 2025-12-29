import type { ElementType, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { resolveUtilityClassName, type UtilityPropBag, type UtilityPropPrefix } from "../../lib/utility-props";
import { iconBaseVariants, iconSizeVariants, type IconSizingProps } from "../../variants";

type IconDomProps = Omit<React.HTMLAttributes<HTMLElement>, UtilityPropPrefix>;

export type IconProps
  = IconDomProps &
    UtilityPropBag &
    IconSizingProps & {
  children?: ReactNode;
  component?: ElementType;
  lucideIcon?: any; // For Lucide React icons
};

export const Icon = forwardRef<HTMLElement, IconProps>(
  ({
    children,
    className,
    component: Component = 'span',
    size = 'sm',
    lucideIcon: LucideIcon,
    ...props
  }, ref) => {
    const { 'aria-hidden': ariaHidden, role, ...restProps } = props;
    const { utilityClassName, rest } = resolveUtilityClassName(restProps);

    const baseClasses = cn(
      iconBaseVariants(),
      iconSizeVariants({ size }),
      utilityClassName,
      className
    );

    const ComponentWithRef = Component as React.ComponentType<any>;

    return (
      <ComponentWithRef
        ref={ref}
        data-class="icon"
        className={baseClasses}
        aria-hidden={ariaHidden}
        role={role}
        {...rest}
      >
        {LucideIcon ? (
          <LucideIcon
            className={cn(
              iconSizeVariants({ size }),
              utilityClassName
            )}
          />
        ) : (
          children
        )}
      </ComponentWithRef>
    );
  }
);

Icon.displayName = "Icon"; 