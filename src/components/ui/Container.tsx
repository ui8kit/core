
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { resolveUtilityClassName, ux, type UtilityPropBag, type UtilityPropPrefix } from "../../lib/utility-props";

type ContainerDomProps = Omit<React.HTMLAttributes<HTMLElement>, UtilityPropPrefix>;

export type ContainerProps = ContainerDomProps & UtilityPropBag;

const defaultProps = ux({
  mx: 'auto'
});

export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({
    children,
    className,
    ...props
  }, ref) => {
    const { utilityClassName, rest } = resolveUtilityClassName(props);

    return (
      <div
        ref={ref as any}
        data-class="container"
        className={cn(
          defaultProps,
          utilityClassName,
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container"; 