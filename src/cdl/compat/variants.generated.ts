import { cva } from "class-variance-authority";

// Auto-generated compatibility layer.
// Source: .project/cdl/variants.generated.json
// Do not edit by hand.

export const badgeSizeVariants = cva("", {
  variants: {
    "size": {
      "xs": "px-1.5 py-0.5 text-xs",
      "sm": "px-2 py-0.5 text-xs",
      "default": "px-2.5 py-0.5 text-xs",
      "lg": "px-3 py-1 text-sm",
    },
  },
  defaultVariants: {
    "size": "default",
  }
});
export const badgeStyleVariants = cva("inline-flex items-center font-semibold transition-colors", {
  variants: {
    "variant": {
      "default": "bg-primary text-primary-foreground",
      "secondary": "bg-secondary text-secondary-foreground",
      "destructive": "bg-destructive text-destructive-foreground",
      "outline": "text-foreground border-border",
      "success": "bg-green-500 text-white",
      "warning": "bg-yellow-500 text-white",
      "info": "bg-blue-500 text-white",
    },
  },
  defaultVariants: {
    "variant": "default",
  }
});
export const borderVariants = cva("", {
  variants: {
    "border": {
      "none": "border-0",
      "1px": "border",
      "2px": "border-2",
      "4px": "border-4",
    },
    "ring": {
      "0": "ring-0",
      "1": "ring-1",
      "2": "ring-2",
      "4": "ring-4",
      "8": "ring-8",
    },
    "ringOffset": {
      "0": "ring-offset-0",
      "1": "ring-offset-1",
      "2": "ring-offset-2",
      "4": "ring-offset-4",
      "8": "ring-offset-8",
    },
    "borderStyle": {
      "solid": "border-solid",
      "dashed": "border-dashed",
      "dotted": "border-dotted",
    },
    "borderTop": {
      "none": "border-t-0",
      "1px": "border-t",
      "2px": "border-t-2",
      "4px": "border-t-4",
    },
    "borderBottom": {
      "none": "border-b-0",
      "1px": "border-b",
      "2px": "border-b-2",
      "4px": "border-b-4",
    },
    "borderLeft": {
      "none": "border-l-0",
      "1px": "border-l",
      "2px": "border-l-2",
      "4px": "border-l-4",
    },
    "borderRight": {
      "none": "border-r-0",
      "1px": "border-r",
      "2px": "border-r-2",
      "4px": "border-r-4",
    },
  },
  defaultVariants: {

  }
});
export const buttonSizeVariants = cva("", {
  variants: {
    "size": {
      "xs": "h-6 px-2 text-xs",
      "sm": "h-9 px-3 text-sm",
      "default": "h-10 px-4 py-2",
      "md": "h-10 px-4 py-2",
      "lg": "h-11 px-8",
      "xl": "h-12 px-10 text-base",
      "icon": "h-10 w-10",
    },
  },
  defaultVariants: {
    "size": "default",
  }
});
export const buttonStyleVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors shrink-0 outline-none", {
  variants: {
    "variant": {
      "default": "bg-primary text-primary-foreground0",
      "primary": "bg-primary text-primary-foreground",
      "destructive": "bg-destructive text-destructive-foreground",
      "outline": "border border-input bg-background",
      "secondary": "bg-secondary text-secondary-foreground",
      "ghost": "bg-accent text-accent-foreground",
      "link": "text-primary underline-offset-4",
    },
  },
  defaultVariants: {
    "variant": "default",
  }
});
export const buttonContentAlignVariants = cva("", {
  variants: {
    "contentAlign": {
      "start": "justify-start",
      "center": "justify-center",
      "end": "justify-end",
      "between": "justify-between",
    },
  },
  defaultVariants: {

  }
});
export const cardVariantVariants = cva("", {
  variants: {
    "variant": {
      "default": "border-border",
      "outlined": "border-border shadow-none",
      "filled": "border-transparent bg-muted/50",
    },
  },
  defaultVariants: {
    "variant": "default",
  }
});
export const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {

  },
  defaultVariants: {

  }
});
export const cardTitleVariants = cva("font-semibold leading-none tracking-tight", {
  variants: {

  },
  defaultVariants: {

  }
});
export const cardDescriptionVariants = cva("text-sm text-muted-foreground", {
  variants: {

  },
  defaultVariants: {

  }
});
export const cardContentVariants = cva("pt-0", {
  variants: {

  },
  defaultVariants: {

  }
});
export const cardFooterVariants = cva("flex items-center pt-0", {
  variants: {

  },
  defaultVariants: {

  }
});
export const colorVariants = cva("", {
  variants: {
    "bg": {
      "transparent": "bg-transparent",
      "background": "bg-background",
      "foreground": "bg-foreground",
      "primary": "bg-primary",
      "primary-foreground": "bg-primary-foreground",
      "secondary": "bg-secondary",
      "secondary-foreground": "bg-secondary-foreground",
      "muted": "bg-muted",
      "muted-foreground": "bg-muted-foreground",
      "accent": "bg-accent",
      "accent-foreground": "bg-accent-foreground",
      "destructive": "bg-destructive",
      "destructive-foreground": "bg-destructive-foreground",
      "border": "bg-border",
      "input": "bg-input",
      "ring": "bg-ring",
      "card": "bg-card",
      "popover": "bg-popover",
    },
    "c": {
      "foreground": "text-foreground",
      "primary": "text-primary",
      "primary-foreground": "text-primary-foreground",
      "secondary": "text-secondary",
      "secondary-foreground": "text-secondary-foreground",
      "muted": "text-muted-foreground",
      "accent": "text-accent-foreground",
      "destructive": "text-destructive",
      "destructive-foreground": "text-destructive-foreground",
    },
    "accentColor": {
      "auto": "accent-auto",
      "inherit": "accent-inherit",
      "current": "accent-current",
    },
    "placeholder": {
      "foreground": "placeholder-foreground",
      "muted": "placeholder-muted-foreground",
    },
    "caret": {
      "primary": "caret-primary",
      "secondary": "caret-secondary",
      "accent": "caret-accent",
      "foreground": "caret-foreground",
      "current": "caret-current",
      "transparent": "caret-transparent",
    },
    "borderColor": {
      "transparent": "border-transparent",
      "current": "border-current",
      "border": "border-border",
      "input": "border-input",
      "ring": "border-ring",
      "foreground": "border-foreground",
      "primary": "border-primary",
      "secondary": "border-secondary",
      "destructive": "border-destructive",
      "muted": "border-muted",
      "accent": "border-accent",
    },
    "selectionBg": {
      "primary": "bg-primary",
      "secondary": "bg-secondary",
      "accent": "bg-accent",
    },
    "selectionText": {
      "foreground": "text-foreground",
      "primary": "text-primary",
    },
  },
  defaultVariants: {

  }
});
export const containerLayoutVariants = cva("", {
  variants: {
    "centered": {
      "true": "mx-auto",
      "false": "",
    },
    "fluid": {
      "true": "max-w-none",
      "false": "",
    },
  },
  defaultVariants: {

  }
});
export const flexVariants = cva("flex", {
  variants: {
    "direction": {
      "row": "flex-row",
      "col": "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse",
    },
    "align": {
      "start": "items-start",
      "center": "items-center",
      "end": "items-end",
      "baseline": "items-baseline",
      "stretch": "items-stretch",
    },
    "justify": {
      "start": "justify-start",
      "center": "justify-center",
      "end": "justify-end",
      "between": "justify-between",
      "around": "justify-around",
      "evenly": "justify-evenly",
    },
    "wrap": {
      "wrap": "flex-wrap",
      "nowrap": "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    "grow": {
      "0": "grow-0",
      "1": "grow",
    },
    "shrink": {
      "0": "shrink-0",
      "1": "shrink",
    },
    "basis": {
      "0": "basis-0",
      "auto": "basis-auto",
      "full": "basis-full",
      "px": "basis-px",
    },
    "order": {
      "1": "order-1",
      "2": "order-2",
      "3": "order-3",
      "4": "order-4",
      "5": "order-5",
      "6": "order-6",
      "7": "order-7",
      "8": "order-8",
      "9": "order-9",
      "10": "order-10",
      "11": "order-11",
      "12": "order-12",
      "first": "order-first",
      "last": "order-last",
      "none": "order-none",
    },
    "gap": {
      "none": "gap-0",
      "xs": "gap-1",
      "sm": "gap-2",
      "md": "gap-4",
      "lg": "gap-6",
      "xl": "gap-8",
      "2xl": "gap-10",
      "3xl": "gap-12",
    },
    "gapX": {
      "none": "gap-x-0",
      "xs": "gap-x-1",
      "sm": "gap-x-2",
      "md": "gap-x-4",
      "lg": "gap-x-6",
      "xl": "gap-x-8",
    },
    "gapY": {
      "none": "gap-y-0",
      "xs": "gap-y-1",
      "sm": "gap-y-2",
      "md": "gap-y-4",
      "lg": "gap-y-6",
      "xl": "gap-y-8",
    },
  },
  defaultVariants: {

  }
});
export const gridVariants = cva("", {
  variants: {
    "cols": {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
      "3": "grid-cols-3",
      "4": "grid-cols-4",
      "5": "grid-cols-5",
      "6": "grid-cols-6",
      "12": "grid-cols-12",
      "1-2": "grid-cols-1 md:grid-cols-2",
      "1-3": "grid-cols-1 lg:grid-cols-3",
      "1-4": "grid-cols-1 lg:grid-cols-4",
      "1-5": "grid-cols-1 lg:grid-cols-5",
      "1-6": "grid-cols-1 lg:grid-cols-6",
      "2-3": "grid-cols-2 lg:grid-cols-3",
      "2-4": "grid-cols-2 lg:grid-cols-4",
      "2-5": "grid-cols-2 lg:grid-cols-5",
      "2-6": "grid-cols-2 lg:grid-cols-6",
      "3-4": "grid-cols-3 lg:grid-cols-4",
      "3-5": "grid-cols-3 lg:grid-cols-5",
      "3-6": "grid-cols-3 lg:grid-cols-6",
      "4-5": "grid-cols-4 lg:grid-cols-5",
      "4-6": "grid-cols-4 lg:grid-cols-6",
      "5-6": "grid-cols-5 lg:grid-cols-6",
      "1-2-3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      "1-2-4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      "1-2-6": "grid-cols-1 md:grid-cols-2 lg:grid-cols-6",
      "1-3-4": "grid-cols-1 md:grid-cols-3 lg:grid-cols-4",
      "1-3-6": "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
      "2-3-4": "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      "1-2-3-4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    },
    "gap": {
      "none": "gap-0",
      "xs": "gap-1",
      "sm": "gap-2",
      "md": "gap-4",
      "lg": "gap-6",
      "xl": "gap-8",
    },
    "align": {
      "start": "items-start",
      "center": "items-center",
      "end": "items-end",
      "stretch": "items-stretch",
    },
    "justify": {
      "start": "justify-start",
      "center": "justify-center",
      "end": "justify-end",
      "between": "justify-between",
      "around": "justify-around",
      "evenly": "justify-evenly",
    },
    "justifyItems": {
      "start": "justify-items-start",
      "center": "justify-items-center",
      "end": "justify-items-end",
      "stretch": "justify-items-stretch",
    },
    "rows": {
      "1": "grid-rows-1",
      "2": "grid-rows-2",
      "3": "grid-rows-3",
      "4": "grid-rows-4",
      "5": "grid-rows-5",
      "6": "grid-rows-6",
      "12": "grid-rows-12",
    },
    "content": {
      "start": "content-start",
      "center": "content-center",
      "end": "content-end",
      "between": "content-between",
      "around": "content-around",
      "evenly": "content-evenly",
    },
    "flow": {
      "row": "grid-flow-row",
      "col": "grid-flow-col",
      "dense": "grid-flow-dense",
      "rowDense": "grid-flow-row-dense",
      "colDense": "grid-flow-col-dense",
    },
    "autoRows": {
      "auto": "auto-rows-auto",
      "min": "auto-rows-min",
      "max": "auto-rows-max",
      "fr": "auto-rows-fr",
    },
    "autoCols": {
      "auto": "auto-cols-auto",
      "min": "auto-cols-min",
      "max": "auto-cols-max",
      "fr": "auto-cols-fr",
    },
    "rowStart": {
      "1": "row-start-1",
      "2": "row-start-2",
      "3": "row-start-3",
      "4": "row-start-4",
      "5": "row-start-5",
      "6": "row-start-6",
      "7": "row-start-7",
      "auto": "row-start-auto",
    },
    "rowEnd": {
      "1": "row-end-1",
      "2": "row-end-2",
      "3": "row-end-3",
      "4": "row-end-4",
      "5": "row-end-5",
      "6": "row-end-6",
      "7": "row-end-7",
      "auto": "row-end-auto",
    },
    "colStart": {
      "1": "col-start-1",
      "2": "col-start-2",
      "3": "col-start-3",
      "4": "col-start-4",
      "5": "col-start-5",
      "6": "col-start-6",
      "7": "col-start-7",
      "8": "col-start-8",
      "9": "col-start-9",
      "10": "col-start-10",
      "11": "col-start-11",
      "12": "col-start-12",
      "13": "col-start-13",
      "auto": "col-start-auto",
    },
    "colEnd": {
      "1": "col-end-1",
      "2": "col-end-2",
      "3": "col-end-3",
      "4": "col-end-4",
      "5": "col-end-5",
      "6": "col-end-6",
      "7": "col-end-7",
      "8": "col-end-8",
      "9": "col-end-9",
      "10": "col-end-10",
      "11": "col-end-11",
      "12": "col-end-12",
      "13": "col-end-13",
      "auto": "col-end-auto",
    },
    "gapX": {
      "none": "gap-x-0",
      "xs": "gap-x-1",
      "sm": "gap-x-2",
      "md": "gap-x-4",
      "lg": "gap-x-6",
      "xl": "gap-x-8",
    },
    "gapY": {
      "none": "gap-y-0",
      "xs": "gap-y-1",
      "sm": "gap-y-2",
      "md": "gap-y-4",
      "lg": "gap-y-6",
      "xl": "gap-y-8",
    },
  },
  defaultVariants: {

  }
});
export const groupLayoutVariants = cva("", {
  variants: {
    "grow": {
      "true": "flex-1",
      "false": "",
    },
    "preventGrowOverflow": {
      "true": "min-w-0",
      "false": "",
    },
  },
  defaultVariants: {

  }
});
export const imageBaseVariants = cva("block", {
  variants: {
    "withPlaceholder": {
      "true": "bg-muted",
      "false": "",
    },
  },
  defaultVariants: {

  }
});
export const imageFitVariants = cva("", {
  variants: {
    "fit": {
      "contain": "object-contain",
      "cover": "object-cover",
      "fill": "object-fill",
      "scale-down": "object-scale-down",
      "none": "object-none",
    },
  },
  defaultVariants: {
    "fit": "cover",
  }
});
export const imagePositionVariants = cva("", {
  variants: {
    "position": {
      "center": "object-center",
      "top": "object-top",
      "top-right": "object-top object-right",
      "right": "object-right",
      "bottom-right": "object-bottom object-right",
      "bottom": "object-bottom",
      "bottom-left": "object-bottom object-left",
      "left": "object-left",
      "top-left": "object-top object-left",
    },
  },
  defaultVariants: {
    "position": "center",
  }
});
export const aspectRatioVariants = cva("", {
  variants: {
    "aspect": {
      "auto": "",
      "square": "aspect-square",
      "video": "aspect-video",
    },
  },
  defaultVariants: {
    "aspect": "auto",
  }
});
export const layoutVariants = cva("", {
  variants: {
    "display": {
      "block": "block",
      "inline-block": "inline-block",
      "inline": "inline",
      "flex": "flex",
      "inline-flex": "inline-flex",
      "grid": "grid",
      "inline-grid": "inline-grid",
      "contents": "contents",
      "hidden": "hidden",
    },
    "w": {
      "auto": "w-auto",
      "full": "w-full",
      "screen": "w-screen",
      "fit": "w-fit",
      "min": "w-min",
      "max": "w-max",
      "1px": "w-px",
    },
    "minW": {
      "0": "min-w-0",
      "full": "min-w-full",
      "min": "min-w-min",
      "max": "min-w-max",
    },
    "maxW": {
      "none": "max-w-none",
      "full": "max-w-full",
      "sm": "max-w-sm",
      "md": "max-w-md",
      "lg": "max-w-lg",
      "xl": "max-w-xl",
      "2xl": "max-w-2xl",
      "screenSm": "max-w-screen-sm",
      "screenMd": "max-w-screen-md",
      "screenLg": "max-w-screen-lg",
      "screenXl": "max-w-screen-xl",
      "screen2xl": "max-w-screen-2xl",
    },
    "h": {
      "auto": "h-auto",
      "full": "h-full",
      "screen": "h-screen",
      "fit": "h-fit",
      "min": "h-min",
      "max": "h-max",
      "1px": "h-px",
    },
    "maxH": {
      "none": "max-h-none",
      "full": "max-h-full",
      "screen": "max-h-screen",
    },
    "minH": {
      "screen": "min-h-screen",
      "full": "min-h-full",
    },
    "position": {
      "static": "static",
      "relative": "relative",
      "absolute": "absolute",
      "fixed": "fixed",
      "sticky": "sticky",
    },
    "inset": {
      "0": "inset-0",
      "auto": "inset-auto",
    },
    "top": {
      "0": "top-0",
      "auto": "top-auto",
    },
    "right": {
      "0": "right-0",
      "auto": "right-auto",
    },
    "bottom": {
      "0": "bottom-0",
      "auto": "bottom-auto",
    },
    "left": {
      "0": "left-0",
      "auto": "left-auto",
    },
    "z": {
      "0": "z-0",
      "10": "z-10",
      "20": "z-20",
      "30": "z-30",
      "40": "z-40",
      "50": "z-50",
      "auto": "z-auto",
    },
    "overflow": {
      "auto": "overflow-auto",
      "hidden": "overflow-hidden",
      "visible": "overflow-visible",
      "scroll": "overflow-scroll",
    },
    "overflowX": {
      "auto": "overflow-x-auto",
      "hidden": "overflow-x-hidden",
      "visible": "overflow-x-visible",
      "scroll": "overflow-x-scroll",
    },
    "overflowY": {
      "auto": "overflow-y-auto",
      "hidden": "overflow-y-hidden",
      "visible": "overflow-y-visible",
      "scroll": "overflow-y-scroll",
    },
    "visibility": {
      "visible": "visible",
      "invisible": "invisible",
      "collapse": "collapse",
    },
    "pointerEvents": {
      "auto": "pointer-events-auto",
      "none": "pointer-events-none",
    },
  },
  defaultVariants: {

  }
});
export const roundedVariants = cva("", {
  variants: {
    "rounded": {
      "none": "rounded-none",
      "default": "rounded",
      "sm": "rounded-sm",
      "md": "rounded-md",
      "lg": "rounded-lg",
      "xl": "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      "full": "rounded-full",
    },
  },
  defaultVariants: {

  }
});
export const roundedSideVariants = cva("", {
  variants: {
    "roundedTop": {
      "none": "rounded-t-none",
      "sm": "rounded-t-sm",
      "md": "rounded-t-md",
      "lg": "rounded-t-lg",
      "xl": "rounded-t-xl",
      "full": "rounded-t-full",
    },
    "roundedRight": {
      "none": "rounded-r-none",
      "sm": "rounded-r-sm",
      "md": "rounded-r-md",
      "lg": "rounded-r-lg",
      "xl": "rounded-r-xl",
      "full": "rounded-r-full",
    },
    "roundedBottom": {
      "none": "rounded-b-none",
      "sm": "rounded-b-sm",
      "md": "rounded-b-md",
      "lg": "rounded-b-lg",
      "xl": "rounded-b-xl",
      "full": "rounded-b-full",
    },
    "roundedLeft": {
      "none": "rounded-l-none",
      "sm": "rounded-l-sm",
      "md": "rounded-l-md",
      "lg": "rounded-l-lg",
      "xl": "rounded-l-xl",
      "full": "rounded-l-full",
    },
  },
  defaultVariants: {

  }
});
export const shadowVariants = cva("", {
  variants: {
    "shadow": {
      "none": "shadow-none",
      "sm": "shadow-sm",
      "md": "shadow-md",
      "lg": "shadow-lg",
      "xl": "shadow-xl",
      "2xl": "shadow-2xl",
      "inner": "shadow-inner",
    },
  },
  defaultVariants: {

  }
});
export const sizingVariants = cva("", {
  variants: {
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": "",
      "2xl": "",
    },
  },
  defaultVariants: {

  }
});
export const iconSizeVariants = cva("", {
  variants: {
    "size": {
      "xs": "w-3 h-3",
      "sm": "w-4 h-4",
      "md": "w-5 h-5",
      "lg": "w-6 h-6",
      "xl": "w-8 h-8",
      "2xl": "w-12 h-12",
    },
  },
  defaultVariants: {

  }
});
export const containerSizeVariants = cva("", {
  variants: {
    "size": {
      "xs": "max-w-screen-sm",
      "sm": "max-w-screen-md",
      "md": "max-w-screen-lg",
      "lg": "max-w-screen-xl",
      "xl": "max-w-screen-2xl",
      "2xl": "max-w-2xl",
      "4xl": "max-w-4xl",
      "6xl": "max-w-6xl",
      "full": "max-w-none",
    },
  },
  defaultVariants: {

  }
});
export const spacingVariants = cva("", {
  variants: {
    "m": {
      "none": "m-0",
      "xs": "m-1",
      "sm": "m-2",
      "md": "m-4",
      "lg": "m-6",
      "xl": "m-8",
      "2xl": "m-12",
      "auto": "m-auto",
    },
    "mx": {
      "none": "mx-0",
      "xs": "mx-1",
      "sm": "mx-2",
      "md": "mx-4",
      "lg": "mx-6",
      "xl": "mx-8",
      "2xl": "mx-12",
      "auto": "mx-auto",
    },
    "my": {
      "none": "my-0",
      "xs": "my-1",
      "sm": "my-2",
      "md": "my-4",
      "lg": "my-6",
      "xl": "my-8",
      "2xl": "my-12",
      "auto": "my-auto",
    },
    "mt": {
      "none": "mt-0",
      "xs": "mt-1",
      "sm": "mt-2",
      "md": "mt-4",
      "lg": "mt-6",
      "xl": "mt-8",
      "2xl": "mt-12",
      "auto": "mt-auto",
    },
    "mb": {
      "none": "mb-0",
      "xs": "mb-1",
      "sm": "mb-2",
      "md": "mb-4",
      "lg": "mb-6",
      "xl": "mb-8",
      "2xl": "mb-12",
      "auto": "mb-auto",
    },
    "ml": {
      "none": "ml-0",
      "xs": "ml-1",
      "sm": "ml-2",
      "md": "ml-4",
      "lg": "ml-6",
      "xl": "ml-8",
      "2xl": "ml-12",
      "auto": "ml-auto",
    },
    "mr": {
      "none": "mr-0",
      "xs": "mr-1",
      "sm": "mr-2",
      "md": "mr-4",
      "lg": "mr-6",
      "xl": "mr-8",
      "2xl": "mr-12",
      "auto": "mr-auto",
    },
    "p": {
      "none": "p-0",
      "xs": "p-1",
      "sm": "p-2",
      "md": "p-4",
      "lg": "p-6",
      "xl": "p-8",
      "2xl": "p-12",
    },
    "px": {
      "none": "px-0",
      "xs": "px-1",
      "sm": "px-2",
      "md": "px-4",
      "lg": "px-6",
      "xl": "px-8",
      "2xl": "px-12",
    },
    "py": {
      "none": "py-0",
      "xs": "py-2",
      "sm": "py-4",
      "md": "py-8",
      "lg": "py-16",
      "xl": "py-32",
      "2xl": "py-48",
    },
    "pt": {
      "none": "pt-0",
      "xs": "pt-1",
      "sm": "pt-2",
      "md": "pt-4",
      "lg": "pt-6",
      "xl": "pt-8",
      "2xl": "pt-12",
    },
    "pb": {
      "none": "pb-0",
      "xs": "pb-1",
      "sm": "pb-2",
      "md": "pb-4",
      "lg": "pb-6",
      "xl": "pb-8",
      "2xl": "pb-12",
    },
    "pl": {
      "none": "pl-0",
      "xs": "pl-1",
      "sm": "pl-2",
      "md": "pl-4",
      "lg": "pl-6",
      "xl": "pl-8",
      "2xl": "pl-12",
    },
    "pr": {
      "none": "pr-0",
      "xs": "pr-1",
      "sm": "pr-2",
      "md": "pr-4",
      "lg": "pr-6",
      "xl": "pr-8",
      "2xl": "pr-12",
    },
    "spaceX": {
      "none": "space-x-0",
      "xs": "space-x-1",
      "sm": "space-x-2",
      "md": "space-x-4",
      "lg": "space-x-6",
      "xl": "space-x-8",
    },
    "spaceY": {
      "none": "space-y-0",
      "xs": "space-y-1",
      "sm": "space-y-2",
      "md": "space-y-4",
      "lg": "space-y-6",
      "xl": "space-y-8",
    },
  },
  defaultVariants: {

  }
});
export const textSizeVariants = cva("", {
  variants: {
    "size": {
      "xs": "text-xs",
      "sm": "text-sm",
      "md": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
  },
  defaultVariants: {
    "size": "md",
  }
});
export const fontWeightVariants = cva("", {
  variants: {
    "fw": {
      "normal": "font-normal",
      "medium": "font-medium",
      "semibold": "font-semibold",
      "bold": "font-bold",
    },
  },
  defaultVariants: {
    "fw": "normal",
  }
});
export const textAlignVariants = cva("", {
  variants: {
    "ta": {
      "left": "text-left",
      "center": "text-center",
      "right": "text-right",
      "justify": "text-justify",
    },
  },
  defaultVariants: {

  }
});
export const leadingVariants = cva("", {
  variants: {
    "leading": {
      "tight": "leading-tight",
      "normal": "leading-normal",
      "relaxed": "leading-relaxed",
    },
  },
  defaultVariants: {
    "leading": "normal",
  }
});
export const typographyModifierVariants = cva("", {
  variants: {
    "truncate": {
      "true": "truncate",
      "false": "",
    },
    "italic": {
      "true": "italic",
      "false": "",
    },
    "underline": {
      "true": "underline",
      "false": "",
    },
  },
  defaultVariants: {

  }
});
export const trackingVariants = cva("", {
  variants: {
    "tracking": {
      "tighter": "tracking-tighter",
      "tight": "tracking-tight",
      "normal": "tracking-normal",
      "wide": "tracking-wide",
      "wider": "tracking-wider",
      "widest": "tracking-widest",
    },
  },
  defaultVariants: {

  }
});
export const textTransformVariants = cva("", {
  variants: {
    "transform": {
      "uppercase": "uppercase",
      "lowercase": "lowercase",
      "capitalize": "capitalize",
      "normal": "normal-case",
    },
  },
  defaultVariants: {

  }
});
export const whitespaceVariants = cva("", {
  variants: {
    "whitespace": {
      "normal": "whitespace-normal",
      "nowrap": "whitespace-nowrap",
      "pre": "whitespace-pre",
      "preLine": "whitespace-pre-line",
      "preWrap": "whitespace-pre-wrap",
      "breakSpaces": "whitespace-break-spaces",
    },
  },
  defaultVariants: {

  }
});
export const breakVariants = cva("", {
  variants: {
    "break": {
      "normal": "break-normal",
      "words": "break-words",
      "all": "break-all",
    },
  },
  defaultVariants: {

  }
});
export const hyphenVariants = cva("", {
  variants: {
    "hyphens": {
      "none": "hyphens-none",
      "manual": "hyphens-manual",
      "auto": "hyphens-auto",
    },
  },
  defaultVariants: {

  }
});
