import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ header: 'authorization' }, true)
  }

  async validate(authorization: string): Promise<any> {
    if (authorization) return true
  }
}
