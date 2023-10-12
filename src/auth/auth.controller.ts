import { Controller, Post, Body, ValidationPipe, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto';
import { RequestWithUser } from '../interfaces/request.interface';
import { TokenBlacklistService } from './token-blacklist.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  @Post('signup')
  async signup(
    @Body(ValidationPipe) signupDto: SignupDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  async signin(
    @Body(ValidationPipe) signinDto: SigninDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(signinDto);
  }

  @Post('signout')
  async signout(@Req() req: RequestWithUser) {
    this.tokenBlacklistService.blacklistToken(
      req.headers.authorization?.split(' ')[1],
    );
    return {
      success: true,
      message: 'Logged out successfully',
    };
  }
}
