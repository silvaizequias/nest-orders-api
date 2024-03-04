import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { HeaderAPIKeyStrategy } from 'passport-headerapikey'
import { AuthorizationService } from './authorization.service'

@Injectable()
export class AuthorizationStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'authorizationKey',
) {
  constructor(private authorizationService: AuthorizationService) {
    super(
      { header: 'authorizationKey', prefix: '' },
      true,
      async (authorizationKey: string, done: any, request: Request) => {
        const authorized = await this.authorizationService.validation(
          authorizationKey,
          request,
        )
        if (authorized) return done(null, false)

        return done(null, true)
      },
    )
  }
}
