import { SaveGlyph, ShareGlyph } from "./icons";

const base =
  "flex h-[35px] items-center rounded-[8px] bg-white font-poppins text-[19.8px] font-semibold leading-none text-black shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_6px_rgba(0,0,0,0.25)] active:translate-y-0 active:scale-[0.98]";

export default function ActionButtons({ onSave, onShare }) {
  return (
    <div className="mt-[26px] flex items-center pl-[26px] pr-[22px]">
      <button type="button" onClick={onSave} className={`${base} w-[207px] pl-[13px]`}>
        <SaveGlyph width="24" height="24" className="-ml-px shrink-0 text-black" />
        <span className="ml-[16px]">Save Contact</span>
      </button>
      <button type="button" onClick={onShare} className={`${base} ml-[15px] w-[175px] pl-[42.9px]`}>
        <ShareGlyph width="22.24" height="22.24" className="shrink-0 text-black" />
        <span className="ml-[10px]">Share</span>
      </button>
    </div>
  );
}
