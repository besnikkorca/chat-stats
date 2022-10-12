export default async function fetchWithError(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const response = await fetch(input, init);

  if (response.status === 200) {
    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  }

  throw new Error(`Error ${response.status}: ${response.statusText}`);
}
