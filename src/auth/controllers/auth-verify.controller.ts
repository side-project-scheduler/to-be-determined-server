import { CookieUserInfo } from '../../common/types/cookie-user';
import { LoginResDto } from './../dtos/login.res.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { Cookies } from '../../common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthVerifyController {
  @ApiOperation({ summary: '로그인 검증' })
  @ApiResponse({
    status: 200,
    description: '로그인 확인 성공',
    type: LoginResDto,
  })
  @Get('verify')
  @UseGuards(AuthGuard())
  @HttpCode(200)
  async login(@Cookies('user') user: CookieUserInfo) {
    return { userId: user.userId };
  }
}
