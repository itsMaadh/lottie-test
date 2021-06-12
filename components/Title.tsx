type Props = {
  text: string;
};

export default function Title({ text }: Props) {
  return (
    <h2 className="leading-tight font-semibold text-3xl font-normal mb-3">
      {text}
    </h2>
  );
}
