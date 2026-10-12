export default function Logo() {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3v18M3 12h18M6.5 6.5l11 11M17.5 6.5l-11 11"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
