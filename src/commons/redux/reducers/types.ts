export type ActionType = {
  type?: string;
  payload?: any;
};

export type Game = {
  title: string;
  provider: string;
  collections: {
    [key: string]: number;
  };
  real: {
    [key: string]: {
      id: number;
    };
  };
  demo: string;
};
