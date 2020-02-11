/**
 * @jest-environment jsdom
 */

// tslint:disable:no-expression-statement
import { DEFAULT_API_WRAPPER_OPTIONS } from '../constants'
import * as implicitGrant from './implicitGrant'

const mockOauthUrl = 'allthings.test'
const mockRedirectUri = 'allthings'

describe('OAuth implicit grant', () => {
  it('uses token RESPONSE_TYPE', () => {
    expect(implicitGrant.RESPONSE_TYPE).toBe('token')
  })

  it('is eligible for redirect when clientId and redirectUri provided', () => {
    const { clientId } = DEFAULT_API_WRAPPER_OPTIONS
    expect(
      implicitGrant.isEligibleForClientRedirect({
        clientId,
        redirectUri: mockRedirectUri,
      }),
    ).toBe(true)
  })

  it('is not eligible for redirect when clientId is missing', () => {
    expect(implicitGrant.isEligibleForClientRedirect({})).toBe(false)
  })

  describe('getRedirectUrl', () => {
    it('throws when clientId is missing in client options', () => {
      expect(() => implicitGrant.getRedirectUrl({})).toThrow(
        'Missing required "clientId"',
      )
    })

    it('returns URL to /oauh/authorize including stringified client options', () => {
      const { clientId } = DEFAULT_API_WRAPPER_OPTIONS
      expect(
        implicitGrant.getRedirectUrl({
          clientId,
          oauthUrl: mockOauthUrl,
          redirectUri: mockRedirectUri,
        }),
      ).toEqual(
        `${mockOauthUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${mockRedirectUri}&response_type=token`,
      )
    })

    it('falls back to window.location.href for redirectUri', () => {
      const { clientId } = DEFAULT_API_WRAPPER_OPTIONS
      expect(
        implicitGrant.getRedirectUrl({
          clientId,
          oauthUrl: mockOauthUrl,
        }),
      ).toEqual(
        `${mockOauthUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
          window.location.href,
        )}&response_type=token`,
      )
    })

    it('includes scope and state if provided in options', () => {
      const { clientId, scope } = DEFAULT_API_WRAPPER_OPTIONS
      const state = 'provided-state'

      const url = implicitGrant.getRedirectUrl({
        clientId,
        oauthUrl: mockOauthUrl,
        redirectUri: mockRedirectUri,
        scope,
        state,
      })

      expect(url).toContain(`state=${encodeURIComponent(state!)}`)
      expect(url).toContain(`scope=${encodeURIComponent(scope!)}`)
    })
  })

  describe('extractOAuthTokenFromUrl', () => {
    it('extracts data only if access_token was provided', () => {
      expect(
        implicitGrant.extractOAuthTokenFromUrl('#expires_in=3600'),
      ).toBeNull()
    })

    it('extracts accessToken from url', () => {
      expect(
        implicitGrant.extractOAuthTokenFromUrl('#access_token=1234'),
      ).toEqual({
        accessToken: '1234',
      })
    })

    it('handles multiple occurrences of accessToken in the url', () => {
      expect(
        implicitGrant.extractOAuthTokenFromUrl(
          '#access_token=1234&access_token=12345',
        ),
      ).toEqual({
        accessToken: '1234',
      })
    })

    it('extracts expiresIn if it is provided', () => {
      expect(
        implicitGrant.extractOAuthTokenFromUrl(
          '#access_token=1234&access_token=12345&expires_in=3600',
        ),
      ).toEqual({
        accessToken: '1234',
        expiresIn: 3600,
      })
    })

    it('handles multiple occurrences of expiresIn in the url', () => {
      expect(
        implicitGrant.extractOAuthTokenFromUrl(
          '#access_token=1234&access_token=12345&expires_in=3600&&expires_in=7200',
        ),
      ).toEqual({
        accessToken: '1234',
        expiresIn: 3600,
      })
    })
  })

  describe('stripOAuthTokenFromLocation', () => {
    it('removes oauth-related params from location hash', () => {
      location.hash =
        'param1=val1&access_token=1234&access_token=12345&expires_in=3600&scope=test&state=tzxvsfpwe&param2=val2'
      implicitGrant.stripOAuthTokenFromLocation(location)
      expect(location.hash).toEqual('#param1=val1&param2=val2')
    })
  })
})
