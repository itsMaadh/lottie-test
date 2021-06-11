import React from "react";

type Props = {
  src: string;
};

export default function LottiePlayer({ src }: Props) {
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <lottie-player
      id="firstLottie"
      autoplay={true}
      loop={true}
      mode="normal"
      src={src}
      controls={false}
    />
  );
}
