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
export type VariantSpacingProps = {
  m?: VariantProps<typeof spacingVariants>["m"];
  mx?: VariantProps<typeof spacingVariants>["mx"];
  my?: VariantProps<typeof spacingVariants>["my"];
  mt?: VariantProps<typeof spacingVariants>["mt"];
  mb?: VariantProps<typeof spacingVariants>["mb"];
  ml?: VariantProps<typeof spacingVariants>["ml"];
  mr?: VariantProps<typeof spacingVariants>["mr"];
  p?: VariantProps<typeof spacingVariants>["p"];
  px?: VariantProps<typeof spacingVariants>["px"];
  py?: VariantProps<typeof spacingVariants>["py"];
  pt?: VariantProps<typeof spacingVariants>["pt"];
  pb?: VariantProps<typeof spacingVariants>["pb"];
  pl?: VariantProps<typeof spacingVariants>["pl"];
  pr?: VariantProps<typeof spacingVariants>["pr"];
  gap?: VariantProps<typeof spacingVariants>["gap"];
  gapX?: VariantProps<typeof spacingVariants>["gapX"];
  gapY?: VariantProps<typeof spacingVariants>["gapY"];
};

export const roundedVariants = cdlToCva(getDef("rounded", "roundedVariants"));
export const roundedSideVariants = cdlToCva(getDef("rounded", "roundedSideVariants"));
export type RoundedProps = { rounded?: VariantProps<typeof roundedVariants>["rounded"] };

export const shadowVariants = cdlToCva(getDef("shadow", "shadowVariants"));
export type ShadowProps = { shadow?: VariantProps<typeof shadowVariants>["shadow"] };

export const colorVariants = cdlToCva(getDef("colors", "colorVariants"));
export type ColorProps = {
  bg?: VariantProps<typeof colorVariants>["bg"];
  c?: VariantProps<typeof colorVariants>["c"];
  borderColor?: VariantProps<typeof colorVariants>["borderColor"];
};

export const layoutVariants = cdlToCva(getDef("layout", "layoutVariants"));
export type VariantLayoutProps = {
  display?: VariantProps<typeof layoutVariants>["display"];
  w?: VariantProps<typeof layoutVariants>["w"];
  h?: VariantProps<typeof layoutVariants>["h"];
  minW?: VariantProps<typeof layoutVariants>["minW"];
  minH?: VariantProps<typeof layoutVariants>["minH"];
  maxW?: VariantProps<typeof layoutVariants>["maxW"];
  maxH?: VariantProps<typeof layoutVariants>["maxH"];
  position?: VariantProps<typeof layoutVariants>["position"];
  z?: VariantProps<typeof layoutVariants>["z"];
  overflow?: VariantProps<typeof layoutVariants>["overflow"];
};

export const borderVariants = cdlToCva(getDef("border", "borderVariants"));
export type BorderProps = {
  border?: VariantProps<typeof borderVariants>["border"];
  borderTop?: VariantProps<typeof borderVariants>["borderTop"];
  borderRight?: VariantProps<typeof borderVariants>["borderRight"];
  borderBottom?: VariantProps<typeof borderVariants>["borderBottom"];
  borderLeft?: VariantProps<typeof borderVariants>["borderLeft"];
};

export const sizingVariants = cdlToCva(getDef("sizing", "sizingVariants"));
export const iconSizeVariants = cdlToCva(getDef("sizing", "iconSizeVariants"));
export const containerSizeVariants = cdlToCva(getDef("sizing", "containerSizeVariants"));
export type SizingProps = { size?: VariantProps<typeof sizingVariants>["size"] };
export type IconSizingProps = { size?: VariantProps<typeof iconSizeVariants>["size"] };
export type ContainerSizingProps = { size?: VariantProps<typeof containerSizeVariants>["size"] };

export const flexVariants = cdlToCva(getDef("flex", "flexVariants"));
export type VariantFlexProps = {
  direction?: VariantProps<typeof flexVariants>["direction"];
  align?: VariantProps<typeof flexVariants>["align"];
  justify?: VariantProps<typeof flexVariants>["justify"];
  wrap?: VariantProps<typeof flexVariants>["wrap"];
  gap?: VariantProps<typeof flexVariants>["gap"];
  grow?: VariantProps<typeof flexVariants>["grow"];
  shrink?: VariantProps<typeof flexVariants>["shrink"];
  basis?: VariantProps<typeof flexVariants>["basis"];
};

export const gridVariants = cdlToCva(getDef("grid", "gridVariants"));
export type VariantGridProps = {
  cols?: VariantProps<typeof gridVariants>["cols"];
  gap?: VariantProps<typeof gridVariants>["gap"];
  align?: VariantProps<typeof gridVariants>["align"];
  justify?: VariantProps<typeof gridVariants>["justify"];
  justifyItems?: VariantProps<typeof gridVariants>["justifyItems"];
  rows?: VariantProps<typeof gridVariants>["rows"];
  content?: VariantProps<typeof gridVariants>["content"];
  flow?: VariantProps<typeof gridVariants>["flow"];
  autoRows?: VariantProps<typeof gridVariants>["autoRows"];
  autoCols?: VariantProps<typeof gridVariants>["autoCols"];
  rowStart?: VariantProps<typeof gridVariants>["rowStart"];
  rowEnd?: VariantProps<typeof gridVariants>["rowEnd"];
  colStart?: VariantProps<typeof gridVariants>["colStart"];
  colEnd?: VariantProps<typeof gridVariants>["colEnd"];
  gapX?: VariantProps<typeof gridVariants>["gapX"];
  gapY?: VariantProps<typeof gridVariants>["gapY"];
};

// -----------------------------------------------------------------------------
// Component-specific variants
// -----------------------------------------------------------------------------

export const buttonSizeVariants = cdlToCva(getDef("button", "buttonSizeVariants"));
export const buttonStyleVariants = cdlToCva(getDef("button", "buttonStyleVariants"));
export type ButtonSizeProps = { size?: VariantProps<typeof buttonSizeVariants>["size"] };
export type ButtonStyleProps = { variant?: VariantProps<typeof buttonStyleVariants>["variant"] };

export const badgeSizeVariants = cdlToCva(getDef("badge", "badgeSizeVariants"));
export const badgeStyleVariants = cdlToCva(getDef("badge", "badgeStyleVariants"));
export type BadgeSizeProps = { size?: VariantProps<typeof badgeSizeVariants>["size"] };
export type BadgeStyleProps = { variant?: VariantProps<typeof badgeStyleVariants>["variant"] };

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
export type ImageFitProps = { fit?: VariantProps<typeof imageFitVariants>["fit"] };
export type ImagePositionProps = { position?: VariantProps<typeof imagePositionVariants>["position"] };
export type AspectRatioProps = { ratio?: VariantProps<typeof aspectRatioVariants>["ratio"] };

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

export type TextSizeProps = { size?: VariantProps<typeof textSizeVariants>["size"] };
export type FontWeightProps = { fw?: VariantProps<typeof fontWeightVariants>["fw"] };
export type TextAlignProps = { ta?: VariantProps<typeof textAlignVariants>["ta"] };
export type LeadingProps = { leading?: VariantProps<typeof leadingVariants>["leading"] };
export type TypographyModifierProps = {
  truncate?: VariantProps<typeof typographyModifierVariants>["truncate"];
  italic?: VariantProps<typeof typographyModifierVariants>["italic"];
  underline?: VariantProps<typeof typographyModifierVariants>["underline"];
};
export type TrackingProps = { tracking?: VariantProps<typeof trackingVariants>["tracking"] };

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


