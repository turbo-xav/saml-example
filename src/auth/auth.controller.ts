import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('saml')
  @UseGuards(AuthGuard('saml'))
  samlLogin() {
    console.warn('Login in progress')
  }

  @Post('/callback')
  @UseGuards(AuthGuard('saml'))
  async callback(@Request() req, @Body() body: any) {  
    return body.SAMLResponse;
  }
}
