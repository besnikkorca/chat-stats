// playground is using cdn.jsdelivr.net which forces us to either whitelist
// cdn.jsdelivr.net or disable the policies and playground in prod
// more info: https://github.com/graphql/graphql-playground/issues/1283
const DISABLED = process.env.NODE_ENV === 'production' ? undefined : false;

const helmetConfig = {
  contentSecurityPolicy: DISABLED,
  crossOriginEmbedderPolicy: DISABLED,
};

export default helmetConfig;
