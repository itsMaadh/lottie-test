import UploadModal from "../components/UploadModal";
import { initializeApollo } from "../lib/apolloClient";
import { GetUsedByCompaniesQuery } from "../graphql/getUsedByCompaniesQuery";
import { Companies } from "../types/ServerSideProps";
import { Player } from "@lottiefiles/react-lottie-player";
import UsedBy from "../components/UsedBy";

export default function Home({ data }: Companies) {
  return (
    <div>
      <div className="py-12 sm:pb-24 sm:pt-12 px-5 md:px-0">
        <div className="md:flex mx-auto">
          <div>
            <h1 className="text-4xl tracking-wide sm:text-6xl font-semibold mb-4 text-black max-w-lg mx-auto text-center md:text-left">
              Lightweight, scalable animations
              <span className="text-gray-500">
                <span> </span>
                for your website and apps
              </span>
            </h1>
            <p className="text-base tracking-wide mb-8 text-gray-500 max-w-lg mx-auto md:ml-0 text-center md:text-left leading-normal w-2/3">
              LottieFiles provides all the tools that you need to create, edit,
              test and display Lottie animations. Pls hire me.
            </p>
            <div className="flex md:block justify-center mb-10">
              <UploadModal />
            </div>
          </div>
          <div className="mx-auto">
            <Player
              src={"https://static4.lottiefiles.com/lotties/lf30_cskmaqjx.json"}
              id={"HomeLottie"}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
      </div>
      <div className="py-1">
        <div className="container mx-auto text-center overflow-hidden">
          <p className="text-gray-600 mb-5 block mx-auto leading-normal md:inline-block w-2/3 md:w-full">
            Used by designers and developers from
            <span> </span>
            <span className="font-semibold">70,000+ companies</span>
            <span> </span>
            worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center relative pb-8">
            {data.companies.map((company) => (
              <div key={company.id}>
                <UsedBy src={company.assetUrl} alt={company.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({ query: GetUsedByCompaniesQuery });
  return { props: { data: data.data } };
}
