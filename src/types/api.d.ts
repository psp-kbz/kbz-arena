declare global {
  export type APIBaseResponse = {
    resCode: string;
    resMsg: string;
  };

  export type APIDataResponse<T> = APIBaseResponse & {
    result: T;
  };

  export type APIListResponse<T> = APIBaseResponse & {
    result: T[];
  };
}

export {};
