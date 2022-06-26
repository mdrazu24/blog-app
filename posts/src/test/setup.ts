import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended"
import prisma from '../client' // This is the same client as used in the app.ts . So we can use it to mock the prisma Client
import authPrisma from '../../../authentication/src/client' // This is the same client as used in the app.ts . So we can use it to mock the prisma Client
jest.mock("../client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))


jest.mock("../../../authentication/src/client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeAll (() => {
process.env.SALT = "some other stuff"
process.env.JWT_SECRET = "hah ah ah aha h"
authPrisma.$connect()
prisma.$connect()
})

beforeEach(() => {
  mockReset(prismaMock)
  mockReset(authPrismaMock)
})


afterAll(() => {
  authPrisma.$disconnect()
  prisma.$disconnect()
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
export const authPrismaMock = authPrisma as unknown as DeepMockProxy<PrismaClient>

