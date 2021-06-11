import React from "react";
import Link from "next/link";
import moment from "moment";

type Props = {
  title: string;
  assetUrl: string;
  createdAt: Date;
};

export default function LottieTile({ title, assetUrl, createdAt }: Props) {
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <div className="w-full flex flex-col py-6 md:py-3 md:px-2">
      <div className="trans trans-slow shadow-md hover:shadow-xl rounded">
        <Link href={assetUrl}>
          <a
            className="block rounded-t-lg border-b border-gray-100 pt-1 pb-0 relative"
            title={title}
          >
            <div className="flex flex-col w-full h-full justify-between">
              <div className="flex justify-center items-center h-72">
                <lottie-player
                  id="firstLottie"
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
          <p>{title}</p>
          <p className="font-light text-gray-500 text-sm">
            {moment(createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}

// <div id="elem_64673" className="w-full md:w-1/3 flex flex-col py-6 md:p-6 ">
//   <div className="lf-box trans trans-slow hover:shadow-md"><a href="https://lottiefiles.com/64673-excited-monk"
//                                                               title="Excited Monk"
//                                                               className="block rounded-t-lg border-b border-grey-lighter pt-1 pb-0 relative"
//                                                               style="background-color: rgb(255, 255, 255);">
//     <div className="flex flex-col w-full h-full justify-between">
//       <div id="lottiecontainer" className="flex justify-center items-center"
//            style="width: 100%; height: 270px; overflow: hidden; margin: auto; cursor: pointer; background: rgb(255, 255, 255) none repeat scroll 0% 0%;">
//         <div id="j7zo7" className="spinner" style="display: none;"></div>
//         <lottie-player autoplay="true" loop="" src="https://assets1.lottiefiles.com/packages/lf20_tnzizfur.json"
//                        id="nbxay" speed="1" className="lottieanimation"
//                        style="width: 100%; height: 270px; overflow: hidden; margin: auto; cursor: pointer; background: rgb(255, 255, 255) none repeat scroll 0% 0%;"
//                        background="transparent"></lottie-player>
//       </div>
//       <!----></div>
//   </a>
//     <div className="flex flex-row p-4 items-center">
//       <figure className="overflow-hidden rounded-full w-8 h-8"><a href="/uflmb2h59k"><img
//           src="https://assets3.lottiefiles.com/avatars/100_60bd2f26e69fd.jpg" alt=""></a></figure>
//       <a href="/uflmb2h59k"><h3 className="text-sm font-normal px-2 text-grey-dark">Ayub Shaikh</h3></a>
//       <div className="ml-auto flex flex-col">
//         <div href="">
//           <div slug="64673-excited-monk">
//             <button className="flex flex-row cursor-pointer pb-2 text-grey-dark"><img
//                 src="https://static.lottiefiles.com/images/components/like_mini_heart.svg" className="w-3 h-3"> <!---->
//               <span className="pl-1 text-xs">1</span></button>
//             <!----></div>
//         </div>
//         <a href="" className="flex flex-row text-grey-dark">
//           <svg viewBox="0 0 9 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
//                xmlns:xlink="http://www.w3.org/1999/xlink" className="w-3 h-3">
//             <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//               <g id="Community-2/Animation-Card" transform="translate(-211.000000, -303.000000)" fill="#8E8E8E"
//                  fill-rule="nonzero">
//                 <g id="1">
//                   <g id="Animation-Meta-Info" transform="translate(16.000000, 277.000000)">
//                     <g id="View-Copy" transform="translate(195.000000, 24.000000)">
//                       <g id="download-solid" transform="translate(0.000000, 2.000000)">
//                         <path
//                             d="M7.71018733,4.78885001 L4.5,7.92770004 L1.28981267,4.78885001 L2.08518747,4.01115001 L3.93750007,5.82230004 L3.93750007,0 L5.06249993,0 L5.06249993,5.82230004 L6.91481253,4.01115001 L7.71018733,4.78885001 Z M7.87500014,7.80000003 L9,7.80000003 L9,8.90000002 C9,9.50610004 8.49599979,10 7.87500014,10 L1.12499986,10 C0.504562499,10 0,9.50610004 0,8.90000002 L0,7.80000003 L1.12499986,7.80000003 L1.12499986,8.90000002 L7.87500014,8.90000002 L7.87500014,7.80000003 Z"
//                             id="download-solid-"></path>
//                       </g>
//                     </g>
//                   </g>
//                 </g>
//               </g>
//             </g>
//           </svg>
//           <span className="pl-1 text-xs">54</span></a></div>
//     </div>
//   </div>
// </div>
