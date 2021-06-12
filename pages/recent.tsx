import { initializeApollo } from "../lib/apolloClient";
import { LottiesResponse } from "../types/ServerSideProps";
import LottiesGrid from "../components/LottiesGrid";
import { GetLottiesQuery } from "../graphql/getLottiesQuery";
import { useRouter } from "next/router";
import Title from "../components/Title";
import Description from "../components/Description";

export default function recent({ data }: LottiesResponse) {
  const pageLimit = 6;
  const router = useRouter();

  const next = async () => {
    await router.push({
      pathname: "/recent",
      query: { after: data.page.pageInfo.endCursor },
    });
  };

  const back = async () => {
    await router.push({
      pathname: "/recent",
      query: { before: data.page.pageInfo.startCursor },
    });
  };

  return (
    <>
      <div className="py-6">
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
      filter: "",
      sort: "recent",
      after: props.query?.after ? props.query.after : null,
      before: props.query?.before ? props.query.before : null,
    },
    query: GetLottiesQuery,
  });
  return { props: { data: data.data.lotties } };
}
