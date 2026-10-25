import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/profile";
import { asset, telHref, waHref } from "../lib/utils";

interface RowProps {
  icon: string;
  iconSize: [number, number];
  /** reverse the circle gradient (used by the map row, as in the design) */
  flip?: boolean;
  height: number;
  gap: number;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  expanded?: boolean;
  chevron?: "right" | "down";
  children: ReactNode;
}

/** One white card row: gradient circle icon Â· text Â· chevron. */
function Row({ icon, iconSize, flip, height, gap, href, external, onClick, expanded, chevron = "right", children }: RowProps) {
  const body = (
    <>
      <span
        className="absolute left-[12px] top-[5px] grid h-[35px] w-[35px] place-items-center rounded-full"
        style={{ backgroundImage: `linear-gradient(${flip ? "0deg" : "180deg"},#029281,#002C27)` }}
      >
        <img src={asset(`images/${icon}`)} alt="" width={iconSize[0]} height={iconSize[1]} style={{ width: iconSize[0], height: iconSize[1] }} />
      </span>
      <span className="absolute inset-y-0 left-[clamp(54px,15.9vw,70.8px)] right-[clamp(28px,9vw,40px)] flex flex-col justify-center text-left">{children}</span>
      <img
        src={asset(`images/chevron-${chevron}.svg`)}
        alt=""
        width={chevron === "right" ? 7 : 12}
        height={chevron === "right" ? 12.03 : 7}
        className={`absolute transition-transform duration-300 ${
          chevron === "right"
            ? "right-[12.5px] top-1/2 h-[12.03px] w-[7px] -translate-y-1/2 group-hover:translate-x-1"
            : `right-[11.5px] top-1/2 h-[7px] w-[12px] -translate-y-1/2 ${expanded ? "" : "-rotate-90"}`
        }`}
      />
    </>
  );
  const cls =
    "group relative block w-full rounded-[10px] bg-white text-left shadow-[0_1px_6px_#E3E9E9] outline-offset-2 transition duration-200 hover:-translate-y-px hover:shadow-[0_3px_10px_#d5dedd] focus-visible:outline-2 focus-visible:outline-forest";
  return (
    <li style={{ marginTop: gap }}>
      {href ? (
        <a href={href} className={cls} style={{ height }} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {body}
        </a>
      ) : (
        <button type="button" onClick={onClick} aria-expanded={expanded} className={cls} style={{ height }}>
          {body}
        </button>
      )}
    </li>
  );
}

const main = "relative -top-[2.5px] text-[14px] font-medium leading-[22px] text-forest";
const label = "block text-[11px] font-semibold leading-[13px] text-forest";
const value = "block font-montserrat text-[11px] font-semibold leading-[16px] text-forest";

/** Opening hours: tap to see the full timetable. */
function HoursRow() {
  const { contact } = profile;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Row
        height={45}
        gap={11}
        onClick={() => setOpen((o) => !o)}
        expanded={open}
        icon="clock.svg"
        iconSize={[21.5, 20.75]}
      >
        <span className={main}>{contact.hoursSummary}</span>
      </Row>
      <AnimatePresence initial={false}>
        {open && (
          <motion.li
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <dl className="mx-4 mt-2 space-y-1 rounded-[10px] bg-[#f3f7f6] px-4 py-3 text-[13px] text-forest">
              {contact.hours.map(([day, time]) => (
                <div key={day} className="flex justify-between gap-4">
                  <dt className="font-semibold">{day}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
          </motion.li>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Contact() {
  const { contact } = profile;
  const [mapOpen, setMapOpen] = useState(true);

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative ml-[11px] mr-[11px] mt-[35px] rounded-[15px] bg-white pb-[14px] shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
    >
      {/* heading */}
      <div className="relative h-[67px]">
        <span className="absolute left-[11.98px] top-[20.5px] h-[4px] w-[17px] rounded-full bg-[linear-gradient(90deg,#FFCF33,#AA8F34)]" />
        <h2 id="contact-heading" className="absolute left-[41px] top-[10px] font-display text-[22px] leading-none text-ink">
          Contact Info
        </h2>
        <p className="absolute left-[41.8px] top-[35px] text-[10px] leading-none text-forest">Get in touch with us.</p>
      </div>

      {/* rows (x34 â†’ 409 in the design = 23px / 25px inside the panel) */}
      <ul className="mx-[clamp(12px,5.2vw,23px)] mr-[clamp(12px,5.65vw,25px)]">
        <Row height={44} gap={0} href={telHref(contact.phones[0])} icon="phone.svg" iconSize={[17.34, 17.34]}>
          <span className="mt-[3px] flex flex-col">
            <span className={label}>Phone 1</span>
            <span className={`${value} mt-[1.4px]`}>{contact.phones[0]}</span>
          </span>
        </Row>
        <Row height={45} gap={12} href={telHref(contact.phones[1])} icon="phone.svg" iconSize={[18.11, 18.11]}>
          <span className="mt-[3px] flex flex-col">
            <span className={label}>Phone 2</span>
            <span className={`${value} mt-[1.4px]`}>{contact.phones[1]}</span>
          </span>
        </Row>
        <Row height={45} gap={11} href={waHref(contact.whatsapp, contact.whatsappGreeting)} external icon="whatsapp-line.svg" iconSize={[21.91, 22]}>
          <span className={main}>Chat On Whats App</span>
        </Row>
        <Row height={45} gap={11} href={`mailto:${contact.email}`} icon="mail.svg" iconSize={[21.44, 16.58]}>
          <span className="mt-[3px] flex flex-col">
            <span className={label}>Email</span>
            <span className={`${value} mt-[1.4px]`}>{contact.email}</span>
          </span>
        </Row>
        <HoursRow />
        <Row height={45} gap={11} href={contact.website} external icon="globe.svg" iconSize={[21.5, 20]}>
          <span className={main}>Web Site</span>
        </Row>
        <Row
          height={45}
          gap={11}
          onClick={() => setMapOpen((o) => !o)}
          expanded={mapOpen}
          chevron="down"
          icon="pin.svg"
          iconSize={[19.33, 22.83]}
        >
          <span className={main}>Google map</span>
        </Row>
      </ul>

      {/* map */}
      <AnimatePresence initial={false}>
        {mapOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 194 + 13, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className="relative ml-[12px] mr-[11px] mt-[13px] h-[194px] overflow-hidden rounded-[15px] bg-[#d8efe0] bg-[length:auto_100%] bg-[position:33%_0] bg-no-repeat"
              style={{ backgroundImage: `url(${asset("images/map.webp")})` }}
            >
              <iframe
                title={`Map â€“ ${contact.address}`}
                src={`https://www.google.com/maps?q=11.4266317,75.738412&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 left-2 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-forest shadow transition hover:bg-white"
              >
                Open in Google Maps â†—
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );

}


