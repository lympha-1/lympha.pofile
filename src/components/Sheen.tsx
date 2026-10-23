/**
 * Soft radial highlight painted over the dark/light buttons.
 * Gradient geometry is copied 1:1 from the design export (coordinates are relative to the button).
 */
interface SheenProps {
  /** unique id for the gradient */
  id: string;
  width: number;
  height: number;
  /** top offset of the painted rectangle (the design leaves a 1px inset on the light button) */
  y?: number;
  radius?: number;
  transform: string;
  stops: [offset: number, color: string][];
  /** fill-opacity of the whole sheen */
  opacity?: number;
}

export default function Sheen({ id, width, height, y = 0, radius = 10, transform, stops, opacity = 0.5 }: SheenProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={id} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={transform}>
          {stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} stopOpacity={0.6} />
          ))}
        </radialGradient>
      </defs>
      <rect x="0" y={y} width={width} height={height} rx={radius} fill={`url(#${id})`} fillOpacity={opacity} />
    </svg>
  );
}

/** Colour stops used by the dark buttons (Save Contact / Download My QR). */
export const DARK_STOPS: [number, string][] = [
  [0, "#DFDFDF"],
  [0.317369, "#627774"],
  [0.466368, "#435D59"],
  [0.563239, "#2D4B47"],
  [0.742288, "#1A3A36"],
  [0.878515, "#062A25"],
];

/** Colour stops used by the light Share button. */
export const LIGHT_STOPS: [number, string][] = [
  [0, "#63EBC4"],
  [0.338147, "#ACF0DC"],
  [0.55883, "#F1F6F3"],
  [0.722598, "#F4F6F3"],
  [0.878515, "#F6F6F4"],
];
