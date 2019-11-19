import { MethodHttpRequest } from './request'

export type PatchResult = Promise<any>

export type MethodHttpPatch = (
  method: string,
  body?: IDictionary,
) => PatchResult

export default async function patch(
  request: MethodHttpRequest,
  method: string,
  body: IDictionary,
): PatchResult {
  return request('patch', method, { body })
}
