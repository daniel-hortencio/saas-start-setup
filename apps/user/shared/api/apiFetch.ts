type FetchSuccess<T> = {
  data: T;
};

type FetchError = {
  message: string;
};

export type ApiMethod = "POST" | "GET" | "DELETE" | "PATCH";

type ApiFetch = {
  url: string;
  method: ApiMethod;
  body?: any;
  headers?: {
    user_id?: string;
  };
};

export const apiFetch = <T>({
  url,
  method,
  body,
  headers,
}: ApiFetch): Promise<FetchSuccess<T> | FetchError> =>
  new Promise(async (resolve, reject) => {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    if (response.status >= 400) {
      reject({ message: response.message });
    }

    resolve({
      data: response,
    });
  });

export const apiBFF = <T>(params: ApiFetch) =>
  apiFetch<T>({ ...params, url: `http://localhost:3000/api/bff${params.url}` });

export const apiBackend = <T>(params: ApiFetch) =>
  apiFetch<T>({ ...params, url: `http://localhost:3333${params.url}` });
