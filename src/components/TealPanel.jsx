/**
 * The textured green surface used by the header, the footer and the
 * "Download My QR" button: base colour + dark gradient + light sheen, both with film grain.
 */
export default function TealPanel({ className = "", sheen = "lr-light", children, as: Tag = "div", ...rest }) {
  return (
    <Tag className={`relative isolate overflow-hidden bg-[#397F75] ${className}`} {...rest}>
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full" aria-hidden="true">
        <rect width="100%" height="100%" fill="url(#lr-dark)" filter="url(#lr-grain)" />
        <rect width="100%" height="100%" fill={`url(#${sheen})`} filter="url(#lr-grain)" />
      </svg>
      {children}
    </Tag>
  );
}
