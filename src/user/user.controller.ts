import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from 'src/auth/decorator';
import { JwtGaurd } from 'src/auth/gaurd';

@UseGuards(JwtGaurd)
@Controller('users')

export class UserController {
 
  @Get('me')
  //getMe(@Req req: Request) { // can use this like also
  getMe(@GetUser() user: User) {
    console.log({
      user,
    })
    return user;

  }

  @Patch()
  editUser(){
    
  }
}
