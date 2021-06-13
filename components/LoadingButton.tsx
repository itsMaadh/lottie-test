import { MouseEvent } from "react";
import LoadingIcon from "./LoadingIcon";

type Props = {
  text: string;
  type: "primary" | "secondary";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
  htmlType: "button" | "submit";
};

export default function LoadingButton({
  text,
  type,
  onClick,
  loading,
  htmlType,
}: Props) {
  const primary = "bg-lf-teal focus:ring-lf-teal-dark hover:bg-lf-teal-dark";
  const secondary =
    "bg-white hover:bg-gray-50 focus:ring-gray-50 text-gray-700 border-gray-300";
  const base =
    "duration-150 group relative w-full inline-flex mb-3 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm";
  const classNames = `${base} ${type === "primary" ? primary : secondary}`;
  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={classNames}
      disabled={loading}
    >
      {loading && <LoadingIcon />}
      {text}
    </button>
  );
}
