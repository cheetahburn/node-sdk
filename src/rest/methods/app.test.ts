// tslint:disable:no-expression-statement
import generateId from 'nanoid'
import restClient from '..'
import { APP_ID, USER_ID } from '../../../test/constants'

const client = restClient()

describe('appCreate()', () => {
  it('should create a new App', async () => {
    const result = await client.appCreate(USER_ID, {
      name: generateId(),
      siteUrl: generateId(),
    })

    expect(result).toBeTruthy()
  })
})

describe('appConfigGet()', () => {
  const anonRestClient = restClient({
    clientId: undefined,
    clientSecret: undefined,
    password: undefined,
    username: undefined,
  })

  it('should get configuration of an App by its id', async () => {
    const result = await anonRestClient.appConfigGet(APP_ID)

    expect(result).toMatchObject({
      appId: APP_ID,
      clientId: expect.any(String),
    })
  })
})
