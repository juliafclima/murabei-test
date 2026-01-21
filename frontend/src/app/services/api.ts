const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchOptions = RequestInit & {
  params?: Record<string, string | number>;
};

export async function api<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { params, headers, ...rest } = options;

  const query = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).map(([Key, value]) => [Key, String(value)]),
      )
    : "";

  const response = await fetch(`${API_BASE_URL}${endpoint}${query}`, {
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API request failed");
  }

  return response.json();
}
