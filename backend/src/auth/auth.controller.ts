import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/user.decorator';
import { JoinRequestDto } from '../dto/join.request.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoggedInGuard } from './logged-in';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async signup(@Body() data: JoinRequestDto) {
    return this.authService.createUser(
      data.email,
      data.nickname,
      data.password,
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user) {
    return user;
  }

  @UseGuards(LoggedInGuard)
  @Get('info')
  async test(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req, @Response() res) {
    req.logout();
    req.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
