import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended"

import prisma from "./client"

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))


beforeEach(() => {
  process.env.SALT = "some other stuff"
  process.env.JWT_SECRET = "hah ah ah aha h"
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

