export function AlertSvg({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 16h.01" />
        <path d="M12 8v4" />
      </svg>
    </>
  );
}
