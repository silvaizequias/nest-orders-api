import { HttpException, Injectable } from '@nestjs/common'

@Injectable()
export class AuthorizationService {
  constructor() {}

  async validation(authorizationKey: string): Promise<any> {
    const MANAGEMENT_API_URL = process.env.MANAGEMENT_API_URL!

    try {
      const data = await fetch(
        `${MANAGEMENT_API_URL}/organization-keys/authorization-key/${authorizationKey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const response = data && (await data.json())

      return response
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }
}
