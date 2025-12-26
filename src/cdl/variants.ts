import { cva, type VariantProps } from "class-variance-authority";
import { cdlToCva } from "./cva";
import { cdlVariantsGenerated } from "./variants.generated";

// -----------------------------------------------------------------------------
// Source-of-truth (for now we bootstrap from the generated trace)
// -----------------------------------------------------------------------------

export const cdlVariants = cdlVariantsGenerated;

function getDef(namespace: string, exportName: string) {
  const ns = (cdlVariants as any)[namespace];
  const def = ns?.[exportName];
  if (!def) {
    throw new Error(`Missing CDL variant def: ${namespace}.${exportName}`);
  }
  return def;
}

// -----------------------------------------------------------------------------
// Base variants
// -----------------------------------------------------------------------------

export const spacingVariants = cdlToCva(getDef("spacing", "spacingVariants"));
export type VariantSpacingProps = VariantProps<typeof spacingVariants>;

export const roundedVariants = cdlToCva(getDef("rounded", "roundedVariants"));
export const roundedSideVariants = cdlToCva(getDef("rounded", "roundedSideVariants"));
export interface RoundedProps extends VariantProps<typeof roundedVariants> {}

export const shadowVariants = cdlToCva(getDef("shadow", "shadowVariants"));
export interface ShadowProps extends VariantProps<typeof shadowVariants> {}

export const colorVariants = cdlToCva(getDef("colors", "colorVariants"));
export interface ColorProps extends VariantProps<typeof colorVariants> {}

export const layoutVariants = cdlToCva(getDef("layout", "layoutVariants"));
export type VariantLayoutProps = VariantProps<typeof layoutVariants>;

export const borderVariants = cdlToCva(getDef("border", "borderVariants"));
export interface BorderProps extends VariantProps<typeof borderVariants> {}

export const sizingVariants = cdlToCva(getDef("sizing", "sizingVariants"));
export const iconSizeVariants = cdlToCva(getDef("sizing", "iconSizeVariants"));
export const containerSizeVariants = cdlToCva(getDef("sizing", "containerSizeVariants"));
export interface SizingProps extends VariantProps<typeof sizingVariants> {}
export interface IconSizingProps extends VariantProps<typeof iconSizeVariants> {}
export interface ContainerSizingProps extends VariantProps<typeof containerSizeVariants> {}

export const flexVariants = cdlToCva(getDef("flex", "flexVariants"));
export type VariantFlexProps = VariantProps<typeof flexVariants>;

export const gridVariants = cdlToCva(getDef("grid", "gridVariants"));
export interface VariantGridProps extends VariantProps<typeof gridVariants> {}

// -----------------------------------------------------------------------------
// Component-specific variants
// -----------------------------------------------------------------------------

export const buttonSizeVariants = cdlToCva(getDef("button", "buttonSizeVariants"));
export const buttonStyleVariants = cdlToCva(getDef("button", "buttonStyleVariants"));
export interface ButtonSizeProps extends VariantProps<typeof buttonSizeVariants> {}
export interface ButtonStyleProps extends VariantProps<typeof buttonStyleVariants> {}

export const badgeSizeVariants = cdlToCva(getDef("badge", "badgeSizeVariants"));
export const badgeStyleVariants = cdlToCva(getDef("badge", "badgeStyleVariants"));
export interface BadgeSizeProps extends VariantProps<typeof badgeSizeVariants> {}
export interface BadgeStyleProps extends VariantProps<typeof badgeStyleVariants> {}

export const cardVariantVariants = cdlToCva(getDef("card", "cardVariantVariants"));
export const cardHeaderVariants = cdlToCva(getDef("card", "cardHeaderVariants"));
export const cardTitleVariants = cdlToCva(getDef("card", "cardTitleVariants"));
export const cardDescriptionVariants = cdlToCva(getDef("card", "cardDescriptionVariants"));
export const cardContentVariants = cdlToCva(getDef("card", "cardContentVariants"));
export const cardFooterVariants = cdlToCva(getDef("card", "cardFooterVariants"));

export const containerLayoutVariants = cdlToCva(getDef("container", "containerLayoutVariants"));

export const groupLayoutVariants = cdlToCva(getDef("group", "groupLayoutVariants"));

export const imageBaseVariants = cdlToCva(getDef("image", "imageBaseVariants"));
export const imageFitVariants = cdlToCva(getDef("image", "imageFitVariants"));
export const imagePositionVariants = cdlToCva(getDef("image", "imagePositionVariants"));
export const aspectRatioVariants = cdlToCva(getDef("image", "aspectRatioVariants"));
export interface ImageFitProps extends VariantProps<typeof imageFitVariants> {}
export interface ImagePositionProps extends VariantProps<typeof imagePositionVariants> {}
export interface AspectRatioProps extends VariantProps<typeof aspectRatioVariants> {}

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export const textSizeVariants = cdlToCva(getDef("typography", "textSizeVariants"));
export const fontWeightVariants = cdlToCva(getDef("typography", "fontWeightVariants"));
export const textAlignVariants = cdlToCva(getDef("typography", "textAlignVariants"));
export const leadingVariants = cdlToCva(getDef("typography", "leadingVariants"));
export const typographyModifierVariants = cdlToCva(getDef("typography", "typographyModifierVariants"));
export const trackingVariants = cdlToCva(getDef("typography", "trackingVariants"));

export const textTransformVariants = cdlToCva(getDef("typography", "textTransformVariants"));
export const whitespaceVariants = cdlToCva(getDef("typography", "whitespaceVariants"));
export const breakVariants = cdlToCva(getDef("typography", "breakVariants"));
export const hyphenVariants = cdlToCva(getDef("typography", "hyphenVariants"));

export interface TextSizeProps extends VariantProps<typeof textSizeVariants> {}
export interface FontWeightProps extends VariantProps<typeof fontWeightVariants> {}
export interface TextAlignProps extends VariantProps<typeof textAlignVariants> {}
export interface LeadingProps extends VariantProps<typeof leadingVariants> {}
export interface TypographyModifierProps
  extends VariantProps<typeof typographyModifierVariants> {}
export interface TrackingProps extends VariantProps<typeof trackingVariants> {}

// Combined interfaces (kept for compatibility with previous variants barrel)
export interface UniversalProps extends VariantSpacingProps, RoundedProps, ShadowProps, ColorProps, BorderProps {}
export interface LayoutComponentProps extends UniversalProps, VariantLayoutProps {}
export interface GridComponentProps extends LayoutComponentProps, VariantGridProps {}
export interface TypographyProps
  extends TextSizeProps,
    FontWeightProps,
    TextAlignProps,
    LeadingProps,
    TypographyModifierProps,
    TrackingProps {}
export interface ButtonVariantProps extends ButtonSizeProps, ButtonStyleProps {}
export interface BadgeVariantProps extends BadgeSizeProps, BadgeStyleProps {}
export interface ImageVariantProps extends ImageFitProps, ImagePositionProps, AspectRatioProps {}

// -----------------------------------------------------------------------------
// Effects / interaction optional variants (were inline in src/variants/index.ts)
// -----------------------------------------------------------------------------

export const opacityVariants = cva("", {
  variants: {
    opacity: {
      0: "opacity-0",
      5: "opacity-5",
      10: "opacity-10",
      20: "opacity-20",
      25: "opacity-25",
      30: "opacity-30",
      40: "opacity-40",
      50: "opacity-50",
      60: "opacity-60",
      70: "opacity-70",
      75: "opacity-75",
      80: "opacity-80",
      90: "opacity-90",
      95: "opacity-95",
      100: "opacity-100",
    },
  },
});

export const cursorVariants = cva("", {
  variants: {
    cursor: {
      auto: "cursor-auto",
      default: "cursor-default",
      pointer: "cursor-pointer",
      wait: "cursor-wait",
      text: "cursor-text",
      move: "cursor-move",
      help: "cursor-help",
      notAllowed: "cursor-not-allowed",
    },
  },
});

export const userSelectVariants = cva("", {
  variants: {
    select: {
      none: "select-none",
      text: "select-text",
      all: "select-all",
      auto: "select-auto",
    },
  },
});

export const overscrollVariants = cva("", {
  variants: {
    overscroll: {
      auto: "overscroll-auto",
      contain: "overscroll-contain",
      none: "overscroll-none",
    },
  },
});


