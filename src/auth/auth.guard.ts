import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AuthGuardJwt extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext): Request {
        return context.switchToHttp().getRequest()
    }
}
