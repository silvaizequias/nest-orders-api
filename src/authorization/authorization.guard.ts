import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AuthorizationApiKeyGuard extends AuthGuard('Authorization') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    return super.handleRequest(err, user, info, context, status)
  }
}
