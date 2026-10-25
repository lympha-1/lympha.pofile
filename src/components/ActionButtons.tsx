import { useState } from "react";
import { profile } from "../data/profile";
import { asset, buildVCard, downloadBlob } from "../lib/utils";
import ShareModal from "./ShareModal";
import Sheen, { DARK_STOPS, LIGHT_STOPS } from "./Sheen";

interface Props {
  notify: (message: string) => void;
}

const btn =
  "relative flex h-[43px] min-w-0 flex-1 items-center overflow-hidden rounded-[10px] text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(6,42,37,0.25)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

/** "Save Contact" (downloads a .vcf) and "Share" (opens the share dialog). */
export default function ActionButtons({ notify }: Props) {
  const [shareOpen, setShareOpen] = useState(false);

  const saveContact = () => {
    downloadBlob(buildVCard(profile), "lympha-resto.vcf");
    notify("Contact card downloaded");
  };

  return (
    <>
      <div className="mx-[11px] flex gap-[12px] sm:gap-[29px]">
        {/* Save Contact */}
        <button type="button" onClick={saveContact} className={`${btn} bg-deep`}>
          <Sheen
            id="sheen-save"
            width={197}
            height={43}
            transform="translate(155 0) rotate(158.871) scale(158.13 111.214)"
            stops={DARK_STOPS}
          />
          <img
            src={asset("images/bookmark.svg")}
            alt=""
            width={16.29}
            height={23.14}
            className="relative ml-[clamp(12px,5vw,32.6px)] h-[23.14px] w-[16.29px] shrink-0"
          />
          <span className="relative ml-[clamp(6px,2.5vw,17.2px)] font-poppins text-[15px] font-normal leading-none text-white">Save Contact</span>
        </button>

        {/* Share */}
        <button type="button" onClick={() => setShareOpen(true)} className={`${btn} bg-[#F6F6F4]`} aria-haspopup="dialog">
          <img
            src={asset("images/share.svg")}
            alt=""
            width={23}
            height={23}
            className="relative ml-[clamp(16px,8vw,55px)] h-[23px] w-[23px] shrink-0"
          />
          <span className="relative ml-[clamp(6px,3vw,20.9px)] font-poppins text-[15px] font-normal leading-none text-[#244F51]">Share</span>
          <Sheen
            id="sheen-share"
            width={197}
            height={43}
            y={1}
            transform="translate(180 -30) rotate(153.104) scale(193.423 136.035)"
            stops={LIGHT_STOPS}
          />
          <span className="pointer-events-none absolute inset-0 rounded-[10px] border border-[#DFE0DE]" />
        </button>
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} notify={notify} />
    </>
  );
}

