import { useCallback, useRef, useState } from "react";
import ActionButtons from "./components/ActionButtons";
import AboutFooter from "./components/AboutFooter";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import NoiseDefs from "./components/NoiseDefs";
import ReviewBadge from "./components/ReviewBadge";
import ShareModal from "./components/ShareModal";
import SocialTile from "./components/SocialTile";
import Toast from "./components/Toast";
import { FbWeb, IgWeb } from "./components/icons";
import { profile } from "./data/profile";
import { buildVCard, downloadBlob } from "./lib/utils";

export default function App() {
  const [shareOpen, setShareOpen] = useState(false);
  const [toast, setToast] = useState("");
  const timer = useRef();

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  const saveContact = () => {
    downloadBlob(buildVCard(profile), "lympha-resto.vcf");
    notify("Contact card downloaded");
  };

  return (
    <>
      <NoiseDefs />
      <main className="mx-auto min-h-dvh w-full max-w-[445px] overflow-x-clip bg-white sm:shadow-[0_0_60px_rgba(19,49,45,0.18)]">
        <Header />

        <div className="mt-[35px]">
          <SocialTile
            label="Instagram"
            handle={profile.social.instagram.handle}
            href={profile.social.instagram.url}
            icon={<IgWeb width="40.33" height="40.33" />}
          />
        </div>
        <div className="mt-[24px]">
          <SocialTile
            label="Facebook"
            handle={profile.social.facebook.handle}
            href={profile.social.facebook.url}
            icon={<FbWeb width="40.33" height="40.33" />}
          />
        </div>

        <ActionButtons onSave={saveContact} onShare={() => setShareOpen(true)} />
        <ContactList />
        <ReviewBadge />
        <AboutFooter />
      </main>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} notify={notify} />
      <Toast message={toast} />
    </>
  );
}
