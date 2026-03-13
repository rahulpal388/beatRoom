import React from "react";

type IButtonType = "Primary" | "Secondary" | "Loading";

interface IButton {
  Primary: string;
  Secondary: string;
  Loading: string;
}

const buttonStyle: IButton = {
  Primary: "bg-primary px-4 py-1 rounded shadow-xs cursor-pointer",
  Secondary:
    "flex items-center gap-2 justify-center border-[1px] border-card-border hover:border-primary hover:bg-card-hover px-4 py-1 rounded cursor-pointer",
  Loading: "bg-primary/20 px-4 py-1 rounded shadow-xs cursor-wait",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: IButtonType;
  name?: string;
  icon?: React.ReactNode;
}

export function Button({
  type = "button",
  btnType,
  name,
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${buttonStyle[btnType]} ${className} text-text-heading font-heading flex items-center justify-center gap-2`}
      {...props}
    >
      {icon}
      {name}
      {children}
    </button>
  );
}
