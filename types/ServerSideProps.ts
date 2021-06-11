export type LottiesResponse = {
  data: {
    page: {
      edges: { cursor: string; node: Lottie }[];
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

export type LottieResponse = {
  data: {
    lottie: Lottie;
  };
};

export type Lottie = {
  assetUrl: string;
  featured: boolean;
  id: string;
  title: string;
  createdAt: Date;
};
