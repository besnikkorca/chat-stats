export default async function perfReq<T>(p: Promise<T>) {
  try {
    return await p;
  } catch (err) {
    // log error to error tracking service own servers, or e.g sentry
  }
}
