import { DEFAULT_TAKE } from "../lib/constants";
import { useRouter } from "next/router";

interface Props {
  pageData: {
    count: number;
    offset: number;
    startCursor: string;
    endCursor: string;
  };
  route: string;
  searchQuery: string;
}

export default function Pagination({ pageData, route, searchQuery }: Props) {
  const router = useRouter();

  // Called on navigate to next page
  const next = async () => {
    await router.push({
      pathname: "/" + route,
      query: { after: pageData.endCursor, q: searchQuery },
    });
  };

  // Called on navigate to previous page
  const back = async () => {
    await router.push({
      pathname: "/" + route,
      query: { before: pageData.startCursor, q: searchQuery },
    });
  };

  return (
    <div
      className="flex justify-center rounded-lg text-lg mb-6 mt-auto mb-5"
      role="group"
    >
      {pageData.offset >= DEFAULT_TAKE && (
        <button
          type={"button"}
          onClick={back}
          className="bg-lf-teal duration-150 text-white font-semibold hover:bg-lf-teal-dark rounded-lg mr-2 px-6 py-2 mx-0 outline-none focus:shadow-outline"
        >
          Back
        </button>
      )}
      {pageData.offset + DEFAULT_TAKE < pageData.count && (
        <button
          type={"button"}
          onClick={next}
          className="bg-lf-teal duration-150 text-white font-semibold hover:bg-lf-teal-dark rounded-lg  px-6 py-2 mx-0 outline-none focus:shadow-outline"
        >
          Next
        </button>
      )}
    </div>
  );
}
