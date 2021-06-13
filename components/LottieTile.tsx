import Link from "next/link";
import moment from "moment";
import { Player } from "@lottiefiles/react-lottie-player";

type Props = {
  id: string;
  title: string;
  assetUrl: string;
  createdAt: Date;
};

export default function LottieTile({ id, title, assetUrl, createdAt }: Props) {
  return (
    <div className="w-full flex flex-col py-6 md:py-3 md:px-2">
      <div className="trans trans-slow shadow-md hover:shadow-xl rounded">
        <Link href={"/" + id}>
          <a title={title}>
            <div className="block rounded-t-lg border-b border-grey-lighter pt-1 pb-0 relative">
              <Player
                src={assetUrl}
                loop
                autoplay={true}
                style={{ height: "270px" }}
              />
            </div>
            <div className="p-4 items-center">
              <p className="tracking-wide font-medium">{title}</p>
              <p className="text-gray-500 text-sm">
                {moment(createdAt).fromNow()}
              </p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
