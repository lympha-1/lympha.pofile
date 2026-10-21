import logoMark from "../assets/logo-mark.webp";
import TealPanel from "./TealPanel";

export default function Header() {
  return (
    <TealPanel
      as="header"
      className="h-[260px] rounded-b-[20px] shadow-[0_6px_3px_rgba(0,0,0,0.25)]"
    >
      {/* engraved logo – 281 × 281, centred, bleeds 11px above the top edge */}
      <svg
        className="absolute left-1/2 top-[-11px] h-[281px] w-[281px] -translate-x-1/2"
        viewBox="0 0 281 281"
        role="img"
        aria-label="Lympha Resto logo"
      >
        <g filter="url(#lr-emboss)">
          <image href={logoMark} width="281" height="281" preserveAspectRatio="none" />
        </g>
      </svg>
    </TealPanel>
  );
}
