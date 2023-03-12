import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { LocalAuthGuard } from './auth/local.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {
    // do nothing
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() request): Promise<any> {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
