type Props = {
  text: string;
};

export default function Description({ text }: Props) {
  return <p className="leading-normal text-gray-500 tracking-wide">{text}</p>;
}
