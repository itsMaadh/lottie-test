import React from "react";
import Link from "next/link";
import moment from "moment";

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
          <a
            className="block rounded-t-lg border-b border-gray-100 pt-1 pb-0 relative"
            title={title}
          >
            <div className="flex flex-col w-full h-full justify-between">
              <div className="flex justify-center items-center h-72">
                <lottie-player
                  id={id}
                  autoplay={true}
                  loop={true}
                  mode="normal"
                  src={assetUrl}
                />
              </div>
            </div>
          </a>
        </Link>
        <div className="p-4 items-center">
          <p className="tracking-wide">{title}</p>
          <p className="font-light text-gray-500 text-sm">
            {moment(createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}
