type ColorObject = {
  r?: number;
  g?: number;
  b?: number;
  h?: number;
  s?: number;
  v?: number;
  a?: number;
};

/**
 * Converts a color object to a string in `rgb` or `hsv` format.
 *
 * @param color - An object containing values as `rgb` or `hsv` components.
 * @param type - `'rgb'` or `'hsv'` to specify the color model.
 * @param excludeAlpha - Whether to exclude the alpha value in the output.
 * @returns The formatted color string.
 */
export function colorToString(
  color: ColorObject,
  type: 'rgb' | 'hsv',
  excludeAlpha?: boolean
): string {
  const shouldExcludeAlpha =
    (color.a === undefined || color.a === 1) && excludeAlpha;

  if (
    type === 'rgb' &&
    color.r !== undefined &&
    color.g !== undefined &&
    color.b !== undefined
  ) {
    if (shouldExcludeAlpha) {
      return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(
        color.b
      )})`;
    }
    return `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(
      color.b
    )}, ${color.a ?? 1})`;
  }

  if (
    type === 'hsv' &&
    color.h !== undefined &&
    color.s !== undefined &&
    color.v !== undefined
  ) {
    if (shouldExcludeAlpha) {
      return `hsv(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(
        color.v
      )}%)`;
    }
    return `hsva(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(
      color.v
    )}%, ${color.a ?? 1})`;
  }

  throw new Error('Invalid color object or type');
}
