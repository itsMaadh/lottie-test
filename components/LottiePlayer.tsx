import React from "react";

type Props = {
  id: string;
  src: string;
  controls: boolean;
};

export default function LottiePlayer({ id, src, controls }: Props) {
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <>
      {controls ? (
        <lottie-player
          id={id}
          autoplay={true}
          loop={true}
          mode="normal"
          src={src}
          controls={true}
        />
      ) : (
        <lottie-player
          id={id}
          autoplay={true}
          loop={true}
          mode="normal"
          src={src}
        />
      )}
    </>
  );
}
