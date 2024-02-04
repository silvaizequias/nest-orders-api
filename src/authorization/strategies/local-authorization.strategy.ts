import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthorizationService } from '../authorization.service'
import { HeaderAPIKeyStrategy } from 'passport-headerapikey'

@Injectable()
export class LocalAuthorizationStrategy extends PassportStrategy(
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
        if (authorized && !authorized?.active) return done(null, false)

        return done(null, true)
      },
    )
  }
}
