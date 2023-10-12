import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RequestWithUser } from './interfaces/request.interface';

@Controller()
export class AppController {
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: RequestWithUser) {
    return {
      name: req.user.name,
      email: req.user.email,
    };
  }
}
