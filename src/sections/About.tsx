import { profile } from "../data/profile";
import { asset } from "../lib/utils";

/** Google logo (links to the review page) + "About Us" card. */
export default function About() {
  return (
    <>
      <a
        href={profile.reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Review Lympha Resto on Google"
        className="mx-auto mt-[25px] block h-[41px] w-[123px] outline-offset-4 transition-transform duration-300 hover:scale-110 active:scale-100"
      >
        <img src={asset("images/google.webp")} alt="Google" width={123} height={41} className="h-[41px] w-[123px]" />
      </a>

      <section
        aria-labelledby="about-heading"
        className="relative ml-[11px] mr-[11px] mt-[24px] h-[216px] overflow-hidden rounded-[15px] bg-[#1f5a49] bg-[length:auto_100%] bg-[position:center] bg-no-repeat text-white shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
        style={{ backgroundImage: `url(${asset("images/about-bg.jpg")})` }}
      >
        <h2 id="about-heading" className="absolute left-[30.5px] top-[20px] font-display text-[22px] leading-none">
          About Us
        </h2>
        <p className="absolute left-[30.5px] right-[16px] top-[55px] whitespace-normal break-words sm:whitespace-pre-line font-serif text-[clamp(12px,3.15vw,14px)] leading-[clamp(19px,4.95vw,22px)]">{profile.about}</p>
      </section>
    </>
  );
}


