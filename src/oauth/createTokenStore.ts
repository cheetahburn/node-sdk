import { ITokenStore } from './types'

export default function createTokenStore(
  initialToken?: IDictionary,
): ITokenStore {
  const token = new Map<string, string>(Object.entries(initialToken || {}))

  return {
    get: key => token.get(key),
    reset: () => token.clear(),
    set: update =>
      Object.entries(update).forEach(([key, value]) => token.set(key, value)),
  }
}
