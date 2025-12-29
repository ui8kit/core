import type { ElementType, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { resolveUtilityClassName, type UtilityPropBag, type UtilityPropPrefix } from "../../lib/utility-props";
import {
  textSizeVariants,
  fontWeightVariants,
  textAlignVariants,
  leadingVariants,
  typographyModifierVariants,
  trackingVariants,
  type TextSizeProps,
  type FontWeightProps,
  type TextAlignProps,
  type LeadingProps,
  type TypographyModifierProps,
  type TrackingProps
} from "../../variants";

type TitleDomProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, UtilityPropPrefix>;

export type TitleProps
  = TitleDomProps &
    UtilityPropBag &
    TextSizeProps &
    FontWeightProps &
    TextAlignProps &
    LeadingProps &
    TrackingProps &
    Pick<TypographyModifierProps, 'truncate'> & {
  children: ReactNode;
  component?: ElementType;
  order?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({
    children,
    className,
    order = 1,
    size = 'lg',
    fw = 'bold',
    ta,
    leading = 'normal',
    tracking,
    truncate = 'no-truncate',
    ...props
  }, ref) => {
    const { utilityClassName, rest } = resolveUtilityClassName(props);
    const headingTag = `h${order}` as ElementType;

    const Heading = headingTag as ElementType;

    return (
      <Heading
        ref={ref}
        data-class="title"
        className={cn(
          textSizeVariants({ size }),
          fontWeightVariants({ fw }),
          textAlignVariants({ ta }),
          leadingVariants({ leading }),
          trackingVariants({ tracking }),
          typographyModifierVariants({ truncate }),
          utilityClassName,
          className
        )}
        {...rest}
      >
        {children}
      </Heading>
    );
  }
);

Title.displayName = "Title"; 