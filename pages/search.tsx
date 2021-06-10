import { initializeApollo } from "../lib/apolloClient";
import { GetLottiesQuery } from "../graphql/getLottiesQuery";
import LottiesGrid from "../components/LottiesGrid";
import { LottieResponse } from "../types/LottieResponse";

export default function search({ data }: LottieResponse) {
  return (
    <div>
      <h3 className=" pt-6 font-semibold text-4xl">
        Recently uploaded Lotties:
      </h3>
      <h2 className="leading-tight text-black text-xl font-normal mb-3 pt-2">
        The world’s largest source of freely-usable animations.
      </h2>
      {data.page.edges.length ? <LottiesGrid data={data} /> : <div>Nodata</div>}
    </div>
  );
}

export async function getServerSideProps(props) {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    variables: {
      first: 6,
      filter: props.req.url.split("=")[1],
      sort: "recent",
    },
    query: GetLottiesQuery,
  });
  return { props: { data: data.data.lotties } };
}
