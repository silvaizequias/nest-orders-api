import { HttpException, Injectable } from '@nestjs/common'

@Injectable()
export class AuthorizationService {
  constructor() {}

  async validation(authorizationKey: string): Promise<any> {
    const PLATFORM_URL = process.env.PLATFORM_URL!

    try {
      const data = await fetch(
        `${PLATFORM_URL}/organization-keys/authorization-key/${authorizationKey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return data && (await data.json())
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }
}
