import { asset } from "../lib/utils";

/** Hero banner: food photo + logo. */
export default function ProfileHeader() {
  return (
    <header
      className="relative ml-[11px] mr-[11px] mt-[10px] h-[216px] overflow-hidden rounded-[15px] bg-[#0b3b33] bg-[length:auto_100%] bg-[position:78.3%_center] sm:bg-[length:128.35%_auto] sm:bg-[position:78.3%_1.97%] bg-no-repeat"
      style={{ backgroundImage: `url(${asset("images/hero.jpg")})` }}
    >
      <h1 className="sr-only">Lympha Resto</h1>
      <img
        src={asset("logo.svg")}
        alt="Lympha Resto logo"
        width={201}
        height={201}
        className="absolute left-[11px] top-1/2 -translate-y-1/2 h-[clamp(125px,45vw,201px)] w-[clamp(125px,45vw,201px)] sm:h-[201px] sm:w-[201px] drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]"
      />
    </header>
  );
}




