import simpleOauth from 'simple-oauth2'

const netsuiteApi = 'https://5250055.app.netsuite.com'
/* process.env.URL from netlify BUILD environment variables */
const siteUrl = process.env.URL || 'http://localhost:3000'

export const config = {
  /* values set in terminal session or in netlify environment variables */
  appId: process.env.NETSUITE_APP_ID,
  clientId: process.env.NETSUITE_CLIENT_ID,
  clientSecret: process.env.NETSUITE_CLIENT_SECRET,
  /* Netsuite oauth API endpoints */
  tokenHost: netsuiteApi,
  authorizePath: `${netsuiteApi}/app/login/oauth2/authorize.nl`,
  tokenPath: `https://5250055.suitetalk.api.netsuite.com/services/rest/auth/oauth2/v1/token`,
  // profilePath: `${netsuiteApi}/me/`,
  /* redirect_uri is the callback url after successful signin */
  redirect_uri: `${siteUrl}/.netlify/functions/auth-callback`,
}

function authInstance(credentials) {
  if (!credentials.client.id) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set INTERCOM_CLIENT_ID')
  }
  if (!credentials.client.secret) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set INTERCOM_CLIENT_SECRET')
  }
  // return oauth instance
  return simpleOauth.create(credentials)
}

/* Create oauth2 instance to use in our two functions */
export default authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath
  }
})
