import LottieTile from "./LottieTile";
import { LottiesResponse } from "../types/ServerSideProps";

export default function LottiesGrid({ data }: LottiesResponse) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-5">
      {data.page.edges.map((lottie) => (
        <LottieTile
          id={lottie.node.id}
          assetUrl={lottie.node.assetUrl}
          title={lottie.node.title}
          key={lottie.node.id}
          createdAt={lottie.node.createdAt}
        />
      ))}
    </div>
  );
}
