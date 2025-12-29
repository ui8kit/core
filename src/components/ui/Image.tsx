import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { resolveUtilityClassName, type UtilityPropBag, type UtilityPropPrefix } from "../../lib/utility-props";
import {
  imageBaseVariants,
  imageFitVariants,
  imagePositionVariants,
  aspectRatioVariants,
  type ImageFitProps,
  type ImagePositionProps,
  type AspectRatioProps
} from "../../variants";

type ImageDomProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, UtilityPropPrefix | 'width' | 'height'>;

export type ImageProps
  = ImageDomProps &
    UtilityPropBag & {
  width?: string | number;
  height?: string | number;
  fallbackSrc?: string;
  withPlaceholder?: boolean;
} & ImageFitProps &
    ImagePositionProps &
    AspectRatioProps;

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({
    className,
    src,
    alt,
    width,
    height,
    fit = 'cover',
    position = 'center',
    aspect = 'auto',
    fallbackSrc,
    withPlaceholder = false,
    onError,
    ...props
  }, ref) => {
    const { utilityClassName, rest } = resolveUtilityClassName(props);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (fallbackSrc) {
        e.currentTarget.src = fallbackSrc;
      }
      onError?.(e);
    };

    return (
      <img
        ref={ref}
        data-class="image"
        src={src}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
        className={cn(
          imageBaseVariants({ withPlaceholder: withPlaceholder ? 'with-placeholder' : 'no-placeholder' }),
          imageFitVariants({ fit }),
          imagePositionVariants({ position }),
          aspectRatioVariants({ aspect }),
          utilityClassName,
          className
        )}
        {...rest}
      />
    );
  }
);

Image.displayName = "Image"; 