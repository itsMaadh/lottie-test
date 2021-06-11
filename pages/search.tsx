import { initializeApollo } from "../lib/apolloClient";
import { GetLottiesQuery } from "../graphql/getLottiesQuery";
import LottiesGrid from "../components/LottiesGrid";
import { LottiesResponse } from "../types/ServerSideProps";
import { useRouter } from "next/router";

interface ILottieResponse extends LottiesResponse {
  query: string;
}

export default function search({ data, query }: ILottieResponse) {
  const pageLimit = 6;
  const router = useRouter();

  const next = async () => {
    await router.push({
      pathname: "/recent",
      query: { pageLimit, after: data.page.pageInfo.endCursor },
    });
  };

  const back = async () => {
    await router.push({
      pathname: "/recent",
      query: { pageLimit, before: data.page.pageInfo.startCursor },
    });
  };

  return (
    <>
      <h3 className=" pt-6 font-semibold text-4xl">
        Search results for "{query}"
      </h3>
      <h2 className="leading-tight text-black text-xl font-normal mb-3 pt-2">
        The world’s largest source of freely-usable animations.
      </h2>
      {data.page.edges.length ? <LottiesGrid data={data} /> : <div>Nodata</div>}
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

export async function getServerSideProps(props) {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    variables: {
      first: props.query?.after || !props.query.before ? 6 : null,
      last: props.query?.before ? 6 : null,
      filter: props.query.q,
      sort: "recent",
      after: props.query?.after ? props.query.after : null,
      before: props.query?.before ? props.query.before : null,
    },
    query: GetLottiesQuery,
  });
  return { props: { data: data.data.lotties, query: props.query.q } };
}
