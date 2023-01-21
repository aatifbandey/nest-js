import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
//Controller accepts incoming requests
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK) // not mandatory but you can return custom code -- default it returns 201
  @Post('signin')
  login(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
