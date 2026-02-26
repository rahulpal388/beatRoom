export function SongCardContaier({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div
        className={`mt-2 mb-12 flex gap-2 md:gap-4  lg:gap-6 flex-wrap   ${className}`}
      >
        {children}
      </div>
    </>
  );
}
