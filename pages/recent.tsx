import { initializeApollo } from "../lib/apolloClient";
import { LottiesResponse } from "../types/ServerSideProps";
import LottiesGrid from "../components/LottiesGrid";
import { GetLottiesQuery } from "../graphql/getLottiesQuery";
import Title from "../components/Title";
import Description from "../components/Description";
import { DEFAULT_TAKE } from "../lib/constants";
import Pagination from "../components/Pagination";

export default function recent({ data }: LottiesResponse) {
  return (
    <>
      <div className="py-4">
        <Title
          text={"The world’s largest source of freely-usable animations"}
        />
        <Description
          text={
            "Our large community of creative designers contribute their awesome animations daily, with a variety of styles to suit your needs for web, app, social media and more. Download now to use as Lottie, GIF, MP4 or JSON."
          }
        />
      </div>
      <LottiesGrid data={data} />
      <Pagination
        pageData={{
          count: data.pageData.count,
          offset: data.pageData.offset,
          startCursor: data.page.pageInfo.startCursor,
          endCursor: data.page.pageInfo.endCursor,
        }}
        route={"recent"}
        searchQuery={""}
      />
    </>
  );
}

export async function getServerSideProps(props) {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    variables: {
      first: props.query?.after || !props.query.before ? DEFAULT_TAKE : null,
      last: props.query?.before ? DEFAULT_TAKE : null,
      filter: "",
      sort: "recent",
      after: props.query?.after ? props.query.after : null,
      before: props.query?.before ? props.query.before : null,
    },
    query: GetLottiesQuery,
  });
  return { props: { data: data.data.lotties } };
}
