import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { LocalAuthStrategy } from './strategies/local-auth.strategy'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '14d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
