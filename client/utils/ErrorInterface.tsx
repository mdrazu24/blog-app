export interface ErrorInterface extends Error {
  response: {
    data: {
      errors: { message: string }[]
    }
  }
}
