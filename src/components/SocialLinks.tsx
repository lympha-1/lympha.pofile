import { profile } from "../data/profile";
import { asset, waHref } from "../lib/utils";

const link =
  "absolute block outline-offset-4 transition duration-300 hover:-translate-y-1 hover:scale-110 focus-visible:outline-2 focus-visible:outline-forest active:scale-95";

/** "Follow Us" â€“ Instagram, Facebook, WhatsApp. */
export default function SocialLinks() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <section aria-labelledby="follow-heading" className="relative h-[149px] w-full overflow-hidden">
      <span className="absolute left-[10px] top-[33px] h-[4px] w-[25px] rounded-full bg-[linear-gradient(90deg,#FFCF33,#AA8F34)]" />
      <h2 id="follow-heading" className="absolute left-[46px] top-[23px] font-display text-[24px] leading-none text-ink">
        Follow Us
      </h2>
      <p className="absolute left-[46.5px] right-[8px] top-[46.5px] text-[10px] leading-none text-forest">
        Stay connected for updates, offers and more.
      </p>

      <a href="instagram://user?username=lympha_resto" {...ext} aria-label="Instagram" className={`${link} left-[clamp(24px,10.55vw,47px)] top-[81px]`}>
        <img src={asset("images/instagram.webp")} alt="" width={40} height={40} className="h-[40px] w-[40px]" />
      </a>
      <a href={`fb://facewebmodal/f?href=${encodeURIComponent(profile.social.facebook)}`} {...ext} aria-label="Facebook" className={`${link} left-[clamp(82px,25.6vw,114px)] top-[81px]`}>
        <img src={asset("images/facebook.svg")} alt="" width={40} height={40} className="h-[40px] w-[40px]" />
      </a>
      <a
        href={waHref(profile.contact.whatsapp, profile.contact.whatsappGreeting)}
        {...ext}
        aria-label="WhatsApp"
        className={`${link} left-[clamp(140px,40.7vw,181px)] top-[77px]`}
      >
        <img src={asset("images/whatsapp.webp")} alt="" width={47} height={47} className="h-[47px] w-[47px]" />
      </a>
    </section>
  );
}


