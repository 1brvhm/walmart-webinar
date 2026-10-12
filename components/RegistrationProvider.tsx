"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import RegisterModal from "./RegisterModal";

type RegistrationContextValue = {
  /** Opens the registration modal. `source` is forwarded to Zapier so you can
   *  see which CTA on the page converted. */
  open: (source?: string) => void;
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
  const [source, setSource] = useState("hero");

  const open = useCallback((from = "hero") => {
    setSource(from);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<RegistrationContextValue>(() => ({ open }), [open]);

  return (
    <RegistrationContext.Provider value={value}>
      {children}
      {/* Mounted only while open, so each visit starts from a blank form. */}
      {isOpen && <RegisterModal onClose={close} source={source} />}
    </RegistrationContext.Provider>
  );
}
