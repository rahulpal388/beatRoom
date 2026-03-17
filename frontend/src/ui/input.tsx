interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputType) {
  return (
    <input
      className={` text-black px-2 py-px rounded  border-[1px] border-card-border/20 focus:border-primary outline-none  h-8 ${className} `}
      {...props}
    />
  );
}
