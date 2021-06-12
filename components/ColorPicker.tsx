import React from "react";

type Color = {
  classes: string;
  hex: string;
};

const colors: Color[] = [
  {
    classes: "bg-white border border-black",
    hex: "#FFFFFF",
  },
  {
    classes: "bg-black",
    hex: "#000",
  },
  {
    classes: "bg-red-600",
    hex: "#dc2626",
  },
  {
    classes: "bg-green-600",
    hex: "#059669",
  },
  {
    classes: "bg-blue-600",
    hex: "#2563eb",
  },
];

type Props = {
  onChange: (hex: string) => void;
};

export default function ColorPicker({ onChange }: Props) {
  return (
    <div className="flex flex-row items-center">
      {colors.map((color) => (
        <span
          key={color.hex}
          className={`block rounded-full cursor-pointer mx-1 h-4 w-4 ${color.classes}`}
          onClick={() => onChange(color.hex)}
        />
      ))}
    </div>
  );
}
