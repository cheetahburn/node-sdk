import { InterfaceAllthingsRestClient } from '../types'
import { IUser, remapUserResponse } from './user'

export interface IUtilisationPeriod {
  readonly _embedded: {
    readonly invitations: ReadonlyArray<any>
    readonly [key: string]: any
  }
  readonly endDate: string | null
  readonly externalId: string | null
  readonly id: string
  readonly invitations: ReadonlyArray<IUtilisationPeriodInvite>
  readonly name: string
  readonly startDate: string
  readonly stats: {
    readonly tenantCount: number | null
    readonly invitationCount: number | null
  }
  readonly tenantIds: ReadonlyArray<string>
  readonly userCount: number | null
  readonly users: ReadonlyArray<IUser>
}

export interface IUtilisationPeriodInvite {
  readonly id: string
  readonly code: string
  readonly createdAt: string
  readonly email: string | null
  readonly expiresAt: string | null
  readonly permanent: boolean
  readonly utilisationPeriods: ReadonlyArray<string>
  readonly invitationSent: boolean
  readonly tenantId: string
  readonly organizations: ReadonlyArray<string> // array of mongoId
  readonly teams: ReadonlyArray<string> // array of mongoId
  readonly resendAttempts: ReadonlyArray<string> // array of dates
  readonly usedAt: string | null
}

export type PartialUtilisationPeriod = Partial<IUtilisationPeriod>

export type UtilisationPeriodResult = Promise<IUtilisationPeriod>
export type UtilisationPeriodResults = Promise<
  ReadonlyArray<IUtilisationPeriod>
>

const remapEmbeddedUser = (users: ReadonlyArray<any>) =>
  users.map(remapUserResponse)

/*
  Create new Utilisation Period
*/

export type MethodUtilisationPeriodCreate = (
  unitId: string,
  data: PartialUtilisationPeriod & {
    readonly startDate: string
  },
) => UtilisationPeriodResult

export async function utilisationPeriodCreate(
  client: InterfaceAllthingsRestClient,
  unitId: string,
  data: PartialUtilisationPeriod & {
    readonly startDate: string
  },
): UtilisationPeriodResult {
  const {
    tenantIDs: tenantIds,
    _embedded: { invitations, users },
    ...result
  } = await client.post(`/v1/units/${unitId}/utilisation-periods`, data)

  return { ...result, invitations, tenantIds, users: remapEmbeddedUser(users) }
}

/*
  Get a Utilisation Period by its ID
*/

export type MethodUtilisationPeriodFindById = (
  id: string,
) => UtilisationPeriodResult

export async function utilisationPeriodFindById(
  client: InterfaceAllthingsRestClient,
  utilisationPeriodId: string,
): UtilisationPeriodResult {
  const {
    tenantIDs: tenantIds,
    _embedded: { invitations, users },
    ...result
  } = await client.get(`/v1/utilisation-periods/${utilisationPeriodId}`)

  return { ...result, invitations, tenantIds, users: remapEmbeddedUser(users) }
}

/*
  Update a unit by its ID
*/

export type MethodUtilisationPeriodUpdateById = (
  unitId: string,
  data: PartialUtilisationPeriod,
) => UtilisationPeriodResult

export async function utilisationPeriodUpdateById(
  client: InterfaceAllthingsRestClient,
  utilisationPeriodId: string,
  data: PartialUtilisationPeriod & {
    readonly startDate: string
  },
): UtilisationPeriodResult {
  const {
    tenantIDs: tenantIds,
    _embedded: { invitations, users },
    ...result
  } = await client.patch(`/v1/utilisation-periods/${utilisationPeriodId}`, data)

  return { ...result, invitations, tenantIds, users: remapEmbeddedUser(users) }
}

export type MethodUtilisationPeriodCheckInUser = (
  utilisationPeriodId: string,
  data: { readonly email: string },
) => UtilisationPeriodResult

export async function utilisationPeriodCheckInUser(
  client: InterfaceAllthingsRestClient,
  utilisationPeriodId: string,
  data: {
    readonly email: string
  },
): UtilisationPeriodResult {
  return (
    (await client.post(`/v1/utilisation-periods/${utilisationPeriodId}/users`, {
      email: data.email,
    })) && client.utilisationPeriodFindById(utilisationPeriodId)
  )
}
