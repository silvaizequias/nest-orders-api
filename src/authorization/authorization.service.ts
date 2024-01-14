import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthorizationService {
  constructor() {}

  async validation(authorization: string): Promise<any> {
    const prisma = new PrismaService()
    const AUTHORIZATION_KEY = process.env.AUTHORIZATION_KEY!

    try {
      if (authorization == AUTHORIZATION_KEY) {
        return true
      } else {
        const domain = await prisma.domain.findFirst({
          where: {
            authorization: authorization,
            active: true,
            softDeleted: false,
          },
        })
        if (domain) return true
        return false
      }
    } catch (error) {
      await prisma.$disconnect()
      throw new HttpException(error, error.status)
    } finally {
      await prisma.$disconnect()
    }
  }
}
