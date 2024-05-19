import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return { message: 'logged in!' };
  }

  @Get('logout')
  logout(@Request() req) {
    req.logout((err) => {
      if (err) {
        throw err;
      }
    });
  }
}
