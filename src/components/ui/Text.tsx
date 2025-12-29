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

type TextDomProps = Omit<React.HTMLAttributes<HTMLElement>, UtilityPropPrefix>;

export type TextProps
  = TextDomProps &
    UtilityPropBag &
    TextSizeProps &
    FontWeightProps &
    TextAlignProps &
    LeadingProps &
    TrackingProps &
    TypographyModifierProps & {
  children: ReactNode;
  component?: ElementType;
};

export const Text = forwardRef<HTMLElement, TextProps>(
  ({
    children,
    className,
    component = 'p',
    size = 'md',
    fw = 'normal',
    ta,
    leading = 'normal',
    tracking,
    truncate = 'no-truncate',
    italic = 'no-italic',
    underline = 'no-underline',
    ...props
  }, ref) => {
    const { utilityClassName, rest } = resolveUtilityClassName(props);
    const Element = component as ElementType;

    return (
      <Element
        ref={ref}
        data-class="text"
        className={cn(
          textSizeVariants({ size }),
          fontWeightVariants({ fw }),
          textAlignVariants({ ta }),
          leadingVariants({ leading }),
          trackingVariants({ tracking }),
          typographyModifierVariants({ truncate, italic, underline }),
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

Text.displayName = "Text"; 