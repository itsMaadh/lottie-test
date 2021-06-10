export type LottieResponse = {
  data: {
    page: {
      edges: Lottie[];
      pageInfo: {
        startCursor: string;
        endCursor: string;
      };
    };
    pageData: {
      count: number;
      limit: number;
      offset: number;
    };
  };
};

export type Lottie = {
  cursor: string;
  node: {
    assetUrl: string;
    featured: boolean;
    id: string;
    title: string;
    createdAt: Date;
  };
};
