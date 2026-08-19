import { ReactNode } from "react";

type ButtonVariant = "normal" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant: ButtonVariant;
  handleClick: () => void;
  size: ButtonSize;
}

const buttonSizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-lg",
};

export function Button({
  children,
  variant = "normal",
  handleClick,
  size = "lg",
}: ButtonProps) {
  let className = "hover:cursor-pointer font-extrabold rounded-[5px]";

  if (variant === "normal") {
    className += " bg-[#7557D3] hover:bg-[#7249ee]  text-white";
  }

  if (variant === "outline") {
    className +=
      " bg-white hover:bg-[#7557D3] outline hover:text-white text-[#7557D3]";
  }

  className += ` ${buttonSizes[size]}`;

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
