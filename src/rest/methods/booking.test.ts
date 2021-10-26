// tslint:disable:no-expression-statement
import restClient from '..'
import { BOOKING_ID } from '../../../test/constants'

const client = restClient()

describe('bookingGetById()', () => {
  it('should be able to get a booking by ID', async () => {
    const result = await client.bookingGetById(BOOKING_ID)

    expect(result.dateFrom).toBeDefined()
    expect(result.dateTo).toBeDefined()
  })
})

describe('bookingUpdateById()', () => {
  it('should be able to update a booking by ID', async () => {
    const updateData = {
      additionalInformation: 'Here comes the code',
      message: 'Bio Vegan Gluten Free All Time Booking',
    }
    const res1 = await client.bookingUpdateById(BOOKING_ID, updateData)
    expect(res1.message).toEqual(updateData.message)
    expect(res1.additionalInformation).toEqual(updateData.additionalInformation)

    const res2 = await client.bookingUpdateById(BOOKING_ID, { message: '' })
    expect(res2.message).toEqual(null)
    expect(res1.additionalInformation).toEqual(updateData.additionalInformation)

    const res3 = await client.bookingUpdateById(BOOKING_ID, {
      additionalInformation: '',
    })
    expect(res3.additionalInformation).toEqual(null)
  })
})
