import { MouseEventHandler } from "react";

type IButtonType = "Primary" | "Secondary" | "Loading";

interface IButton {
  Primary: string;
  Secondary: string;
  Loading: string;
}

const buttonStyle: IButton = {
  Primary: " bg-primary  px-4 py-1 rounded shadow-xs cursor-pointer  ",
  Secondary:
    " flex items-center gap-2 justify-center border-[1px] border-card-border hover:border-primary  hover:bg-card-hover  px-4 py-1 rounded cursor-pointer ",
  Loading: " bg-primary/20  px-4 py-1 rounded shadow-xs cursor-wait  ",
};

export function Button({
  type,
  btnType,
  name,
  icon,
  className,
  onClick,
}: {
  type: "submit" | "reset" | "button";
  btnType: IButtonType;
  name: string;
  icon?: React.ReactNode;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <>
      <button
        type={type}
        className={`${buttonStyle[btnType]} ${className}   text-text-heading font-heading flex items-center justify-center gap-2  `}
        onClick={onClick}
      >
        {icon}
        {name}
      </button>
    </>
  );
}
