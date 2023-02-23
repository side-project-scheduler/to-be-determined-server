import { User } from '../../entities/user.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { VerifyResDto } from '../dtos/verify.res.dto';

@Controller('api/auth')
export class AuthVerifyController {
  @ApiOperation({ summary: '로그인 검증' })
  @ApiResponse({
    status: 200,
    description: '로그인 확인 성공',
    type: VerifyResDto,
  })
  @Get('verify')
  @UseGuards(AuthGuard())
  @HttpCode(200)
  @Serialize(VerifyResDto)
  async login(@CurrentUser('user') currentUser: User) {
    return currentUser;
  }
}
