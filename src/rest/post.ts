import { MethodHttpRequest } from './request'

export type PostResult = Promise<any>

export type MethodHttpPost = (method: string, body?: IDictionary) => PostResult

export default async function post(
  request: MethodHttpRequest,
  method: string,
  body: IDictionary,
): PostResult {
  return request('post', method, { body })
}
