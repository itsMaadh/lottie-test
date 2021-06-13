import { initializeApollo } from "../lib/apolloClient";
import { GetLottiesQuery } from "../graphql/getLottiesQuery";
import LottiesGrid from "../components/LottiesGrid";
import { LottiesResponse } from "../types/ServerSideProps";
import Title from "../components/Title";
import Description from "../components/Description";
import { DEFAULT_TAKE } from "../lib/constants";
import Pagination from "../components/Pagination";

export default function featured({ data }: LottiesResponse) {
  return (
    <>
      <div className="py-6">
        <Title
          text={
            "Your access to the world’s largest collection of free-to-use animations"
          }
        />
        <Description text="Created by ingenious designers for your personal or commercial use on web,app,social media and more. Download now to use as Lottie, GIF, MP4 or JSON. Check out daily for new animations by featured designers!" />
      </div>
      <LottiesGrid data={data} />
      <Pagination
        pageData={{
          count: data.pageData.count,
          offset: data.pageData.offset,
          startCursor: data.page.pageInfo.startCursor,
          endCursor: data.page.pageInfo.endCursor,
        }}
        route={"featured"}
        searchQuery={""}
      />
    </>
  );
}

export async function getServerSideProps(params) {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    variables: {
      first: params.query?.after || !params.query.before ? DEFAULT_TAKE : null,
      last: params.query?.before ? DEFAULT_TAKE : null,
      filter: "",
      sort: "featured",
      after: params.query?.after ? params.query.after : null,
      before: params.query?.before ? params.query.before : null,
    },
    query: GetLottiesQuery,
  });
  return { props: { data: data.data.lotties } };
}
