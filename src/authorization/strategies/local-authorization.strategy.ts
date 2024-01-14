import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthorizationService } from '../authorization.service'
import { HeaderAPIKeyStrategy } from 'passport-headerapikey'

@Injectable()
export class LocalAuthorizationStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'authorization',
) {
  constructor(private authorizationService: AuthorizationService) {
    super(
      { header: 'authorization', prefix: '' },
      true,
      async (authorization: string, done: any) => {
        const authorized =
          await this.authorizationService.validation(authorization)
        if (!authorized) return done(null, false)

        return done(null, true)
      },
    )
  }
}
