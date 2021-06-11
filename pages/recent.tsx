import { initializeApollo } from "../lib/apolloClient";
import { LottiesResponse } from "../types/LottiesResponse";
import LottiesGrid from "../components/LottiesGrid";
import { GetLottiesQuery } from "../graphql/getLottiesQuery";

export default function recent({ data }: LottiesResponse) {
  return (
    <div>
      <h3 className=" pt-6 font-semibold text-4xl">
        Recently uploaded Lotties:
      </h3>
      <h2 className="leading-tight text-black text-xl font-normal mb-3 pt-2">
        The world’s largest source of freely-usable animations.
      </h2>
      <LottiesGrid data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    variables: {
      first: 6,
      filter: "",
      sort: "recent",
    },
    query: GetLottiesQuery,
  });
  return { props: { data: data.data.lotties } };
}
