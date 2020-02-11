// tslint:disable no-expression-statement
import { retry } from './functional'

describe('retry', () => {
  const error = new Error('boom')
  it('throws right away if maxRetries is 0 and function throws', async () => {
    const fn = jest.fn(() => {
      throw error
    })

    // specify huge backoff interval so it takes (most likely)
    // very long if it waits for some unexpected reason
    await expect(retry(fn, 0, 1e6)).rejects.toThrowError(error)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('throws the last error if no execution succeeds', async () => {
    // tslint:disable-next-line no-let
    let i = 0
    const fn = jest.fn(() => {
      throw new Error(`err ${i++}`)
    })

    await expect(retry(fn, 5, 0)).rejects.toThrowError('err 5')
    expect(fn).toHaveBeenCalledTimes(6)
  })

  it('resolves to eventual result', async () => {
    // tslint:disable-next-line no-let
    let i = 0
    const res = { a: 'b' }
    const fn = jest.fn(() => {
      if (i < 10) {
        throw new Error(`err ${i++}`)
      }

      return res
    })

    await expect(retry(fn, 10, 0)).resolves.toEqual(res)
    expect(fn).toHaveBeenCalledTimes(11)
  })
})
