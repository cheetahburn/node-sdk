import { MethodHttpRequest } from './request'

export type GetResult = Promise<any>

export type MethodHttpGet = (method: string, query?: IDictionary) => GetResult

export default async function get(
  request: MethodHttpRequest,
  method: string,
  query: IDictionary,
): GetResult {
  return request('get', method, { query })
}
