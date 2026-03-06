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
        className={`mt-2 mb-12 gap-4 grid max-sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-6   ${className}`}
      >
        {children}
      </div>
    </>
  );
}
