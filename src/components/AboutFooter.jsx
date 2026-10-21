import { profile } from "../data/profile";
import TealPanel from "./TealPanel";

export default function AboutFooter() {
  return (
    <TealPanel as="footer" sheen="lr-light-footer" className="mt-[30px] h-[200px] rounded-t-[20px] px-[31.5px] pt-[32px] text-white">
      <h2 className="font-display text-[24px] font-bold uppercase leading-[34px]">About us</h2>
      <p className="mt-[10.5px] font-serif text-[14.15px] leading-[22px]">{profile.about}</p>
    </TealPanel>
  );
}
