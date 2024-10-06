export type RequestMethod = "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT";

type FetchResponse = Awaited<ReturnType<typeof fetch>>;

interface Request {
  body: FormData | File | string | undefined;
  headers: Record<string, string>;
  method: RequestMethod;
  url: string;
}

interface Response {
  body?: unknown;
  headers?: Record<string, string>;
  status?: number;
}

interface RequestErrorOptions {
  cause?: unknown;
  message: string;
  request: Request;
  response?: Response;
}

export class RequestError extends Error {
  public request: Request;
  public response?: Response;

  constructor({ cause, message, request, response }: RequestErrorOptions) {
    super(message, { cause });
    this.name = "RequestError";
    this.request = request;
    this.response = response;
  }
}

function getRequest(options: RequestOptions): Request {
  const headers = {
    "User-Agent": "Rodrigo script",
    ...options.headers,
  };

  const method = options.method ?? "GET";

  if (options.body instanceof FormData || options.body instanceof File) {
    return { ...options, body: options.body, headers, method };
  }

  if (options.body) {
    return {
      ...options,
      body: JSON.stringify(options.body),
      headers: { ...headers, "Content-Type": "application/json" },
      method,
    };
  }

  return { ...options, body: undefined, headers, method };
}

const parsers = {
  "application/json": (fetchResponse: FetchResponse) => fetchResponse.json(),
  "text/plain": (fetchResponse: FetchResponse) => fetchResponse.text(),
};

interface GetResponseBodyOptions {
  fetchResponse: FetchResponse;
  request: Request;
  options: RequestOptions;
  response: Response;
}

async function getResponseBody({ fetchResponse, response, request, options }: GetResponseBodyOptions) {
  if (options.rawResponseBody) {
    return fetchResponse;
  }

  const contentType = fetchResponse.headers.get("Content-Type");

  if (!contentType) {
    return;
  }

  try {
    for (const [contentType, parser] of Object.entries(parsers)) {
      if (contentType.includes(contentType)) {
        return await parser(fetchResponse);
      }
    }

    return await fetchResponse.text();
  } catch (error) {
    const message = "Error parsing response body";
    throw new RequestError({ cause: error, message, request, response });
  }
}

async function getResponse(request: Request, options: RequestOptions) {
  const fetchResponse = await fetch(request.url, {
    body: request.body,
    headers: request.headers,
    method: request.method,
  }).catch((error) => {
    const message = "Error getting a response from a request";
    throw new RequestError({ cause: error, message, request });
  });

  const response: Response = {
    headers: Object.fromEntries(fetchResponse.headers.entries()),
    status: fetchResponse.status,
  };

  response.body = await getResponseBody({ response, options, request, fetchResponse });

  if (!fetchResponse.ok) {
    const message = `${request.method} ${request.url} ${String(response.status)}`;
    throw new RequestError({ message, request, response });
  }

  return response;
}

interface RequestOptions {
  body?: unknown;
  headers?: Record<string, string>;
  method?: RequestMethod;
  url: string;
  rawResponseBody?: boolean;
}

export async function fullRequest(options: RequestOptions) {
  const response = await getResponse(getRequest(options), options);
  return response;
}

export async function request(options: RequestOptions) {
  const response = await fullRequest(options);
  return response.body;
}
