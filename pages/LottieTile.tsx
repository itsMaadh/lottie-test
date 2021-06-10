import React from "react";
import Link from "next/link";
import moment from "moment";

type Props = {
  title: string;
  assetUrl: string;
  createdAt: Date;
};

export default function LottieTile({ title, assetUrl, createdAt }: Props) {
  return (
    <div className="w-full flex flex-col px-2 py-4 ">
      <div className="shadow-md hover:shadow-xl block rounded-t-lg border-b border-grey-lighter pt-1 pb-0 relative">
        <Link href={assetUrl}>
          <a>
            <div className="flex flex-col w-full h-full justify-between">
              <div className="flex justify-center items-center">
                <lottie-player
                  id="firstLottie"
                  autoplay={true}
                  loop={true}
                  mode="normal"
                  src={assetUrl}
                />
              </div>
            </div>
            <div className="p-4">
              <p className="font-medium">{title}</p>
              <p className="font-light text-gray-500 text-sm pt-2">
                Uploaded {moment(createdAt).fromNow()}
              </p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
