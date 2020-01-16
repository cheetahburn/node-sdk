// tslint:disable:no-expression-statement
import { readFileSync } from 'fs'
import restClient from '../index'

const client = restClient()

const USER_ID = '5a9d5ce40ecb3300492bf186'
const UTILISATION_PERIOD_ID = '5a9d65cd0ecb330045742be3'
const CATEGORY_ID = '5728504906128762098b456e'
const SERVICE_PROVIDER_ID = '5a818c07ef5f2f00441146a2'

afterEach(jest.clearAllMocks)

describe('ticketGetById()', () => {
  it('should be able to get a ticket by ID', async () => {
    const { id } = await client.ticketCreateOnUser(
      USER_ID,
      UTILISATION_PERIOD_ID,
      {
        category: CATEGORY_ID,
        description: 'description',
        inputChannel: 'test',
        title: 'title',
      },
    )
    const result = await client.ticketGetById(id)

    expect(result.id).toEqual(id)
    expect(result.description).toEqual('description')
    expect(result.title).toEqual('title')
  })
})

describe('ticketCreateOnUser()', () => {
  it('should be able to create a ticket', async () => {
    const result = await client.ticketCreateOnUser(
      USER_ID,
      UTILISATION_PERIOD_ID,
      {
        category: CATEGORY_ID,
        description: 'description',
        files: [
          {
            content: readFileSync(
              __dirname + '/../../../test/fixtures/1x1.png',
            ),
            filename: '2x2.png',
          },
        ],
        inputChannel: 'test',
        title: 'title',
      },
    )

    expect(result.description).toEqual('description')
    expect(result.title).toEqual('title')
    expect(result.files.length).toEqual(1)
  })
})

describe('ticketCreateOnServiceProvider()', () => {
  it('should be able to create a ticket on a service provider', async () => {
    const result = await client.ticketCreateOnServiceProvider(
      SERVICE_PROVIDER_ID,
      {
        category: CATEGORY_ID,
        channel: 'app',
        createdByCommunicationMethod: {
          type: 'email',
          value: 'pr-coreyplatt@allthings.me',
        },
        description: 'description',
        inputChannel: 'test',
        title: 'title',
      },
    )

    expect(result.description).toEqual('description')
    expect(result.title).toEqual('title')
    expect(result.files.length).toEqual(0)
  })

  it('should be able to create a ticket on a service provider with files', async () => {
    const result = await client.ticketCreateOnServiceProvider(
      SERVICE_PROVIDER_ID,
      {
        category: CATEGORY_ID,
        channel: 'app',
        createdByCommunicationMethod: {
          type: 'email',
          value: 'pr-coreyplatt@allthings.me',
        },
        description: 'description',
        files: [
          {
            content: readFileSync(
              __dirname + '/../../../test/fixtures/1x1.png',
            ),
            filename: '2x2.png',
          },
        ],
        inputChannel: 'test',
        title: 'title',
      },
    )

    expect(result.description).toEqual('description')
    expect(result.title).toEqual('title')
    expect(result.files.length).toEqual(1)
  })
})
