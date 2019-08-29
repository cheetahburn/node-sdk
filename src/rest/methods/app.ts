import { IAllthingsRestClient } from '../types'

export interface IApp {
  readonly id: string
  readonly name: string
  readonly siteUrl: string
}

export interface IAppConfig {
  readonly appId: string
  readonly appName: string
  readonly appTitle: string
  readonly appSubTitle: string
  readonly clientId: string
}

export type PartialApp = Partial<IApp>

export type CreateAppResult = Promise<IApp>

export type MethodAppCreate = (
  userId: string,
  data: PartialApp & {
    readonly name: string
    readonly siteUrl: string
  },
) => CreateAppResult

// @TODO: this is very much incomplete.
export async function appCreate(
  client: IAllthingsRestClient,
  userId: string,
  data: PartialApp & {
    readonly name: string
    readonly siteUrl: string
  },
): CreateAppResult {
  return client.post(`/v1/users/${userId}/apps`, {
    availableLocales: { '0': 'de_DE' },
    ...data,
    siteUrl: data.siteUrl.replace('_', ''),
  })
}

export type MethodAppConfigGet = (
  appIdOrHostname: string,
) => Promise<IAppConfig>

export async function appConfigGet(
  client: IAllthingsRestClient,
  appIdOrHostname: string,
): Promise<IAppConfig> {
  const rawConfig = await client.get(
    `/v1/apps/${appIdOrHostname}/configuration`,
  )

  return {
    ...rawConfig,
    appId: rawConfig.appID,
    clientId: rawConfig.clientID,
  }
}
