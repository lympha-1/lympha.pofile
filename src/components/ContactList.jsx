import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/profile";
import { telHref, waHref } from "../lib/utils";
import { Chevron, Clock, Globe, Mail, Phone1, Phone2, Pin, WhatsappLine } from "./icons";

/** One row: icon · text · chevron, with a hairline underneath (all measurements from the design). */
function Row({ href, onClick, icon, children, mt, external, extra, expanded }) {
  const inner = (
    <>
      <span className="absolute left-[42px] top-0 grid h-[22px] w-[20px] place-items-center text-[#757575] transition-colors group-hover:text-[#397F75]">
        {icon}
      </span>
      <span className="ml-[88px] mr-[50px] block truncate text-left font-poppins text-[14px] leading-[22px] text-[#333] transition-colors group-hover:text-[#397F75]">
        {children}
      </span>
      <Chevron
        width="10.57"
        height="13.02"
        className={`absolute right-[40px] top-[4.5px] text-[#565656] transition-transform duration-300 group-hover:translate-x-1 ${
          expanded ? "rotate-90 group-hover:translate-x-0" : ""
        }`}
      />
    </>
  );
  const cls = "group relative block h-[22px] w-full cursor-pointer outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#397F75]";
  return (
    <li style={{ marginTop: mt }}>
      {href ? (
        <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={cls} aria-expanded={expanded}>
          {inner}
        </button>
      )}
      {extra}
      <div className="ml-[88px] mr-[44px] h-[0.5px] bg-[#757575]" />
    </li>
  );
}

export default function ContactList() {
  const { contact } = profile;
  const [hoursOpen, setHoursOpen] = useState(false);

  return (
    <section aria-labelledby="contact-heading" className="mt-[38px]">
      <h2 id="contact-heading" className="pl-[23px] font-poppins text-[21px] font-normal leading-[28px] text-black">
        contact info.
      </h2>

      <ul className="mt-[23.5px]">
        <Row mt={0} href={telHref(contact.phones[0])} icon={<Phone1 width="17.34" height="17.34" />}>
          {contact.phones[0]}
        </Row>
        <Row mt={14.5} href={telHref(contact.phones[1] ?? contact.phones[0])} icon={<Phone2 width="18.11" height="18.11" />}>
          {contact.phones[1] ?? contact.phones[0]}
        </Row>
        <Row
          mt={14.5}
          href={waHref(contact.whatsapp, contact.whatsappGreeting)}
          external
          icon={<WhatsappLine width="21.91" height="22" />}
        >
          Chat on WhatsApp
        </Row>
        <Row mt={19.5} href={`mailto:${contact.email}`} icon={<Mail width="21.5" height="16.58" />}>
          {contact.email}
        </Row>
        <Row
          mt={18.5}
          onClick={() => setHoursOpen((o) => !o)}
          expanded={hoursOpen}
          icon={<Clock width="21.5" height="20.75" />}
          extra={
            <AnimatePresence initial={false}>
              {hoursOpen && (
                <motion.dl
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="ml-[88px] mr-[44px] overflow-hidden font-poppins text-[13px] text-[#565656]"
                >
                  <div className="space-y-1 py-2">
                    {contact.hours.details.map(([day, time]) => (
                      <div key={day} className="flex justify-between gap-4">
                        <dt>{day}</dt>
                        <dd>{time}</dd>
                      </div>
                    ))}
                  </div>
                </motion.dl>
              )}
            </AnimatePresence>
          }
        >
          {contact.hours.summary}
        </Row>
        <Row mt={19.5} href={contact.website} external icon={<Globe width="21.5" height="20" />}>
          {contact.website.replace(/^https?:\/\//, "")}
        </Row>
        <Row mt={18.5} href={contact.mapsUrl} external icon={<Pin width="19.33" height="22.83" />}>
          {contact.address}
        </Row>
      </ul>
    </section>
  );
}
