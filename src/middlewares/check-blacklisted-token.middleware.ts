import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenBlacklistService } from '../auth/token-blacklist.service';
import { RequestWithUser } from '../interfaces/request.interface';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CheckBlacklistedTokenMiddleware implements NestMiddleware {
  private tokenBlacklistService: TokenBlacklistService;

  constructor(private readonly moduleRef: ModuleRef) {}

  async use(req: RequestWithUser, res: Response, next: Function) {
    if (!this.tokenBlacklistService) {
      this.tokenBlacklistService = this.moduleRef.get(TokenBlacklistService, {
        strict: false,
      });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (token && this.tokenBlacklistService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token has been blacklisted');
    }
    next();
  }
}
