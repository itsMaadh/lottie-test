import { initializeApollo } from "../lib/apolloClient";
import { GetLottiesQuery } from "../graphql/getLottiesQuery";
import LottiesGrid from "../components/LottiesGrid";
import { LottiesResponse } from "../types/ServerSideProps";
import { useRouter } from "next/router";

export default function featured({ data }: LottiesResponse) {
  const pageLimit = 6;
  const router = useRouter();

  const next = async () => {
    await router.push({
      pathname: "/featured",
      query: { pageLimit, after: data.page.pageInfo.endCursor },
    });
  };

  const back = async () => {
    await router.push({
      pathname: "/featured",
      query: { pageLimit, before: data.page.pageInfo.startCursor },
    });
  };

  return (
    <>
      <h3 className=" pt-6 font-semibold text-4xl">Featured Lotties:</h3>
      <h2 className="leading-tight text-black text-xl font-normal mb-3 pt-2">
        Your access to the world’s largest collection of free-to-use animations.
      </h2>
      <LottiesGrid data={data} />
      <div
        className="flex justify-center rounded-lg text-lg mb-6 mt-auto mb-5"
        role="group"
      >
        {data.pageData.offset >= pageLimit && (
          <button
            type={"button"}
            onClick={back}
            className="bg-lf-teal text-white font-semibold hover:bg-lf-teal-dark rounded-lg mr-2 px-6 py-2 mx-0 outline-none focus:shadow-outline"
          >
            Back
          </button>
        )}
        {data.pageData.offset + pageLimit < data.pageData.count && (
          <button
            type={"button"}
            onClick={next}
            className="bg-lf-teal text-white font-semibold hover:bg-lf-teal-dark rounded-lg  px-6 py-2 mx-0 outline-none focus:shadow-outline"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(params) {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    variables: {
      first: params.query?.after || !params.query.before ? 6 : null,
      last: params.query?.before ? 6 : null,
      filter: "",
      sort: "featured",
      after: params.query?.after ? params.query.after : null,
      before: params.query?.before ? params.query.before : null,
    },
    query: GetLottiesQuery,
  });
  return { props: { data: data.data.lotties } };
}
