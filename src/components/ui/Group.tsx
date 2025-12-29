import type { ElementType, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { resolveUtilityClassName, type UtilityPropBag, type UtilityPropPrefix } from "../../lib/utility-props";
import { flexVariants, groupLayoutVariants, type VariantFlexProps } from "../../variants";

type GroupDomProps = Omit<React.HTMLAttributes<HTMLElement>, UtilityPropPrefix>;

export type GroupProps
  = GroupDomProps &
    UtilityPropBag &
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
    ...props
  }, ref) => {
    const { utilityClassName, rest } = resolveUtilityClassName(props);
    const Element = component as ElementType;

    return (
      <Element
        ref={ref}
        data-class="group"
        className={cn(
          flexVariants({ gap, align, justify, wrap }),
          groupLayoutVariants({ grow: grow ? 'grow' : 'no-grow', preventGrowOverflow: preventGrowOverflow ? 'prevent-grow-overflow' : 'allow-grow-overflow' }),
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

Group.displayName = "Group"; 