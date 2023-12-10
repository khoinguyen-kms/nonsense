import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_ROUTE, JWT_SECRET_KEY } from 'src/utils/constants';

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaders(request);

    if (!token) throw new UnauthorizedException('You should sign in before')

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: JWT_SECRET_KEY })
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException(err);
    }

    return true;
  }

  private extractTokenFromHeaders(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
