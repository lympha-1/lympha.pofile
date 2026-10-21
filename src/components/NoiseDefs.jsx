/**
 * Shared SVG definitions (grain filter, gradients, logo emboss filter).
 * Rendered once at the top of <App />; every other component references them by id.
 * Taken 1:1 from the original design export.
 */
const NOISE_TABLE = "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ";

export default function NoiseDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        {/* film grain */}
        <filter id="lr-grain" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.5 0.5" stitchTiles="stitch" numOctaves="3" result="noise" seed="5331" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA type="discrete" tableValues={NOISE_TABLE} />
          </feComponentTransfer>
          <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
          <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
          <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>

        {/* engraved logo: 60 % opacity + inner shadow */}
        <filter id="lr-emboss" colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
          <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.6 0" result="shape" />
          <feColorMatrix in="shape" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" />
        </filter>

        {/* panel gradients (bounding-box units so they fit any panel size) */}
        <linearGradient id="lr-dark" x1="0" y1="0.256" x2="0" y2="1">
          <stop stopColor="#666666" stopOpacity="0" />
          <stop offset="1" stopColor="#13312D" />
        </linearGradient>
        <linearGradient id="lr-light" x1="0" y1="0.744" x2="0" y2="0">
          <stop stopColor="#666666" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.37" />
        </linearGradient>
        <linearGradient id="lr-light-footer" x1="0" y1="0.844" x2="0" y2="0.1">
          <stop stopColor="#666666" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.37" />
        </linearGradient>
      </defs>
    </svg>
  );
}
