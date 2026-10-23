import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "qrcode";
import { profile } from "../data/profile";
import { asset, copyText, downloadBlob, getShareUrl, shareLinks } from "../lib/utils";
import Sheen, { DARK_STOPS } from "./Sheen";

interface Props {
  open: boolean;
  onClose: () => void;
  notify: (message: string) => void;
}

const iconBtn =
  "grid h-10 w-10 place-items-center rounded-full outline-offset-2 transition duration-200 hover:-translate-y-1 hover:scale-110 focus-visible:outline-2 focus-visible:outline-forest active:scale-95";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Icon({ name, w, h, className = "" }: { name: string; w: number; h: number; className?: string }) {
  return <img src={asset(`images/${name}`)} alt="" width={w} height={h} style={{ width: w, height: h }} className={className} />;
}

/** "Share My Profile" dialog: QR code, share targets and copy-link field. */
export default function ShareModal({ open, onClose, notify }: Props) {
  const url = getShareUrl();
  const links = shareLinks(url, profile.shareMessage);
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // QR preview
  useEffect(() => {
    if (!open) return;
    let alive = true;
    QRCode.toDataURL(url, { width: 418, margin: 1, errorCorrectionLevel: "M", color: { dark: "#000000", light: "#FFFFFF" } })
      .then((d) => alive && setQr(d))
      .catch(() => alive && setQr(""));
    return () => {
      alive = false;
    };
  }, [open, url]);

  // Esc, focus handling, scroll lock, focus trap
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  const copyLink = useCallback(async () => {
    if (await copyText(url)) {
      setCopied(true);
      notify("Link copied");
      setTimeout(() => setCopied(false), 1800);
    } else notify("Couldn't copy – select the link and copy it manually");
  }, [url, notify]);

  const downloadQr = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(url, { width: 1024, margin: 2, errorCorrectionLevel: "M" });
      const blob = await (await fetch(dataUrl)).blob();
      downloadBlob(blob, "lympha-resto-qr.png");
      notify("QR code downloaded");
    } catch {
      notify("Couldn't create the QR code");
    }
  };

  const instagramShare = async () => {
    window.open(links.instagram, "_blank", "noopener,noreferrer"); // open first – avoids popup blockers
    if (await copyText(url)) notify("Link copied – paste it in Instagram");
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: profile.name, text: profile.shareMessage, url });
      } catch {
        /* cancelled */
      }
    } else void copyLink();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="share"
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/50 p-3 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative h-[591px] w-full max-w-[445px] rounded-[10px] bg-white font-poppins text-black shadow-2xl"
          >
            {/* header */}
            <img src={asset("images/share-arrow.webp")} alt="" width={50} height={50} className="absolute left-[20px] top-[27px] h-[50px] w-[50px]" />
            <h2 id="share-title" className="absolute left-[66px] top-[34px] text-[20px] font-semibold leading-[25px]">
              Share My Profile
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-[25px] top-[31px] grid h-8 w-8 place-items-center rounded-full text-[#666] transition hover:rotate-90 hover:bg-black/5"
            >
              <Icon name="close.svg" w={17.32} h={17.32} />
            </button>

            {/* QR */}
            <div className="absolute left-1/2 top-[85px] h-[209px] w-[209px] -translate-x-1/2 bg-white">
              {qr && <img src={qr} alt={`QR code for ${profile.name}`} width={209} height={209} className="h-full w-full" />}
            </div>

            {/* download */}
            <button
              type="button"
              onClick={downloadQr}
              className="absolute left-1/2 top-[314px] h-[50px] w-[260px] -translate-x-1/2 overflow-hidden rounded-[10px] bg-deep shadow-[0_6px_3px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-[0.98]"
            >
              <span className="relative block font-alt text-[23px] font-medium leading-[50px] text-white">Download My QR</span>
              <Sheen
                id="sheen-download"
                width={260}
                height={50}
                transform="matrix(-194.67 66.2791 -52.9084 -120.625 204.569 0)"
                stops={DARK_STOPS}
              />
            </button>

            {/* share targets */}
            <div className="absolute left-[24.5px] right-[24px] top-[412px] flex justify-between">
              <a href={links.whatsapp} {...ext} aria-label="Share on WhatsApp" className={iconBtn}>
                <Icon name="share-whatsapp.svg" w={35.44} h={35.59} />
              </a>
              <button type="button" onClick={instagramShare} aria-label="Share on Instagram" className={iconBtn}>
                <Icon name="share-instagram.svg" w={35.33} h={35.33} />
              </button>
              <a href={links.facebook} {...ext} aria-label="Share on Facebook" className={iconBtn}>
                <Icon name="share-facebook.svg" w={35.33} h={35.33} />
              </a>
              <a href={links.x} {...ext} aria-label="Share on X" className={iconBtn}>
                <Icon name="share-x.svg" w={32.46} h={32.4} />
              </a>
              <a href={links.gmail} {...ext} aria-label="Share by Gmail" className={iconBtn}>
                <Icon name="share-gmail.svg" w={37} h={28.67} />
              </a>
              <a href={links.linkedin} {...ext} aria-label="Share on LinkedIn" className={iconBtn}>
                <Icon name="share-linkedin.svg" w={30.33} h={30.33} />
              </a>
              <button type="button" onClick={nativeShare} aria-label="More sharing options" className={iconBtn}>
                <Icon name="share-more.svg" w={40.77} h={40.77} />
              </button>
            </div>

            {/* copy link */}
            <div className="absolute left-[32px] right-[34px] top-[500px] flex h-[43px] items-center rounded-[8px] border border-[#757575] pl-4 pr-1">
              <input
                readOnly
                value={url}
                aria-label="Profile link"
                onFocus={(e) => e.target.select()}
                className="min-w-0 flex-1 truncate bg-transparent text-[13px] text-[#444] outline-none"
              />
              <button
                type="button"
                onClick={copyLink}
                aria-label={copied ? "Link copied" : "Copy link"}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md transition hover:bg-black/5 active:scale-90"
              >
                {copied ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#064A46" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <Icon name="copy.svg" w={19.27} h={24.65} />
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
