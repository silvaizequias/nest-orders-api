import { HttpException, Injectable } from '@nestjs/common'
import { MongoClient, ServerApiVersion } from 'mongodb'

@Injectable()
export class AuthorizationService {
  constructor() {}

  async validation(authorizationKey: string, request: Request): Promise<any> {
    const PLATFORM_URL = process.env.PLATFORM_URL!
    const DATABASE_URI = process.env.DATABASE_URI!

    const mongoClient = new MongoClient(DATABASE_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })

    try {
      const { method, url } = request
      const data = await fetch(
        `${PLATFORM_URL}/organization-keys/authorization-key/${authorizationKey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const response = data && (await data.json())
      if (response?.active) {
        const logSpend = {
          createdAt: new Date(),
          document: response?.organization?.document,
          mehtod: method,
          url: url,
        }
        await mongoClient.connect()
        await mongoClient.db().collection('api_spends').insertOne(logSpend)
      }
      return response
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
      await mongoClient.close()
    }
  }
}
