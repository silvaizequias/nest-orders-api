import { HttpException, Injectable } from '@nestjs/common'

@Injectable()
export class AuthorizationService {
  constructor() {}

  async validation(authorizationKey: string, request: Request): Promise<any> {
    const { method, url } = request
    try {
      console.log(method, url, authorizationKey)
      return true
    } catch (error: any) {
      throw new HttpException(error, error.status)
    }
  }
}
