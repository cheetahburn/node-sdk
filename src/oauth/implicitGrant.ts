import querystring from 'query-string'
import { IOAuthToken } from './types'

export const RESPONSE_TYPE = 'token'

const castToAuthorizationRequestParams = (params: Record<string, any>) => {
  const { clientId, scope, state, redirectUri } = params

  if (!clientId) {
    throw new Error(
      'Missing required "clientId" parameter to perform implicit grant',
    )
  }

  return {
    client_id: clientId,
    redirect_uri: redirectUri || window.location.href,
    response_type: RESPONSE_TYPE,
    ...(scope ? { scope } : {}),
    ...(state ? { state } : {}),
  }
}

export const isEligibleForClientRedirect = (
  params: Record<string, any>,
): boolean => {
  try {
    return !!castToAuthorizationRequestParams(params)
  } catch {
    return false
  }
}

export const getRedirectUrl = (params: Record<string, any>) =>
  `${params.oauthUrl}/oauth/authorize?${querystring.stringify(
    castToAuthorizationRequestParams(params),
  )}`

export const extractOAuthTokenFromUrl = (url: string): IOAuthToken | null => {
  const {
    access_token: accessToken,
    expires_in: expiresIn,
  } = querystring.parse(url)

  return accessToken
    ? {
        accessToken:
          accessToken instanceof Array ? accessToken[0] : accessToken,
        ...(expiresIn
          ? {
              expiresIn: parseInt(
                expiresIn instanceof Array ? expiresIn[0] : expiresIn,
                10,
              ),
            }
          : {}),
      }
    : null
}

export const stripOAuthTokenFromLocation = (location: Location) => {
  const {
    access_token: accessToken,
    expires_in: expiresIn,
    token_type,
    scope,
    state,
    ...rest
  } = querystring.parse(location.hash)

  location.hash = querystring.stringify(rest)
}
