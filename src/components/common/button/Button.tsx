import Link from "next/link";
import React, { FormEventHandler, Fragment, MouseEventHandler } from "react";
import sx from "./button.module.sass";

interface ButtonProps {
  href?: string;
  children: string;
  variant?: "outlined" | "contained";
  color?: "purple-700";
  size?: "large" | "medium" | "semi-medium" | "small";
  shape?: "circle" | "square" | "round";
  className?: string;
  startIcon?: React.SVGProps<SVGSVGElement>;
  endIcon?: React.SVGProps<SVGSVGElement>;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
}

function Button(props: ButtonProps) {
  const {
    children,
    href,
    className,
    variant = "contained",
    size = "medium",
    color = "purple-700",
    shape = "round",
    endIcon,
    startIcon,
    type = "button",
    onClick,
    onSubmit,
  } = props;

  const classes = `${sx.btn} button ${className || ""} ${sx[variant]} ${
    sx[size]
  } ${sx[color]} ${sx[shape]}`;

  const render = (
    <Fragment>
      <>
        {startIcon}
        <span className="px-3">{children}</span>
        {endIcon}
      </>
    </Fragment>
  );

  return href ? (
    <Link className={classes} href={href}>
      {render}
    </Link>
  ) : (
    <button
      onClick={onClick}
      onSubmit={onSubmit}
      type={type}
      className={classes}
    >
      {render}
    </button>
  );
}

export default Button;
