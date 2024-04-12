import { Injectable } from '@nestjs/common'
import { spendSubscription } from 'src/utils/handle-management-api'

@Injectable()
export class AuthorizationService {
  constructor() {}

  async validation(Authorization: string): Promise<any> {
    return await spendSubscription({
      authorizationKey: Authorization,
      spend: 1,
    })
      .then(async (data) => {
        const authorized = await data
        if (!authorized?.response) {
          return true
        } else {
          return false
        }
      })
      .catch((error) => console.log(error))
  }
}
