// tslint:disable:no-expression-statement
import generateId from 'nanoid'
import restClient from '..'
import {
  APP_ID,
  APP_PROPERTY_MANAGER_ID,
  USER_ID,
} from '../../../test/constants'
import { EnumTimezone } from '../types'
import { EnumUnitType } from './unit'

const client = restClient()

const testData = {
  content: {
    content: 'Hello world!',
  },
  type: 'text',
}

let sharedTicketId: string // tslint:disable-line no-let

beforeAll(async () => {
  const property = await client.propertyCreate(APP_ID, {
    name: 'Conversation Test Property',
    timezone: EnumTimezone.EuropeBerlin,
  })

  const group = await client.groupCreate(property.id, {
    name: 'Conversation Test Group',
    propertyManagerId: APP_PROPERTY_MANAGER_ID,
  })

  const unit = await client.unitCreate(group.id, {
    name: 'Conversation Test Unit',
    type: EnumUnitType.rented,
  })

  const utilisationPeriod = await client.utilisationPeriodCreate(unit.id, {
    endDate: '2050-01-01',
    externalId: generateId(),
    startDate: '2050-01-01',
  })

  const ticket = await client.ticketCreate(utilisationPeriod.id, {
    category: '5728504906128762098b4568',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    phoneNumber: '+1 555 12345',
    title: 'Ut enim ad minim veniam',
  })

  sharedTicketId = ticket.id // tslint:disable-line no-expression-statement
})

describe('conversationGetById()', () => {
  it('should be able to get a conversation by ID', async () => {
    const { id } = await client.ticketCreateConversation(sharedTicketId, {
      participants: [USER_ID],
    })
    const result = await client.conversationGetById(id)
    expect(result.id).toEqual(id)
  })
})

describe('conversationCreateMessage()', () => {
  it('should be able to create a new message in a conversation', async () => {
    const { id } = await client.ticketCreateConversation(sharedTicketId, {
      participants: [USER_ID],
    })

    const message = await client.conversationCreateMessage(id, testData)
    expect(message.id).toBeTruthy()
    expect(message.content.content).toEqual(testData.content.content)
  })
})

describe('conversationListMessages()', () => {
  it('should be able to get all messages of a conversation', async () => {
    const { id } = await client.ticketCreateConversation(sharedTicketId, {
      participants: [USER_ID],
    })

    const resultWithNoMessages = await client.conversationListMessages(id)
    expect(resultWithNoMessages.total).toEqual(0)

    await client.conversationCreateMessage(id, testData)
    const resultWithOneMessage = await client.conversationListMessages(id)
    expect(resultWithOneMessage.total).toEqual(1)
  })
})

describe('conversationUpdateMessageById()', () => {
  it('should be able to update a message by message ID', async () => {
    const conversation = await client.ticketCreateConversation(sharedTicketId, {
      participants: [USER_ID],
    })
    const message = await client.conversationCreateMessage(
      conversation.id,
      testData,
    )

    const result = await client.conversationListMessages(conversation.id)
    const msgResult = result._embedded.items[0]
    expect(msgResult.read).toEqual(false)

    const msgUpdateResult = await client.conversationUpdateMessageById(
      message.id,
      { read: true },
    )
    expect(msgUpdateResult.read).toEqual(true)

    const resultWithReadMessage = await client.conversationListMessages(
      conversation.id,
    )
    expect(resultWithReadMessage._embedded.items[0].read).toEqual(true)
  })
})
