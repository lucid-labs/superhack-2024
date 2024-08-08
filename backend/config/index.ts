export default () => ({
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  openapiApikey: process.env.OPENAPI_API_KEY,
  assistantId: process.env.ASSISTANT_ID || '',
  lucidityBaseUrl:
    process.env.LUCIDITY_BASE_URL || 'https://api-dev.lucidity.finance/api/v1',
});
