import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { HeaderAPIKeyStrategy } from 'passport-headerapikey'
import { AuthorizationService } from './authorization.service'

@Injectable()
export class AuthorizationStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'Authorization',
) {
  constructor(private authorizationService: AuthorizationService) {
    super(
      { header: 'Authorization', prefix: '' },
      true,
      async (Authorization: string, done: any, request: Request) => {
        const authorized = await this.authorizationService.validation(
          Authorization,
          request,
        )
        if (!authorized) return done(null, false)

        return done(null, true)
      },
    )
  }
}
