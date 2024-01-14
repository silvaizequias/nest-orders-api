import { Module } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { PassportModule } from '@nestjs/passport'
import { LocalAuthorizationStrategy } from './strategies/local-authorization.strategy'

@Module({
  imports: [PassportModule],
  providers: [AuthorizationService, LocalAuthorizationStrategy],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
