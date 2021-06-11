import LottieTile from "./LottieTile";
import { LottieResponse } from "../types/LottieResponse";

export default function LottiesGrid({ data }: LottieResponse) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10">
      {data.page.edges.map((lottie) => (
        <LottieTile
          assetUrl={lottie.node.assetUrl}
          title={lottie.node.title}
          key={lottie.node.id}
          createdAt={lottie.node.createdAt}
        />
      ))}
    </div>
  );
}
