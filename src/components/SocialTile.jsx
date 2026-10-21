/** Instagram / Facebook "follow" row. */
export default function SocialTile({ icon, handle, href, label }) {
  return (
    <div className="ml-[23px] mr-[22px] flex h-[60px] items-center rounded-[20px] bg-[rgba(243,243,243,0.2)] pl-[16px] pr-[19px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} – @${handle}`}
        className="flex min-w-0 flex-1 items-center gap-[15.7px] outline-offset-4 transition-opacity hover:opacity-80"
      >
        <span className="shrink-0 translate-y-[1.2px]">{icon}</span>
        <span className="truncate font-alt text-[19.8px] font-semibold leading-none text-[#453E3E]">@ {handle}</span>
      </a>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Follow on ${label}`}
        className="follow-btn grid h-[33px] w-[113px] shrink-0 place-items-center rounded-[15px] bg-[#1877F2] font-poppins text-[17.3px] font-medium leading-none text-white shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] transition hover:brightness-110 active:scale-95"
      >
        <span className="[text-shadow:0_4px_4px_rgba(0,0,0,0.25)]">follow</span>
      </a>
    </div>
  );
}
