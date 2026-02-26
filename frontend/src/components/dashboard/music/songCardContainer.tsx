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
        className={`mt-2 mb-12 grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6   ${className}`}
      >
        {children}
      </div>
    </>
  );
}
