import { Play } from "lucide-react";

export function PlayBotton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <>
      <button
        className={`cursor-pointer  bg-primary size-10 rounded-full  flex items-center justify-center ${className} `}
        onClick={onClick}
      >
        <Play className="stroke-card" />
      </button>
    </>
  );
}
