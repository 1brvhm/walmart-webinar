import Image from "next/image";

/** Channel mark + wordmark, used in the header and footer. */
export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <a
      href={href}
      className="flex shrink-0 items-center gap-2 leading-tight text-ink no-underline sm:gap-[11px]"
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={47}
        height={47}
        className="size-[38px] rounded-[9px] sm:size-[47px] sm:rounded-xl"
      />
      <span>
        <strong className="block text-base tracking-[-0.03em] sm:text-[19px]">
          E-commerce
        </strong>
        <small className="block text-[11px] sm:text-sm">with Jacob Jones</small>
      </span>
    </a>
  );
}
