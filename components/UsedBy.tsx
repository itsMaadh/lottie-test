type Props = {
  src: string;
  alt: string;
};

export default function UsedBy({ src, alt }: Props) {
  return (
    <>
      <img
        className="h-5 sm:h-8 mx-3 my-1 sm:mx-3 sm:my-1 md:mx-4 md:my-3 opacity-25"
        src={src}
        alt={alt}
      />
    </>
  );
}
