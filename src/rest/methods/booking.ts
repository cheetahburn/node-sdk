import { IAllthingsRestClient } from '../types'

export interface IBooking {
  readonly additionalInformation: string
  readonly dateFrom: string
  readonly dateTo: string
  readonly id: string
  readonly message: string
  readonly phoneNumber: string
}

export type PartialBooking = Partial<IBooking>
export type BookingResult = Promise<IBooking>

/*
  Get a booking by its ID
  https://api-doc.allthings.me/#/Assets%2FBooking/get_bookings__bookingId_
*/
export type MethodBookingGetById = (bookingId: string) => BookingResult

export async function bookingGetById(
  client: IAllthingsRestClient,
  bookingId: string,
): BookingResult {
  return client.get(`/v1/bookings/${bookingId}`)
}

/*
  Update a booking by its ID
  https://api-doc.allthings.me/#/Assets%2FBooking/patch_bookings__bookingId_
*/
export type MethodBookingUpdateById = (
  bookingId: string,
  data: PartialBooking,
) => BookingResult

export async function bookingUpdateById(
  client: IAllthingsRestClient,
  bookingId: string,
  data: PartialBooking,
): BookingResult {
  return client.patch(`/v1/bookings/${bookingId}`, data)
}
