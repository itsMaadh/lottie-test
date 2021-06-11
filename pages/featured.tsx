import { initializeApollo } from "../lib/apolloClient";
import { GetLottiesQuery } from "../graphql/getLottiesQuery";
import LottiesGrid from "../components/LottiesGrid";
import { LottiesResponse } from "../types/LottiesResponse";

export default function featured({ data }: LottiesResponse) {
  return (
    <div>
      <h3 className=" pt-6 font-semibold text-4xl">Featured Lotties:</h3>
      <h2 className="leading-tight text-black text-xl font-normal mb-3 pt-2">
        Your access to the world’s largest collection of free-to-use animations.
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
      sort: "featured",
    },
    query: GetLottiesQuery,
  });
  return { props: { data: data.data.lotties } };
}
