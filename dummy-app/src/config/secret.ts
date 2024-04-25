// import dotenv from 'dotenv'
// dotenv.config()

const secret = {
  APP_NAME: process.env.APP_NAME ?? '',
  APP_URL: process.env.APP_URL ?? '',
  APP_SERVER_URL: process.env.APP_SERVER_URL ?? '',

  SSO_SERVER_URL: process.env.SSO_SERVER_URL ?? '',
  SSO_CLIENT_URL: process.env.SSO_CLIENT_URL ?? '',
  SSO_CALLBACK: process.env.SSO_CALLBACK ?? '',
  SSO_ID: process.env.SSO_ID ?? '',
  SSO_SECRET: process.env.SSO_SECRET ?? '',
}

export default secret
