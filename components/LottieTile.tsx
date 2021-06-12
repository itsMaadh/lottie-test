import React from "react";
import Link from "next/link";
import moment from "moment";
import LottiePlayer from "./LottiePlayer";

type Props = {
  id: string;
  title: string;
  assetUrl: string;
  createdAt: Date;
};

export default function LottieTile({ id, title, assetUrl, createdAt }: Props) {
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <div className="w-full flex flex-col py-6 md:py-3 md:px-2">
      <div className="trans trans-slow shadow-md hover:shadow-xl rounded">
        <Link href={"/" + id}>
          <a title={title}>
            <div className="block rounded-t-lg border-b border-gray-100 pt-1 pb-0 relative">
              <div className="flex flex-col w-full h-full justify-between">
                <div className="flex justify-center items-center h-72">
                  <LottiePlayer src={assetUrl} controls={false} id={id} />
                </div>
              </div>
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
