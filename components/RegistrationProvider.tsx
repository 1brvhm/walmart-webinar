"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import RegisterModal from "./RegisterModal";

type RegistrationContextValue = {
  /** Opens the registration modal. */
  open: () => void;
};

const RegistrationContext = createContext<RegistrationContextValue | null>(null);

export function useRegistration(): RegistrationContextValue {
  const ctx = useContext(RegistrationContext);
  if (!ctx) {
    throw new Error(
      "useRegistration must be used inside a <RegistrationProvider>.",
    );
  }
  return ctx;
}

/**
 * Holds a single modal instance for the whole page so that every CTA opens the
 * same form (and the same success state) instead of its own copy.
 */
export default function RegistrationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Deep links (ads, emails, the footer) can point straight at the form with
  // /#register. The hash is cleared so the same link works a second time.
  useEffect(() => {
    function openFromHash() {
      if (window.location.hash !== "#register") return;
      history.replaceState(null, "", window.location.pathname + window.location.search);
      setIsOpen(true);
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const value = useMemo<RegistrationContextValue>(() => ({ open }), [open]);

  return (
    <RegistrationContext.Provider value={value}>
      {children}
      {/* Mounted only while open, so each visit starts from a blank form. */}
      {isOpen && <RegisterModal onClose={close} />}
    </RegistrationContext.Provider>
  );
}
