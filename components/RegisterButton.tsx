"use client";

import type { ReactNode } from "react";
import { useRegistration } from "./RegistrationProvider";

/**
 * Any CTA that should open the registration form. Styling is passed in so the
 * same button works in the hero, mid-page, and footer sections.
 */
export default function RegisterButton({
  children,
  className = "btn-spark",
  source = "hero",
}: {
  children: ReactNode;
  className?: string;
  source?: string;
}) {
  const { open } = useRegistration();

  return (
    <button type="button" className={className} onClick={() => open(source)}>
      {children}
    </button>
  );
}
