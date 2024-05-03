type FetchSuccess = {
  isError: false;
  data: any;
};

type FetchError = {
  isError: true;
  message: string;
};

export const apiFetch = ({
  url,
  method,
  body,
}: {
  url: string;
  method: "POST" | "GET" | "DELETE" | "PATCH";
  body: any;
}): Promise<FetchSuccess | FetchError> =>
  fetch(`http://localhost:3333${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    return response.json().then((data) => {
      if (!response.ok) {
        return {
          isError: true,
          message: data.message,
        };
      } else {
        return {
          isError: false,
          data,
        };
      }
    });
  });
