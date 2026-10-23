import { profile, type Profile } from "../data/profile";

/** Resolve a file from /public (works with any Vite `base`). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const getShareUrl = (): string =>
  profile.shareUrl || (typeof window !== "undefined" ? window.location.href.split("#")[0] : "");

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for http / older browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;

export const waHref = (number: string, text?: string) =>
  `whatsapp://send?phone=${number.replace(/\D/g, "")}${text ? `&text=${encodeURIComponent(text)}` : ""}`;

/** Share-intent URLs used by the share dialog. */
export function shareLinks(url: string, message: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(message);
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    x: `https://x.com/intent/post?text=${t}&url=${u}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(profile.name)}&body=${encodeURIComponent(`${message}\n${url}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    instagram: "https://www.instagram.com/direct/inbox/",
  };
}

/** Build a .vcf contact card. */
export function buildVCard(p: Profile): Blob {
  const c = p.contact;
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${esc(p.name)}`,
    `ORG:${esc(p.name)}`,
    `TITLE:${esc(p.title)}`,
    ...c.phones.map((n) => `TEL;TYPE=WORK,VOICE:${n.replace(/[^\d+]/g, "")}`),
    `EMAIL;TYPE=WORK:${c.email}`,
    `URL:${c.website}`,
    `ADR;TYPE=WORK:;;${esc(c.address)};;;;`,
    `NOTE:${esc(p.about.replace(/\n/g, " "))}`,
    "END:VCARD",
  ];
  return new Blob([lines.join("\r\n")], { type: "text/vcard;charset=utf-8" });
}


