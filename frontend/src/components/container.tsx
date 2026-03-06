export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className={`pb-32 md:px-2  ${children}`}>{children}</div>
    </>
  );
}
