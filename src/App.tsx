import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ActionButtons from "./components/ActionButtons";
import ProfileHeader from "./components/ProfileHeader";
import SocialLinks from "./components/SocialLinks";
import { profile } from "./data/profile";
import About from "./sections/About";
import Contact from "./sections/Contact";

function Toast({ message }: { message: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4" role="status" aria-live="polite">
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="rounded-full bg-deep px-5 py-2.5 text-sm text-white shadow-lg"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const notify = useCallback((message: string) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <>
      <main className="mx-auto flow-root min-h-dvh w-full max-w-[445px] overflow-x-clip bg-white sm:shadow-[0_0_60px_rgba(6,42,37,0.18)]">
        <ProfileHeader />
        <SocialLinks />
        <ActionButtons notify={notify} />
        <Contact />
        <About />

        <footer className="pb-[14px] pt-[25px] text-center font-montserrat text-[7px] font-semibold leading-[9px] text-[#8F8F8F]">
          <p>
            © {new Date().getFullYear()} {profile.credit.text}
          </p>
          <p>{profile.credit.byline}</p>
        </footer>
      </main>

      <Toast message={toast} />
    </>
  );
}
